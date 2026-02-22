"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Instructor,
  type Commission,
  generateReferralCode,
  simpleHash,
  DIRECT_COMMISSION_RATE,
  REFERRAL_COMMISSION_RATE,
} from "@/lib/affiliate";

interface AffiliateState {
  currentInstructor: Instructor | null;
  instructors: Instructor[];
  commissions: Commission[];

  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    referralCode?: string;
  }) => { success: boolean; error?: string };

  // Data access
  getInstructorByReferralCode: (code: string) => Instructor | null;
  getInstructorByEmail: (email: string) => Instructor | null;
  getDirectCommissions: (instructorId: string) => Commission[];
  getReferralCommissions: (instructorId: string) => Commission[];
  getInstructorReferralCommissions: (instructorId: string) => Commission[];
  getDirectSalesTotal: (instructorId: string) => number;
  getReferralSalesTotal: (instructorId: string) => number;
  getDirectCommissionTotal: (instructorId: string) => number;
  getReferralCommissionTotal: (instructorId: string) => number;
  getInstructorReferralTotal: (instructorId: string) => number;
  getTotalEarnings: (instructorId: string) => number;
  getAvailableBalance: (instructorId: string) => number;
  getReferredInstructors: (instructorId: string) => Instructor[];
  getDirectSalesCount: (instructorId: string) => number;
  getReferralSalesCount: (instructorId: string) => number;

  // Instructor data sync from server
  setCurrentInstructor: (instructor: Instructor) => void;
  updateInstructor: (id: string, data: Partial<Instructor>) => void;

  // Commission processing
  addCommission: (commission: Commission) => void;
  processOrder: (
    orderId: string,
    orderTotal: number,
    referralCode: string | null,
    customerName: string
  ) => Commission[];

  // Sync from localStorage (for cross-tab or external updates)
  syncFromStorage: () => void;
}

export const useAffiliateStore = create<AffiliateState>()(
  persist(
    (set, get) => ({
      currentInstructor: null,
      instructors: [],
      commissions: [],

      login: (email: string, password: string) => {
        const state = get();
        const hash = simpleHash(password);
        const instructor = state.instructors.find(
          (i) => i.email === email && i.passwordHash === hash
        );
        if (instructor) {
          set({ currentInstructor: instructor });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentInstructor: null });
      },

      register: (data) => {
        const state = get();

        // Check for duplicate email
        if (state.instructors.some((i) => i.email === data.email)) {
          return { success: false, error: "Email already registered" };
        }

        // Find parent instructor if referral code provided
        let parentInstructorId: string | null = null;
        if (data.referralCode) {
          const parent = state.instructors.find(
            (i) => i.referralCode === data.referralCode
          );
          if (!parent) {
            return { success: false, error: "Invalid referral code" };
          }
          parentInstructorId = parent.id;
        }

        // Generate unique referral code
        let referralCode = generateReferralCode();
        while (state.instructors.some((i) => i.referralCode === referralCode)) {
          referralCode = generateReferralCode();
        }

        const newInstructor: Instructor = {
          id: crypto.randomUUID(),
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          passwordHash: simpleHash(data.password),
          referralCode,
          parentInstructorId,
          createdAt: new Date().toISOString(),
        };

        set({
          instructors: [...state.instructors, newInstructor],
          currentInstructor: newInstructor,
        });

        // Also write to the separate localStorage key for compatibility
        const existing = JSON.parse(
          localStorage.getItem("mv-instructors") || "[]"
        );
        existing.push(newInstructor);
        localStorage.setItem("mv-instructors", JSON.stringify(existing));

        return { success: true };
      },

      getInstructorByReferralCode: (code: string) => {
        return get().instructors.find((i) => i.referralCode === code) || null;
      },

      getDirectCommissions: (instructorId: string) => {
        return get().commissions.filter(
          (c) => c.instructorId === instructorId && c.type === "direct"
        );
      },

      getReferralCommissions: (instructorId: string) => {
        return get().commissions.filter(
          (c) => c.instructorId === instructorId && c.type === "referral"
        );
      },

      getInstructorReferralCommissions: (instructorId: string) => {
        return get().commissions.filter(
          (c) => c.instructorId === instructorId && c.type === "instructor_referral"
        );
      },

      getDirectSalesTotal: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && c.type === "direct"
          )
          .reduce((sum, c) => sum + c.orderTotal, 0);
      },

      getReferralSalesTotal: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && c.type === "referral"
          )
          .reduce((sum, c) => sum + c.orderTotal, 0);
      },

      getDirectCommissionTotal: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && c.type === "direct"
          )
          .reduce((sum, c) => sum + c.commissionAmount, 0);
      },

      getReferralCommissionTotal: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && c.type === "referral"
          )
          .reduce((sum, c) => sum + c.commissionAmount, 0);
      },

      getInstructorReferralTotal: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && c.type === "instructor_referral"
          )
          .reduce((sum, c) => sum + c.commissionAmount, 0);
      },

      getTotalEarnings: (instructorId: string) => {
        return get()
          .commissions.filter((c) => c.instructorId === instructorId)
          .reduce((sum, c) => sum + c.commissionAmount, 0);
      },

      getReferredInstructors: (instructorId: string) => {
        return get().instructors.filter(
          (i) => i.parentInstructorId === instructorId
        );
      },

      getDirectSalesCount: (instructorId: string) => {
        return get().commissions.filter(
          (c) => c.instructorId === instructorId && c.type === "direct"
        ).length;
      },

      getReferralSalesCount: (instructorId: string) => {
        return get().commissions.filter(
          (c) => c.instructorId === instructorId && c.type === "referral"
        ).length;
      },

      getInstructorByEmail: (email: string) => {
        return get().instructors.find((i) => i.email === email) || null;
      },

      getAvailableBalance: (instructorId: string) => {
        return get()
          .commissions.filter(
            (c) => c.instructorId === instructorId && !c.paidOut
          )
          .reduce((sum, c) => sum + c.commissionAmount, 0);
      },

      setCurrentInstructor: (instructor: Instructor) => {
        set({ currentInstructor: instructor });
        // Also update in the instructors list
        const state = get();
        const exists = state.instructors.some((i) => i.id === instructor.id);
        if (!exists) {
          set({ instructors: [...state.instructors, instructor] });
        }
      },

      updateInstructor: (id: string, data: Partial<Instructor>) => {
        set((state) => ({
          instructors: state.instructors.map((i) =>
            i.id === id ? { ...i, ...data } : i
          ),
          currentInstructor:
            state.currentInstructor?.id === id
              ? { ...state.currentInstructor, ...data }
              : state.currentInstructor,
        }));
      },

      addCommission: (commission: Commission) => {
        set((state) => ({
          commissions: [...state.commissions, commission],
        }));
      },

      processOrder: (orderId, orderTotal, referralCode, customerName) => {
        if (!referralCode) return [];

        const state = get();
        const instructor = state.instructors.find(
          (i) => i.referralCode === referralCode
        );
        if (!instructor) return [];

        const newCommissions: Commission[] = [];
        const now = new Date().toISOString();

        // Direct commission (25%)
        const directCommission: Commission = {
          id: crypto.randomUUID(),
          orderId,
          instructorId: instructor.id,
          type: "direct",
          orderTotal,
          commissionRate: DIRECT_COMMISSION_RATE,
          commissionAmount: orderTotal * DIRECT_COMMISSION_RATE,
          createdAt: now,
        };
        newCommissions.push(directCommission);

        // Referral commission (10%) for parent instructor
        if (instructor.parentInstructorId) {
          const parentInstructor = state.instructors.find(
            (i) => i.id === instructor.parentInstructorId
          );
          if (parentInstructor) {
            const referralCommission: Commission = {
              id: crypto.randomUUID(),
              orderId,
              instructorId: parentInstructor.id,
              type: "referral",
              orderTotal,
              commissionRate: REFERRAL_COMMISSION_RATE,
              commissionAmount: orderTotal * REFERRAL_COMMISSION_RATE,
              createdAt: now,
            };
            newCommissions.push(referralCommission);
          }
        }

        set((state) => ({
          commissions: [...state.commissions, ...newCommissions],
        }));

        return newCommissions;
      },

      syncFromStorage: () => {
        try {
          const instructors = JSON.parse(
            localStorage.getItem("mv-instructors") || "[]"
          );
          const commissions = JSON.parse(
            localStorage.getItem("mv-commissions") || "[]"
          );
          set({ instructors, commissions });
        } catch {
          // Ignore parse errors
        }
      },
    }),
    {
      name: "mv-affiliate",
      partialize: (state) => ({
        currentInstructor: state.currentInstructor,
        instructors: state.instructors,
        commissions: state.commissions,
      }),
    }
  )
);

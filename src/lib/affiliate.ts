// Commission rates
export const DIRECT_COMMISSION_RATE = 0.25; // 25%
export const REFERRAL_COMMISSION_RATE = 0.10; // 10%

export interface Instructor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  referralCode: string;
  parentInstructorId: string | null;
  stripeCustomerId?: string | null;
  stripeConnectId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?: string; // active, inactive, past_due, canceled
  connectOnboarded?: boolean;
  createdAt: string;
}

export interface Commission {
  id: string;
  orderId?: string | null;
  instructorId: string;
  type: 'direct' | 'referral' | 'instructor_referral';
  orderTotal: number;
  commissionRate: number;
  commissionAmount: number;
  paidOut?: boolean;
  createdAt: string;
}

export interface InstructorSale {
  orderId: string;
  orderTotal: number;
  type: 'direct' | 'referral';
  createdAt: string;
  customerName: string;
}

/**
 * Generate a unique referral code for an instructor.
 * Format: INS-XXXXXXXX (8 random alphanumeric characters)
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'INS-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Build a referral URL from a referral code.
 */
export function buildReferralUrl(referralCode: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/?ref=${referralCode}`;
  }
  return `/?ref=${referralCode}`;
}

/**
 * Simple hash function for passwords (client-side only, not cryptographically secure).
 * In production this would use bcrypt on the server.
 */
export function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return 'hash_' + Math.abs(hash).toString(36);
}

/**
 * Store the referral code from URL parameter.
 * Sets both localStorage and a cookie (30-day expiry).
 */
export function storeReferralCode(code: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mv-referral', code);
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `mv-referral=${code};expires=${expires.toUTCString()};path=/`;
}

/**
 * Retrieve the stored referral code (checks localStorage first, then cookie).
 */
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  const fromStorage = localStorage.getItem('mv-referral');
  if (fromStorage) return fromStorage;

  const match = document.cookie.match(/(?:^|;\s*)mv-referral=([^;]*)/);
  return match ? match[1] : null;
}

/**
 * Clear the stored referral code from both localStorage and cookie.
 */
export function clearStoredReferralCode(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mv-referral');
  document.cookie = 'mv-referral=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
}

/**
 * Process an order for commission attribution.
 * 1. Check if order has a referralCode
 * 2. Find the instructor with that referralCode
 * 3. Add 25% direct commission to that instructor
 * 4. If that instructor has a parent, add 10% referral commission to parent
 */
export function processOrderCommission(
  orderId: string,
  orderTotal: number,
  referralCode: string | null,
  customerName: string
): Commission[] {
  if (!referralCode) return [];

  const instructorsRaw = localStorage.getItem('mv-instructors');
  if (!instructorsRaw) return [];

  const instructors: Instructor[] = JSON.parse(instructorsRaw);
  const instructor = instructors.find((i) => i.referralCode === referralCode);
  if (!instructor) return [];

  const commissions: Commission[] = [];
  const now = new Date().toISOString();

  // Direct commission (25%)
  const directCommission: Commission = {
    id: crypto.randomUUID(),
    orderId,
    instructorId: instructor.id,
    type: 'direct',
    orderTotal,
    commissionRate: DIRECT_COMMISSION_RATE,
    commissionAmount: orderTotal * DIRECT_COMMISSION_RATE,
    createdAt: now,
  };
  commissions.push(directCommission);

  // Referral commission (10%) for parent instructor
  if (instructor.parentInstructorId) {
    const parentInstructor = instructors.find(
      (i) => i.id === instructor.parentInstructorId
    );
    if (parentInstructor) {
      const referralCommission: Commission = {
        id: crypto.randomUUID(),
        orderId,
        instructorId: parentInstructor.id,
        type: 'referral',
        orderTotal,
        commissionRate: REFERRAL_COMMISSION_RATE,
        commissionAmount: orderTotal * REFERRAL_COMMISSION_RATE,
        createdAt: now,
      };
      commissions.push(referralCommission);
    }
  }

  // Store commissions
  const existingCommissions: Commission[] = JSON.parse(
    localStorage.getItem('mv-commissions') || '[]'
  );
  existingCommissions.push(...commissions);
  localStorage.setItem('mv-commissions', JSON.stringify(existingCommissions));

  // Store sale record
  const existingSales: InstructorSale[] = JSON.parse(
    localStorage.getItem('mv-instructor-sales') || '[]'
  );
  existingSales.push({
    orderId,
    orderTotal,
    type: 'direct',
    createdAt: now,
    customerName,
  });
  localStorage.setItem('mv-instructor-sales', JSON.stringify(existingSales));

  return commissions;
}

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


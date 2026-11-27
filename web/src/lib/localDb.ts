/**
 * Browser-based localStorage client persistence helper for MPKV Rahuri static portal.
 * Safely guards all storage reads/writes for SSR compatibility.
 */

export const DB_KEYS = {
  STUDENT_COMPLAINTS: 'mpkv_student_complaints',
  GRIEVANCE_TICKETS: 'mpkv_grievance_tickets',
  AKMU_QUERIES: 'mpkv_akmu_queries',
  VISITOR_COUNT: 'mpkv_visitor_count',
  VISITOR_SESSION: 'mpkv_visitor_counted_session',
} as const;

export interface StudentComplaintRecord {
  id: string;
  regNo: string;
  studentName: string;
  contact: string;
  collegeName: string;
  degree: string;
  message: string;
  submittedAt: string;
}

export interface GrievanceTicketRecord {
  id: string;
  name: string;
  mobile: string;
  email: string;
  district: string;
  taluka: string;
  department: string;
  category: string;
  comments: string;
  date: string;
}

export interface AkmuQueryRecord {
  id: string;
  name: string;
  department: string;
  message: string;
  submittedAt: string;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getCollection<T>(key: string, fallback: T[] = []): T[] {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function appendRecord<T>(key: string, record: T, maxItems = 25): T[] {
  const existing = getCollection<T>(key, []);
  const next = [record, ...existing].slice(0, maxItems);
  if (isBrowser()) {
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage quota exceeded or restricted; keep in-memory return
    }
  }
  return next;
}

export function clearCollection(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage restriction
  }
}

export function trackLocalVisit(baseCount = 142850): number {
  if (!isBrowser()) return baseCount;
  try {
    const savedRaw = window.localStorage.getItem(DB_KEYS.VISITOR_COUNT);
    let count = savedRaw ? Number.parseInt(savedRaw, 10) : baseCount;
    if (!Number.isFinite(count) || count < baseCount) {
      count = baseCount;
    }

    const alreadyCounted = window.sessionStorage?.getItem(DB_KEYS.VISITOR_SESSION);
    if (!alreadyCounted) {
      count += 1;
      window.localStorage.setItem(DB_KEYS.VISITOR_COUNT, String(count));
      window.sessionStorage?.setItem(DB_KEYS.VISITOR_SESSION, '1');
    }
    return count;
  } catch {
    return baseCount;
  }
}

export function toDevanagariDigits(value: string | number): string {
  const map: Record<string, string> = {
    '0': '०',
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
  };
  return String(value).replace(/[0-9]/g, (d) => map[d] ?? d);
}

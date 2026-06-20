/**
 * يبني دالة `request<T>` الداخلية المسؤولة عن:
 * - بناء الـ URL النهائي (مع query params)
 * - إرفاق هيدرز المصادقة (API Key / Bearer Token)
 * - إعادة المحاولة (retry) عند 429 أو 5xx أو فشل الشبكة
 *
 * هذه الدالة private (مش exported) — بتُستخدم داخليًا فقط من دوال الـ endpoints.
 */
export declare function generateRequestFn(): string[];

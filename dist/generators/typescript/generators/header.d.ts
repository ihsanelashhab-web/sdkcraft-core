import { ApiSpec } from "../../../parsers/openapi-parser";
/**
 * يبني الجزء العلوي من الملف المولَّد:
 * - تعليق الترويسة (اسم الـ API + النسخة)
 * - تعريف BASE_URL
 * - دوال ضبط المصادقة (API Key / Bearer Token)
 */
export declare function generateHeader(spec: ApiSpec): string[];

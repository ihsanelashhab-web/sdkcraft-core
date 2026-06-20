import { ApiSpec } from "../parsers/openapi-parser";
/**
 * يولّد SDK كامل بلغة TypeScript من ApiSpec، ويكتبه في outputDir/index.ts.
 *
 * الترتيب مهم: header (BASE_URL + auth) قبل request() لأنه بيستخدم BASE_URL/_apiKey/_bearerToken،
 * وmodels قبل endpoints لأن دوال الـ endpoints بترجع types معرّفة في الـ models.
 */
export declare function generateTypeScriptSDK(spec: ApiSpec, outputDir: string): void;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypeScriptSDK = generateTypeScriptSDK;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const header_1 = require("./typescript/generators/header");
const models_1 = require("./typescript/generators/models");
const request_1 = require("./typescript/generators/request");
const paginate_1 = require("./typescript/generators/paginate");
const endpoints_1 = require("./typescript/generators/endpoints");
/**
 * يولّد SDK كامل بلغة TypeScript من ApiSpec، ويكتبه في outputDir/index.ts.
 *
 * الترتيب مهم: header (BASE_URL + auth) قبل request() لأنه بيستخدم BASE_URL/_apiKey/_bearerToken،
 * وmodels قبل endpoints لأن دوال الـ endpoints بترجع types معرّفة في الـ models.
 */
function generateTypeScriptSDK(spec, outputDir) {
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    const lines = [
        ...(0, header_1.generateHeader)(spec),
        ...(0, models_1.generateModels)(spec.models),
        ...(0, request_1.generateRequestFn)(),
        ...(0, paginate_1.generatePaginateFn)(),
        ...(0, endpoints_1.generateEndpoints)(spec.endpoints),
    ];
    const outputPath = path_1.default.join(outputDir, "index.ts");
    fs_1.default.writeFileSync(outputPath, lines.join("\n"), "utf-8");
    console.log(`✅ TypeScript SDK generated at: ${outputPath}`);
}

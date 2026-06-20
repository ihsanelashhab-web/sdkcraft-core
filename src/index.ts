// نقطة الدخول الرئيسية لحزمة sdkcraft-core
// أي مشروع (زي server.ts في SDKCraft Cloud) بيستورد من هنا:
// import { parseOpenApi, generateTypeScriptSDK, ... } from "sdkcraft-core";

export { parseOpenApi, ApiSpec, Endpoint, Model, ModelField, Parameter } from "./parsers/openapi-parser";

export { generateTypeScriptSDK } from "./generators/typescript-generator";
export { generatePythonSDK } from "./generators/python-generator";
export { generateDartSDK } from "./generators/dart-generator";
export { generateGoSDK } from "./generators/go-generator";
export { generateJavaSDK } from "./generators/java-generator";
export { generateKotlinSDK } from "./generators/kotlin-generator";

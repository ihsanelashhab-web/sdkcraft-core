"use strict";
// نقطة الدخول الرئيسية لحزمة sdkcraft-core
// أي مشروع (زي server.ts في SDKCraft Cloud) بيستورد من هنا:
// import { parseOpenApi, generateTypeScriptSDK, ... } from "sdkcraft-core";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKotlinSDK = exports.generateJavaSDK = exports.generateGoSDK = exports.generateDartSDK = exports.generatePythonSDK = exports.generateTypeScriptSDK = exports.parseOpenApi = void 0;
var openapi_parser_1 = require("./parsers/openapi-parser");
Object.defineProperty(exports, "parseOpenApi", { enumerable: true, get: function () { return openapi_parser_1.parseOpenApi; } });
var typescript_generator_1 = require("./generators/typescript-generator");
Object.defineProperty(exports, "generateTypeScriptSDK", { enumerable: true, get: function () { return typescript_generator_1.generateTypeScriptSDK; } });
var python_generator_1 = require("./generators/python-generator");
Object.defineProperty(exports, "generatePythonSDK", { enumerable: true, get: function () { return python_generator_1.generatePythonSDK; } });
var dart_generator_1 = require("./generators/dart-generator");
Object.defineProperty(exports, "generateDartSDK", { enumerable: true, get: function () { return dart_generator_1.generateDartSDK; } });
var go_generator_1 = require("./generators/go-generator");
Object.defineProperty(exports, "generateGoSDK", { enumerable: true, get: function () { return go_generator_1.generateGoSDK; } });
var java_generator_1 = require("./generators/java-generator");
Object.defineProperty(exports, "generateJavaSDK", { enumerable: true, get: function () { return java_generator_1.generateJavaSDK; } });
var kotlin_generator_1 = require("./generators/kotlin-generator");
Object.defineProperty(exports, "generateKotlinSDK", { enumerable: true, get: function () { return kotlin_generator_1.generateKotlinSDK; } });

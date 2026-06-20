#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const openapi_parser_1 = require("./parsers/openapi-parser");
const typescript_generator_1 = require("./generators/typescript-generator");
const python_generator_1 = require("./generators/python-generator");
const dart_generator_1 = require("./generators/dart-generator");
const go_generator_1 = require("./generators/go-generator");
const java_generator_1 = require("./generators/java-generator");
const kotlin_generator_1 = require("./generators/kotlin-generator");
const args = process.argv.slice(2);
function getArg(flag) {
    const index = args.indexOf(flag);
    return index !== -1 ? args[index + 1] : undefined;
}
const input = getArg("--input");
const lang = getArg("--lang");
const output = getArg("--output");
const validLangs = ["typescript", "python", "dart", "go", "java", "kotlin", "all"];
if (!input || !lang || !output) {
    console.error("❌ Missing required arguments.\n");
    console.log("Usage: sdkcraft --input <file> --lang <language> --output <dir>");
    console.log("Languages: typescript | python | dart | go | java | kotlin | all");
    process.exit(1);
}
if (!validLangs.includes(lang)) {
    console.error(`❌ Invalid language: "${lang}"`);
    process.exit(1);
}
if (!fs_1.default.existsSync(input)) {
    console.error(`❌ File not found: "${input}"`);
    process.exit(1);
}
function main() {
    try {
        console.log(`\n📂 Reading: ${input}`);
        const spec = (0, openapi_parser_1.parseOpenApi)(input);
        console.log(`📋 API: ${spec.title} v${spec.version}`);
        console.log(`🔗 Base URL: ${spec.baseUrl || "⚠️  Not specified"}`);
        console.log(`📌 Endpoints: ${spec.endpoints.length}\n`);
        if (spec.endpoints.length === 0) {
            console.error("❌ No endpoints found in the OpenAPI file.");
            process.exit(1);
        }
        if (lang === "typescript" || lang === "all")
            (0, typescript_generator_1.generateTypeScriptSDK)(spec, output + "/typescript");
        if (lang === "python" || lang === "all")
            (0, python_generator_1.generatePythonSDK)(spec, output + "/python");
        if (lang === "dart" || lang === "all")
            (0, dart_generator_1.generateDartSDK)(spec, output + "/dart");
        if (lang === "go" || lang === "all")
            (0, go_generator_1.generateGoSDK)(spec, output + "/go");
        if (lang === "java" || lang === "all")
            (0, java_generator_1.generateJavaSDK)(spec, output + "/java");
        if (lang === "kotlin" || lang === "all")
            (0, kotlin_generator_1.generateKotlinSDK)(spec, output + "/kotlin");
        console.log(`\n✨ Done! SDK generated in: ${output}`);
    }
    catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exit(1);
    }
}
main();

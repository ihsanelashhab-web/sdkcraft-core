import fs from "fs";
import path from "path";
import { ApiSpec, Endpoint, Model } from "../parsers/openapi-parser";

function toSwiftType(type: string, nullable: boolean): string {
  const base = type === "number" ? "Double"
    : type === "boolean" ? "Bool"
    : type === "integer" ? "Int"
    : "String";
  return nullable ? "\(base)?" : base;
}

function generateModels(models: Model[]): string[] {
  const lines: string[] = [];
  models.forEach(model => {
    lines.push(`struct ${model.name}: Codable {`);
    model.fields.forEach(field => {
      const type = toSwiftType(field.type, field.nullable || !field.required);
      lines.push(`  let ${field.name}: ${type}`);
    });
    lines.push(`}\n`);
  });
  return lines;
}

export function generateSwiftSDK(spec: ApiSpec, outputDir: string): void {
  fs.mkdirSync(outputDir, { recursive: true });

  const lines: string[] = [];

  lines.push(`// Auto-generated SDK for ${spec.title} v${spec.version}`);
  lines.push(`// Do not edit manually\n`);
  lines.push(`import Foundation\n`);

  // Models
  if (spec.models.length > 0) {
    lines.push(`// ---- Models ----\n`);
    generateModels(spec.models).forEach(l => lines.push(l));
  }

  lines.push(`class ${spec.title.replace(/\s+/g, "")}Client {`);
  lines.push(`  private let baseUrl: String`);
  lines.push(`  private var apiKey: String?`);
  lines.push(`  private var bearerToken: String?\n`);

  lines.push(`  init(baseUrl: String = "${spec.baseUrl}", apiKey: String? = nil, bearerToken: String? = nil) {`);
  lines.push(`    self.baseUrl = baseUrl`);
  lines.push(`    self.apiKey = apiKey`);
  lines.push(`    self.bearerToken = bearerToken`);
  lines.push(`  }\n`);

  lines.push(`  private func request<T: Decodable>(_ method: String, path: String, body: Data? = nil, completion: @escaping (Result<T, Error>) -> Void) {`);
  lines.push(`    guard let url = URL(string: baseUrl + path) else { return }`);
  lines.push(`    var req = URLRequest(url: url)`);
  lines.push(`    req.httpMethod = method`);
  lines.push(`    req.setValue("application/json", forHTTPHeaderField: "Content-Type")`);
  lines.push(`    if let key = apiKey { req.setValue(key, forHTTPHeaderField: "X-API-Key") }`);
  lines.push(`    if let token = bearerToken { req.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization") }`);
  lines.push(`    req.httpBody = body`);
  lines.push(`    URLSession.shared.dataTask(with: req) { data, response, error in`);
  lines.push(`      if let error = error { completion(.failure(error)); return }`);
  lines.push(`      guard let data = data else { return }`);
  lines.push(`      do {`);
  lines.push(`        let decoded = try JSONDecoder().decode(T.self, from: data)`);
  lines.push(`        completion(.success(decoded))`);
  lines.push(`      } catch {`);
  lines.push(`        completion(.failure(error))`);
  lines.push(`      }`);
  lines.push(`    }.resume()`);
  lines.push(`  }\n`);

  // Endpoints
  spec.endpoints.forEach((endpoint: Endpoint) => {
    const fnName = endpoint.operationId;
    const pathParams = endpoint.parameters.filter(p => p.in === "path");
    const returnType = endpoint.responseModel || "Data";

    const args: string[] = [];
    pathParams.forEach(p => {
      args.push(`${p.name}: ${p.type === "integer" ? "Int" : "String"}`);
    });
    if (endpoint.requestBodyModel) {
      args.push(`body: ${endpoint.requestBodyModel}? = nil`);
    }
    args.push(`completion: @escaping (Result<${returnType}, Error>) -> Void`);

    let route = endpoint.route;
    pathParams.forEach(p => {
      route = route.replace(`{${p.name}}`, `\\(${p.name})`);
    });

    lines.push(`  /// ${endpoint.summary}`);
    lines.push(`  func ${fnName}(${args.join(", ")}) {`);
    if (endpoint.requestBody) {
      lines.push(`    let data = body.flatMap { try? JSONEncoder().encode($0) }`);
      lines.push(`    request("${endpoint.method}", path: "${route}", body: data, completion: completion)`);
    } else {
      lines.push(`    request("${endpoint.method}", path: "${route}", completion: completion)`);
    }
    lines.push(`  }\n`);
  });

  lines.push(`}`);

  const outputPath = path.join(outputDir, "SDKClient.swift");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
  console.log(`✅ Swift SDK generated at: ${outputPath}`);
}
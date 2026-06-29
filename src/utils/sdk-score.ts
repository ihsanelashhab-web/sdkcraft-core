import { ApiSpec, Endpoint } from "../parsers/openapi-parser";

export interface ScoreBreakdown {
  total: number;
  grade: string;
  details: {
    category: string;
    score: number;
    maxScore: number;
    message: string;
  }[];
}

export function calculateSDKScore(spec: ApiSpec, rawSpec: any): ScoreBreakdown {
  const details: { category: string; score: number; maxScore: number; message: string }[] = [];
  let total = 0;

  const endpointScore = Math.min(20, spec.endpoints.length * 4);
  total += endpointScore;
  details.push({ category: "Endpoints", score: endpointScore, maxScore: 20, message: spec.endpoints.length + " endpoint(s) found" });

  const withSummary = spec.endpoints.filter((e: Endpoint) => e.summary && e.summary.length > 3).length;
  const descScore = spec.endpoints.length > 0 ? Math.round((withSummary / spec.endpoints.length) * 20) : 0;
  total += descScore;
  details.push({ category: "Documentation", score: descScore, maxScore: 20, message: withSummary + "/" + spec.endpoints.length + " endpoints have descriptions" });

  const hasAuth = !!(rawSpec.components?.securitySchemes || rawSpec.security);
  const authScore = hasAuth ? 20 : 0;
  total += authScore;
  details.push({ category: "Authentication", score: authScore, maxScore: 20, message: hasAuth ? "Security scheme defined" : "No authentication defined" });

  const modelScore = Math.min(20, spec.models.length * 5);
  total += modelScore;
  details.push({ category: "Models", score: modelScore, maxScore: 20, message: spec.models.length + " schema model(s) defined" });

  const withResponse = spec.endpoints.filter((e: Endpoint) => e.responseModel).length;
  const responseScore = spec.endpoints.length > 0 ? Math.round((withResponse / spec.endpoints.length) * 20) : 0;
  total += responseScore;
  details.push({ category: "Response Schemas", score: responseScore, maxScore: 20, message: withResponse + "/" + spec.endpoints.length + " endpoints have response schemas" });

  const grade = total >= 90 ? "A+" : total >= 80 ? "A" : total >= 70 ? "B+" : total >= 60 ? "B" : total >= 50 ? "C" : "D";
  return { total, grade, details };
}

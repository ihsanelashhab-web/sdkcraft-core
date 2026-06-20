export interface Parameter {
    name: string;
    in: string;
    required: boolean;
    type: string;
}
export interface ModelField {
    name: string;
    type: string;
    required: boolean;
    nullable: boolean;
}
export interface Model {
    name: string;
    fields: ModelField[];
}
export interface Endpoint {
    method: string;
    route: string;
    operationId: string;
    summary: string;
    parameters: Parameter[];
    requestBody: string | null;
    requestBodyModel: string | null;
    responseModel: string | null;
    responses: string[];
}
export interface ApiSpec {
    title: string;
    version: string;
    baseUrl: string;
    endpoints: Endpoint[];
    models: Model[];
}
export declare function parseOpenApi(filePath: string): ApiSpec;

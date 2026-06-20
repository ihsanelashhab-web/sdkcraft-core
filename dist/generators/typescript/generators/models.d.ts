import { Model } from "../../../parsers/openapi-parser";
/**
 * يبني قسم الـ Models كامل، بما فيه عنوان القسم لو فيه models.
 * بيرجّع [] لو القائمة فاضية (مفيش داعي لعنوان قسم بدون محتوى).
 */
export declare function generateModels(models: Model[]): string[];

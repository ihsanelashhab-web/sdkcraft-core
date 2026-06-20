"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModels = generateModels;
/**
 * يحوّل قائمة Models إلى TypeScript interfaces.
 */
function buildModelInterface(model) {
    const lines = [];
    lines.push(`export interface ${model.name} {`);
    model.fields.forEach(field => {
        const optional = !field.required ? "?" : "";
        const nullable = field.nullable ? " | null" : "";
        lines.push(`  ${field.name}${optional}: ${field.type}${nullable};`);
    });
    lines.push(`}\n`);
    return lines;
}
/**
 * يبني قسم الـ Models كامل، بما فيه عنوان القسم لو فيه models.
 * بيرجّع [] لو القائمة فاضية (مفيش داعي لعنوان قسم بدون محتوى).
 */
function generateModels(models) {
    if (models.length === 0)
        return [];
    const lines = [`// ---- Models ----\n`];
    models.forEach(model => {
        lines.push(...buildModelInterface(model));
    });
    return lines;
}

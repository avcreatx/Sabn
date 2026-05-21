import { decodeHTML } from 'entities'
/**
 * API leaves human-readable text HTML-encoded.
 * So we decode it at the mapping layer so every payload exposes clean text.
 * Also, Null/undefined pass through untouched to
 * keep call sites concise.
 */
export const decodeEntities = <T extends string | null | undefined>(text: T): T =>
  (typeof text === 'string' ? decodeHTML(text) : text) as T

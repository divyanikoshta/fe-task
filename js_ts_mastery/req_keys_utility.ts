// 1.2 Required Keys Utility Type

// Task:
// Create a utility type RequiredKeys<T> that extracts only the required keys from a given object type. Then implement a function that accepts an object of type T and ensures all RequiredKeys<T> are present and correctly typed.

// Focus: 
// Mapped types, conditional types, type-level computation.

export type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

function validateRequiredKeys<T>(obj: T): RequiredKeys<T>[] {
const requiredKeys = Object.keys(obj).filter(
  key => obj[key as keyof T] !== undefined && obj[key as keyof T] !== null
) as RequiredKeys<T>[];
return requiredKeys;
}
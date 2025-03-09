import * as fs from 'fs/promises';

/**
 * Reads and parses a JSON file asynchronously, converting it into an array of objects.
 *
 * Usage Example:
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   age: number;
 * }
 * const users = await parseJsonFile<User>('data.json');
 * ```
 *
 * @param filePath - The path to the JSON file.
 * @returns A promise resolving to the parsed array of objects or null in case of an error.
 */
export async function parseJsonFile<T>(filePath: string): Promise<T[]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parsedData: T[] = JSON.parse(fileContent);

        return parsedData;
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            throw new Error(`Error: Malformed JSON in file ${filePath}`);
        } else if (error instanceof Error && 'code' in error && (error as any).code === 'ENOENT') {
            throw new Error(`Error: File not found - ${filePath}`);
        } else {
            throw new Error(`Error: Unable to read the file ${filePath}, ${error}`);
        }
    }
}
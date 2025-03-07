import * as fs from 'fs/promises';
import logger from '../logger';
import { parseStringPromise } from 'xml2js';

/**
 * Reads and parses an XML file asynchronously, converting it into an array of objects.
 *
 * Usage Example:
 * ```typescript
 * interface Book {
 *   title: string;
 *   author: string;
 *   price: string;
 * }
 * const books = await parseXmlFile<Book>('books.xml');
 * ```
 *
 * @param filePath - The path to the XML file.
 * @returns A promise resolving to the parsed array of objects or null in case of an error.
 */
export async function parseXmlFile<T>(filePath: string): Promise<T[]> {
    try {
        // Read the file content asynchronously
        const fileContent = await fs.readFile(filePath, 'utf-8');
        // Parse the XML content
        const parsedData = await parseStringPromise(fileContent, { explicitArray: false, explicitRoot: false });
        const data = parsedData.row
        return data as T[]
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            throw new Error(`Error: Malformed XML in file ${filePath}`);
        } else if (error instanceof Error && (error as any).code === 'ENOENT') {
            throw new Error(`Error: File not found - ${filePath}`);
        } else {
            throw new Error(`Error: Unable to read the file ${filePath}, ${error}`);
        }
    }
}

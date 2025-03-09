import * as fs from "fs/promises";
import { parse } from "csv-parse";

export async function readCSVFile<T>(
  filePath: string,
  includeHeader: boolean = false
): Promise<T[]> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return new Promise((resolve, reject) => {
      parse(
        fileContent,
        {
          trim: true,
          skip_empty_lines: true,
        },
        (err, records: string[][]) => {
          if (err) reject(err);
          if (records.length === 0) resolve([]);

          const headers = includeHeader ? records.shift() : records[0];
          if (!headers) resolve([]);

          const result = records.map(row => {
            return headers!.reduce((acc, key, index) => {
              acc[key as keyof T] = row[index] as unknown as T[keyof T];
              return acc;
            }, {} as T);
          });

          resolve(result);
        }
      );
    });
  } catch (error) {
    throw new Error(`Error reading CSV file: ${error}`);
  }
}
import * as fs from "fs/promises";
import { parse } from "csv-parse";
import { stringify as csvStringify } from "csv-stringify";

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
export async function writeCSVFile<T extends Record<string, any>>(
  filePath: string,
  data: T[],
  includeHeader: boolean = false
): Promise<void> {
  try {
    if (data.length === 0) {
      throw new Error("No data to write");
    }

    const headers = Object.keys(data[0]); // Extract headers from first object

    const csvContent = await new Promise<string>((resolve, reject) => {
      csvStringify(
        data.map((obj) => headers.map((header) => obj[header] ?? "")), // Ensure values are properly mapped
        { header: includeHeader, columns: headers },
        (err, output) => {
          if (err) return reject(err);
          resolve(output);
        }
      );
    });

    await fs.writeFile(filePath, csvContent, "utf-8");
  } catch (error) {
    throw new Error(`Error writing CSV file: ${error}`);
  }
}
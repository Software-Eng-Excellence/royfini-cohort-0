import { promises as fs } from "fs";
import { parse as csvParse } from "csv-parse";

export async function readCSVFile(
  filePath: string,
  includeHeader: boolean = false
): Promise<string[][]> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return new Promise((resolve, reject) => {
      csvParse(
        fileContent,
        {
          trim: true,
          skip_empty_lines: true,
        },
        (err, records: string[][]) => {
          if (err) reject(err);
          if (!includeHeader) records.shift();
          resolve(records);
        }
      );
    });
  } catch (error) {
    throw new Error(`Error reading CSV file: ${error}`);
  }
}

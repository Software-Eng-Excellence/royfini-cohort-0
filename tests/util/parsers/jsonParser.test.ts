import * as fs from 'fs/promises';
import { parseJsonFile } from "../../../src/util/parsers/jsonParser"

// Mock fs.readFile to simulate different scenarios
jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
}));

describe('parseJsonFile', () => {
    const mockFilePath = 'mockData.json';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return parsed data when the file is read successfully', async () => {
        const mockData = [{ id: 1, name: 'John', age: 30 }];

        // Mock fs.readFile to return valid JSON content
        (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

        const result = await parseJsonFile<typeof mockData[0]>(mockFilePath);

        expect(result).toEqual(mockData);
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it('should throw an error when the file is not found (ENOENT error)', async () => {
        const mockError = new Error('File not found');
        (mockError as any).code = 'ENOENT';

        // Mock fs.readFile to simulate ENOENT error
        (fs.readFile as jest.Mock).mockRejectedValueOnce(mockError);

        await expect(parseJsonFile(mockFilePath)).rejects.toThrowError(
            `Error: File not found - ${mockFilePath}`
        );
    });

    it('should throw an error when the file content is malformed JSON', async () => {
        const mockError = new SyntaxError('Unexpected token');

        // Mock fs.readFile to simulate malformed JSON
        (fs.readFile as jest.Mock).mockResolvedValueOnce('invalid json');

        await expect(parseJsonFile(mockFilePath)).rejects.toThrowError(
            `Error: Malformed JSON in file ${mockFilePath}`
        );
    });

    it('should throw an error when an unexpected error occurs', async () => {
        const mockError = new Error('Unexpected error');

        // Mock fs.readFile to simulate an unexpected error
        (fs.readFile as jest.Mock).mockRejectedValueOnce(mockError);

        await expect(parseJsonFile(mockFilePath)).rejects.toThrowError(
            `Error: Unable to read the file ${mockFilePath}, ${mockError}`
        );
    });
});

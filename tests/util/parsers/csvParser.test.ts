import * as fs from 'fs/promises';
import { parse } from 'csv-parse';
import { readCSVFile } from '../../../src/util/parsers/csvParser';

jest.mock('fs/promises');
jest.mock('csv-parse', () => ({
    parse: jest.fn(),
}));

describe('readCSVFile', () => {
    const mockCsv = 'name,age\nAlice,30\nBob,25';
    const mockParsedData = [
        ['name', 'age'],
        ['Alice', '30'],
        ['Bob', '25']
    ];

    it('should parse CSV file and return an array of objects', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockCsv);
        (parse as jest.Mock).mockImplementation((input, options, callback) => {
            callback(null, mockParsedData);
        });

        const result = await readCSVFile<{ name: string; age: string }>('test.csv', true);

        expect(fs.readFile).toHaveBeenCalledWith('test.csv', 'utf-8');
        expect(parse).toHaveBeenCalled();
        expect(result).toEqual([
            { name: 'Alice', age: '30' },
            { name: 'Bob', age: '25' }
        ]);
    });

    it('should return an empty array if the CSV file is empty', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('');
        (parse as jest.Mock).mockImplementation((input, options, callback) => {
            callback(null, []);
        });

        const result = await readCSVFile<{ name: string; age: string }>('empty.csv');
        expect(result).toEqual([]);
    });

    it('should handle file not found error', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });

        await expect(readCSVFile('test.csv')).rejects.toThrow('Error reading CSV file');
    });

    it('should handle CSV parsing errors', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockCsv);
        (parse as jest.Mock).mockImplementation((input, options, callback) => {
            callback(new Error('Parsing error'), null);
        });

        await expect(readCSVFile('test.csv')).rejects.toThrow('Parsing error');
    });
});

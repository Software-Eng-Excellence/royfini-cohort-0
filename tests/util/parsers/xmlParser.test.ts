import * as fs from 'fs/promises';
import { parseStringPromise } from 'xml2js';
import { parseXmlFile } from '../../../src/util/parsers/xmlParser';

jest.mock('fs/promises');
jest.mock('xml2js', () => ({
    parseStringPromise: jest.fn(),
}));

describe('parseXmlFile', () => {
    const mockXml = `
    <data>
      <row>
        <title>Book Title</title>
        <author>Author Name</author>
        <price>20</price>
      </row>
      <row>
        <title>Another Book</title>
        <author>Another Author</author>
        <price>25</price>
      </row>
    </data>`;

    const mockParsedData = {
        row: [
            { title: 'Book Title', author: 'Author Name', price: '20' },
            { title: 'Another Book', author: 'Another Author', price: '25' }
        ]
    };

    it('should parse XML file and return an array of objects', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockXml);
        (parseStringPromise as jest.Mock).mockResolvedValue(mockParsedData);

        const result = await parseXmlFile('test.xml');

        expect(fs.readFile).toHaveBeenCalledWith('test.xml', 'utf-8');
        expect(parseStringPromise).toHaveBeenCalledWith(mockXml, { explicitArray: false, explicitRoot: false });
        expect(result).toEqual(mockParsedData.row);
    });

    it('should handle file not found error', async () => {
        const mockError = new Error('File not found');
        (mockError as any).code = 'ENOENT';

        (fs.readFile as jest.Mock).mockRejectedValueOnce(mockError);

        await expect(parseXmlFile('test.xml')).rejects.toThrow('Error: File not found - test.xml');
    });

    it('should handle malformed XML error', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockXml);
        (parseStringPromise as jest.Mock).mockRejectedValue(new SyntaxError());

        await expect(parseXmlFile('test.xml')).rejects.toThrow('Error: Malformed XML in file test.xml');
    });

    it('should handle unexpected errors', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

        await expect(parseXmlFile('test.xml')).rejects.toThrow('Error: Unable to read the file test.xml, Error: Unexpected error');
    });
});

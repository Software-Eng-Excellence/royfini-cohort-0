import { BookRepository } from "../../../src/repository/postgresql/Book.order.repository";
import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiableBook } from "../../../src/models/Book.model";
import { PostgreSqlBookMapper } from "../../../src/mappers/BookMapper";

jest.mock("../../../src/repository/postgresql/ConnectionManager");
jest.mock("../../../src/mappers/BookMapper");

const mockClient = {
    query: jest.fn(),
};

describe("BookRepository", () => {
    let repo: BookRepository;

    const mockBook = {
        getId: jest.fn(() => "book-123"),
        getBookTitle: jest.fn(() => "My Book"),
        getAuthor: jest.fn(() => "John Doe"),
        getGenre: jest.fn(() => "Fiction"),
        getFormat: jest.fn(() => "Hardcover"),
        getLanguage: jest.fn(() => "English"),
        getPublisher: jest.fn(() => "BookHouse"),
        getSpecialEdition: jest.fn(() => "No"),
        getPackaging: jest.fn(() => "Boxed"),
    } as unknown as IdentifiableBook;

    beforeEach(() => {
        (ConnectionManager.getConnection as jest.Mock).mockResolvedValue(mockClient);
        repo = new BookRepository();
        mockClient.query.mockReset();
    });

    test("should create a book", async () => {
        await repo.create(mockBook);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO"), [
            "book-123",
            "My Book",
            "John Doe",
            "Fiction",
            "Hardcover",
            "English",
            "BookHouse",
            "No",
            "Boxed",
        ]);
    });

    test("should get a book by id", async () => {
        const dbResult = {
            rows: [{
                id: "book-123",
                bookTitle: "My Book",
                author: "John Doe",
                genre: "Fiction",
                format: "Hardcover",
                language: "English",
                publisher: "BookHouse",
                specialEdition: "No",
                packaging: "Boxed",
            }],
        };
        mockClient.query.mockResolvedValue(dbResult);

        const mockMapper = {
            map: jest.fn().mockReturnValue(mockBook),
        };
        (PostgreSqlBookMapper as jest.Mock).mockImplementation(() => mockMapper);

        const result = await repo.get("book-123");

        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("WHERE id = $1"), ["book-123"]);
        expect(result).toBe(mockBook);
    });

    test("should throw ItemNotFoundException if book not found", async () => {
        mockClient.query.mockResolvedValue({ rows: [] });

        await expect(repo.get("nonexistent-id")).rejects.toThrow(ItemNotFoundException);
    });

    test("should get all books", async () => {
        const dbResult = {
            rows: [/* multiple rows here */],
        };
        mockClient.query.mockResolvedValue(dbResult);

        const mockMapper = {
            map: jest.fn().mockReturnValue(mockBook),
        };
        (PostgreSqlBookMapper as jest.Mock).mockImplementation(() => mockMapper);

        const result = await repo.getAll();

        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM"));
        expect(result.length).toBe(dbResult.rows.length);
    });

    test("should update a book", async () => {
        await repo.update(mockBook);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), [
            "My Book",
            "John Doe",
            "Fiction",
            "Hardcover",
            "English",
            "BookHouse",
            "No",
            "Boxed",
            "book-123",
        ]);
    });

    test("should delete a book by id", async () => {
        await repo.delete("book-123");
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE"), ["book-123"]);
    });
});

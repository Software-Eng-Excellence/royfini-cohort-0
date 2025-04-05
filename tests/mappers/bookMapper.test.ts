import { JSONBookMapper, PostgreSqlBook, PostgreSqlBookMapper } from "../../src/mappers/BookMapper";
import { Book } from "../../src/models/Book.model";
import { BookBuilder, IdentifiableBookBuilder } from "../../src/models/builders/book.builder";
import { BookOrder } from "../../src/models/json/bookOrder";

describe("Book Mapper", () => {
  let bookMapper: JSONBookMapper;
  bookMapper = new JSONBookMapper();
  const mockData = {
    "Order ID": 2007,
    "Book Title": "Echoes of Silence",
    Author: "Ernest Hemingway",
    Genre: "Fantasy",
    Format: "Audiobook",
    Language: "Spanish",
    Publisher: "Macmillan Publishers",
    "Special Edition": "None",
    Packaging: "Eco-Friendly Packaging",
    Price: "16",
    Quantity: "4",
  };
  const mapper = new PostgreSqlBookMapper();

  const dbBook: PostgreSqlBook = {
    id: 'book-001',
    booktitle: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    format: 'Hardcover',
    language: 'English',
    publisher: 'Scribner',
    specialedition: 'First Edition',
    packaging: 'Box'
  };

  it("should create Book model", () => {
    const data = bookMapper.map(mockData as BookOrder);
    expect(data).toBeInstanceOf(Book);
    expect(data).toBeDefined();
    expect(data).toMatchObject({
      bookTitle: "Echoes of Silence",
      author: "Ernest Hemingway",
      genre: "Fantasy",
      format: "Audiobook",
      language: "Spanish",
      publisher: "Macmillan Publishers",
      specialEdition: "None",
      packaging: "Eco-Friendly Packaging",
    });
  });
  it("should throw an error when required fields are missing", () => {
    const incompleteData = {
      "Book Title": "Echoes of Silence",
      Author: "Ernest Hemingway",
      // Missing Genre, Format, and other required fields
    } as unknown as BookOrder;

    expect(() => bookMapper.map(incompleteData)).toThrowError();
  });
  it('should map PostgreSqlBook to IdentifiableBook', () => {
    const result = mapper.map(dbBook);

    expect(result.getId()).toBe(dbBook.id);
    expect(result.getBookTitle()).toBe(dbBook.booktitle);
    expect(result.getAuthor()).toBe(dbBook.author);
    expect(result.getGenre()).toBe(dbBook.genre);
    expect(result.getFormat()).toBe(dbBook.format);
    expect(result.getLanguage()).toBe(dbBook.language);
    expect(result.getPublisher()).toBe(dbBook.publisher);
    expect(result.getSpecialEdition()).toBe(dbBook.specialedition);
    expect(result.getPackaging()).toBe(dbBook.packaging);
  });

  it('should reverseMap IdentifiableBook to PostgreSqlBook', () => {
    const book = BookBuilder.newBuilder()
      .setBookTitle(dbBook.booktitle)
      .setAuthor(dbBook.author)
      .setGenre(dbBook.genre)
      .setFormat(dbBook.format)
      .setLanguage(dbBook.language)
      .setPublisher(dbBook.publisher)
      .setSpecialEdition(dbBook.specialedition)
      .setPackaging(dbBook.packaging)
      .build();

    const identifiableBook = IdentifiableBookBuilder.newBuilder()
      .setId(dbBook.id)
      .setBook(book)
      .build();

    const result = mapper.reverseMap(identifiableBook);

    expect(result).toEqual(dbBook);
  });
})

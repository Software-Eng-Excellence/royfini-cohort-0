import { BookBuilder, IdentifiableBookBuilder } from "../../../src/models/builders/book.builder";
import { Book, IdentifiableBook } from "../../../src/models/Book.model";

describe("BookBuilder", () => {
  let bookBuilder: BookBuilder;
  beforeAll(() => {
    bookBuilder = new BookBuilder();
  });
  it("should build Book if all data are set", () => {
    const randomBook = bookBuilder
      .setBookTitle("The Great Gatsby")
      .setAuthor("F. Scott")
      .setGenre("Classic")
      .setFormat("Hardcover")
      .setLanguage("English")
      .setPublisher("Scriber")
      .setSpecialEdition("Collector's Edition")
      .setPackaging("Gift Box")
      .build();
    expect(randomBook).toBeDefined();
    expect(randomBook).toBeInstanceOf(Book);
    expect(randomBook).toMatchObject({
      bookTitle: "The Great Gatsby",
      author: "F. Scott",
      genre: "Classic",
      format: "Hardcover",
      language: "English",
      publisher: "Scriber",
      specialEdition: "Collector's Edition",
      packaging: "Gift Box",
    });
  });
  it("should throw an error if not all data are set", () => {
    expect(() => BookBuilder.newBuilder()
      .setSpecialEdition("Collector's Edition")
      .setPackaging("Gift Box")
      .build()).toThrow("Missing required properties");
  });
  const mockBook = {
    getBookTitle: jest.fn(() => 'The Pragmatic Programmer'),
    getAuthor: jest.fn(() => 'Andrew Hunt'),
    getGenre: jest.fn(() => 'Software Development'),
    getFormat: jest.fn(() => 'Hardcover'),
    getLanguage: jest.fn(() => 'English'),
    getPublisher: jest.fn(() => 'Addison-Wesley'),
    getSpecialEdition: jest.fn(() => '20th Anniversary Edition'),
    getPackaging: jest.fn(() => 'Shrink Wrap'),
  } as unknown as Book;

  it('should build an IdentifiableBook with all properties', () => {
    const book = IdentifiableBookBuilder
      .newBuilder()
      .setId('book-001')
      .setBook(mockBook)
      .build();

    expect(book).toBeInstanceOf(IdentifiableBook);
    expect(book.getId()).toBe('book-001');
    expect(book.getBookTitle()).toBe('The Pragmatic Programmer');
    expect(book.getAuthor()).toBe('Andrew Hunt');
    expect(book.getGenre()).toBe('Software Development');
    expect(book.getFormat()).toBe('Hardcover');
    expect(book.getLanguage()).toBe('English');
    expect(book.getPublisher()).toBe('Addison-Wesley');
    expect(book.getSpecialEdition()).toBe('20th Anniversary Edition');
    expect(book.getPackaging()).toBe('Shrink Wrap');
  });

  it('should throw error if id is missing', () => {
    expect(() => {
      IdentifiableBookBuilder
        .newBuilder()
        .setBook(mockBook)
        .build();
    }).toThrowError('Missing required properties');
  });

  it('should throw error if book is missing', () => {
    expect(() => {
      IdentifiableBookBuilder
        .newBuilder()
        .setId('book-002')
        .build();
    }).toThrowError('Missing required properties');
  });
});

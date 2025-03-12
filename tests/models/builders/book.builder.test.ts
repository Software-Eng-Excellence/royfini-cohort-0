import { BookBuilder } from "../../../src/models/builders/book.builder";
import { Book } from "../../../src/models/Book.model";

describe("BookBuilder", () => {
  let bookBuilder: BookBuilder;
  beforeEach(() => {
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
    expect(()=>bookBuilder
      .setSpecialEdition("Collector's Edition")
      .setPackaging("Gift Box")
      .build()).toThrow("Missing required properties");
  });
  it("should allow chaining method", () => {
    bookBuilder
      .setSpecialEdition("Collector's Edition")
      .setPackaging("Gift Box");
    expect(bookBuilder).toBeInstanceOf(BookBuilder);
  });
});

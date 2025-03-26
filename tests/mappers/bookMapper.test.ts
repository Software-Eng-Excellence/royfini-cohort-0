import { JSONBookMapper } from "../../src/mappers/BookMapper";
import { Book } from "../../src/models/Book.model";
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
});

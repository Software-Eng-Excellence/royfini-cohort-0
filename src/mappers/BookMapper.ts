import { Book } from "../models/Book.model";
import { BookBuilder } from "../models/builders/book.builder";
import { BookOrder } from "../models/json/bookOrder";
import { IMapper } from "./IMapper";

export class JSONBookMapper implements IMapper<BookOrder, Book> {
  map(data: BookOrder): Book {
    return BookBuilder.newBuilder()
      .setBookTitle(data["Book Title"])
      .setAuthor(data.Author)
      .setGenre(data.Genre)
      .setFormat(data.Format)
      .setLanguage(data.Language)
      .setPublisher(data.Publisher)
      .setSpecialEdition(data["Special Edition"])
      .setPackaging(data.Packaging)
      .build();
  }
}

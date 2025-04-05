import { Book, IdentifiableBook } from "../models/Book.model";
import { BookBuilder, IdentifiableBookBuilder } from "../models/builders/book.builder";
import { BookOrder } from "../models/json/bookOrder";
import { IMapper } from "./IMapper";

export class JSONBookMapper implements IMapper<BookOrder, Book> {
  reverseMap(data: Book): BookOrder {
    throw new Error("Method not implemented.");
  }
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
export interface PostgreSqlBook {
  id: string,
  booktitle: string,
  author: string,
  genre: string,
  format: string,
  language: string,
  publisher: string,
  specialedition: string,
  packaging: string
}
export class PostgreSqlBookMapper implements IMapper<PostgreSqlBook, IdentifiableBook> {
  map(data: PostgreSqlBook): IdentifiableBook {
    return IdentifiableBookBuilder.newBuilder().setBook(
      BookBuilder.newBuilder().setAuthor(data.author).setBookTitle(data.booktitle).setGenre(data.genre).setFormat(data.format).setLanguage(data.language).setPublisher(data.publisher).setSpecialEdition(data.specialedition).setPackaging(data.packaging).build()
    ).setId(data.id).build()
  }
  reverseMap(data: IdentifiableBook): PostgreSqlBook {
    return {
      id: data.getId(),
      booktitle: data.getBookTitle(),
      author: data.getAuthor(),
      genre: data.getGenre(),
      format: data.getFormat(),
      language: data.getLanguage(),
      publisher: data.getPublisher(),
      specialedition: data.getSpecialEdition(),
      packaging: data.getPackaging()
    }
  }

}

import { Book } from "../Book.model";

export class BookBuilder {
  private bookTitle!: string;
  private author!: string;
  private genre!: string;
  private format!: string;
  private language!: string;
  private publisher!: string;
  private specialEdition!: string;
  private packaging!: string;

  public static newBuilder(): BookBuilder {
    return new BookBuilder();
  }

  setBookTitle(bookTitle: string): this {
    this.bookTitle = bookTitle;
    return this;
  }

  setAuthor(author: string): this {
    this.author = author;
    return this;
  }

  setGenre(genre: string): this {
    this.genre = genre;
    return this;
  }

  setFormat(format: string): this {
    this.format = format;
    return this;
  }

  setLanguage(language: string): this {
    this.language = language;
    return this;
  }

  setPublisher(publisher: string): this {
    this.publisher = publisher;
    return this;
  }

  setSpecialEdition(specialEdition: string): this {
    this.specialEdition = specialEdition;
    return this;
  }

  setPackaging(packaging: string): this {
    this.packaging = packaging;
    return this;
  }

  build(): Book {
    const requiredProperties = [
      this.bookTitle,
      this.author,
      this.genre,
      this.format,
      this.language,
      this.publisher,
      this.specialEdition,
      this.packaging,
    ];

    if (
      requiredProperties.some(
        (prop) => prop === undefined || prop === null || prop === ""
      )
    ) {
      console.error("Missing required properties, could not build Book");
      throw new Error("Missing required properties");
    }

    return new Book(
      this.bookTitle,
      this.author,
      this.genre,
      this.format,
      this.language,
      this.publisher,
      this.specialEdition,
      this.packaging
    );
  }
}

import { ItemCategory } from "../../models/IItem";
import {
    DbException,
    InitializationException,
    ItemNotFoundException,
} from "../../util/exceptions/repositoryExceptions";
import { id, Initializable, IRepository } from "../IRepository";
import { ConnectionManager } from "./ConnectionManager";
import { IdentifiableBook } from "models/Book.model";
import { PostgreSqlBook, PostgreSqlBookMapper } from "mappers/BookMapper";
const tableName = ItemCategory.BOOK;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id TEXT PRIMARY KEY,
    bookTitle TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    format TEXT NOT NULL,
    language TEXT NOT NULL,
    publisher TEXT NOT NULL,
    specialEdition TEXT NOT NULL,
    packaging TEXT NOT NULL,)`;
const INSERT_BOOK = `INSERT INTO ${tableName} (
      id, bookTitle ,
    author ,
    genre ,
    format ,
    language,
    publisher ,
    specialEdition ,
    packaging 
  ) 
  VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;
const SELECT_ALL = `SELECT * FROM ${tableName}`;
const UPDATE_ID = `UPDATE ${tableName} SET bookTitle = $1 , author = $2, genre = $3, format = $4, language = $5, publisher = $6, specialEdition = $7, 
    packaging = $8`;
const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;
export class BookRepository
    implements IRepository<IdentifiableBook>, Initializable {
    async init(): Promise<void> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            client.query(CREATE_TABLE);
        } catch (error) {
            throw new InitializationException(
                "Failed to initialize Order table",
                error as Error
            );
        }
    }
    async create(item: IdentifiableBook): Promise<id> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            client.query(INSERT_BOOK, [
                item.getId(),
                item.getBookTitle(),
                item.getAuthor(),
                item.getGenre(),
                item.getFormat(),
                item.getLanguage(),
                item.getPublisher(),
                item.getSpecialEdition(),
                item.getPackaging(),
            ]);
            return item.getId();
        } catch (error) {
            throw new DbException("Failed to create order", error as Error);
        }
    }
    async get(id: id): Promise<IdentifiableBook> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlBook>(SELECT_BY_ID, [id]);
            if (result.rows.length == 0) {
                throw new ItemNotFoundException("Book of id" + id + "not found");
            }
            const res = result.rows[0];
            return new PostgreSqlBookMapper().map(res);
        } catch (error) {
            if (error instanceof ItemNotFoundException) {
                throw error;  // Let it propagate as expected
            }
            throw new DbException("Failed to get Book of id" + id, error as Error);
        }
    }
    async getAll(): Promise<IdentifiableBook[]> {
        let client;
        try {
            client = await ConnectionManager.getConnection();
            const result = await client.query<PostgreSqlBook>(SELECT_ALL);
            const res = result.rows;
            const mapper = new PostgreSqlBookMapper();
            return res.map((book) => mapper.map(book));
        } catch (error) {
            throw new DbException("Failed to get all book", error as Error);
        }
    }
    async update(item: IdentifiableBook): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(UPDATE_ID, [
                item.getBookTitle(),
                item.getAuthor(),
                item.getGenre(),
                item.getFormat(),
                item.getLanguage(),
                item.getPublisher(),
                item.getSpecialEdition(),
                item.getPackaging(),
                item.getId(),
            ]);
        } catch (error) {
            throw new DbException(
                "Failed to update Book of id" + item.getId(),
                error as Error
            );
        }
    }
    async delete(id: id): Promise<void> {
        try {
            const client = await ConnectionManager.getConnection();
            await client.query(DELETE_ID, [id]);
        } catch (error) {
            throw new DbException("Failed to delete Book of id" + id, error as Error);
        }
    }
}

import { InvalidItemException } from "../util/exceptions/repositoryExceptions";

export type id = string;

export interface ID {
  getId(): string;
}

export interface Initializable {
  /**
   * init - Initializes the creation of required tables and establishes a connection
   *
   * @throws InitializationException - If the initialization process fails
   *
   * @returns A promise that resolves when the initialization is complete
   */
  init(): Promise<void>;
}

export interface IRepository<T extends ID> {
  /**
   * Create a new item in the repository
   *
   * @template T - the Type of items managed by the repository, which extends ID
   *
   * @throws {InvalidItemException} - Thrown when an invalid item is encountered
   * @throws {DbException} - Thrown when an error occurs while interacting with the database
   */
  create(item: T): Promise<id>;

  // throw an error if item not found
  get(id: id): Promise<T>;
  getAll(): Promise<T[]>;

  //throw item not found || invalid item
  update(item: T): Promise<void>;

  //throw item not found
  delete(id: id): Promise<void>;
}

export interface InitializableRepository<T extends ID>
  extends IRepository<T>,
    Initializable {}

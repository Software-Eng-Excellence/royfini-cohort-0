import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { DbException, InitializationException } from "../../../src/util/exceptions/repositoryExceptions";
import { OrderRepository } from "../../../src/repository/postgresql/Order.repository";
import { CakeRepository } from "../../../src/repository/postgresql/Cake.order.repository";
import { IIdentifiableOrderItem } from "../../../src/models/IOrder";
import { ItemCategory } from "../../../src/models/IItem";
import { IdentifiableCake } from "../../../src/models/Cake.model";

describe("OrderRepository", () => {
  let repository: OrderRepository;
  let mockClient: { query: jest.Mock; release: jest.Mock };
  let cakeRepository: jest.Mocked<CakeRepository>;

  beforeEach(() => {
    cakeRepository = {
      create: jest.fn().mockResolvedValue("mock-item-id"),
      init: jest.fn().mockResolvedValue(void 0),
      get: jest.fn().mockResolvedValue(new IdentifiableCake(
        "12345", // ID
        "Birthday", // Type
        "Chocolate", // Flavor
        "Vanilla Cream", // Filling
        8, // Size (in inches)
        2, // Layers
        "Buttercream", // Frosting Type
        "Chocolate", // Frosting Flavor
        "Sprinkles", // Decoration Type
        "Rainbow", // Decoration Color
        "Happy Birthday!", // Custom Message
        "Round", // Shape
        "Nuts", // Allergies
        "Organic Cocoa", // Special Ingredients
        "Box" // Packaging Type
      )),
      update: jest.fn().mockResolvedValue(void 0),
      delete: jest.fn().mockResolvedValue(void 0)
    } as unknown as jest.Mocked<CakeRepository>;
    repository = new OrderRepository(cakeRepository);
    mockClient = { query: jest.fn(), release: jest.fn() };
    ConnectionManager.getConnection = jest.fn().mockResolvedValue(mockClient);
  });

  test("init() should create the table", async () => {
    await repository.init();
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE IF NOT EXISTS"));
  });

  test("create() should insert an order", async () => {
    const mockOrder: IIdentifiableOrderItem = {
      getId: jest.fn().mockReturnValue("order-123"),
      getQuantity: jest.fn().mockReturnValue(5),
      getPrice: jest.fn().mockReturnValue(100),
      getItems: jest.fn().mockReturnValue({ getCategory: jest.fn().mockReturnValue("Electronics") }),
    };

    const result = await repository.create(mockOrder);

    expect(cakeRepository.create).toHaveBeenCalledWith(mockOrder.getItems());
    expect(mockClient.query).toHaveBeenCalledWith("BEGIN TRANSACTION");
    expect(mockClient.query).toHaveBeenCalledWith(expect.any(String), [
      "order-123",
      5,
      100,
      "Electronics",
      "mock-item-id",
    ]);
    expect(mockClient.query).toHaveBeenCalledWith("COMMIT");
    expect(result).toBe("order-123");
  });

  test("create() should rollback transaction on failure", async () => {
    mockClient.query.mockImplementation((query) => {
      if (query.startsWith("INSERT INTO")) throw new Error("Insert Error");
    });
    const mockOrder = {
      getId: () => "order123",
      getQuantity: () => 10,
      getPrice: () => 200,
      getItems: () => ({ getCategory: () => "Electronics", getId: () => "item456" })
    } as unknown as IIdentifiableOrderItem;
    await expect(repository.create(mockOrder)).rejects.toThrow(DbException);
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
  });

  test("get() should return an order when found", async () => {
    mockClient.query.mockResolvedValue({ rows: [{ id: "order123", quantity: 10, price: 200, item_category: "Electronics", item_id: "item456" }] });
    const order = await repository.get("order123");
    expect(order).toBeDefined();
  });

  test("get() should throw DbException when order not found", async () => {
    mockClient.query.mockResolvedValue({ rows: [] });
    await expect(repository.get("order123")).rejects.toThrow(DbException);
  });

  test("update() should update an order", async () => {
    await repository.update({
      getId: () => "order123",
      getQuantity: () => 20,
      getPrice: () => 400,
      getItems: () => ({ getCategory: () => ItemCategory.CAKE, getId: () => "item456" })
    });
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), expect.any(Array));
  });

  test("update() should rollback transaction on failure", async () => {
    mockClient.query.mockImplementation((query) => {
      if (query.startsWith("UPDATE")) throw new Error("Update Error");
    });
    await expect(repository.update({
      getId: () => "order123",
      getQuantity: () => 20,
      getPrice: () => 400,
      getItems: () => ({ getCategory: () => ItemCategory.CAKE, getId: () => "item456" })
    })).rejects.toThrow(DbException);
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
  });

  test("delete() should delete an order", async () => {
    await repository.delete("order123");
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM"), ["order123"]);
  });

  test("delete() should rollback transaction on failure", async () => {
    mockClient.query.mockImplementation((query) => {
      if (query.startsWith("DELETE")) throw new Error("Delete Error");
    });
    await expect(repository.delete("order123")).rejects.toThrow(DbException);
    expect(mockClient.query).toHaveBeenCalledWith("ROLLBACK");
  });
});

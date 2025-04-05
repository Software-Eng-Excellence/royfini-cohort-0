import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { CakeRepository } from "../../../src/repository/postgresql/Cake.order.repository";
import { InitializationException, ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiableCake } from "../../../src/models/Cake.model";

describe("CakeRepository", () => {
  let repository: CakeRepository;
  let mockClient: { query: jest.Mock; release: jest.Mock };

  beforeEach(() => {
    repository = new CakeRepository();
    mockClient = { query: jest.fn(), release: jest.fn() };
    ConnectionManager.getConnection = jest.fn().mockResolvedValue(mockClient);
  });

  test("init() should create the table", async () => {
    await repository.init();
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE IF NOT EXISTS"));
  });

  test("create() should insert a cake", async () => {
    const mockCake = {
      getId: () => "cake123",
      getType: () => "Chocolate",
      getFlavor: () => "Dark",
      getFilling: () => "Vanilla",
      getSize: () => 10,
      getLayers: () => 2,
      getFrostingType: () => "Buttercream",
      getFrostingFlavor: () => "Chocolate",
      getDecorationType: () => "Sprinkles",
      getDecorationColor: () => "Red",
      getCustomMessage: () => "Happy Birthday",
      getShape: () => "Round",
      getAllergies: () => "Nuts",
      getSpecialIngredients: () => "Organic Cocoa",
      getPackagingType: () => "Box",
    } as IdentifiableCake;
    await repository.create(mockCake);
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO"), expect.any(Array));
  });

  test("get() should return a cake when found", async () => {
    mockClient.query.mockResolvedValue({
      rows: [{
        id: "cake123",
        type: "Chocolate",
        flavor: "Dark",
        filling: "Vanilla",
        size: 10,
        layers: 2,
        frostingtype: "Buttercream",
        frostingflavor: "Chocolate",
        decorationtype: "Sprinkles",
        decorationcolor: "Red",
        custommessage: "Happy Birthday",
        shape: "Round",
        allergies: "Nuts",
        specialingredients: "Organic Cocoa",
        packagingtype: "Box",
      }]
    });
    const cake = await repository.get("cake123");
    expect(cake).toBeDefined();
  });

  test("get() should throw ItemNotFoundException when not found", async () => {
    mockClient.query.mockResolvedValue({ rows: [] });
    await expect(repository.get("cake123")).rejects.toThrow(ItemNotFoundException);
  });

  test("update() should update the cake", async () => {
    await repository.update({
      getId: () => "cake123",
      getType: () => "Vanilla",
      getFlavor: () => "Dark",
      getFilling: () => "Strawberry",
      getSize: () => 12,
      getLayers: () => 3,
      getFrostingType: () => "Whipped Cream",
      getFrostingFlavor: () => "Chocolate",
      getDecorationType: () => "Choco Chips",
      getDecorationColor: () => "Brown",
      getCustomMessage: () => "Congrats!",
      getShape: () => "Heart",
      getAllergies: () => "Egg",
      getSpecialIngredients: () => "Vanilla Extract",
      getPackagingType: () => "Plastic Wrap",
    } as IdentifiableCake);
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), expect.any(Array));
  });

  test("delete() should delete the cake", async () => {
    await repository.delete("cake123");
    expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM"), ["cake123"]);
  });
});

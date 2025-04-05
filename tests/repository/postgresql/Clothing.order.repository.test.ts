import { ClothingRepository } from "../../../src/repository/postgresql/Clothing.order.repository";
import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiableClothing } from "../../../src/models/Clothing.model";

describe("ClothingRepository", () => {
    let repository: ClothingRepository;
    let mockClient: { query: jest.Mock; release: jest.Mock };

    beforeEach(() => {
        repository = new ClothingRepository();
        mockClient = { query: jest.fn(), release: jest.fn() };
        ConnectionManager.getConnection = jest.fn().mockResolvedValue(mockClient);
    });

    test("init() should create the table", async () => {
        await repository.init();
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE IF NOT EXISTS"));
    });

    test("create() should insert a clothing item", async () => {
        const mockClothing = {
            getId: () => "cloth001",
            getClothingType: () => "T-Shirt",
            getSize: () => "M",
            getColor: () => "Red",
            getMaterial: () => "Cotton",
            getPattern: () => 1,
            getBrand: () => "BrandX",
            getGender: () => "Unisex",
            getPackaging: () => "Bag",
            getSpecialRequest: () => "Custom Print",
        } as unknown as IdentifiableClothing;

        await repository.create(mockClothing);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO"), expect.any(Array));
    });

    test("get() should return a clothing item when found", async () => {
        mockClient.query.mockResolvedValue({
            rows: [{
                id: "cloth001",
                clothingtype: "T-Shirt",
                size: "M",
                color: "Red",
                material: "Cotton",
                pattern: 1,
                brand: "BrandX",
                gender: "Unisex",
                packaging: "Bag",
                specialrequest: "Custom Print",
            }]
        });

        const result = await repository.get("cloth001");
        expect(result).toBeDefined();
    });

    test("get() should throw ItemNotFoundException when not found", async () => {
        mockClient.query.mockResolvedValue({ rows: [] });
        await expect(repository.get("cloth001")).rejects.toThrow(ItemNotFoundException);
    });

    test("update() should update the clothing item", async () => {
        const mockClothing = {
            getId: () => "cloth001",
            getClothingType: () => "Shirt",
            getSize: () => "L",
            getColor: () => "Blue",
            getMaterial: () => "Linen",
            getPattern: () => 2,
            getBrand: () => "BrandY",
            getGender: () => "Male",
            getPackaging: () => "Box",
            getSpecialRequest: () => "No tags",
        } as unknown as IdentifiableClothing;

        await repository.update(mockClothing);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), expect.any(Array));
    });

    test("delete() should delete the clothing item", async () => {
        await repository.delete("cloth001");
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM"), ["cloth001"]);
    });
});

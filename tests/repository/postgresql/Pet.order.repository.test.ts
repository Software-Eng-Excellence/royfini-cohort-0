import { PetRepository } from "../../../src/repository/postgresql/Pet.order.repository";
import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiablePet } from "../../../src/models/Pet.model";

describe("PetRepository", () => {
    let repository: PetRepository;
    let mockClient: { query: jest.Mock; release: jest.Mock };

    beforeEach(() => {
        repository = new PetRepository();
        mockClient = {
            query: jest.fn(),
            release: jest.fn(),
        };
        ConnectionManager.getConnection = jest.fn().mockResolvedValue(mockClient);
    });

    test("init() should create the pet table", async () => {
        await repository.init();
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE IF NOT EXISTS"));
    });

    test("create() should insert a pet item", async () => {
        const mockPet = {
            getId: () => "pet001",
            getProductType: () => "Food",
            getPetType: () => "Dog",
            getBrand: () => "Purina",
            getSize: () => "Large",
            getFlavor: () => "Chicken",
            getEcoFriendly: () => "Yes"
        } as IdentifiablePet;

        await repository.create(mockPet);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO"), expect.any(Array));
    });

    test("get() should return a pet item if found", async () => {
        mockClient.query.mockResolvedValue({
            rows: [{
                id: "pet001",
                producttype: "Food",
                pettype: "Dog",
                brand: "Purina",
                size: "Large",
                flavor: "Chicken",
                ecofriendly: "Yes",
            }]
        });

        const result = await repository.get("pet001");
        expect(result).toBeDefined();
        expect(result.getId()).toBe("pet001");
    });

    test("get() should throw ItemNotFoundException when not found", async () => {
        mockClient.query.mockResolvedValue({ rows: [] });

        await expect(repository.get("nonexistent")).rejects.toThrow(ItemNotFoundException);
    });

    test("getAll() should return all pet items", async () => {
        mockClient.query.mockResolvedValue({
            rows: [
                {
                    id: "pet001",
                    producttype: "Food",
                    pettype: "Dog",
                    brand: "Purina",
                    size: "Large",
                    flavor: "Chicken",
                    ecofriendly: "Yes"
                },
                {
                    id: "pet002",
                    producttype: "Toy",
                    pettype: "Cat",
                    brand: "MeowFun",
                    size: "Small",
                    flavor: "N/A",
                    ecofriendly: "No"
                }
            ]
        });

        const result = await repository.getAll();
        expect(result.length).toBe(2);
    });

    test("update() should update a pet item", async () => {
        const mockPet = {
            getId: () => "pet001",
            getProductType: () => "Toy",
            getPetType: () => "Cat",
            getBrand: () => "MeowFun",
            getSize: () => "Small",
            getFlavor: () => "N/A",
            getEcoFriendly: () => "No"
        } as IdentifiablePet;

        await repository.update(mockPet);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), expect.any(Array));
    });

    test("delete() should remove the pet item", async () => {
        await repository.delete("pet001");
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM"), ["pet001"]);
    });
});

import { ToyRepository } from "../../../src/repository/postgresql/Toy.order.repository";
import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiableToy } from "../../../src/models/Toy.model";
import { PostgreSqlToyMapper } from "../../../src/mappers/ToyMapper";

jest.mock("../../../src/repository/postgresql/ConnectionManager");
jest.mock("../../../src/mappers/ToyMapper");

const mockClient = {
    query: jest.fn(),
};

describe("ToyRepository", () => {
    let repo: ToyRepository;

    const mockToy: IdentifiableToy = {
        getId: jest.fn(() => "toy-001"),
        getType: jest.fn(() => "Action Figure"),
        getAgeGroup: jest.fn(() => "5-10"),
        getBrand: jest.fn(() => "FunCo"),
        getMaterial: jest.fn(() => "Plastic"),
        getBatteryRequired: jest.fn(() => "Yes"),
        getEducational: jest.fn(() => "No"),
    } as unknown as IdentifiableToy;

    beforeEach(() => {
        (ConnectionManager.getConnection as jest.Mock).mockResolvedValue(mockClient);
        repo = new ToyRepository();
        mockClient.query.mockReset();
    });

    test("should create a toy", async () => {
        await repo.create(mockToy);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO"), [
            "toy-001",
            "Action Figure",
            "5-10",
            "FunCo",
            "Plastic",
            "Yes",
            "No",
        ]);
    });

    test("should get a toy by id", async () => {
        const dbRow = {
            id: "toy-001",
            type: "Action Figure",
            ageGroup: "5-10",
            brand: "FunCo",
            material: "Plastic",
            batteryRequired: "Yes",
            educational: "No",
        };
        mockClient.query.mockResolvedValue({ rows: [dbRow] });

        const mockMapper = {
            map: jest.fn().mockReturnValue(mockToy),
        };
        (PostgreSqlToyMapper as jest.Mock).mockImplementation(() => mockMapper);

        const result = await repo.get("toy-001");

        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("WHERE id = $1"), ["toy-001"]);
        expect(result).toBe(mockToy);
    });

    test("should throw ItemNotFoundException if toy not found", async () => {
        mockClient.query.mockResolvedValue({ rows: [] });

        await expect(repo.get("missing-toy")).rejects.toThrow(ItemNotFoundException);
    });

    test("should get all toys", async () => {
        const dbResult = {
            rows: [
                {
                    id: "toy-001",
                    type: "Action Figure",
                    ageGroup: "5-10",
                    brand: "FunCo",
                    material: "Plastic",
                    batteryRequired: "Yes",
                    educational: "No",
                },
            ],
        };
        mockClient.query.mockResolvedValue(dbResult);

        const mockMapper = {
            map: jest.fn().mockReturnValue(mockToy),
        };
        (PostgreSqlToyMapper as jest.Mock).mockImplementation(() => mockMapper);

        const toys = await repo.getAll();

        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("SELECT * FROM"));
        expect(toys.length).toBe(1);
        expect(toys[0]).toBe(mockToy);
    });

    test("should update a toy", async () => {
        await repo.update(mockToy);
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE"), [
            "Action Figure",
            "5-10",
            "FunCo",
            "Plastic",
            "Yes",
            "No",
            "toy-001",
        ]);
    });

    test("should delete a toy by id", async () => {
        await repo.delete("toy-001");
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("DELETE"), ["toy-001"]);
    });

    test("should initialize the toy table", async () => {
        await repo.init();
        expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE IF NOT EXISTS"));
    });
});

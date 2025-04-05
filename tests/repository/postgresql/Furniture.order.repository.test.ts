import { FurnitureRepository } from "../../../src/repository/postgresql/Furniture.order.repository";
import { ConnectionManager } from "../../../src/repository/postgresql/ConnectionManager";
import { DbException, InitializationException, ItemNotFoundException } from "../../../src/util/exceptions/repositoryExceptions";
import { IdentifiableFurniture } from "../../../src/models/Furniture.model";
import { PostgreSqlFurnitureMapper } from "../../../src/mappers/FurnitureMapper";

jest.mock("../../../src/repository/postgresql/ConnectionManager");
jest.mock("../../../src/mappers/FurnitureMapper");

describe("FurnitureRepository", () => {
    let repo: FurnitureRepository;
    const mockClient = {
        query: jest.fn(),
    };

    const mockFurniture = {
        getId: jest.fn(() => "f1"),
        getType: jest.fn(() => "Chair"),
        getMaterial: jest.fn(() => "Wood"),
        getColor: jest.fn(() => "Brown"),
        getSize: jest.fn(() => "Large"),
        getStyle: jest.fn(() => "Modern"),
        getAssemblyRequired: jest.fn(() => "No"),
        getWarranty: jest.fn(() => "2 years"),
    } as unknown as IdentifiableFurniture;

    beforeEach(() => {
        repo = new FurnitureRepository();
        jest.clearAllMocks();
        (ConnectionManager.getConnection as jest.Mock).mockResolvedValue(mockClient);
    });

    describe("init", () => {
        it("should initialize the table successfully", async () => {
            mockClient.query.mockResolvedValue({});
            await expect(repo.init()).resolves.not.toThrow();
        });

        it("should throw InitializationException on failure", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.init()).rejects.toThrow(InitializationException);
        });
    });

    describe("create", () => {
        it("should insert furniture and return ID", async () => {
            mockClient.query.mockResolvedValue({});
            await expect(repo.create(mockFurniture)).resolves.toBe("f1");
        });

        it("should throw DbException on insert failure", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.create(mockFurniture)).rejects.toThrow(DbException);
        });
    });

    describe("get", () => {
        it("should return mapped furniture", async () => {
            const fakeRow = { id: "f1" };
            mockClient.query.mockResolvedValue({ rows: [fakeRow] });

            const mapped = { ...mockFurniture };
            (PostgreSqlFurnitureMapper as jest.Mock).mockImplementation(() => ({
                map: () => mapped,
            }));

            const result = await repo.get("f1");
            expect(result).toBe(mapped);
        });

        it("should throw ItemNotFoundException if no item found", async () => {
            mockClient.query.mockResolvedValue({ rows: [] });
            await expect(repo.get("f2")).rejects.toThrow(ItemNotFoundException);
        });

        it("should throw DbException on other error", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.get("f3")).rejects.toThrow(DbException);
        });
    });

    describe("getAll", () => {
        it("should return all mapped furniture items", async () => {
            const rows = [{ id: "f1" }, { id: "f2" }];
            mockClient.query.mockResolvedValue({ rows });
            (PostgreSqlFurnitureMapper as jest.Mock).mockImplementation(() => ({
                map: (row: any) => row,
            }));

            const result = await repo.getAll();
            expect(result).toEqual(rows);
        });

        it("should throw DbException on failure", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.getAll()).rejects.toThrow(DbException);
        });
    });

    describe("update", () => {
        it("should update the furniture", async () => {
            mockClient.query.mockResolvedValue({});
            await expect(repo.update(mockFurniture)).resolves.not.toThrow();
        });

        it("should throw DbException on update failure", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.update(mockFurniture)).rejects.toThrow(DbException);
        });
    });

    describe("delete", () => {
        it("should delete the furniture", async () => {
            mockClient.query.mockResolvedValue({});
            await expect(repo.delete("f1")).resolves.not.toThrow();
        });

        it("should throw DbException on delete failure", async () => {
            mockClient.query.mockRejectedValue(new Error("fail"));
            await expect(repo.delete("f2")).rejects.toThrow(DbException);
        });
    });
});

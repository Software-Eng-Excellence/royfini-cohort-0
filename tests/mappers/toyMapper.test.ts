import { PostgreSqlToy, PostgreSqlToyMapper, XMLToyMapper } from "../../src/mappers/ToyMapper";
import { IdentifiableToyBuilder, ToyBuilder } from "../../src/models/builders/toy.builder";
import { Toy } from "../../src/models/Toy.model";
import { ToyOrder } from "../../src/models/xml/toyOrder";
describe("Toy Mapper", () => {
    let toyMapper: XMLToyMapper;
    toyMapper = new XMLToyMapper();

    const mockData: ToyOrder = {
        OrderID: 1234,
        Type: "Action Figure",
        AgeGroup: "3-7 years",
        Brand: "LEGO",
        Material: "Plastic",
        BatteryRequired: "No",
        Educational: "Yes",
        Price: 23,
        Quantity: 23
    };
    const mapper = new PostgreSqlToyMapper();

    const dbToy: PostgreSqlToy = {
        id: 'toy-202',
        type: 'Puzzle',
        agegroup: '3-5',
        brand: 'Lego',
        material: 'Plastic',
        batteryrequired: 'No',
        educational: 'Yes'
    };

    it("should create Toy model", () => {
        const data = toyMapper.map(mockData);
        expect(data).toBeInstanceOf(Toy);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            type: "Action Figure",
            ageGroup: "3-7 years",
            brand: "LEGO",
            material: "Plastic",
            batteryRequired: "No",
            educational: "Yes",
        });
    });
    it("should throw an error when required fields are missing", () => {
        const incompleteData = {
            OrderID: 1234,
            Type: "Action Figure",
            // Missing AgeGroup, Brand, and other required fields
        } as unknown as ToyOrder;

        expect(() => toyMapper.map(incompleteData)).toThrowError();
    });
    it('should map PostgreSqlToy to IdentifiableToy', () => {
        const result = mapper.map(dbToy);

        expect(result.getId()).toBe(dbToy.id);
        expect(result.getType()).toBe(dbToy.type);
        expect(result.getAgeGroup()).toBe(dbToy.agegroup);
        expect(result.getBrand()).toBe(dbToy.brand);
        expect(result.getMaterial()).toBe(dbToy.material);
        expect(result.getBatteryRequired()).toBe(dbToy.batteryrequired);
        expect(result.getEducational()).toBe(dbToy.educational);
    });

    it('should reverseMap IdentifiableToy to PostgreSqlToy', () => {
        const toy = ToyBuilder.newBuilder()
            .setType(dbToy.type)
            .setAgeGroup(dbToy.agegroup)
            .setBrand(dbToy.brand)
            .setMaterial(dbToy.material)
            .setBatteryRequired(dbToy.batteryrequired)
            .setEducational(dbToy.educational)
            .build();

        const identifiableToy = IdentifiableToyBuilder.newBuilder()
            .setId(dbToy.id)
            .setToy(toy)
            .build();

        const result = mapper.reverseMap(identifiableToy);

        expect(result).toEqual(dbToy);
    });
});
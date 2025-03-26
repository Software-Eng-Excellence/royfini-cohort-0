import { XMLToyMapper } from "../../src/mappers/ToyMapper";
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
});
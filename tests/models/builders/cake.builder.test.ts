import { CakeBuilder, IdentifiableCakeBuilder } from "../../../src/models/builders/cake.builder"
import { Cake, IdentifiableCake } from "../../../src/models/Cake.model";
describe("CakeBuilder", () => {
    let cakeBuilder: CakeBuilder;
    beforeAll(() => {
        cakeBuilder = new CakeBuilder();
    });
    it("should build Cake if all data are set", () => {
        const randomCake = cakeBuilder
            .setType("Sponge")
            .setFlavor("Vanilla")
            .setFilling("Cream")
            .setSize(20)
            .setLayers(2)
            .setFrostingType("Buttercream")
            .setFrostingFlavor("Vanilla")
            .setDecorationType("Sprinkles")
            .setDecorationColor("Multi-color")
            .setCustomMessage("Happy Birthday")
            .setShape("Round")
            .setAllergies("Nut-Free")
            .setSpecialIngredients("Organic Ingredients")
            .setPackagingType("Standard Box")
            .build();
        expect(randomCake).toBeDefined();
        expect(randomCake).toBeInstanceOf(Cake);
        expect(randomCake).toMatchObject({
            type: "Sponge",
            flavor: "Vanilla",
            filling: "Cream",
            size: 20,
            layers: 2,
            frostingType: "Buttercream",
            decorationType: "Sprinkles",
            decorationColor: "Multi-color",
            specialIngredients: "Organic Ingredients",
            packagingType: "Standard Box"
        });
    });
    it("should throw an error if not all data are set", () => {
        expect(() => CakeBuilder.newBuilder()
            .setSpecialIngredients("Organic Ingredients")
            .setPackagingType("Standard Box")
            .build()).toThrow("Missing required properties");
    });
    const mockCake = {
        getType: jest.fn(() => 'Birthday'),
        getFlavor: jest.fn(() => 'Chocolate'),
        getFilling: jest.fn(() => 'Vanilla'),
        getSize: jest.fn(() => 3),
        getLayers: jest.fn(() => 2),
        getFrostingType: jest.fn(() => 'Buttercream'),
        getFrostingFlavor: jest.fn(() => 'Strawberry'),
        getDecorationType: jest.fn(() => 'Sprinkles'),
        getDecorationColor: jest.fn(() => 'Red'),
        getCustomMessage: jest.fn(() => 'Happy Birthday!'),
        getShape: jest.fn(() => 'Round'),
        getAllergies: jest.fn(() => 'Nuts'),
        getSpecialIngredients: jest.fn(() => 'Love'),
        getPackagingType: jest.fn(() => 'Box'),
    } as unknown as Cake;
    it('should build an IdentifiableCake with all properties', () => {
        const cake = IdentifiableCakeBuilder
            .newBuilder()
            .setId('cake-123')
            .setCake(mockCake)
            .build();

        expect(cake).toBeInstanceOf(IdentifiableCake);
        expect(cake.getId()).toBe('cake-123');
        expect(cake.getType()).toBe('Birthday');
        expect(cake.getFlavor()).toBe('Chocolate');
        expect(cake.getFilling()).toBe('Vanilla');
        expect(cake.getSize()).toBe(3);
        expect(cake.getLayers()).toBe(2);
        expect(cake.getFrostingType()).toBe('Buttercream');
        expect(cake.getFrostingFlavor()).toBe('Strawberry');
        expect(cake.getDecorationType()).toBe('Sprinkles');
        expect(cake.getDecorationColor()).toBe('Red');
        expect(cake.getCustomMessage()).toBe('Happy Birthday!');
        expect(cake.getShape()).toBe('Round');
        expect(cake.getAllergies()).toEqual('Nuts');
        expect(cake.getSpecialIngredients()).toEqual('Love');
        expect(cake.getPackagingType()).toBe('Box');
    });

    it('should throw error if id is missing', () => {
        expect(() => {
            IdentifiableCakeBuilder
                .newBuilder()
                .setCake(mockCake)
                .build();
        }).toThrowError('Missing required properties');
    });

    it('should throw error if cake is missing', () => {
        expect(() => {
            IdentifiableCakeBuilder
                .newBuilder()
                .setId('cake-456')
                .build();
        }).toThrowError('Missing required properties');
    });
});
import { CakeBuilder } from "../../../src/models/builders/cake.builder"
import { Cake } from "../../../src/models/Cake.model";
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
        expect(() => cakeBuilder
            .setSpecialIngredients("Organic Ingredients")
            .setPackagingType("Standard Box")
            .build()).toThrow("Missing required properties");
    });
});
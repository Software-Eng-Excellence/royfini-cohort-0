import { CakeBuilder } from "./models/builders/cake.builder";

async function main() {
    const cakeBuilder = new CakeBuilder();
    const cake = cakeBuilder.setType("Sponge")
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
    console.log(cake)
}

main();
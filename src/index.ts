import { DBMode, RepositoryFactory } from "./repository/Repository.factory";
import { CakeBuilder, IdentifiableCakeBuilder } from "./models/builders/cake.builder";
import { IdentifiableOrderItemBuider, OrderBuilder } from "./models/builders/order.builder";
import { ItemCategory } from "./models/IItem";

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
async function DBSandBox() {
    const dbOrder = await RepositoryFactory.create(DBMode.POSTGRESQL, ItemCategory.CAKE);

    const cake = CakeBuilder.newBuilder()
        .setType("Sponge")
        .setFlavor("Chocolate")
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
    const idCake = IdentifiableCakeBuilder.newBuilder()
        .setCake(cake)
        .setId(Math.random().toString(36).substring(2, 15))
        .build();
    const order = OrderBuilder.newBuilder()
        .setItem(cake)
        .setPrice(100)
        .setQuantity(1)
        .setId(Math.random().toString(36).substring(2, 15))
        .build();
    const idOrder = IdentifiableOrderItemBuider.newBuilder()
        .setItem(idCake)
        .setOrder(order)
        .build();

    //await dbOrder.create(idOrder);

    //await dbOrder.delete(idOrder.getId());

    //await dbOrder.update(idOrder);
    //console.log(await dbOrder.get(idOrder.getId()));
    //console.log((((await dbOrder.getAll()).length)));
}

// main();
DBSandBox().catch((error) => console.log("Error in DBSandBox", error as Error));
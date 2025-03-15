import { CakeBuilder } from "../models/builders/cake.builder";
import { Cake } from "../models/Cake.model";
import { CakeOrder } from "../models/csv/cakeOrder";
import { IMapper } from "./IMapper";

export class CSVCakeMapper implements IMapper<CakeOrder, Cake> {
  map(data: CakeOrder): Cake {
    return CakeBuilder.newBuilder()
      .setType(data.Type)
      .setFlavor(data.Flavor)
      .setFilling(data.Filling)
      .setSize(parseInt(data.Size))
      .setLayers(parseInt(data.Layers))
      .setFrostingType(data["Frosting Type"])
      .setFrostingFlavor(data["Frosting Flavor"])
      .setDecorationType(data["Decoration Type"])
      .setDecorationColor(data["Decoration Color"])
      .setCustomMessage(data["Custom Message"])
      .setShape(data.Shape)
      .setAllergies(data.Allergies)
      .setSpecialIngredients(data["Special Ingredients"])
      .setPackagingType(data["Packaging Type"])
      .build();
  }
}

import { CakeBuilder, IdentifiableCakeBuilder } from "../models/builders/cake.builder";
import { Cake, IdentifiableCake } from "../models/Cake.model";
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
  reverseMap(data: Cake): CakeOrder {
    return {
      Type: data.getType(),
      Flavor: data.getFlavor(),
      Filling: data.getFilling(),
      Size: data.getSize().toString(),
      Layers: data.getAllergies().toString(),
      "Frosting Type": data.getFrostingType(),
      "Frosting Flavor": data.getFrostingFlavor(),
      "Decoration Type": data.getDecorationType(),
      "Decoration Color": data.getDecorationColor(),
      "Custom Message": data.getCustomMessage(),
      Shape: data.getShape(),
      Allergies: data.getAllergies(),
      "Special Ingredients": data.getSpecialIngredients(),
      "Packaging Type": data.getPackagingType(),
    };
  }
}
export interface SQLiteCake {
  id: string;
  type: string;
  flavor: string;
  filling: string;
  size: number;
  layers: number;
  frostingType: string;
  frostingFlavor: string;
  decorationType: string;
  decorationColor: string;
  customMessage: string;
  shape: string;
  allergies: string;
  specialIngredients: string;
  packagingType: string;
}
export class SQLiteCakeMapper implements IMapper<SQLiteCake, IdentifiableCake> {
  map(data: SQLiteCake): IdentifiableCake {
    return IdentifiableCakeBuilder.newBuilder()
      .setCake(
        CakeBuilder.newBuilder()
          .setType(data.type)
          .setFlavor(data.flavor)
          .setFilling(data.filling)
          .setSize(data.size)
          .setLayers(data.layers)
          .setFrostingType(data.frostingType)
          .setFrostingFlavor(data.frostingFlavor)
          .setDecorationType(data.decorationType)
          .setDecorationColor(data.decorationColor)
          .setCustomMessage(data.customMessage)
          .setShape(data.shape)
          .setAllergies(data.allergies)
          .setSpecialIngredients(data.specialIngredients)
          .setPackagingType(data.packagingType)
          .build()
      )
      .setId(data.id)
      .build();
  }
  reverseMap(data: IdentifiableCake): SQLiteCake {
    return {
      id: data.getId(),
      type: data.getType(),
      flavor: data.getFlavor(),
      filling: data.getFilling(),
      size: data.getSize(),
      layers: data.getLayers(),
      frostingType: data.getFrostingType(),
      frostingFlavor: data.getFrostingFlavor(),
      decorationType: data.getDecorationType(),
      decorationColor: data.getDecorationColor(),
      customMessage: data.getCustomMessage(),
      shape: data.getShape(),
      allergies: data.getAllergies(),
      specialIngredients: data.getSpecialIngredients(),
      packagingType: data.getPackagingType(),
    };
  }
}
export interface PostgreSqlCake {
  id: string;
  type: string;
  flavor: string;
  filling: string;
  size: number;
  layers: number;
  frostingtype: string;
  frostingflavor: string;
  decorationtype: string;
  decorationcolor: string;
  custommessage: string;
  shape: string;
  allergies: string;
  specialingredients: string;
  packagingtype: string;
}
export class PostgreSqlCakeMapper
  implements IMapper<PostgreSqlCake, IdentifiableCake> {
  map(data: PostgreSqlCake): IdentifiableCake {
    return IdentifiableCakeBuilder.newBuilder()
      .setCake(
        CakeBuilder.newBuilder()
          .setType(data.type)
          .setFlavor(data.flavor)
          .setFilling(data.filling)
          .setSize(data.size)
          .setLayers(data.layers)
          .setFrostingType(data.frostingtype)
          .setFrostingFlavor(data.frostingflavor)
          .setDecorationType(data.decorationtype)
          .setDecorationColor(data.decorationcolor)
          .setCustomMessage(data.custommessage)
          .setShape(data.shape)
          .setAllergies(data.allergies)
          .setSpecialIngredients(data.specialingredients)
          .setPackagingType(data.packagingtype)
          .build()
      )
      .setId(data.id)
      .build();
  }
  reverseMap(data: IdentifiableCake): PostgreSqlCake {
    return {
      id: data.getId(),
      type: data.getType(),
      flavor: data.getFlavor(),
      filling: data.getFilling(),
      size: data.getSize(),
      layers: data.getLayers(),
      frostingtype: data.getFrostingType(),
      frostingflavor: data.getFrostingFlavor(),
      decorationtype: data.getDecorationType(),
      decorationcolor: data.getDecorationColor(),
      custommessage: data.getCustomMessage(),
      shape: data.getShape(),
      allergies: data.getAllergies(),
      specialingredients: data.getSpecialIngredients(),
      packagingtype: data.getPackagingType(),
    };
  }
}
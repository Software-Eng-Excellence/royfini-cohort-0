import { CSVCakeMapper, PostgreSqlCake, PostgreSqlCakeMapper } from "../../src/mappers/CakeMapper";
import { CakeBuilder } from "../../src/models/builders/cake.builder";
import { Cake, IdentifiableCake } from "../../src/models/Cake.model";
import { CakeOrder } from "../../src/models/csv/cakeOrder";

describe("Cake Mapper", () => {
  let cakeMapper: CSVCakeMapper;
  cakeMapper = new CSVCakeMapper();
  const mockData = {
    id: "99",
    Type: "Birthday",
    Flavor: "Caramel",
    Filling: "Cream Cheese",
    Size: "25",
    Layers: "4",
    "Frosting Type": "Whipped Cream",
    "Frosting Flavor": "Red Velvet",
    "Decoration Type": "Edible Glitter",
    "Decoration Color": "Blue",
    "Custom Message": "Happy Anniversary",
    Shape: "Square",
    Allergies: "Gluten-Free",
    "Special Ingredients": "Organic",
    "Packaging Type": "Standard Box",
    Price: "120",
    Quantity: "1",
  };
  const postgresCake: PostgreSqlCake = {
    id: "cake123",
    type: "Birthday",
    flavor: "Chocolate",
    filling: "Vanilla Cream",
    size: 8,
    layers: 2,
    frostingtype: "Buttercream",
    frostingflavor: "Chocolate",
    decorationtype: "Sprinkles",
    decorationcolor: "Red",
    custommessage: "Happy Birthday!",
    shape: "Round",
    allergies: "None",
    specialingredients: "Organic Cocoa",
    packagingtype: "Box",
  };
  let mapper: PostgreSqlCakeMapper
  it("create Cake model", () => {
    const data = cakeMapper.map(mockData as CakeOrder);
    expect(data).toBeDefined();
    expect(data).toBeInstanceOf(Cake);
    expect(data).toMatchObject({
      type: "Birthday",
      flavor: "Caramel",
      filling: "Cream Cheese",
      size: 25,
      layers: 4,
      frostingType: "Whipped Cream",
      frostingFlavor: "Red Velvet",
      decorationType: "Edible Glitter",
      decorationColor: "Blue",
      customMessage: "Happy Anniversary",
      shape: "Square",
      allergies: "Gluten-Free",
      specialIngredients: "Organic",
      packagingType: "Standard Box",
    });
  });
  it("should throw an error when required fields are missing", () => {
    const incompleteData = {
      Type: "Birthday",
      Flavor: "Caramel",
      // Missing Size and Layers
    } as unknown as CakeOrder;

    expect(() => cakeMapper.map(incompleteData)).toThrowError();
  });
  test("map() should correctly convert PostgreSqlCake to IdentifiableCake", () => {
    mapper = new PostgreSqlCakeMapper();
    const identifiableCake = mapper.map(postgresCake);
    expect(identifiableCake.getId()).toBe(postgresCake.id);
    expect(identifiableCake.getType()).toBe(postgresCake.type);
    expect(identifiableCake.getFlavor()).toBe(postgresCake.flavor);
    expect(identifiableCake.getFilling()).toBe(postgresCake.filling);
    expect(identifiableCake.getSize()).toBe(postgresCake.size);
    expect(identifiableCake.getLayers()).toBe(postgresCake.layers);
    expect(identifiableCake.getFrostingType()).toBe(postgresCake.frostingtype);
    expect(identifiableCake.getFrostingFlavor()).toBe(postgresCake.frostingflavor);
    expect(identifiableCake.getDecorationType()).toBe(postgresCake.decorationtype);
    expect(identifiableCake.getDecorationColor()).toBe(postgresCake.decorationcolor);
    expect(identifiableCake.getCustomMessage()).toBe(postgresCake.custommessage);
    expect(identifiableCake.getShape()).toBe(postgresCake.shape);
    expect(identifiableCake.getAllergies()).toBe(postgresCake.allergies);
    expect(identifiableCake.getSpecialIngredients()).toBe(postgresCake.specialingredients);
    expect(identifiableCake.getPackagingType()).toBe(postgresCake.packagingtype);
  });

  test("reverseMap() should correctly convert IdentifiableCake to PostgreSqlCake", () => {
    const identifiableCake = {
      getId: () => postgresCake.id,
      getType: () => postgresCake.type,
      getFlavor: () => postgresCake.flavor,
      getFilling: () => postgresCake.filling,
      getSize: () => postgresCake.size,
      getLayers: () => postgresCake.layers,
      getFrostingType: () => postgresCake.frostingtype,
      getFrostingFlavor: () => postgresCake.frostingflavor,
      getDecorationType: () => postgresCake.decorationtype,
      getDecorationColor: () => postgresCake.decorationcolor,
      getCustomMessage: () => postgresCake.custommessage,
      getShape: () => postgresCake.shape,
      getAllergies: () => postgresCake.allergies,
      getSpecialIngredients: () => postgresCake.specialingredients,
      getPackagingType: () => postgresCake.packagingtype,
    } as unknown as IdentifiableCake;
  
    const convertedCake = mapper.reverseMap(identifiableCake);
    expect(convertedCake).toEqual(postgresCake);
  });
});

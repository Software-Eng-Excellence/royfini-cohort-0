import { CSVCakeMapper } from "../../src/mappers/CakeMapper";
import { Cake } from "../../src/models/Cake.model";
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
});

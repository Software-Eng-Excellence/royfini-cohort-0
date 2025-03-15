import { CSVCakeOrderMapper, CSVClothingOrderMapper, JSONBookOrderMapper, JSONPetOrderMapper, XMLFurnitureOrderMapper, XMLToyOrderMapper } from "../../src/mappers/Order.mapper";
import { CSVCakeMapper } from "../../src/mappers/CakeMapper";
import { XMLFurnitureMapper } from "../../src/mappers/FurnitureMapper";
import { XMLToyMapper } from "../../src/mappers/ToyMapper";
import { CSVClothingMapper } from "../../src/mappers/ClothingMapper";
import { JSONBookMapper } from "../../src/mappers/BookMapper"
import { ClothingOrder } from "../../src/models/csv/clothingOrder";
import { JSONPetMapper } from "../../src/mappers/PetMapper";

describe("Order Mappers", () => {
    it("should correctly map Cake Order", () => {
        const cakeMapper = new CSVCakeMapper();
        const cakeOrderMapper = new CSVCakeOrderMapper(cakeMapper);
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
            Price: "25",
            Quantity: "2",
        };
        const data = cakeOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "99",
            price: 25,
            quantity: 2,
            item: {
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
            },
        });
    });

    it("should correctly map Clothing Order", () => {
        const clothingMapper = new CSVClothingMapper();
        const clothingOrderMapper = new CSVClothingOrderMapper(clothingMapper);
        const mockData = {
            "Order ID": "202",
            "Clothing Type": "Shirt",
            Size: "L",
            Color: "Blue",
            Material: "Cotton",
            Pattern: "Striped",
            Brand: "Nike",
            Gender: "Men",
            Packaging: "Eco-Friendly",
            "Special Request": "Gift Wrapped",
            Price: "40",
            Quantity: "1",
        };
        const data = clothingOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "202",
            price: 40,
            quantity: 1,
            item: {
                clothingType: "Shirt",
                size: "L",
                color: "Blue",
                material: "Cotton",
                pattern: "Striped",
                brand: "Nike",
                gender: "Men",
                packaging: "Eco-Friendly",
                specialRequest: "Gift Wrapped"
            },
        });
    });

    it("should correctly map Toy Order", () => {
        const toyMapper = new XMLToyMapper();
        const toyOrderMapper = new XMLToyOrderMapper(toyMapper);
        const mockData = {
            OrderID: 303,
            Type: "Action Figure",
            AgeGroup: "6+",
            Brand: "Hasbro",
            Material: "Plastic",
            BatteryRequired: "No",
            Educational: "Yes",
            Price: 15,
            Quantity: 3,
        };
        const data = toyOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "303",
            price: 15,
            quantity: 3,
            item: {
                type: "Action Figure",
                ageGroup: "6+",
                brand: "Hasbro",
                material: "Plastic",
                batteryRequired: "No",
                educational: "Yes",
            },
        });
    });

    it("should correctly map Furniture Order", () => {
        const furnitureMapper = new XMLFurnitureMapper();
        const furnitureOrderMapper = new XMLFurnitureOrderMapper(furnitureMapper);
        const mockData = {
            OrderID: "404",
            Type: "Table",
            Material: "Wood",
            Color: "Brown",
            Size: "Large",
            Style: "Modern",
            AssemblyRequired: "Yes",
            Warranty: "2 Years",
            Price: 1200,
            Quantity: 1,
        };
        const data = furnitureOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "404",
            price: 1200,
            quantity: 1,
            item: {
                type: "Table",
                material: "Wood",
                color: "Brown",
                size: "Large",
                style: "Modern",
                assemblyRequired: "Yes",
                warranty: "2 Years",
            },
        });
    });

    it("should correctly map Pet Order", () => {
        const petMapper = new JSONPetMapper();
        const petOrderMapper = new JSONPetOrderMapper(petMapper);
        const mockData = {
            "Order ID": "505",
            "Product Type": "Food",
            "Pet Type": "Dog",
            Brand: "Pedigree",
            Size: "Large",
            Flavor: "Chicken",
            "Eco-Friendly": "Yes",
            Price: "30",
            Quantity: "2",
        };
        const data = petOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "505",
            price: 30,
            quantity: 2,
            item: {
                productType: "Food",
                petType: "Dog",
                brand: "Pedigree",
                size: "Large",
                flavor: "Chicken",
                ecoFriendly: "Yes",
            },
        });
    });

    it("should correctly map Book Order", () => {
        const bookMapper = new JSONBookMapper();
        const bookOrderMapper = new JSONBookOrderMapper(bookMapper);
        const mockData = {
            "Order ID": 606,
            "Book Title": "Echoes of Silence",
            Author: "Ernest Hemingway",
            Genre: "Fantasy",
            Format: "Audiobook",
            Language: "Spanish",
            Publisher: "Macmillan Publishers",
            "Special Edition": "None",
            Packaging: "Eco-Friendly Packaging",
            Price: "20",
            Quantity: "5",
        };
        const data = bookOrderMapper.map(mockData);
        expect(data).toBeDefined();
        expect(data).toMatchObject({
            id: "606",
            price: 20,
            quantity: 5,
            item: {
                bookTitle: "Echoes of Silence",
                author: "Ernest Hemingway",
                genre: "Fantasy",
                format: "Audiobook",
                language: "Spanish",
                publisher: "Macmillan Publishers",
                specialEdition: "None",
                packaging: "Eco-Friendly Packaging",
            },
        });
    });
});

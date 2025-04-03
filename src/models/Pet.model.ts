import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "../repository/IRepository";

export class Pet implements IItem {
    constructor(
        private productType: string,
        private petType: string,
        private brand: string,
        private size: string,
        private flavor: string,
        private ecoFriendly: string,
    ) { }

    getCategory(): ItemCategory {
        return ItemCategory.PET;
    }

    getProductType(): string {
        return this.productType;
    }

    getPetType(): string {
        return this.petType;
    }

    getBrand(): string {
        return this.brand;
    }

    getSize(): string {
        return this.size;
    }

    getFlavor(): string {
        return this.flavor;
    }

    getEcoFriendly(): string {
        return this.ecoFriendly;
    }
}
export class IdentifiablePet extends Pet implements IIdentifiableItem {
    constructor(
        private id: id,
        productType: string,
        petType: string,
        brand: string,
        size: string,
        flavor: string,
        ecoFriendly: string,
    ) {
        super(
            productType,
            petType,
            brand,
            size,
            flavor,
            ecoFriendly,
        );
    }

    getId(): string {
        return this.id;
    }
}
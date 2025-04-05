import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "../repository/IRepository";

export class Toy implements IItem {
    constructor(
        private type: string,
        private ageGroup: string,
        private brand: string,
        private material: string,
        private batteryRequired: string,
        private educational: string,
    ) { }

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }

    getType(): string {
        return this.type;
    }

    getAgeGroup(): string {
        return this.ageGroup;
    }

    getBrand(): string {
        return this.brand;
    }

    getMaterial(): string {
        return this.material;
    }

    getBatteryRequired(): string {
        return this.batteryRequired;
    }

    getEducational(): string {
        return this.educational;
    }
}
export class IdentifiableToy extends Toy implements IIdentifiableItem {
    constructor(
        private id: id,
        type: string,
        ageGroup: string,
        brand: string,
        material: string,
        batteryRequired: string,
        educational: string,
    ) {
        super(
            type,
            ageGroup,
            brand,
            material,
            batteryRequired,
            educational,
        );
    }

    getId(): string {
        return this.id;
    }
}
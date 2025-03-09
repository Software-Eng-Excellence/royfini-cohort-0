import { IItem, ItemCategory } from "./IItem";

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
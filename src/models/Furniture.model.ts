import { IItem, ItemCategory } from "./Item.model";

export class Furniture implements IItem {
    constructor(
        private type: string,
        private material: string,
        private color: string,
        private size: string,
        private style: string,
        private assemblyRequired: string,
        private warranty: string,
    ) { }

    getCategory(): ItemCategory {
        return ItemCategory.FURNITURE;
    }

    getType(): string {
        return this.type;
    }

    getMaterial(): string {
        return this.material;
    }

    getColor(): string {
        return this.color;
    }

    getSize(): string {
        return this.size;
    }

    getStyle(): string {
        return this.style;
    }

    getAssemblyRequired(): string {
        return this.assemblyRequired;
    }

    getWarranty(): string {
        return this.warranty;
    }

}
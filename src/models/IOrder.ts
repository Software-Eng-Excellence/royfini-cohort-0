import { IItem } from "./IItem";

interface Order {
    getItems(): IItem;
    getPrice(): number;
    getQuantity(): number;
    getId(): string;
}
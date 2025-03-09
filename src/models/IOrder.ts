import { IItem } from "./IItem";

interface IOrder {
    getItems(): IItem;
    getPrice(): number;
    getQuantity(): number;
    getId(): string;
}
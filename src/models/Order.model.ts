import { IItem } from "./Item.model";

interface Order{
    getItems(): IItem;
    getPrice(): number;
    getQuantity(): number;
    getId():string;
}
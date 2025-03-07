import { Console } from "console";
import logger from "./util/logger";
import { readCSVFile } from "./util/parsers/csvParser";
import { parseJsonFile } from "./util/parsers/jsonParser";
import { PetOrder } from "models";

async function start() {
  const data = await parseJsonFile<PetOrder>("src/data/pet orders.json");
  data?.forEach((e: PetOrder) => { logger.info("%o", e) })
}
start();

// async function Main(){
//   const data = await readCSVFile("src/data/cake orders.csv", true);
//   data.forEach(row=>{logger.info(row)})
// }

// Main();

// const orders = [
//   { id: 1, item: "Sponge", price: 15 },
//   { id: 2, item: "Chocolate", price: 20 },
//   { id: 3, item: "Fruit", price: 18 },
//   { id: 4, item: "Red Velvet", price: 25 },
//   { id: 5, item: "Coffee", price: 8 },
// ];


// import {
//   FinanceCalculator,
//   ItemValidator,
//   MaxPriceValidator,
//   OrderManagement,
//   PriceValidator,
//   Validator,
// } from "./app";

// const rules = [
//   new PriceValidator(),
//   new MaxPriceValidator(),
//   new ItemValidator(),
// ];

// const orderManager = new OrderManagement(
//   new Validator(rules),
//   new FinanceCalculator()
// );
// for (const order of orders) {
//   orderManager.addOrder(order.item, order.price);
// }

// const newItem = "Marble";
// const newPrice = 22;

// orderManager.addOrder(newItem, newPrice);

// logger.info("Orders after adding a new order: %o", orderManager.getOrders());

// logger.info("Total Revenue:", orderManager.getTotalRevenue());

// logger.info("Average Buy Power: %o", orderManager.getAverageBuyPower());

// const fetchId = 2;
// const fetchedOrder = orderManager.getOrder(fetchId);
// logger.info("Order with ID 2: %o", fetchedOrder);

// const nonExistentId = 10;
// const nonExistentOrder = orderManager.getOrder(nonExistentId);
// logger.info("Order with ID 10 (non-existent): %o", nonExistentOrder);
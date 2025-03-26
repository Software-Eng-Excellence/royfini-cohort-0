import { CSVCakeMapper } from "../../mappers/CakeMapper";
import { CSVCakeOrderMapper } from "../../mappers/Order.mapper";
import { CakeOrder } from "../../models/csv/cakeOrder";
import { IOrder } from "../../models/IOrder";
import { DbException } from "../../util/exceptions/repositoryExceptions";
import { readCSVFile, writeCSVFile } from "../../util/parsers/csvParser";
import { OrderRepository } from "./Order.repository";

export class CakeOrderRepository extends OrderRepository {
  private mapper = new CSVCakeOrderMapper(new CSVCakeMapper());
  constructor(private readonly filePath: string) {
    super();
  }
  protected async load(): Promise<IOrder[]> {
    try {
      //read from file
      const csv = await readCSVFile(this.filePath, true);
      //return the list of objects
      return csv.map((row) => this.mapper.map(row as CakeOrder));
    } catch (error) {
      throw new DbException("Failed to load orders", error as Error);
    }
  }
  protected async save(orders: IOrder[]): Promise<void> {
    try {
      // convert the orders
      const rawItems = orders.map((o) => this.mapper.reverseMap(o));
      // parse.write
      await writeCSVFile(this.filePath, rawItems);
    } catch (error) {
      throw new DbException("Failed to save orders", error as Error);
    }
  }
}

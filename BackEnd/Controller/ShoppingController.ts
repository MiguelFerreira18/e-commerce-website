import { Interface } from "readline";
import Shopping from "../Model/Shopping";
import db from "../src/db";

interface ShoppingController {
  getShopping(req: any, res: any): Promise<void>;
  getShoppingById(req: any, res: any): Promise<void>;
  addShopping(req: any, res: any): Promise<void>;
  updateShopping(req: any, res: any): Promise<void>;
  deleteShopping(req: any, res: any): Promise<void>;
}

interface ShoppingItem {
  id: number,
  buyDate: Date,
  customer: number,
  totalPrice: number,

}

const rowToMapShoppingItem = (row: any[]): ShoppingItem => {
  return {
    id: row[0],
    buyDate: row[1],
    customer: row[2],
    totalPrice: row[3],
  };
}

const shoppingControllerActions: ShoppingController = {
  async getShopping(req: any, res: any): Promise<void> {
    try {
      const shoppingResult = await db.query({
        rowMode: "array",
        text: "SELECT * FROM shopping;",
      });
      const shoppingResultList = shoppingResult.rows.map(rowToMapShoppingItem);
      res.status(200).send(shoppingResultList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getShoppingById(req: any, res: any): Promise<void> {
    try {
      const shoppingResult = await db.query({
        rowMode: "array",
        text: "SELECT * FROM shopping WHERE sh_id = $1;",
        values: [req.params.shoppingId],
      });
      const shopping = shoppingResult.rows.map(rowToMapShoppingItem);
      res.status(200).send(shopping);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addShopping(req: any, res: any): Promise<void> {
    try {
      const shoppingResult = await db.query({
        rowMode: "array",
        text: "INSERT INTO shopping(sh_c_id,sh_buy_date,sh_total_price) VALUES($1,$2,$3) RETURNING sh_id;",
        values: [
          req.body.id,
          req.body.buyDate,
          req.body.customer,
          req.body.totalPrice,
        ],
      });
      res.status(200).send({
        id: shoppingResult.rows[0],
        isSuccessful: true
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async updateShopping(req: any, res: any): Promise<void> {
    try {
      const shoppingResult = await db.query({
        rowMode: "array",
        text: "UPDATE shopping SET sh_c_id = $1, sh_buy_date = $2, sh_total_price = $3 WHERE sh_id = $4;",
        values: [
          req.body.id,
          req.body.buyDate,
          req.body.customer,
          req.body.totalPrice,
          req.params.shoppingId,
          
        ],
      });
      res.status(200).send("Shopping Updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteShopping(req: any, res: any): Promise<void> {
    try {
      const shoppingResult = await db.query({
        rowMode: "array",
        text: "DELETE FROM shopping WHERE sh_id = $1;",
        values: [req.params.shoppingId],
      });
      res.status(200).send("Shopping Deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default shoppingControllerActions;

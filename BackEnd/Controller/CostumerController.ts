import { ok } from "assert";
import Costumer from "../Model/Costumer";
import db from "../src/db";

interface CostumerController {
  getCostumers(req: any, res: any): Promise<void>;
  getCostumerById(req: any, res: any): Promise<void>;
  addCostumer(req: any, res: any): Promise<void>;
  updateCostumer(req: any, res: any): Promise<void>;
  deleteCostumer(req: any, res: any): Promise<void>;
}

const controllerActions: CostumerController = {
  async getCostumers(req: any, res: any): Promise<void> {
    try {
      const costumersPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM costumers;",
      });
      const costumersResult = await costumersPromise;
      console.log("aqui");
      const costumersList = costumersResult.rows.map((row) => {
        console.log("aqui2");
        console.log(row);
        return {
          c_name: row[0],
          c_id: row[1],
          c_mail: row[2],
          c_password: row[3],
          c_address: row[4],
          c_creditnumber: row[5],
          c_wallet: row[6],
          c_isadmin: row[7],
        };
      });
      res.status(200).send(costumersList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getCostumerById(req: any, res: any): Promise<void> {
    try {
      const getSingleCostumerPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM costumers WHERE c_id = $1;",
        values: [req.params.id],
      });
      const costumersResult = await getSingleCostumerPromise;
      const costumer = costumersResult.rows.map((row) => {
        return {
          c_name: row[0],
          c_id: row[1],
          c_mail: row[2],
          c_password: row[3],
          c_address: row[4],
          c_creditnumber: row[5],
          c_wallet: row[6],
          c_isadmin: row[7],
        };
      });
      res.status(200).send(costumer);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addCostumer(req: any, res: any): Promise<void> {
    try {
      const costumer: Costumer = req.body;
      const addCostumerPromise = db.query({
        rowMode: "array",
        text:
          "INSERT INTO costumers (c_name,c_mail,c_password,c_address,c_creditnumber,c_wallet,c_isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7);",
        values: [
          costumer.c_name,
          costumer.c_mail,
          costumer.c_password,
          costumer.c_address,
          costumer.c_creditnumber,
          costumer.c_wallet,
          costumer.c_isadmin,
        ],
      });
      await addCostumerPromise;
      res.status(200).send("Costumer added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }

  },
  async updateCostumer(req: any, res: any): Promise<void> {
    throw new Error("Method not implemented.");
  },
  async deleteCostumer(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  },
};

export default controllerActions;

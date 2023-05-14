import Specifications from "../Model/Specifications";
import db from "../src/db";

interface SpecificationsController {
  getSpecifications(req: any, res: any): Promise<void>;
  getSpecificationsById(req: any, res: any): Promise<void>;
  addSpecifications(req: any, res: any): Promise<void>;
  updateSpecifications(req: any, res: any): Promise<void>;
  deleteSpecifications(req: any, res: any): Promise<void>;
}

interface SpecificationsItem {
  id: number;
  text: string;
  productId: number;
  detailId: number;
}

const mapRowtoSpecificationsItem = (rows: any[]): SpecificationsItem => {
  return {
    id: rows[0],
    text: rows[1],
    productId: rows[2],
    detailId: rows[3],
  };
};

const SpecificationsControllerActions: SpecificationsController = {
  async getSpecifications(req: any, res: any): Promise<void> {
    try {
      const specificationsResult = await db.query({
        rowMode: "array",
        text: "SELECT * FROM specifications;",
      });
      const specificationsResultList = specificationsResult.rows.map(
        mapRowtoSpecificationsItem
      );
      res.status(200).send(specificationsResultList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getSpecificationsById(req: any, res: any): Promise<void> {
    try {
      const specificationsPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM specifications WHERE specs_id = $1;",
        values: [req.params.specificationsId],
      });
      const specificationsResult = await specificationsPromise;
      const specifications = specificationsResult.rows.map(
        mapRowtoSpecificationsItem
      );
      res.status(200).send(specifications);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addSpecifications(req: any, res: any): Promise<void> {
    try {
      const specificationsResult = await db.query({
        rowMode: "array",
        text: "INSERT INTO specifications(specs_text,specs_p_id,specs_s_id) VALUES($1,$2,$3) RETURNING *;",
        values: [req.body.specs_text, req.body.specs_p_id, req.body.specs_s_id],
      });
      const specifications = specificationsResult.rows.map(
        mapRowtoSpecificationsItem
      );
      res.status(200).send(specifications);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async updateSpecifications(req: any, res: any): Promise<void> {
    try {
      const specificationsResult = await db.query({
        rowMode: "array",
        text: "UPDATE specifications SET specs_text = $1, specs_p_id = $2, specs_s_id = $3 WHERE specs_id = $4 RETURNING *;",
        values: [
          req.body.text,
          req.body.productId,
          req.body.detailId,
          req.params.specificationsId,
        ],
      });
      const specifications = specificationsResult.rows.map(
        mapRowtoSpecificationsItem
      );
      res.status(200).send(specifications);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteSpecifications(req: any, res: any): Promise<void> {
    try {
      const specificationsResult = await db.query({
        rowMode: "array",
        text: "DELETE FROM specifications WHERE specs_id = $1 RETURNING *;",
        values: [req.params.specificationsId],
      });
      const specifications = specificationsResult.rows.map(
        mapRowtoSpecificationsItem
      );
      res.status(200).send(specifications);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default SpecificationsControllerActions;

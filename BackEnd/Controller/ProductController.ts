import { ok } from "assert";
import Product from "../Model/Product";
import db from "../src/db";

interface ProductController {
  getProduct(req: any, res: any): Promise<void>;
  getProductById(req: any, res: any): Promise<void>;
  addProduct(req: any, res: any): Promise<void>;
  updateProduct(req: any, res: any): Promise<void>;
  deleteProduct(req: any, res: any): Promise<void>;
}

interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  manufacturer: string;
  quantity: number;
  tagId: number;
}
const mapRowtoProductItem = (rows: any[]): ProductItem => {
  return {
    id: rows[0],
    name: rows[1],
    price: rows[2],
    description: rows[3],
    manufacturer: rows[4],
    quantity: rows[5],
    tagId: rows[6],
  };
};

const productControllerActions: ProductController = {
  async getProduct(req: any, res: any): Promise<void> {
    try {
      const productResult = await db.query({
        rowMode: "array",
        text: "SELECT * FROM product;",
      });
      const productList = productResult.rows.map(mapRowtoProductItem);
      res.status(200).send(productList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getProductById(req: any, res: any): Promise<void> {
    try {
      const productPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM product WHERE p_id = $1;",
        values: [req.params.productId],
      });
      const productResult = await productPromise;
      const product = productResult.rows.map(mapRowtoProductItem);
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addProduct(req: any, res: any): Promise<void> {
    try {
      const productResult = await db.query({
        rowMode: "array",
        text: "INSERT INTO product (p_name, p_price, p_description, p_manufacturer, p_quantity, p_ptag_id) VALUES ($1, $2, $3, $4, $5, $6);",
        values: [
          req.body.name,
          req.body.price,
          req.body.description,
          req.body.manufacturer,
          req.body.quantity,
          req.body.tagId,
        ],
      });
      res.status(201).send("Product added successfully" + productResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async updateProduct(req: any, res: any): Promise<void> {
    try {
      const productResult = await db.query({
        rowMode: "array",
        text: "UPDATE product SET p_name = $1, p_price = $2, p_description = $3, p_manufacturer = $4, p_quantity = $5, p_ptag_id = $6 WHERE p_id = $7;",
        values: [
          req.body.name,
          req.body.price,
          req.body.description,
          req.body.manufacturer,
          req.body.quantity,
          req.body.tagId,
          req.params.productId,
        ],
      });
      res.status(201).send("Product updated successfully" + productResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async deleteProduct(req: any, res: any): Promise<void> {
    try {
      const productResult = await db.query({
        rowMode: "array",
        text: "DELETE FROM product WHERE p_id = $1;",
        values: [req.params.productId],
      });
      res.status(201).send("Product deleted successfully" + productResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default productControllerActions;

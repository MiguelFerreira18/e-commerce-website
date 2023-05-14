import { ok } from "assert";
import ProductTag from "../Model/ProductTag";
import db from "../src/db";

interface ProductTagController {
  getProductTags(req: any, res: any): Promise<void>;
  getProductTagById(req: any, res: any): Promise<void>;
  addProductTag(req: any, res: any): Promise<void>;
  updateProductTag(req: any, res: any): Promise<void>;
  deleteProductTag(req: any, res: any): Promise<void>;
}

interface ProductTagItem{
    id:number,
    tag:string,
}
const mapToRowProductItem = (row: any[]): ProductTagItem =>{
    return {
        id: row[0],
        tag: row[1],
    };
}

const productTagControllerActions: ProductTagController = {
  async getProductTags(req: any, res: any): Promise<void> {
    try {
      const productTagsPromise = db.query({
        rowMode: "array",
        text: "SELECT * FROM producttag;",
      });
      const productTagsResult = await productTagsPromise;
      const productTagsList = productTagsResult.rows.map(mapToRowProductItem);
      res.status(200).send(productTagsList);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async getProductTagById(req: any, res: any): Promise<void> {
    try {
        const productTagPromise = db.query({
            rowMode: "array",
            text: "SELECT * FROM producttag WHERE ptag_id = $1;",
            values: [req.params.productTagId],
        });
        const productTagResult = await productTagPromise;
        const productTag = productTagResult.rows.map(mapToRowProductItem);
        res.status(200).send(productTag);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  async addProductTag(req: any, res: any): Promise<void> {
    try{
        const productTag: ProductTag = req.body;
        const addProductTagPromise = db.query({
            rowMode: "array",
            text: "INSERT INTO producttag (ptag_tag) VALUES ($1);",
            values: [productTag.tag],
        });
        const addProductTagResult = await addProductTagPromise;
        res.status(201).send("ProductTag added successfully" + addProductTagPromise);
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  },
  async updateProductTag(req: any, res: any): Promise<void> {
    try{
        const productTag: ProductTag = req.body;
        const updateProductTagResult =await db.query({
            rowMode: "array",
            text: "UPDATE producttag SET ptag_tag = $1 WHERE ptag_id = $2;",
            values: [productTag.tag, req.params.productTagId],
        });
        res.status(200).send("ProductTag updated successfully");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  },
  async deleteProductTag(req: any, res: any): Promise<void> {
    try{
        const deleteProductTagResult = await db.query({
            rowMode: "array",
            text: "DELETE FROM producttag WHERE ptag_id = $1;",
            values: [req.params.productTagId],
        });
        res.status(200).send("ProductTag deleted successfully");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  },
};
export default productTagControllerActions;
import Specification from '../Model/Specification';
import db from '../src/db'

interface SpecificationController {
    getSpecification(req: any, res: any): Promise<void>;
    getSpecificationById(req: any, res: any): Promise<void>;
    addSpecification(req: any, res: any): Promise<void>;
    updateSpecification(req: any, res: any): Promise<void>;
    deleteSpecification(req: any, res: any): Promise<void>;
}


interface SpecificationItem {
    id: number,
    title: string
}
const rowToMapSpecificationItem = (row: any[]):SpecificationItem =>{
    return{
        id:row[0],
        title:row[1]
    }
}

const SpecificationControllerActions: SpecificationController = {
    async getSpecification(req: any, res: any): Promise<void> {
        try {
            const specificationResult = await db.query({
                rowMode: "array",
                text: "SELECT * FROM specification;",
            });
            const specificationResultList = specificationResult.rows.map(rowToMapSpecificationItem);
            res.status(200).send(specificationResultList);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    async getSpecificationById(req: any, res: any): Promise<void> {
        try {
            const specificationResult = await db.query({
                rowMode: "array",
                text: "SELECT * FROM specification WHERE s_id = $1;",
                values: [req.params.specificationId],
            });
            const specification = specificationResult.rows.map(rowToMapSpecificationItem);
            res.status(200).send(specification);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    async addSpecification(req: any, res: any): Promise<void> {
        try {
            const specificationResult = await db.query({
                rowMode: "array",
                text: "INSERT INTO specification(s_title) VALUES($1) RETURNING *;",
                values: [req.body.title],
            });
            const specification = specificationResult.rows.map(rowToMapSpecificationItem);
            res.status(200).send(specification);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    async updateSpecification(req: any, res: any): Promise<void> {
        try {
            const specificationResult = await db.query({
                rowMode: "array",
                text: "UPDATE specification SET s_title = $1 WHERE s_id = $2 RETURNING *;",
                values: [req.body.title, req.params.specificationId],
            });
            const specification = specificationResult.rows.map(rowToMapSpecificationItem);
            res.status(200).send(specification);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    async deleteSpecification(req: any, res: any): Promise<void> {
        try {
            const specificationResult = await db.query({
                rowMode: "array",
                text: "DELETE FROM specification WHERE s_id = $1 RETURNING *;",
                values: [req.params.specificationId],
            });
            const specification = specificationResult.rows.map(rowToMapSpecificationItem);
            res.status(200).send(specification);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default SpecificationControllerActions

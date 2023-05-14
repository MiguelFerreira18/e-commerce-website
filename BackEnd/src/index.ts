import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import costumerRoutes from "../routes/costumerRoutes";
import productTagRoutes from "../routes/ProductTagRoutes";
import productRoutes from "../routes/ProductRoutes"
import shoppingRoutes from "../routes/ShoppingRoutes"
import shoppingListRoutes from "../routes/ShoppingListRoutes"
import specificationRoutes from "../routes/SpecificationRoutes"
import specificationsRoutes from '../routes/SpecificationsRoutes';

const app: Express = express();
const port = 3000;
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use("/costumer",costumerRoutes);
app.use("/productTag",productTagRoutes);
app.use("/product",productRoutes);
app.use("/shopping",shoppingRoutes);
app.use("/shoppingList",shoppingListRoutes);
app.use("/specification",specificationRoutes);//Detalhe em si
app.use("/specifications",specificationsRoutes);//Conjunto de detalhes

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
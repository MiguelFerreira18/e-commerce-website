import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import costumerRoutes from "../routes/costumerRoutes";
import productTagRoutes from "../routes/ProductTagRoutes";


const app: Express = express();
const port = 3000;
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use("/costumer",costumerRoutes);
app.use("/productTag",productTagRoutes);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
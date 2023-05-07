import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import costumerRoutes from "../routes/costumerRoutes";


const app: Express = express();
const port = 3000;
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use("/costumer",costumerRoutes);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
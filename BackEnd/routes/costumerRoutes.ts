import express, { Express, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

//CRUD FOR COSTUMERS

//CREATE
router.post('/', function (req:Request, res:Response) {
  res.send('POST request to the homepage')
})

//READ

//UPDATE

//DELETE





export default router;

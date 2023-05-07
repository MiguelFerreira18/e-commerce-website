import express, { Express, Request, Response } from 'express';
import CostumerControllerActions from '../Controller/CostumerController'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

//CRUD FOR COSTUMERS

//CREATE
router.post('/create',CostumerControllerActions.addCostumer);

//READ
router.get('/read',CostumerControllerActions.getCostumers);

//UPDATE

//DELETE





export default router;

import express, { Express, Request, Response } from 'express';
import CustomerControllerActions from '../Controller/CustomerController'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('CustomerController');
    }
);

//CRUD FOR COSTUMERS

//CREATE
router.post('/create',CustomerControllerActions.addCustomer);
//READ
router.get('/read',CustomerControllerActions.getCustomers);
router.get('/read/:customerId',CustomerControllerActions.getCustomerById);
//UPDATE
router.put('/update/:customerId',CustomerControllerActions.updateCustomer);
//DELETE
router.delete('/delete/:customerId',CustomerControllerActions.deleteCustomer);


export default router;

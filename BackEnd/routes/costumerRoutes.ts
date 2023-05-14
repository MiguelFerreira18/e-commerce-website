import express, { Express, Request, Response } from 'express';
import CustomerControllerActions from '../Controller/CustomerController'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('CustomerController');
    }
);

//CRUD FOR COSTUMERS
router.post('/create',CustomerControllerActions.addCustomer); //CREATE
router.get('/read',CustomerControllerActions.getCustomers); //READ ALL
router.get('/read/:customerId',CustomerControllerActions.getCustomerById); //READ ONE
router.put('/update/:customerId',CustomerControllerActions.updateCustomer); //UPDATE
router.delete('/delete/:customerId',CustomerControllerActions.deleteCustomer); //DELETE


export default router;

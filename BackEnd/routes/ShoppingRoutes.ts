import express from 'express';
import ShoppingController from '../Controller/ShoppingController';

const router = express.Router();



router.get('/', (req, res) => {
    res.send('ShoppingController');   
}
);

//CRUD FOR SHOPPING
router.post('/create',ShoppingController.addShopping); //CREATE
router.get('/read',ShoppingController.getShopping); //READ ALL
router.get('/read/:shoppingId',ShoppingController.getShoppingById); //READ ONE
router.put('/update/:shoppingId',ShoppingController.updateShopping); //UPDATE 
router.delete('/delete/:shoppingId',ShoppingController.deleteShopping); //DELETE


export default router;
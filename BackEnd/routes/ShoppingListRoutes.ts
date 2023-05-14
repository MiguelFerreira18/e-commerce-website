import express from 'express';
import ShoppingListController from '../Controller/ShoppingListController';

const router = express.Router();



router.get('/', (req, res) => {
    res.send('ShoppingListController');
}
);

//CRUD FOR SHOPPINGLIST
router.post('/create',ShoppingListController.addShoppingList); //CREATE
router.get('/read',ShoppingListController.getShoppingList); //READ ALL
router.get('/read/:shoppingListId',ShoppingListController.getShoppingListById); //READ ALL
router.put('/update/:shoppingListId',ShoppingListController.updateShoppingList); //UPDATE
router.delete('/delete/:shoppingListId',ShoppingListController.deleteShoppingList); //DELETE








export default router;
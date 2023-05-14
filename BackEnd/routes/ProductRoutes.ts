import express, { Express, Request, Response } from 'express';
import productControllerActions from '../Controller/ProductController'
const router = express.Router();


router.get('/', (req, res) => {
    res.send('ProductController');
}
);

//CRUD FOR PRODUCTS
router.post('/create', productControllerActions.addProduct); //CREATE
router.get('/read',productControllerActions.getProduct); //READ ALL
router.get('/read/:productId',productControllerActions.getProductById); //READ ONE
router.put('/update/:productId',productControllerActions.updateProduct); //UPDATE
router.delete('/delete/:productId',productControllerActions.deleteProduct); //DELETE





export default router;

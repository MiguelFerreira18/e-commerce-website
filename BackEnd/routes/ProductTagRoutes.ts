import express, { Express, Request, Response } from 'express';
import ProdcutTagController from '../Controller/ProductTagController'
const router = express.Router();


router.get('/', (req, res) => {
    res.send('ProductTagController');
    
});

//CRUD FOR PRODUCTTAGS
router.post('/create',ProdcutTagController.addProductTag); //CREATE
router.get('/read',ProdcutTagController.getProductTags); //READ ALL
router.get('/read/:productTagId',ProdcutTagController.getProductTagById); //READ ONE
router.put('/update/:productTagId',ProdcutTagController.updateProductTag); //UPDATE
router.delete('/delete/:productTagId',ProdcutTagController.deleteProductTag); //DELETE

export default router;

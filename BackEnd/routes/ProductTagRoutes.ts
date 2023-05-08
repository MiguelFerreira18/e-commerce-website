import express, { Express, Request, Response } from 'express';
import ProdcutTagController from '../Controller/ProductTagController'
const router = express.Router();


router.get('/', (req, res) => {
    res.send('ProductTagController');
    
});

//CRUD FOR PRODUCTTAGS
//CREATE
router.post('/create',ProdcutTagController.addProductTag);
//READ
router.get('/read',ProdcutTagController.getProductTags);
router.get('/read/:productTagId',ProdcutTagController.getProductTagById);
//UPDATE
router.put('/update/:productTagId',ProdcutTagController.updateProductTag);
//DELETE
router.delete('/delete/:productTagId',ProdcutTagController.deleteProductTag);

export default router;

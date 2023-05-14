import express from 'express'
import SpecificationControllerActions from '../Controller/SpecificationController'

const router = express.Router()

router.post('/create', SpecificationControllerActions.addSpecification) //CREATE
router.get('/read', SpecificationControllerActions.getSpecification) //READ ALL
router.get('/read/:specificationId', SpecificationControllerActions.getSpecificationById) //READ ONE
router.put('/update/:specificationId', SpecificationControllerActions.updateSpecification) //UPDATE
router.delete('/delete/:specificationId', SpecificationControllerActions.deleteSpecification) //DELETE

export default router
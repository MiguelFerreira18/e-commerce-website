import express from 'express'
import SpecificationsControllerActions from '../Controller/SpecifcationsController'

const router = express.Router()


router.post('/create', SpecificationsControllerActions.addSpecifications) //CREATE
router.get('/read', SpecificationsControllerActions.getSpecifications) //READ ALL
router.get('/read/:specificationsId', SpecificationsControllerActions.getSpecificationsById) //READ ONE
router.put('/update/:specificationsId', SpecificationsControllerActions.updateSpecifications) //UPDATE
router.delete('/delete/:specificationsId', SpecificationsControllerActions.deleteSpecifications) //DELETE

export default router


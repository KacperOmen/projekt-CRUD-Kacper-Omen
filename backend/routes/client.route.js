import express from 'express'
import {getClients, getClient, postClient, updateClient, deleteClient} from '../controllers/client.controller.js'
import {userAuth} from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', userAuth, getClients)

router.get('/:id', userAuth, getClient)

router.post('/', userAuth, postClient)

router.put('/:id', userAuth, updateClient)

router.delete('/:id', userAuth, deleteClient)

export default router
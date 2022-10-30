import express from 'express';
import aa from 'express-async-await';
import { getMessageByUserId, createMessage, createMessageToAll } from './message';
const router = aa(express.Router());


router.get('/:id',  getMessageByUserId);
router.post('/:id',  createMessage);
router.post('/',  createMessageToAll);
module.exports = router;
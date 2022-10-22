import express from 'express';
import aa from 'express-async-await';
import { createItem, getItemBySearchWord, getItemById, getItemByUserId } from './item';
const router = aa(express.Router());

router.get('/member/:id', getItemByUserId);
router.get('/:id', getItemById);
router.get('/', getItemBySearchWord);
router.post('/', createItem);


module.exports = router;
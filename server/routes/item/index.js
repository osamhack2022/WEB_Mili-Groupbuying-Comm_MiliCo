import express from 'express';
import aa from 'express-async-await';
import { createItem, getItemBySearchWord, getItemById, getItemByUserId, updateStage, updateDue, updateEggPoint, updateMemberLimit } from './item';
const router = aa(express.Router());


router.post('/stage/:id', updateStage);
router.post('/due/:id', updateDue);
router.post('/member/:id', updateMemberLimit);
router.post('/egg/:id', updateEggPoint);
router.get('/member/:id', getItemByUserId);
router.get('/:id', getItemById);
router.get('/', getItemBySearchWord);
router.post('/', createItem);


module.exports = router;
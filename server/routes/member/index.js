import express from 'express';
import aa from 'express-async-await';
import { getMembersByItemId, enrollMember, updatePayment, updateAccept } from './member';
const router = aa(express.Router());


router.post('/payment', updatePayment);
router.post('/accept', updateAccept);
router.post('/:id', enrollMember);
router.get('/:id', getMembersByItemId);

module.exports = router;
import express from 'express';
import aa from 'express-async-await';
import { getMembersByItemId, enrollMember } from './member';
const router = aa(express.Router());

router.post('/:id', enrollMember);
router.get('/:id', getMembersByItemId);

module.exports = router;
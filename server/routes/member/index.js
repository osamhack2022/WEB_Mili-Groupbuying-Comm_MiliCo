import express from 'express';
import aa from 'express-async-await';
import { printHello } from './member';
const router = aa(express.Router());

router.get('/test', printHello);

module.exports = router;
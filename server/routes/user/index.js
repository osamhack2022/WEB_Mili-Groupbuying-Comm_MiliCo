import express from 'express';
import aa from 'express-async-await';
import { getUsers, createUsers, login, getSession, logout } from './user';
const router = aa(express.Router());

router.get('/', getUsers);
router.get('/sessions', getSession);
router.post('/', createUsers);
router.post('/sessions', login)
router.delete('/sessions', logout)

module.exports = router;
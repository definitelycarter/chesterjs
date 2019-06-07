import express from 'express';
import environment from './environment';
import scripts from './scripts';
import suites from './suites';

const router = express.Router();

router.use('/env', environment);
router.use('/suites', suites);
router.use('/scripts', scripts);

export default router;

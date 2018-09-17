import express from 'express';

import vRoutes from './v1';

import { Config } from '../config/app'
const router = express.Router();

router.get('/',(req,res)=>{

    res.render('index');

    // res.status(200).json({
    //     APP_NAME:Config.APP_NAME,
    //     APP_VERSION:Config.APP_VERSION
    // });
});
router.use('/v1',vRoutes);

export default router;

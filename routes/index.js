import express from 'express';

import vRoutes from '../app/Module/Upload/UploadRoutes';

import { Config } from '../config/app'
const router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        APP_NAME:Config.APP_NAME,
        APP_VERSION:Config.APP_VERSION
    });
});
router.use('/',vRoutes);

export default router;

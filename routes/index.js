import express from 'express';

import vRoutes from '../app/Module/Upload/UploadRoutes';

const router = express.Router();


router.use('/upload',vRoutes);

export default router;

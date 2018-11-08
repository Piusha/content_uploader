import express from 'express';
import  { UploadCntrl }  from './Controller/';
import { AuthMiddleware } from '../../Middleware/AuthMiddleware';

const router = express.Router();


router.post('/media/:type/:entity_tag/:entity_id/:meta_prefix',UploadCntrl.upload);

router.get('/media/:entity_tag/:meta_prefix/:id?',UploadCntrl.retrieve);




export default router;

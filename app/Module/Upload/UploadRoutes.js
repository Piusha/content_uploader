import express from 'express';
import  { UploadCntrl }  from './Controller/';
const router = express.Router();


router.post('/upload/:type/:entity_tag/:entity_id/:meta_prefix',UploadCntrl.upload);

router.get('/upload/:entity_tag/:meta_prefix/:id?',UploadCntrl.retrieve);





export default router;

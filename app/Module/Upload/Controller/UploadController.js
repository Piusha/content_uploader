'use strict'

import mongoose  from 'mongoose';

import { GCPCDNProvider } from '../../../Providers/GCPCDNProvider'; 
import { UploadService } from '../Services/UploadService';
import { ImageProvider } from  '../../../Providers/ImageProvider';


export default class UploadController{

    constructor(){
        this._gcpcdn = new GCPCDNProvider();
        this._upload = new UploadService();

    }

    upload = async (req,res,next)=>{
        try{


            let _entityTag      = req.params.entity_tag;
            let _entityId       = req.params.entity_id;
            let _metaPrefix     = req.params.meta_prefix;


            if(!req.files.content){
                res.status(400).json({
                    status:'error',
                    error:'Attribute name should be content in form field'
                })
            }
           
            
            let  _imageProvider  = ImageProvider.getBufferdImageFromRequest(req.files.content);
            
            let _fileName = (req.body.file_name)?req.body.file_name:_imageProvider.newFileName;

            this._gcpcdn.setUploadFileName(_imageProvider.imageBuffer)
                        .setMetaData(_entityTag,_entityId,_metaPrefix)
                        .setFileName(_fileName)
                        .upload({contentType: _imageProvider.mimeType})
           

                        
            let t = await this._upload.save({
                entity_id:_entityId,
                entity_tag: _entityTag,
                meta_prefix:_metaPrefix,
                file_name:_fileName
            })


            res.status(200).json(t)                    

        }catch(ex){
            console.log(ex)
            res.status(500).json(ex)
        }

    }


    retrieve = async (req,res,next)=>{

        try{


            if(!req.query.entity_ids){
                return res.status(401).json({
                    status:'error',
                    message:'Specify the entity ids'
                })
            }

            let _entityIds = req.query.entity_ids.split(',')

            let options = {
                
                entity_tag: req.params.entity_tag,
                meta_prefix:req.params.meta_prefix,
                entity_id:{'$in': _entityIds}

            }


            if(req.params.id){
                options._id = mongoose.Types.ObjectId(req.params.id)
            }
            let _uploads = await this._upload.retrieve(options)

            return res.status(200).json(_uploads)        

        }catch(ex){
            
            console.log(ex);
            res.status(500).json(ex)
        }


    }
}

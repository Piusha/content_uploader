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


            const _entityTag      = req.params.entity_tag;
            const _entityId       = req.params.entity_id;
            const _metaPrefix     = req.params.meta_prefix;

            let _content          = null;
            let _isBase64 = false;
            


            if(req.params.type == 'base64'){

                if(!req.body.content || req.body.content == " "){

                    return res.status(400).json({
                        status:'error',
                        error:'Attribute name should be content in form field and it cannot  be empty'
                    })
                }
                _isBase64 = true;
                _content = req.body.content;


            } else if(req.params.type == 'file'){

                if(!req.files.content ||  req.files.content == " "){

                    return res.status(400).json({
                        status:'error',
                        error:'Attribute name should be content in form field and it cannot  be empty'
                    })
                }

                _isBase64 = false;
                _content = req.files.content;
               
            }


            const _imageProvider = ImageProvider.getImageBuffer(_isBase64, _content);
            
            let _fileName = (req.body.file_name)?req.body.file_name:_imageProvider.newFileName;

            this._gcpcdn.setUploadFileName(_imageProvider.imageBuffer)
                        .setMetaData(_entityTag,_entityId,_metaPrefix)
                        .setFileName(_fileName);
			
			await this._gcpcdn.upload({contentType: _imageProvider.mimeType})

			if(_metaPrefix == 'profile_image'){

				await this._upload.update({
					entity_id:_entityId
				},{
					entity_tag: _entityTag,
					meta_prefix:_metaPrefix,
					file_name:_fileName
				},{upsert:true});
				    
			}else{
				await this._upload.save({
					entity_id:_entityId,
					entity_tag: _entityTag,
					meta_prefix:_metaPrefix,
					file_name:_fileName
				})
			}

			const options = {
                
                entity_tag: _entityTag,
                meta_prefix:_metaPrefix,
                entity_id:_entityId

            }    
            

			let _uploads = await this._upload.retrieve(options)

			
            return res.status(200).json(_uploads)        
                        

        }catch(ex){
            console.log(ex)
            return res.status(500).json(ex)
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

            const _entityIds = req.query.entity_ids.split(',')


            const options = {
                
                entity_tag: req.params.entity_tag,
                meta_prefix:req.params.meta_prefix,
                entity_id:{'$in': _entityIds}

            }


            if(req.params.id){
                options._id = mongoose.Types.ObjectId(req.params.id)
            }
            const _uploads = await this._upload.retrieve(options)

            return res.status(200).json(_uploads)        

        }catch(ex){
            
            console.log(ex);
            res.status(500).json(ex)
        }


    }
}

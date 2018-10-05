'use strict'

import { Config } from '../../../../config/app';

export class UploadDecorator{

    constructor(resultSet){
        if(resultSet){
            this.resultSet = resultSet;
        }
        
    }

    getAsArray(){

        let _decoratedUploads = this.resultSet.map( (result)=>{
		  
			const out = {};
			out[result._id] = this.getAsObject(result);
            return out;
        })

        return _decoratedUploads;
    }

    getAsObject(result){

        let _endpoint = [
            Config.CDN_END_POINT,
            Config.BUCKET_NAME,
            Config.APP_ENV,
            result.entity_tag,
            result.entity_id,
            result.meta_prefix,
            result.file_name
        ].join('/')

        return {
			
			upload_id:result._id,
			entity_id:result.entity_id,
			meta_prefix:result.meta_prefix,
            public_url:_endpoint
        }
    }
}
'use strict'

import { Config } from '../../../../config/app';

export class UploadDecorator{

    constructor(resultSet){
        if(resultSet){
            this.resultSet = resultSet;
        }
        
    }

    getAsArray(){
		const out = {};
        this.resultSet.forEach(result => {
			
			
				if(!out.hasOwnProperty(result.entity_id )){
					
					out[result.entity_id]=[];
				}
				
				out[result.entity_id].push(this.getAsObject(result));
				
		});

        return out;
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
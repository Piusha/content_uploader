import { Config } from '../../config/app';

export class UploadDecorator{

    constructor(resultSet){
        if(resultSet){
            this.resultSet = resultSet;
        }
        
    }

    getAsArray(){

        let _decoratedUploads = this.resultSet.map( (result)=>{
          
            return this.getAsObject(result);

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
            uploadId:result._id,
            public_url:_endpoint
        }
    }
}
import { Config } from '../../config/app';


export class UploadDecorator{

    constructor(upload){
        console.log(upload)
        Object.assign(this,upload);
    }

    //https://storage.googleapis.com/del_contents/DEV/user/11/profile/tttttttt.jpg
    getPublicUrl(){
        let _endpoint = [
            Config.CDN_END_POINT,
            Config.BUCKET_NAME,
            Config.APP_ENV,
            this.entity_tag,
            this.entity_id,
            this.meta_prefix,
            this.file_name
        ]
        return _endpoint.join('/');
    }
}
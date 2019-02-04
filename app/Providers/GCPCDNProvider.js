/**
 * Google Upload provider
 */
import { Storage } from '@google-cloud/storage';

import { Config } from '../../config/app';


export class GCPCDNProvider{

    constructor(){

        this.storage = new Storage({
            projectId: Config.PROJECT_ID,
            keyFilename: Config.APP_KEY_LOCATION
        });

        this.bucketName = this.storage.bucket(Config.BUCKET_NAME)

    }

    /**
     * Set Upload file name
     * @param {string} uploadFileName
     */
    setUploadFileName= (uploadFileName)=>{

        this.uploadFileName = uploadFileName;

        return this;

    }
   
    /** 
     *  If entityTag is User then entityId will be User ID
     *  then prefix will be banner Image or profile image
     *  
     *  If meta is Post then entityId will be postId
     *  then metaPrefix will be post image or post vedio
     * 
     * @param {string} metaTag 
     * @param {string} entityId
     * @param {string} metaPrefix
     */
    setMetaData = (entityTag,entityId,metaPrefix)=>{

        this.uploadMetaData = entityTag+'/'+entityId+'/'+metaPrefix;

        return this;

    }

    /**
     * Set Image path
     * @param {string} fileName 
     */
    setFileName = (fileName) => {

        this.fileName = fileName;
        
        return this;
 
    }
 
    getDestination = () =>{

        let _destinations =[
            Config.APP_ENV,
            this.uploadMetaData,
            this.fileName
        ] 

        return '/'+_destinations.join('/');
    }

    /**
     * Get GCP File path
     */
    getGCPFilePath =() =>{

        return this.bucketName.file(this.getDestination());

    }
    
    upload = async (options = {}) => {
       
        return await this.getGCPFilePath().save(this.uploadFileName, {
            metadata: options,
            public: true,
            validation: 'md5'
        });

    }




    



}
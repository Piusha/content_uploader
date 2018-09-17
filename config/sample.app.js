

/**
* Data base connection string 
* TODO : Configure User name and password
*/
const DB_CONNECTION_STRING = {
 'DEV':'',
 'QA':'',
 'PROD':'',
};

const CDN_END_POINT = {
    'DEV':'',
    'QA':'',
    'PROD':'',
}
const APP_ENV = (process.env.APP_ENV) || 'DEV';


export const Config = {

    APP_ENV : APP_ENV,

    
    APP_VERSION:'v1',
    APP_NAME:'Media Uploader',
    

    PROJECT_ID:'',
    APP_KEY_LOCATION:'',
    BUCKET_NAME:'',
    DB_CONNECTION_STRING:DB_CONNECTION_STRING[APP_ENV],
    CDN_END_POINT:CDN_END_POINT[APP_ENV]


}
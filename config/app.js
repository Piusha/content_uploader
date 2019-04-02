

/**
* Data base connection string 
*/
const DB_CONNECTION_STRING = {
	'DEV': 'mongodb://delenta_enigma:xyz123@enigma.db.delenta.com:27017/delenta_dev',
	'QA': 'mongodb://delenta_enigma:xyz123@enigma.db.delenta.com:27017/delenta_dev',
	'PROD': '',
};

const CDN_END_POINT = {
	'DEV': 'https://storage.googleapis.com',
	'QA': 'https://storage.googleapis.com',
	'PROD': '',
}
const APP_ENV = (process.env.NODE_ENV) || 'QA';

console.log("APP RUNING IN :", process.env.PORT)

export const Config = {

	APP_ENV: APP_ENV,
	APP_ENC_KEY: 'UzWN8TwgN4vTaO53b1IJ',
	APP_VERSION: 'v1',
	APP_NAME: 'Media Uploader',


	PROJECT_ID: 'delenta-1532372869718',
	APP_KEY_LOCATION: '/delenta/devops/Delenta-535b4c729172.json',
	BUCKET_NAME: 'del_contents',

	DB_CONNECTION_STRING: DB_CONNECTION_STRING[APP_ENV],
	CDN_END_POINT: CDN_END_POINT[APP_ENV]


}
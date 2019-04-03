# Google Cloud Content unloader

This tool can be use for upload content to the Google cloud storage.

## Application state steps

1. Clone the `GCPCDN-Content-Uploader` repository 
2. npm install  or yarn
3. Change the configurations as follows

	PROJECT_ID : "Your Google Project ID",
	APP_KEY_LOCATION: 'App key location (json file) that generated when creating a google project',
	BUCKET_NAME: 'Bucket name',


## How to use

There are 2 main routes

	POST /media/:type/:entity_tag/:entity_id/:meta_prefix
	
	:type = Base64 Or file
	:entity_tag = This can be any entity name i.e `User` if you are uploading users related contents
	:entity_id = Entity Id i.e user_id 
	:meta_prefix = i.e if you are uploading profile images meta prefix can be 'profile_Image`

	GET /media/:entity_tag/:meta_prefix/:id? 

	:entity_tag = This can be any entity name i.e `User` if you are uploading users related contents
	:entity_id = Entity Id i.e user_id
	:meta_prefix = i.e if you are uploading profile images meta prefix can be 'profile_Image` 
	:id = <Optional> if you want to get specific content you can pass content id along with it


Thats it

AWS S3 implementation will be available soon
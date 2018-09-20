import mimeTypes from 'mimetypes';
import randomstring  from 'randomstring';

export class ImageProvider {

    /**
     * Get Image as buffer
     * @param {string} type 
     * @param {*} content 
     */
    static getImageBuffer (isBase64, content){

        if(isBase64){

            return ImageProvider.base64ToBuffer(content)
        }else{

            return ImageProvider.fileToBuffer(content)
        }
       
    }

    /**
     * Convert Base64 image as buffer
     * @param {*} base64Image 
     */
    static base64ToBuffer(base64Image){

        const _mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

        const _base64EncodedImageString = base64Image.replace(/^data:image\/\w+;base64,/, '');
        
        const _imageBuffer = new Buffer(_base64EncodedImageString, 'base64');

        const _newFileName = randomstring.generate()+'.'+mimeTypes.detectExtension(_mimeType)

        return {
            mimeType:_mimeType,
            imageBuffer:_imageBuffer,
            newFileName:_newFileName
        }
    }
    
   

    /**
     * Convert File to Buffer
     * @param {*} file 
     */
    static fileToBuffer (file){

        const  _mimeType = file.mimetype

        const  _newFileName = randomstring.generate()+'.'+mimeTypes.detectExtension(_mimeType);

        const  _imageBuffer = file.data;

        return {
            mimeType:_mimeType,
            imageBuffer:_imageBuffer,
            newFileName:_newFileName
        }
    }

    
}
import mimeTypes from 'mimetypes';
import randomstring  from 'randomstring';

export class ImageProvider {
    
    static getImageBuffer (base64Image){

        let _mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];

        let _base64EncodedImageString = base64Image.replace(/^data:image\/\w+;base64,/, '');
        
        let _imageBuffer = new Buffer(_base64EncodedImageString, 'base64');

        let _newFileName = randomstring.generate()+'.'+mimeTypes.detectExtension(_mimeType)

        return {
            mimeType:_mimeType,
            imageBuffer:_imageBuffer,
            newFileName:_newFileName
        }
    }

    static getBufferdImageFromRequest (content){

        let _mimeType = content.mimetype

        let _newFileName = randomstring.generate()+'.'+mimeTypes.detectExtension(_mimeType);

        let _imageBuffer = content.data;

        return {
            mimeType:_mimeType,
            imageBuffer:_imageBuffer,
            newFileName:_newFileName
        }
    }

    
}
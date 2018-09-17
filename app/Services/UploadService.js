
import { Upload } from '../Schemas/Upload';
import { Config } from '../../config/app';
import { UploadDecorator } from '../Decorators/UploadsDecorator';


export class UploadService {

    save = async (data) =>{
        try{

          let upload = new Upload(data);

          let _uploadedContent = await upload.save();

          let _uploadDecorator = new UploadDecorator();

          return await _uploadDecorator.getAsObject(_uploadedContent);

        }catch(ex){

            console.log(ex);
            return null;

        }
    }

    retrieve = async (parameter,decorator = {})=>{

      try{

        let _uploads =  await Upload.find(parameter).select(decorator).exec();

        let _uploadDecorator = new UploadDecorator(_uploads);

       // console.log(_decoratedUploads)

        return await _uploadDecorator.getAsArray();

      }catch(ex){
        
        console.log(ex);
      }



    }


}

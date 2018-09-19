'use strict'

import mongoose, { Schema } from 'mongoose';

const collection_name = 'uploads';

export const UploadSchema = new Schema({

      entity_id: {
        //type: Schema.Types.ObjectId,
        type: String,
        required: true,
      },
  
      entity_tag: {
        type: String,
        required: true,
      },

      meta_prefix:{
        type: String,
        required: true,
      },

      file_name:{
        type: String,
        required: true,
      },
      
      created_at: { 
        type: Date, 
        default: Date.now
      }


},{ collection: collection_name });



export const Upload =  mongoose.model('Upload', UploadSchema);

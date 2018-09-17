import mongoose from 'mongoose';

import { Config } from '../config/app';


export default class MongoConnect {

    constructor(){

        
        console.log()
        try{
            console.log('Connected to '+Config.DB_CONNECTION_STRING)
            mongoose.connect(
                Config.DB_CONNECTION_STRING,
                {
                  useNewUrlParser: true,
                  // sets how many times to try reconnecting
                  reconnectTries: Number.MAX_VALUE,
                  // sets the delay between every retry (milliseconds)
                  reconnectInterval: 1000
                }
            );
        }catch(ex){
            console.log(ex)
        }
       
    }


}

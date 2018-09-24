
import jwt from 'jsonwebtoken'
import { Config } from '../../config/app';

export class AuthMiddleware {

	static generateToken = async (payload) =>{

		
		return await jwt.sign(payload, Config.APP_ENC_KEY, { expiresIn: '360d' });
	}

	static authValidation = async (req,res,next) =>{

		try{

			const bearerHeader = req.headers['authorization'];
			// Check if bearer is undefined
			if(typeof bearerHeader == 'undefined') {

				res.status(403).json({
					status:'error',
					error:'Invalid Token or You havent set oauth token'
				});
			}

			const bearer = bearerHeader.split(' ');

			const bearerToken = bearer[1];

			const authData = jwt.verify(bearerToken, Config.APP_ENC_KEY);

			req.auth = authData;
			
			next();

		}catch(error){
			
			res.status(403).json({
				status:'error',
				error:'Invalid Token or You havent set oauth token'
			});
		}
		
	}
}
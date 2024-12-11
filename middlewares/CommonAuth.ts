import { Request, NextFunction, Response } from 'express'
import { AuthPayload } from '../dto/Auth.dto';
import { validateSignature } from '../utility';

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload 
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const signature = await validateSignature(req);
    if(signature){
         next();
         return;
    }else{
         res.status(401).json({message :'User not authenticated'});
         return;
        
    }
}
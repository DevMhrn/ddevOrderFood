import express, {Request, Response, NextFunction } from 'express';
import { createNewVendor, getVendor, getVendorById} from '../controllers'





const router = express.Router();    

router.get('/vendor', getVendor);
router.get('/vendor/:id', getVendorById); 
router.post('/vendor', createNewVendor); // Fixed missing closing parenthesis
  
router.get('/',(req: Request, res: Response, next: NextFunction)  => {
    res.json({message: 'Hello from Admin route'});
});



export {router as AdminRouter};

import express, {Request, Response, NextFunction} from 'express';
import { VendorLogin, getVendorProfile } from '../controllers';
import { Authenticate } from '../middlewares/CommonAuth';
const router = express.Router();

router.get('/login', VendorLogin);
// router.use(Authenticate);
router.get('/profile',Authenticate,  getVendorProfile);  // Fixed missing closing parenthesis






router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: ' Hello Vendor Route' });
});

export {router as VendorRoute};
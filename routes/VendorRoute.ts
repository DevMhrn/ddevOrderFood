import express, {Request, Response, NextFunction} from 'express';
import { VendorLogin, getVendorProfile, updateVendorProfile } from '../controllers';
import { Authenticate } from '../middlewares/CommonAuth';
const router = express.Router();

router.get('/login', VendorLogin);
router.use(Authenticate);
router.get('/profile',  getVendorProfile);  // Fixed missing closing parenthesis
router.patch('/profile', updateVendorProfile);











router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: ' Hello Vendor Route' });
});

export {router as VendorRoute};
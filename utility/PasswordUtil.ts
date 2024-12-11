import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { VendorPayload } from "../dto";
import dotenv from "dotenv";
import { AuthPayload } from "../dto/Auth.dto";

dotenv.config();

const generateSalt = async () => {
    return await bcrypt.genSalt(10);
}

const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

const comparePasswords = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
    // bcrypt.compare() directly compares hashed passwords without needing salt     
    // since the salt is already embedded in the hashed password
}
const validateSignature = async (req: { headers: { authorization?: string } }) => {
    try {
        const signature = req.headers.authorization;

        // Ensure the Authorization header is present and follows the "Bearer <token>" format
        if (signature && signature.startsWith('Bearer ')) {
            const token = signature.split(' ')[1];

            // Verify the token using the secret key
            const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY as string) as AuthPayload;
            (req as any).user = payload;

            return true;
        } else {
            console.log('Authorization header is missing or malformed');
        }
    } catch (error) {
        console.log('Error validating signature:', error);
    }

    return false;

}

const generateSignature = async (payload: VendorPayload) =>{
    console.log(process.env.JWT_SECRET_KEY)
    try {

        const sign = jwt.sign(payload, process.env.JWT_SECRET_KEY as string ,{expiresIn : '90d'} );
        // console.log('Generated Signature:', sign);
        return sign;
    } catch (error) {
        console.error('Error generating signature:', error);
        return null;
    }
}


export {
    generateSalt,
    hashPassword,
    comparePasswords,
    generateSignature,
    validateSignature
 
};




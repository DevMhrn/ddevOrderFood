import { Request, Response, NextFunction } from "express";
import { vendorLoginInput, updateVendorProfileInput } from "../dto";
import { findVendor } from "./AdminController";
import { comparePasswords, generateSignature } from "../utility";

const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as vendorLoginInput; // Ensure correct type assertion

        const existingVendor = await findVendor('', email);

        if (existingVendor !== null) {
            const validate = await comparePasswords(
                password as string, 
                existingVendor.password as string , 
                existingVendor.salt as string 
            );
            
            if (validate) {
                // Provide access if validation is successful
                const signature = await generateSignature({
                    _id: existingVendor.id as string,
                    email: existingVendor.email as string ,
                    name: existingVendor.name as string,
                    foodTypes: existingVendor.foodType as string[]
                });
                // console.log('Got signature:',signature );
                res.status(200).json({ 
                    message: 'Login successful',
                    VendorLogin: existingVendor,
                    signature: signature,
                });
                return;
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
        }
        else res.status(404).json({ message: 'User not found' });
    } catch (err) {
        console.error('Error occurred while logging in vendor', err);
        res.status(500).json({ message: 'Server Error' });
        next(err);
    }
}
const getVendorProfile = async (req: Request,res: Response, next: NextFunction) => {
    
    try {
        const user =  req.user;
     
        if(user){
            const existingVendor = await findVendor(user._id);
            res.status(201).json(existingVendor); 
            return;   
        }
        else  {
            res.status(401).json({'message': 'vendor Information Not Found'});
            return;
        }
    } 
    catch(error){
        console.error('Error occurred while fetching vendor profile', error);
        res.status(500).json({'message': 'Error occurred while fetching vendor profile '})
        next(error);
    }  

}

const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await findVendor(user._id);
            if(!existingVendor) {
                res.status(404).json({ message: 'Vendor not found' });
                return;
            }

            const { name, address, phone, email, foodType } = req.body as updateVendorProfileInput;
            
            // Direct property updates
            if(name) existingVendor.name = name || existingVendor.name as string;
            if(address) existingVendor.address = address || existingVendor.address as string;
            if(phone) existingVendor.phone = phone || existingVendor.phone as string;
            if(email) existingVendor.email = email || existingVendor.email as string;
            if(foodType) existingVendor.foodType = foodType || existingVendor.foodType as string[];

            // Save the updated vendor
            const savedVendor = await existingVendor.save();
            res.status(200).json({
                message: 'Vendor profile updated successfully',
                VendorProfile: savedVendor
            });
            return;
        }
        
        res.status(404).json({ message: 'Vendor not found' });
    } catch (error) {
        console.error('Error occurred while updating vendor profile', error);
        res.status(500).json({ message: 'Server Error' });
        next(error);
    }
}
const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const existingVendor = await findVendor(user._id);
            if(!existingVendor) {
                res.status(404).json({ message: 'Vendor not found' });
                return;
            }
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedVendor = await existingVendor.save();
            res.status(200).json({
                message: 'Vendor service availability updated successfully',
                VendorProfile: savedVendor
            });
            return;
        }
    } catch (error) {
        console.error('Error occurred while updating vendor profile', error);
        res.status(500).json({ message: 'Server Error' });
        next(error);

    }
}
const logoutVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // to implement the logout logic later
    } catch (error) {
        console.error('Error occurred while logging out vendor', error);
        res.status(500).json({ message: 'Server Error' });
        next(error);
    }
}



export { 
    VendorLogin,
    getVendorProfile,
    updateVendorProfile,
    updateVendorService
};

import { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto";
import { Vendor } from "../models";

const createNewVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, ownerName, foodType, pincode, address, phone, email, password } = await req.body as createVendorInput;

        const createdVendor = await Vendor.create({
            name,
            address,
            phone,
            email,
            password,
            foodType,
            pincode,
            ownerName,
            salt: 'salt salt',
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            lat: 0,
            lng: 0,
        });
        await createdVendor.save();
        console.log(typeof createdVendor);
        
        res.status(201).json({
            success: true,
            message: "Vendor created successfully",
            data: createdVendor,
        });

    } catch (error) {
        next(error); 
    }
};

const getVendor = async (req: Request, res: Response, next: NextFunction) => {
    //it'll be a get method
    // Implement vendor retrieval logic here
    // Example: const vendor = await VendorService.getVendorById(req.params.id);
    // res.json(vendor);
    

    
}
const getVendorById = async (req: Request, res: Response, next: NextFunction) => {



};

export {
    createNewVendor,
    getVendor,
    getVendorById,
}
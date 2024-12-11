import { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto";
import { Vendor } from "../models";
import { generateSalt, hashPassword, comparePasswords } from "../utility";

const findVendor = async (id:String |undefined , email?:String) => {
    if(email){
        return await Vendor.findOne({email:  email }); 
    }
    else {
        return await Vendor.findById(id);
    }
}

const createNewVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Destructure the request body to get the necessary fields
        const { name, ownerName, foodType, pincode, address, phone, email, password } = req.body as createVendorInput;

        // Check if the password is provided
        if (!password) {
            res.status(400).json({ message: "Password is required" });
            return;
        }

        const existingVendor = await findVendor('', email);

        if (existingVendor !== null) {
            res.status(202).json({ message: "Vendor already exists, with this email or phone number" });
            return;
        }

        // Generate salt and hash the password
        const salt = await generateSalt();
        const userPassword = await hashPassword(password, salt);

        // Create the vendor with the hashed password
        const createdVendor = await Vendor.create({
            name,
            address,
            phone,
            email,
            password: userPassword, // Ensure the password is hashed and assigned
            foodType,
            pincode,
            ownerName,
            salt: salt,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            lat: 0,
            lng: 0,
        });

        await createdVendor.save();

        res.status(201).json({
            success: true,
            message: "Vendor created successfully",
            data: createdVendor,
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getVendor = async (req: Request, res: Response, next: NextFunction) => {

    const vendors = await Vendor.find();

    if (vendors === null || vendors === undefined){
        res.status(404).json({ message: 'No vendors found' });
        return;
    }

    res.status(201).json({ All_vendor: vendors});

}
const getVendorById = async (req: Request, res: Response, next: NextFunction) => {


    const vendorId = req.params.id;

    const vendor = await findVendor(vendorId);

    if(vendor===null || vendor === undefined){
        res.status(404).json({ message: 'No vendor found with this id' });
        return;
    }

    res.status(200).json({Vendor_Requested : vendor });



};

export {
    createNewVendor,
    getVendor,
    getVendorById,
    findVendor,
}
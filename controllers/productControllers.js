import productModel from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadCloudinary from "../utils/cloudinary.js";

export const createProduct = async (req, res, next) => {
    const { name, price, description, category } = req.body;
    if (!name || !price || !category) {
        return next(new ApiError(400, "Name, category and Price are required"))
    };

    try {
        const product = await productModel.create({
            name,
            category,
            price,
            description,
            image: {}
        });

        if (req.file) {
            const imageLocalPath = req.file.path;
            // if(!imageLocalPath){
            //     next(new ApiError(400, "Image file is required"))
            // }
            const image = await uploadCloudinary(imageLocalPath);
            console.log(image)
            if (!image) {
                next(new ApiError(400, "Image file is required"));
            }

            product.image.public_id = image.public_id;
            product.image.secure_url = image.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
        }
        await product.save();
        res.status(201).json(
            new ApiResponse(200, product, "Product created successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(400, "Image file is required"));
    }

};

// get all products

export const getProducts = async (req, res, next) => {
    try {
        const products = await productModel.find().populate("category");
        if (!products) {
            return next(new ApiError(401, "Something went wrong"));
        }
        res.status(201).json(
            new ApiResponse(200, products, "Products fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(503, "Failed to fetch products"));
    }
}
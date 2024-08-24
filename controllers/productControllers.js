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
            // console.log(image)
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

//get single product
export const getProduct = async (req, res, next) => {
    const { pid } = req.params;
    if (!pid) {
        return next(new ApiError(400, "Product id is required"))
    }
    try {
        const product = await productModel.findById(pid).populate("category");
        if (!product) {
            return next(new ApiError(401, "Product not fetched"))
        }
        res.status(201).json(
            new ApiResponse(200, product, "Product fetched successfully")
        )
    } catch (error) {
        return next(new ApiError(503, "Failed to fetch products"))
    }
};


export const updateProduct = async (req, res, next) => {
    const { pid } = req.params;
    if (!pid) {
        return next(new ApiError(400, "Product id is required"))
    }
    const { name, price, description, category } = req.body;
    try {
        const product = await productModel.findById(pid).populate("category");

        const updatedProduct = await productModel.findByIdAndUpdate(pid, {
            name: name || product.name,
            category: category || product.category.name,
            price: price || product.price,
            image: {}
        }, { new: true })

        if (req.file) {
            const imageLocalPath = req.file.path;
            const image = await uploadCloudinary(imageLocalPath);
            if (!image) {
                next(new ApiError(400, "Image file is required"));
            }
            updatedProduct.image.public_id = image.public_id || product.image.public_id;
            updatedProduct.image.secure_url = image.secure_url || product.image.secure_url;
        }
        await updatedProduct.save();
        res.status(201).json(
            new ApiResponse(200, updatedProduct, "Product updated successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(503, "Failed to update product"))
    }
}
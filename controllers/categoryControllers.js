import categoryModel from "../models/categoryModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadCloudinary from "../utils/cloudinary.js";

export const createCategory = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new ApiError(400, "Category name is required"))
    };
    try {
        const category = await categoryModel.create({
            name,
            image: {}
        });

        if (req.file) {
            const imageLocalPath = req.file.path;
            const image = await uploadCloudinary(imageLocalPath);
            if (!image) {
                next(new ApiError(400, "Something went wrong"))
            }
            category.image.public_id = image.public_id;
            category.image.secure_url = image.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";
        }
        await category.save();
        res.status(201).json(
            new ApiResponse(200, category, "Category created successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to create category"))
    }
}
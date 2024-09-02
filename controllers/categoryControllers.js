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
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return next(new ApiError(401, "Categories not fetched"))
        }
        res.status(201).json(
            new ApiResponse(200, categories, "Categories fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched categories"))
    }
};

export const getCategory = async (req, res, next) => {
    const { cid } = req.params;
    if (!cid) {
        return next(new ApiError(401, "Category Id is required"))
    }
    try {
        const category = await categoryModel.findById(cid);
        if (!category) {
            return next(new ApiError(402, "Category not found"))
        }
        res.status(201).json(
            new ApiResponse(200, category, "Category fetched successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to fetched category"))
    }
}

export const updateCategory = async (req, res, next) => {
    const { cid } = req.params;
    if (!cid) {
        return next(new ApiError(401, "Category Id is required"))
    }
    const { name } = req.body;
    try {
        const category = await categoryModel.findById(cid);
        if (!category) {
            return next(new ApiError(401, "Category Id is not valid"))
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(cid, {
            name: name || category.name,
            image: {}
        }, { new: true });

        if (req.file) {
            const imageLocalPath = req.file.path;
            const image = await uploadCloudinary(imageLocalPath);
            if (!image) {
                next(new ApiError(400, "Something went wrong"));
            }
            updatedCategory.image.public_id = image.public_id || category.image.public_id;
            updatedCategory.image.secure_url = image.secure_url || category.image.secure_url;
        }
        await updatedCategory.save();
        res.status(201).json(
            new ApiResponse(200, updatedCategory, "Category updated successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to update category"))
    }
}

export const deleteCategory = async (req, res, next) => {
    const { cid } = req.params;
    if (!cid) {
        return next(new ApiError(401, "Category Id is required"))
    }
    try {
        await categoryModel.findByIdAndDelete(cid);
        res.status(201).json(
            new ApiResponse(200, "Category deleted successfully")
        )
    } catch (error) {
        console.log(error);
        return next(new ApiError(501, "Failed to deleted category"))
    }
}
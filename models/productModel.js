import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Categories",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    }
}, { timestamps: true });

const productModel = mongoose.model("Products", productSchema);
export default productModel;
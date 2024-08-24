import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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

const categoryModel = mongoose.model("Categories", categorySchema);
export default categoryModel;
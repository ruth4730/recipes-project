import { date, required, string } from "joi";
import mongoose, { model, Schema } from "mongoose";
const recipeSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String },
    categories: { 
        _id:{type:Schema.Types.ObjectId, ref : 'categories'},
        categoryNames:[String]
     },
    preparationTime: { type: Number },
    level: { type: Number, enum: [1, 2, 3, 4, 5] },
    publicationDate: { type: date, default: Date.now() },
    layersArr: {
        type: [{
            desc: { type: String },
            ingredients: { type: [String] }
        }]
    },
    instructionsArr: { type: [String] },
    img: { type: String },
    isPrivate: { type: bool },
    contributor: {
        _id: { type: Schema.Types.ObjectId, ref: 'users' },
        name: String
    }
})
export default model('recipes', recipeSchema)
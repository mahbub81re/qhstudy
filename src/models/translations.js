import { Schema, model, models } from "mongoose";
const translationsSchema = new Schema({
    translationText: {
        type: String,
        required: true,
    },
   type: {
    type: String,
    required: true,
    default: "translation",
    },
    textId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        default: "anonymous",
    },
    language: {
        type: String,  
        required: true,
        default:"bn", 
    },

    translator_name: {
            type: String, 
            default: "Anonymous Translator",  
        },
    translator_ref: {
        type: String, 
        default: "anonymous",  
    },
    

},{timestamps: true });

const translationsModel = models.translation || model("translation", translationsSchema);
export default translationsModel;
export { translationsSchema };
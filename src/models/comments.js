import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const commentsSchema = new Schema({
  commentText: {        
    type: String,
    required: true,
    },
    type: {
        type: String,
        required: true,
    },  
    
    textId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },

    parentCommentId: {
        type: String,
        default: null,
    },
    
},{timestamps: true });

const comments = models.comment || model("comment", commentsSchema);
export default comments;
export { commentsSchema };  
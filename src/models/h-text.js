import  { Schema, model, models } from "mongoose";

const htextSchema = new Schema({
  Text: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const now = new Date();
      const unique =
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0") +
        String(now.getSeconds()).padStart(2, "0") +
        String(now.getMilliseconds()).padStart(3, "0");
      return unique;
    },
  },
  sanad: [
    {
      type: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  source: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HTextModel = models.HText || model("HText", htextSchema);
export default HTextModel;

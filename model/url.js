import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    shortId : {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{timeStamp: { type: Number }}]
},
{
    timeStamps: true
}
)

const URL = mongoose.model("url", urlSchema);

export default URL
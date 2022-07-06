// import dependencies
import mongoose from "mongoose";

// settings

const Schema = mongoose.Schema;

const File = new Schema({
    fileId: {
        type: String,
        required: true,
    },
    filePath: {
        type: String
    },
    fileName: {
        type: String
    },
    text: {
        type: String,
    },
    created_at: {
        type: Date,
        required: true
    },
    last_read_at: {
        type: Date,
    },
    last_updated: {
        type: Date
    },

    latest_logged_in_at: {
        type: Date
    },

});

export default mongoose.model("files", File);

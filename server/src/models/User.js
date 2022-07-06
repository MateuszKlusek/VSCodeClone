// import dependencies
import mongoose from "mongoose";

// settings

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    latest_logged_in_at: {
        type: Date
    },
    workspaces: [String],
    filesId: {},
    folderStructure: [{
        fileName: String,
        filePath: String,
        depth: Number,
        fileType: String,
        fileId: String

    }],
    opened_filesId: {}

});

export default mongoose.model("users", User);

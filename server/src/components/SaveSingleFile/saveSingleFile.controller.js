import User from "../../models/User.js"
import File from "../../models/File.js"

export const saveSingleFile = async (req, res) => {
    try {

        const { fileId, stringified_object } = req.body
        console.log(stringified_object)
        const response = await File.findOneAndUpdate({ fileId: fileId }, { text: stringified_object })
        res.send("")
    }
    catch (err) {
        console.log(err)

    }

}
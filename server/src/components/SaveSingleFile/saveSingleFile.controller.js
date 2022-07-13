// models
import File from "../../models/File.js"

export const saveSingleFile = async (req, res) => {
    try {

        const { fileId, stringified_object } = req.body
        const response = await File.findOneAndUpdate({ fileId: fileId }, { text: stringified_object })
        res.status(200).send({ message: "OK" })
    }
    catch (err) {
        res.status(400)
    }
}
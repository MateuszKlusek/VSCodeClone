import User from "../../models/User.js"
import File from "../../models/File.js"
import _ from "lodash"


export const saveNewFile = async (req, res) => {
    try {
        const { singleFileInFilesInServer, folderStructure, email } = req.body
        if (_.isEmpty(singleFileInFilesInServer)) {
            const userResponse = await User.findOneAndUpdate({ email: email }, { folderStructure: folderStructure })
        } else {
            const userResponse = await User.findOneAndUpdate({ email: email }, { folderStructure: folderStructure, $push: { filesId: singleFileInFilesInServer.fileId } })
            const singleFile = await new File(singleFileInFilesInServer).save()
        }
        res.status(200).send({ status: "success" })
    }
    catch (err) {
        res.status(400).send({ status: "error" })
    }
}
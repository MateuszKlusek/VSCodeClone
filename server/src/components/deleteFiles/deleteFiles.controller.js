import User from "../../models/User.js"
import File from "../../models/File.js"

export const deleteFiles = async (req, res) => {
    try {
        const { folderStructure, deletedFilesIds } = req.body

        // update user data
        const userResponse = await User.findOneAndUpdate({ username: "mateuszklusek" }, { folderStructure: folderStructure, $pull: { filesId: { $in: deletedFilesIds } } })
        // delete all files based on passed ids (one files or more) 
        const fileResponse = await File.deleteMany({ fileId: { $in: deletedFilesIds } })

        res.status(200).send({ status: "success" })
    }
    catch (err) {
        res.status(400).send({ status: "error" })
    }
}
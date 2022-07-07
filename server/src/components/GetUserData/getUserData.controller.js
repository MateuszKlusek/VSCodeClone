
import User from "../../models/User.js"
import File from "../../models/File.js"

export const getUserData = async (req, res) => {
    // get both from user and files (based on userID from user)
    try {
        const user_data_response = await User.findOne({ username: "mateuszklusek" })
        const filesId = user_data_response.filesId
        const filesId_response = await File.find({ fileId: { $in: filesId } })
        res.send({
            status: "success", data: {
                filesData: filesId_response, folderStructure: user_data_response.folderStructure
            }
        })
    }
    catch (err) {
        res.send({ status: "failure" })
        console.log(err)
    }
}
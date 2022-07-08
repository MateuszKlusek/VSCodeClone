
import User from "../../models/User.js"
import File from "../../models/File.js"

export const getUserData = async (req, res) => {
    // get both from user and files (based on userID from user)
    const { email } = req.body
    try {
        const userFound = await User.findOne({ email: email })

        // there's not user
        if (!userFound) return res.status(400)

        const filesId = userFound.filesId
        const filesId_response = await File.find({ fileId: { $in: filesId } })
        return res.status(200).send({
            status: "success", data: {
                filesData: filesId_response, folderStructure: userFound.folderStructure
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err.message })
    }
}
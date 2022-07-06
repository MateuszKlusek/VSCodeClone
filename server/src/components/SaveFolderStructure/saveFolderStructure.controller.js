import User from "../../models/User.js"

export const saveFolderStructure = async (req, res) => {
    try {
        const { folderStructure } = req.body

        console.log(folderStructure)
        // update folder structure
        const userResponse = await User.findOneAndUpdate({ username: "mateuszklusek" }, { folderStructure: folderStructure })

        res.status(200).send({ status: "success" })
    }
    catch (err) {
        res.status(400).send({ status: "error" })
    }
}
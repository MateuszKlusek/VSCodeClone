import { normalizePixelToIndex, normalizeIndexToPixel } from "./Misc/normalizeData"
import { axiosURL } from "../config/axios.js";
import axios from "axios"

// MOVEMENTS WITH A STABLE MODE
// l, h, j, k
// gg, G
// $, 0











export function cmd_0() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    // CHANGE PIXEL VALUES TO INDEXES
    y = Math.round((y - 65) / 21.2)
    var newX, newY;



    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    newX = (95)
    newY = +(65 + y * 21.2).toFixed(2)

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}


export function cmd_A() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var line = text[y]
    var line_length = 0

    for (var el of line) {
        if (el.type === "string") {
            line_length += el.value.length + 2
        } else {
            line_length += el.value.length
        }
    }

    var { newX, newY } = normalizeIndexToPixel(line_length, y)
    return { newX, newY, newText: text, changeText: false, newMode: "insert" }
}


export async function cmd_dotsW() {
    var [x, y, text, command, fileId] = [this.x, this.y, this.text, this.command, this.fileId]
    //  format text from tokenized object to lined string


    try {
        // handle new files 
        // check if the files with fileId is in newTempFilesData
        var newTempFilesData = JSON.parse(window.localStorage.getItem("newTempFilesData"))
        if (fileId in newTempFilesData) {
            return { newX: x, newY: y, newMode: "command", newText: text, changeText: false, alertText: "", misc: "newFile" }
        }
    } catch (err) {
        console.log(err)
    }


    var text_before_stringification = []
    for (var line of text) {
        var temp = ''
        for (var el of line) {
            if (el.type === "string") {
                temp += `"${el.value}"`
            }
            else {
                temp += el.value
            }
        }
        text_before_stringification.push(temp)
    }
    // double stringify text
    var stringified_object = (JSON.stringify(text_before_stringification))

    try {
        const response = await axios({
            method: 'post',
            url: `${axiosURL}/saveSingleFile`,
            data: {
                fileId,
                stringified_object
            }
        })
        return { newX: x, newY: y, newMode: "command", newText: text, changeText: false, alertText: "File saved." }
    }
    catch (err) {
        console.log(err)
    }

}
import { getNumbersFromString } from "../Misc/misc"
import { normalizeIndexToPixel, normalizePixelToIndex } from "../Misc/normalizeData.js"
import { tokenizer } from "../../helpers/tokenizer.js"
import { count } from "../../helpers/misc"



export function cmd_doubleOpeningTab() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var lineText = ''
    var line = text[y]
    for (var el of line) {
        if (el.type === "string") {
            lineText += `"${el.value}"`
        } else {
            lineText += el.value
        }
    }

    lineText = "  " + lineText


    var tokenizer_newLineText = tokenizer(lineText)

    var bigTemp = text
    bigTemp[y] = tokenizer_newLineText


    var { newX, newY } = normalizeIndexToPixel(x + 2, y)
    return { newX, newY, newText: bigTemp, changeText: true, newMode: "normal" }
}


export function cmd_doubleClosingTab() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var lineText = ''
    var line = text[y]
    for (var el of line) {
        if (el.type === "string") {
            lineText += `"${el.value}"`
        } else {
            lineText += el.value
        }
    }

    var toIndent = lineText.split("").slice(0, 2).join("")
    var noOfWhiteSpaces = count(toIndent, " ")

    lineText = lineText.split("").slice(noOfWhiteSpaces).join("")


    var tokenizer_newLineText = tokenizer(lineText)

    var bigTemp = text
    bigTemp[y] = tokenizer_newLineText



    var { newX, newY } = normalizeIndexToPixel(0, y)
    return { newX, newY, newText: bigTemp, changeText: true, newMode: "normal" }
}
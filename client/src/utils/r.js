import { normalizePixelToIndex, normalizeIndexToPixel } from "./Misc/normalizeData"
import { tokenizer } from "../helpers/tokenizer"
import _ from "lodash"

export function cmd_r() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    console.log(command)
    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    // replace is a letter replacing current letter
    var replace = command[1]

    var lineText = ''
    var line = text[y]
    for (var el of line) {
        if (el.type === "string") {
            lineText += `"${el.value}"`
        } else {
            lineText += el.value
        }
    }

    var newLineText = ''
    for (var idx in lineText) {
        if (Number(idx) === x) {
            newLineText += replace
        } else {
            newLineText += lineText[idx]
        }
    }

    var tokenizer_newLineText = tokenizer(newLineText)

    var bigTemp = text
    bigTemp[y] = tokenizer_newLineText

    var { newX, newY } = normalizeIndexToPixel(x, y)
    return { newX, newY, newText: bigTemp, changeText: true, newMode: "normal" }
}

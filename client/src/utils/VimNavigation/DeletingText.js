import { getNumbersFromString } from "../Misc/misc"
import { normalizeIndexToPixel, normalizePixelToIndex } from "../Misc/normalizeData.js"
import { tokenizer } from "../../helpers/tokenizer.js"

// movement
// d$, d0 - deleting to the end of line, deleting from the beginning to the cursor


export function cmd_d$() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
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
    lineText = lineText.slice(0, x)


    var tokenizer_newLineText = tokenizer(lineText)

    var bigTemp = text
    bigTemp[y] = tokenizer_newLineText
    if (x - 1 < 0) {
        x = 0
    }
    else {
        x = x - 1
    }

    var { newX, newY } = normalizeIndexToPixel(x, y)
    return { newX, newY, newText: bigTemp, changeText: true, newMode: "normal" }
}




export function cmd_d0() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
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
    lineText = lineText.slice(x)


    var tokenizer_newLineText = tokenizer(lineText)

    var bigTemp = text
    bigTemp[y] = tokenizer_newLineText


    var { newX, newY } = normalizeIndexToPixel(0, y)
    return { newX, newY, newText: bigTemp, changeText: true, newMode: "normal" }
}

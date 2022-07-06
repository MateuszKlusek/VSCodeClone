import _ from "lodash"
import { tokenizer } from "../helpers/tokenizer"
import { getNumbersFromString, insert } from "./Misc/misc"
import { normalizePixelToIndex, normalizeIndexToPixel, normalizeString } from "./Misc/normalizeData"

export function cmd_O() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var arrayToInsert = new Array(jump).fill([])
    console.log(arrayToInsert)
    console.log(y)
    var newText = [...text.slice(0, y), ...arrayToInsert, ...text.slice(y)]
    console.log(newText)

    var newY = y



    var { newX, newY } = normalizeIndexToPixel(0, newY)
    return { newX, newY, newText, changeText: true, newMode: "insert" }

}

export function cmd_o() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var arrayToInsert = new Array(jump).fill([])
    var newText = [...text.slice(0, y + 1), ...arrayToInsert, ...text.slice(y + 1)]
    var newY = y + 1


    var { newX, newY } = normalizeIndexToPixel(0, newY)
    return { newX, newY, newText, changeText: true, newMode: "insert" }

}


export function cmd_dd() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var newText = [...text.slice(0, y), ...text.slice(y + jump)]

    if (y > newText.length - 1) {
        var newY = newText.length - 1
    } else {
        var newY = y
    }

    // if we delete all the lines
    newY < 0 && (newText = [[]])

    newY < 0 && (newY = 0)



    var { newX, newY } = normalizeIndexToPixel(0, newY)
    return { newX, newY, newText, changeText: true, newMode: "normal" }
}




export const enter = (x_coord, y_coord, text, editor_id, openFiles, command) => {
    const { x, y } = normalizePixelToIndex(x_coord, y_coord)

    var normal_text_line = ''
    // create a full string from characters
    text[y].forEach((el) => {
        if (el.type === "string") {
            normal_text_line += `"${el.value}"`
        }
        else {
            normal_text_line += el.value
        }
    })

    // split the string into the left size and right side of the cursor
    var leftSide = normal_text_line.slice(0, x)
    var rightSide = normal_text_line.slice(x)

    // change the texts above into tokens
    var leftSideTokenized = tokenizer(leftSide)
    var rightSideTokenized = tokenizer(rightSide)

    // replace the text[y] with leftSideTokenized and insert below rightSideTokenized
    var _text = text
    _text[y] = leftSideTokenized
    _text = insert(_text, y + 1, rightSideTokenized)
    _text = _.cloneDeep(_text)

    // set up cursor the the next line (newly inserted)
    return { updatedTokenizedSingleText: _text }

}

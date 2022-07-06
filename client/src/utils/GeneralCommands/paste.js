import { getNumbersFromString } from "../Misc/misc"
import { normalizeIndexToPixel, normalizePixelToIndex } from "../Misc/normalizeData.js"
import { tokenizer } from "../../helpers/tokenizer.js"
import { count } from "../../helpers/misc"

import _ from "lodash"

export const paste = (x,
    y,
    text,
    pasteText,
    activeTabs,
    editor_id,
    openFiles,
    tokenizedFiles) => {
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


    var textPreCopy = text.slice(0, y)
    var textPostCopy = text.slice(y + 1)

    var textLinePreCopy = lineText.slice(0, x)
    var textLinePostCopy = lineText.slice(x)

    const pasteTextArray = pasteText.split("\n")

    var arrayToInsert = []
    pasteTextArray.forEach((el, idx) => {
        var temp = ""
        if (idx === 0) {
            temp += textLinePreCopy
        }
        temp += el
        if (idx === pasteTextArray.length - 1) {
            temp += textLinePostCopy
        }
        arrayToInsert.push(tokenizer(temp))
    })

    const newText = [...textPreCopy, ...arrayToInsert, ...textPostCopy]



    // getting whole files object to overrite when changed
    var i = activeTabs[editor_id].idx
    var this_fileId = openFiles[editor_id][i].fileId
    var temp_big_tokenized = tokenizedFiles
    temp_big_tokenized[this_fileId] = newText
    temp_big_tokenized = _.cloneDeep(temp_big_tokenized)


    var { newX, newY } = normalizeIndexToPixel(x, y)
    return { temp_big_tokenized, temp_big: newText, change: true }
}

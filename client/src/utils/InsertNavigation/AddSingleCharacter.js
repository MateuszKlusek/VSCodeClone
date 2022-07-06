import { normalizePixelToIndex } from "../Misc/normalizeData"
import { tokenizer } from "../../helpers/tokenizer"
import _ from "lodash"

export const addSingleCharacter = (x_coord, y_coord, text, editor_id, openFiles, command) => {

    const { x, y } = normalizePixelToIndex(x_coord, y_coord)

    var tokenized_text_line = text[y]
    var normal_text_line = ''
    // create a full string from characters
    tokenized_text_line.forEach((el) => {
        if (el.type === "string") {
            normal_text_line += `"${el.value}"`
        }
        else {
            normal_text_line += el.value
        }
    })
    var normal_text_line_arr = normal_text_line.split('')
    normal_text_line_arr.splice(x, 0, command)
    var tokenized_text_line_again = tokenizer(normal_text_line_arr)

    // save this line and update the whole object
    var updatedTokenizedSingleText = text
    updatedTokenizedSingleText[y] = tokenized_text_line_again
    updatedTokenizedSingleText = _.cloneDeep(updatedTokenizedSingleText)

    // getting whole files object to overrite when changed
    var fileDataWithFocusedFileId = openFiles.editors[editor_id].data.filter((el) => el.focused === true)
    // var a = fileDataWithFocusedFileId[0].fileId
    // var temp_big_tokenized = tokenizedFiles
    // temp_big_tokenized[a] = temp_big
    // temp_big_tokenized = _.cloneDeep(temp_big_tokenized)

    return { updatedTokenizedSingleText }
}



export const tab = (x_coord, y_coord, text, editor_id, openFiles, command) => {
    const { x, y } = normalizePixelToIndex(x_coord, y_coord)

    var tokenized_text_line = text[y]
    var normal_text_line = ''
    // create a full string from characters
    tokenized_text_line.forEach((el) => {
        if (el.type === "string") {
            normal_text_line += `"${el.value}"`
        }
        else {
            normal_text_line += el.value
        }
    })
    var normal_text_line_arr = normal_text_line.split('')
    normal_text_line_arr.splice(x, 0, "  ")
    var tokenized_text_line_again = tokenizer(normal_text_line_arr)

    // save this line and update the whole object
    var updatedTokenizedSingleText = text
    updatedTokenizedSingleText[y] = tokenized_text_line_again
    updatedTokenizedSingleText = _.cloneDeep(updatedTokenizedSingleText)

    // getting whole files object to overrite when changed
    var fileDataWithFocusedFileId = openFiles.editors[editor_id].data.filter((el) => el.focused === true)
    // var a = fileDataWithFocusedFileId[0].fileId
    // var temp_big_tokenized = tokenizedFiles
    // temp_big_tokenized[a] = temp_big
    // temp_big_tokenized = _.cloneDeep(temp_big_tokenized)

    return { updatedTokenizedSingleText }
}

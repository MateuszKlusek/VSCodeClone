import { normalizePixelToIndex } from "../Misc/normalizeData"
import _ from "lodash"
import { tokenizer } from "../../helpers/tokenizer"

export const deleteCharacter = (x_coord, y_coord, text, editor_id, openFiles) => {
    const { x, y } = normalizePixelToIndex(x_coord, y_coord)
    if (x === 0) {
        return { change: false }
    }

    var tokenized_text_line = text[y]
    var normal_text_line = ''
    tokenized_text_line.forEach((el) => {
        if (el.type === "string") {
            normal_text_line += `"${el.value}"`
        }
        else {
            normal_text_line += el.value
        }
    })
    var normal_text_line_arr = normal_text_line.split('')
    normal_text_line_arr.splice(x - 1, 1)
    var tokenized_text_line_again = tokenizer(normal_text_line_arr)

    // save this line and update the whole object
    var temp_big = text
    temp_big[y] = tokenized_text_line_again
    temp_big = _.cloneDeep(temp_big)

    // getting whole files object to overrite when changed
    var fileDataWithFocusedFileId = openFiles.editors[editor_id].data.filter((el) => el.focused === true)
    var a = fileDataWithFocusedFileId[0].fileId
    var temp_big_tokenized = text
    temp_big_tokenized[a] = temp_big
    temp_big_tokenized = _.cloneDeep(temp_big_tokenized)


    return { temp_big, change: true }

}
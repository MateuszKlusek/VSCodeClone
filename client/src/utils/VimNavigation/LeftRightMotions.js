import { getNumbersFromString } from "../Misc/misc"
import { normalizeIndexToPixel, normalizePixelToIndex } from "../Misc/normalizeData.js"

// movement
// l, h
// $, 0

export function cmd_l() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var newX, newY;

    var currentLine = text[y];
    var currentLineLength = 0;
    for (var el of currentLine) {
        currentLineLength += el.value.length
        if (el.type === "string") {
            currentLineLength += 2
        }
    }

    var [minX, maxX] = [0, currentLineLength - 1]

    if (x + jump >= maxX) {
        newX = maxX
    } else {
        newX = x + jump
    }

    if (newX < 0) {
        newX = 0
    }

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(newX, y)

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}



export function cmd_h() {
    var [x, y, text, command] = [this.x, this.y, this.text, this.command]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)

    var newX, newY;

    var minX = 0

    if (x - jump <= minX) {
        newX = minX
    } else {
        newX = x - jump
    }

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(newX, y)

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}


// REDO TO INCLUDE NUMBERS
export function cmd_$() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    var newX, newY;

    var currentLine = text[y];
    var currentLineLength = 0;
    for (var el of currentLine) {
        currentLineLength += el.value.length
        if (el.type === "string") {
            currentLineLength += 2
        }
    }

    var newX = currentLineLength - 1

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    newX = +(95 + newX * 9.61).toFixed(2)
    newY = +(65 + y * 21.2).toFixed(2)

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}


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


export function cmd_a() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    // replace is a letter replacing current letter
    var { newX, newY } = normalizeIndexToPixel(x + 1, y)
    return { newX, newY, newText: text, changeText: false, newMode: "insert" }
}
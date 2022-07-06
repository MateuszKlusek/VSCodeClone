
import { normalizeIndexToPixel, normalizePixelToIndex } from "../Misc/normalizeData"
import { getNumbersFromString } from "../Misc/misc"



// movements
// j, k 
// gg, G
// goToLine 



export function cmd_j() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    var newX = x, newY

    var currentLine = text[y];
    var currentLineLength = 0;
    for (var el of currentLine) {
        currentLineLength += el.value.length
    }

    var [minX, maxX, minY, maxY] = [0, currentLineLength - 1, 0, text.length - 1]

    if (y + jump >= maxY) {
        newY = maxY
    } else {
        newY = y + jump
    }


    // only for vertical -> check if the will end up in empty space (with no characters)
    currentLine = text[newY]
    currentLineLength = -1;
    for (var el of currentLine) {
        currentLineLength += el.value.length
    }

    if (currentLineLength <= newX) {
        newX = currentLineLength
        if (newX < 0) {
            newX = 0
        }
    }

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(newX, newY)
    // console.log(`new values ${newX} ${newY}`);

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}


export function cmd_k() {
    // need to have all the text because i might jump like 10 lines down 
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]
    var jump = getNumbersFromString(command)

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    var newX = x, newY

    var currentLine = text[y];

    var currentLineLength = 0;
    for (var el of currentLine) {
        currentLineLength += el.value.length
    }

    var [minX, maxX, minY, maxY] = [0, currentLineLength - 1, 0, text.length - 1]

    if (y - jump <= minY) {
        newY = minY
    } else {
        newY = y - jump
    }

    // only for vertical -> check if the will end up in empty space (with no characters)
    currentLine = text[newY]
    currentLineLength = -1;
    for (var el of currentLine) {
        currentLineLength += el.value.length
    }

    if (currentLineLength <= newX) {
        newX = currentLineLength
        if (newX < 0) {
            newX = 0
        }
    }


    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(newX, newY)

    return { newX, newY, newText: text, changeText: false, newMode: "normal" }
}

export function cmd_gg() {
    // just to to position 95,65, no biggie
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    return { newX: 95, newY: 65, newText: text, changeText: false, newMode: "normal" }
}

export function cmd_G() {
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    var newX, newY;

    var maxY = text.length - 1

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(x, maxY)
    // just to to position 0,maxY, no biggie
    return { newX: 95, newY, newText: text, changeText: false, newMode: "normal" }
}


export function cmd_goToLine() {
    var [text, command, x, y] = [this.text, this.command, this.x, this.y]

    // CHANGE PIXEL VALUES TO INDEXES
    var { x, y } = normalizePixelToIndex(x, y)
    var newX, newY;

    var targetGoToLine = command.replace(/\D/g, '')

    // getting the number of lines from tokenized text
    var numberOfLines = text.length
    if (targetGoToLine > numberOfLines) {
        y = numberOfLines - 1
    } else if (targetGoToLine === "0") {
        y = 0
    } else {
        y = targetGoToLine - 1
    }

    // CHANGE INDEXES TO PIXEL VALUES AND ROUND TO TO 2ND DECIMAL PLACE
    var { newX, newY } = normalizeIndexToPixel(x, y)

    return { newX: 95, newY: newY, newText: text, changeText: false, newMode: "normal" }
}
export const normalizeString = (str) => {
    var strToReturn = ''

    switch (str.type) {
        case 'string':
            strToReturn = `"${str.value}"`
            break
        case "whiteSpace":
            // there's this shitty behaviour with template literals where ` ` is the same as `  `
            var ln = str.value.length
            var whiteSpace = `\u00A0`
            strToReturn = `${whiteSpace.repeat(ln)}`
            break
        default:
            strToReturn = str.value
            break
    }
    return strToReturn
}

// it was 21.2, but the difference was too big by 0.2, it added up to a huge gap 20 lines down, 21.0 is spot on
export const normalizePixelToIndex = (x, y) => {
    x = Math.round((x - 95) / 9.61)
    y = Math.round((y - 65) / 21)
    return { x, y }
}


export const normalizeIndexToPixel = (x, y) => {
    var newX = +(95 + x * 9.61).toFixed(2)
    var newY = +(65 + y * 21).toFixed(2)

    return { newX, newY }
}
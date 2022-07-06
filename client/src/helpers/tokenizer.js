
const tokenizePattern = (type, pattern, input, current) => {
    let char = input[current];
    let consumedChars = 0;
    if (pattern.test(char)) {
        let value = '';
        while (char && pattern.test(char)) {
            value += char;
            consumedChars++;
            char = input[current + consumedChars];
        }
        return [consumedChars, { type, value }];
    }
    return [0, null]
}


const tokenizeString = (input, current) => {
    if (input[current] === '"') {
        let value = '';
        let consumedChars = 0;
        consumedChars++;
        var char = input[current + consumedChars];
        while (char !== '"') {
            if (char === undefined) {
                return [0, null]
                // throw new TypeError("unterminated string ");
            }
            value += char;
            consumedChars++;
            char = input[current + consumedChars];
        }
        return [consumedChars + 1, { type: 'string', value }];

    }
    return [0, null]
}

const tokenizeCharacter = (type, value, input, current) => (value === input[current] ? [1, { type, value }] : [0, null])
const tokenizeNumber = (input, current) => tokenizePattern("number", /[0-9]/, input, current)
const tokenizeParenClose = (input, current) => tokenizeCharacter('paren', ')', input, current)
const tokenizeParenOpen = (input, current) => tokenizeCharacter('paren', '(', input, current)
const tokenizeBraceClose = (input, current) => tokenizeCharacter('brace', '}', input, current)
const tokenizeBraceOpen = (input, current) => tokenizeCharacter('brace', '{', input, current)
const tokenizeSquareClose = (input, current) => tokenizeCharacter('squareBracket', ']', input, current)
const tokenizeSquareOpen = (input, current) => tokenizeCharacter('squareBracket', '[', input, current)
const tokenizeTagClose = (input, current) => tokenizeCharacter('tag', '>', input, current)
const tokenizeTagOpen = (input, current) => tokenizeCharacter('tag', '<', input, current)
const tokenizeDot = (input, current) => tokenizeCharacter('dot', '.', input, current)
const tokenizeDash = (input, current) => tokenizeCharacter('dash', '-', input, current)
const tokenizePlus = (input, current) => tokenizeCharacter('plus', '+', input, current)
const tokenizeComma = (input, current) => tokenizeCharacter('comma', ',', input, current)
const tokenizeSlash = (input, current) => tokenizeCharacter('slash', '\\', input, current)
const tokenizeForwardSlash = (input, current) => tokenizeCharacter('forwardSlash', '/', input, current)
const tokenizeEqual = (input, current) => tokenizeCharacter('equal', '=', input, current)
const tokenizeUnderscore = (input, current) => tokenizeCharacter('underscore', '_', input, current)
const tokenizeSemicolon = (input, current) => tokenizeCharacter('semicolon', ';', input, current)
const tokenizeColon = (input, current) => tokenizeCharacter('colon', ':', input, current)
const tokenizeBacktick = (input, current) => tokenizeCharacter('backtick', '`', input, current)
const tokenizeDoubleQuote = (input, current) => tokenizeCharacter('doubleQuote', '"', input, current)
const tokenizeSingleQuote = (input, current) => tokenizeCharacter('singleQuote', `'`, input, current)
const tokenizeName = (input, current) => tokenizePattern("name", /[a-z]/i, input, current)
const tokenizeWhiteSpace = (input, current) => tokenizePattern("whiteSpace", /\s/, input, current,)

const tokenizers = [tokenizeString, tokenizeName, tokenizeNumber, tokenizeDash, tokenizeSingleQuote, tokenizeEqual, tokenizeUnderscore, tokenizeSemicolon, tokenizeBacktick, tokenizeDoubleQuote, tokenizeDot, tokenizeComma, tokenizeColon, tokenizeSlash, tokenizeForwardSlash, tokenizeParenClose, tokenizeParenOpen, tokenizeBraceClose, tokenizeBraceOpen, tokenizeSquareClose, tokenizeSquareOpen, tokenizeTagClose, tokenizeTagOpen, tokenizeWhiteSpace, tokenizePlus]

export const tokenizer = (input) => {
    let current = 0;
    let tokens = [];
    while (current < input.length) {
        let tokenized = false;
        tokenizers.forEach(tokenizer_fn => {
            if (tokenized) { return; }
            let [consumedChars, token] = tokenizer_fn(input, current);
            if (consumedChars !== 0) {
                tokenized = true;
                current += consumedChars;
            }
            if (token) {
                tokens.push(token);
            }
        });
        if (!tokenized) {
            throw new TypeError('I dont know what this character is: ');
        }
    }
    return tokens;
}

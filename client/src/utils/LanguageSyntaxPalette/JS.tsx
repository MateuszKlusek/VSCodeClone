import { addSyntheticLeadingComment } from "typescript"

const reservedWords = ['abstract', 'break', 'char', 'debugger', 'export', 'finally', 'goto', 'in', 'let', 'null', 'public', 'super', 'throw', 'try', 'volatile', 'arguments', 'byte', 'class', 'default', 'else', 'extends', 'float', 'if', 'instanceof', 'long', 'package', 'return', 'switch', 'throws', 'typeof', 'while', 'await', 'case', 'const', 'delete', 'enum', 'false', 'for', 'implements', 'int', 'native', 'private', 'short', 'synchronized', 'translent', 'var', 'with', 'boolean', 'catch', 'continue', 'do', 'eval', 'final', 'function', 'import', 'interface', 'new', 'protected', 'static', 'this', 'true', 'void', 'yield']

const otherWords = ['from', "console", "ar1"]

const specialWords = ["setTimeout", "setInterval"]

const adds = ["log"]

export const classes = {
    "name": (e: any) => {
        if (reservedWords.includes(e.children)) {
            return "#ff6dc0"
        }
        else if (otherWords.includes(e.children)) {
            return "#a02fa2"
        }
        else if (specialWords.includes(e.children)) {
            return "#6090ce"
        }
        else if (adds.includes(e.children)) {
            return "#58db7b"
        }
        else {
            return 'white'
        }
    },
    "paren": "white",
    "brace": "purple",
    "string": "#D3DB40",
    "number": "#B651BD",
    "plus": "#B651BD",
    "minus": "#B651BD",
    "underscore": "#B651BD",
    "dash": "#B651BD",
    "equal": "#B651BD",
    "semicolon": "white",
    "whiteSpace": "",

    "singleQuote": "#D3DB40",
    "doubleQuote": "#D3DB40",
    "backtick": "#D3DB40",

    "tag": "#B651BD",
    "dot": "white",
    "comma": "white",

    "squareBracket": "#6090ce"
}


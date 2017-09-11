"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("@slicky/tokenizer");
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Name"] = 0] = "Name";
    TokenType[TokenType["String"] = 1] = "String";
    TokenType[TokenType["Punctuation"] = 2] = "Punctuation";
    TokenType[TokenType["Operator"] = 3] = "Operator";
    TokenType[TokenType["Whitespace"] = 4] = "Whitespace";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var PUNCTUATION = [
    '.', ',', ':', '#', '[', ']', '(', ')',
];
var OPERATORS = [
    '~=', '|=', '^=', '$=', '*=',
    '=', '~', '|', '^', '$', '*', '+', '>',
];
var Tokenizer = (function (_super) {
    __extends(Tokenizer, _super);
    function Tokenizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tokenizer.createFromString = function (input) {
        return new Tokenizer(new tokenizer_1.InputStream(input));
    };
    Tokenizer.prototype.isCurrentToken = function (type) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        if (!this.current() || this.current().type !== type) {
            return false;
        }
        if (!value.length) {
            return true;
        }
        return value.indexOf(this.current().value) >= 0;
    };
    Tokenizer.prototype.matchToken = function (type) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        if (!this.isCurrentToken.apply(this, [type].concat(value))) {
            this.expected(TokenType[type], value.length ? value.join('|') : undefined);
        }
        return this.next();
    };
    Tokenizer.prototype.doReadInput = function (input) {
        var current = input.current();
        if (isStringStart(current)) {
            return {
                type: TokenType.String,
                value: readString(input),
            };
        }
        if (isWhitespace(current)) {
            return {
                type: TokenType.Whitespace,
                value: readWhitespace(input),
            };
        }
        if (isNameStart(current)) {
            return {
                type: TokenType.Name,
                value: readName(input),
            };
        }
        if (input.isSequenceFollowing.apply(input, PUNCTUATION)) {
            return {
                type: TokenType.Punctuation,
                value: input.matchSequence.apply(input, PUNCTUATION),
            };
        }
        if (input.isSequenceFollowing.apply(input, OPERATORS)) {
            return {
                type: TokenType.Operator,
                value: input.matchSequence.apply(input, OPERATORS),
            };
        }
    };
    return Tokenizer;
}(tokenizer_1.AbstractTokenizer));
exports.Tokenizer = Tokenizer;
function isStringStart(ch) {
    return ch === '"' || ch === "'";
}
function isWhitespace(ch) {
    return ch === ' ';
}
function isNameStart(ch) {
    return /[a-z]/.test(ch);
}
function isName(ch) {
    return isNameStart(ch) || ch === '-';
}
function readString(input) {
    return readEscaped(input, input.current());
}
function readWhitespace(input) {
    return input.readWhile(isWhitespace);
}
function readName(input) {
    return input.readWhile(isName);
}
function readEscaped(input, end) {
    var escaped = false;
    var str = '';
    input.next();
    while (!input.eof()) {
        var ch = input.next();
        if (escaped) {
            str += ch;
            escaped = false;
        }
        else if (ch === '\\') {
            escaped = true;
        }
        else if (ch === end) {
            break;
        }
        else {
            str += ch;
        }
    }
    return str;
}

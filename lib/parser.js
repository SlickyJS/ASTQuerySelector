"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@slicky/utils");
var tokenizer_1 = require("@slicky/tokenizer");
var tokenizer_2 = require("./tokenizer");
var _ = require("./ast");
var PSEUDO_ELEMENTS = [
    'before', 'after',
];
var Parser = (function () {
    function Parser(tokenizer) {
        this.tokenizer = tokenizer;
    }
    Parser.createFromString = function (input) {
        return new Parser(new tokenizer_2.Tokenizer(new tokenizer_1.InputStream(input)));
    };
    Parser.prototype.parse = function () {
        var selectors = [];
        while (!this.tokenizer.eof()) {
            selectors.push(this.parseSelector());
            if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, ',')) {
                this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, ',');
                if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
                    this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
                }
            }
        }
        return new _.ASTQuery(selectors);
    };
    Parser.prototype.parseSelector = function () {
        return new _.ASTSelector(this.parseSelectorPart());
    };
    Parser.prototype.parseSelectorPart = function () {
        var whitespace = false;
        var rules = this.parseRulesSet();
        var combinator;
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
            this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
            whitespace = true;
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Operator, '+', '~', '>')) {
            if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Operator, '+')) {
                combinator = this.parseAdjacentSibling(rules);
            }
            else if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Operator, '~')) {
                combinator = this.parseGeneralSibling(rules);
            }
            else if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Operator, '>')) {
                combinator = this.parseChild(rules);
            }
        }
        else if (whitespace && !this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, ',')) {
            combinator = this.parseDescendant(rules);
        }
        return utils_1.exists(combinator) ? combinator : rules;
    };
    Parser.prototype.parseRulesSet = function () {
        var rules = [
            this.parseRule(),
        ];
        while (!this.tokenizer.eof()) {
            var rule = this.parseRule();
            if (!utils_1.exists(rule)) {
                break;
            }
            rules.push(rule);
        }
        return new _.ASTRulesSet(rules);
    };
    Parser.prototype.parseRule = function () {
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, '.')) {
            return this.parseClass();
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, '#')) {
            return this.parseId();
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, ':')) {
            return this.parsePseudoClassOrPseudoElement();
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, '[')) {
            return this.parseAttribute();
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Name)) {
            return this.parseElement();
        }
    };
    Parser.prototype.parseClass = function () {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, '.');
        return new _.ASTClass(this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value);
    };
    Parser.prototype.parseId = function () {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, '#');
        return new _.ASTId(this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value);
    };
    Parser.prototype.parsePseudoClassOrPseudoElement = function () {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, ':');
        var isColon = this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, ':');
        if (isColon || (_a = this.tokenizer).isCurrentToken.apply(_a, [tokenizer_2.TokenType.Name].concat(PSEUDO_ELEMENTS))) {
            if (isColon) {
                this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, ':');
            }
            return new _.ASTPseudoElement(this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value);
        }
        return new _.ASTPseudoClass(this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value);
        var _a;
    };
    Parser.prototype.parseElement = function () {
        return new _.ASTElement(this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value);
    };
    Parser.prototype.parseAttribute = function () {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, '[');
        var name = this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value;
        var operator;
        var value;
        var caseSensitive = true;
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Punctuation, ':')) {
            name += this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, ':').value;
            name += this.tokenizer.matchToken(tokenizer_2.TokenType.Name).value;
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Operator)) {
            operator = this.tokenizer.matchToken(tokenizer_2.TokenType.Operator).value;
            value = this.tokenizer.matchToken(tokenizer_2.TokenType.String).value;
        }
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
            this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
            this.tokenizer.matchToken(tokenizer_2.TokenType.Name, 'i', 'I').value;
            caseSensitive = false;
        }
        this.tokenizer.matchToken(tokenizer_2.TokenType.Punctuation, ']');
        return new _.ASTAttribute(name, operator, value, caseSensitive);
    };
    Parser.prototype.parseDescendant = function (left) {
        return new _.ASTDescendant(left, this.parseSelectorPart());
    };
    Parser.prototype.parseAdjacentSibling = function (left) {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Operator, '+');
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
            this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
        }
        return new _.ASTAdjacentSibling(left, this.parseSelectorPart());
    };
    Parser.prototype.parseGeneralSibling = function (left) {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Operator, '~');
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
            this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
        }
        return new _.ASTGeneralSibling(left, this.parseSelectorPart());
    };
    Parser.prototype.parseChild = function (left) {
        this.tokenizer.matchToken(tokenizer_2.TokenType.Operator, '>');
        if (this.tokenizer.isCurrentToken(tokenizer_2.TokenType.Whitespace)) {
            this.tokenizer.matchToken(tokenizer_2.TokenType.Whitespace);
        }
        return new _.ASTChild(left, this.parseSelectorPart());
    };
    return Parser;
}());
exports.Parser = Parser;

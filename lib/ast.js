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
var utils_1 = require("@slicky/utils");
var ASTNode = (function () {
    function ASTNode() {
    }
    return ASTNode;
}());
exports.ASTNode = ASTNode;
var ASTRule = (function (_super) {
    __extends(ASTRule, _super);
    function ASTRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ASTRule;
}(ASTNode));
exports.ASTRule = ASTRule;
var ASTSelectorPart = (function (_super) {
    __extends(ASTSelectorPart, _super);
    function ASTSelectorPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ASTSelectorPart;
}(ASTNode));
exports.ASTSelectorPart = ASTSelectorPart;
var ASTCombinator = (function (_super) {
    __extends(ASTCombinator, _super);
    function ASTCombinator(left, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    return ASTCombinator;
}(ASTSelectorPart));
exports.ASTCombinator = ASTCombinator;
var ASTRulesSet = (function (_super) {
    __extends(ASTRulesSet, _super);
    function ASTRulesSet(parts) {
        var _this = _super.call(this) || this;
        _this.parts = parts;
        return _this;
    }
    ASTRulesSet.prototype.render = function () {
        return utils_1.map(this.parts, function (part) {
            return part.render();
        }).join('');
    };
    return ASTRulesSet;
}(ASTSelectorPart));
exports.ASTRulesSet = ASTRulesSet;
var ASTSelector = (function (_super) {
    __extends(ASTSelector, _super);
    function ASTSelector(parts) {
        var _this = _super.call(this) || this;
        _this.parts = parts;
        return _this;
    }
    ASTSelector.prototype.render = function () {
        return this.parts.render();
    };
    return ASTSelector;
}(ASTNode));
exports.ASTSelector = ASTSelector;
var ASTQuery = (function (_super) {
    __extends(ASTQuery, _super);
    function ASTQuery(selectors) {
        var _this = _super.call(this) || this;
        _this.selectors = selectors;
        return _this;
    }
    ASTQuery.prototype.render = function () {
        return utils_1.map(this.selectors, function (selector) {
            return selector.render();
        }).join(', ');
    };
    return ASTQuery;
}(ASTNode));
exports.ASTQuery = ASTQuery;
var ASTElement = (function (_super) {
    __extends(ASTElement, _super);
    function ASTElement(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    ASTElement.prototype.render = function () {
        return this.name;
    };
    return ASTElement;
}(ASTRule));
exports.ASTElement = ASTElement;
var ASTClass = (function (_super) {
    __extends(ASTClass, _super);
    function ASTClass(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    ASTClass.prototype.render = function () {
        return "." + this.name;
    };
    return ASTClass;
}(ASTRule));
exports.ASTClass = ASTClass;
var ASTId = (function (_super) {
    __extends(ASTId, _super);
    function ASTId(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    ASTId.prototype.render = function () {
        return "#" + this.name;
    };
    return ASTId;
}(ASTRule));
exports.ASTId = ASTId;
var ASTPseudoClass = (function (_super) {
    __extends(ASTPseudoClass, _super);
    function ASTPseudoClass(name, fn) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.fn = fn;
        return _this;
    }
    ASTPseudoClass.prototype.render = function () {
        var result = ":" + this.name;
        if (utils_1.exists(this.fn)) {
            result += "(" + this.fn.render() + ")";
        }
        return result;
    };
    return ASTPseudoClass;
}(ASTRule));
exports.ASTPseudoClass = ASTPseudoClass;
var ASTPseudoElement = (function (_super) {
    __extends(ASTPseudoElement, _super);
    function ASTPseudoElement(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    ASTPseudoElement.prototype.render = function () {
        return "::" + this.name;
    };
    return ASTPseudoElement;
}(ASTRule));
exports.ASTPseudoElement = ASTPseudoElement;
var ASTAttribute = (function (_super) {
    __extends(ASTAttribute, _super);
    function ASTAttribute(name, operator, value, caseSensitive) {
        if (caseSensitive === void 0) { caseSensitive = true; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.operator = operator;
        _this.value = value;
        _this.caseSensitive = caseSensitive;
        return _this;
    }
    ASTAttribute.prototype.render = function () {
        var result = [
            '[',
            this.name,
        ];
        if (utils_1.exists(this.operator) && utils_1.exists(this.value)) {
            result.push(this.operator);
            result.push(this.value);
        }
        if (!this.caseSensitive) {
            result.push(' i');
        }
        result.push(']');
        return result.join('');
    };
    return ASTAttribute;
}(ASTRule));
exports.ASTAttribute = ASTAttribute;
var ASTDescendant = (function (_super) {
    __extends(ASTDescendant, _super);
    function ASTDescendant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTDescendant.prototype.render = function () {
        return this.left.render() + " " + this.right.render();
    };
    return ASTDescendant;
}(ASTCombinator));
exports.ASTDescendant = ASTDescendant;
var ASTChild = (function (_super) {
    __extends(ASTChild, _super);
    function ASTChild() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTChild.prototype.render = function () {
        return this.left.render() + " > " + this.right.render();
    };
    return ASTChild;
}(ASTCombinator));
exports.ASTChild = ASTChild;
var ASTAdjacentSibling = (function (_super) {
    __extends(ASTAdjacentSibling, _super);
    function ASTAdjacentSibling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTAdjacentSibling.prototype.render = function () {
        return this.left.render() + " + " + this.right.render();
    };
    return ASTAdjacentSibling;
}(ASTCombinator));
exports.ASTAdjacentSibling = ASTAdjacentSibling;
var ASTGeneralSibling = (function (_super) {
    __extends(ASTGeneralSibling, _super);
    function ASTGeneralSibling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ASTGeneralSibling.prototype.render = function () {
        return this.left.render() + " ~ " + this.right.render();
    };
    return ASTGeneralSibling;
}(ASTCombinator));
exports.ASTGeneralSibling = ASTGeneralSibling;

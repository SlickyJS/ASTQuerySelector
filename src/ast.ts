import {exists, map} from '@slicky/utils';


export abstract class ASTNode
{


	public abstract render(): string;

}


export abstract class ASTRule extends ASTNode
{
}


export abstract class ASTSelectorPart extends ASTNode
{
}


export abstract class ASTCombinator extends ASTSelectorPart
{


	public left: ASTRulesSet;

	public right: ASTSelectorPart;


	constructor(left: ASTRulesSet, right: ASTSelectorPart)
	{
		super();

		this.left = left;
		this.right = right;
	}

}


export class ASTRulesSet extends ASTSelectorPart
{


	public parts: Array<ASTRule>;


	constructor(parts: Array<ASTRule>)
	{
		super();

		this.parts = parts;
	}


	public render(): string
	{
		return map(this.parts, (part: ASTRule) => {
			return part.render();
		}).join('');
	}

}


export class ASTSelector extends ASTNode
{


	public parts: ASTSelectorPart;


	constructor(parts: ASTSelectorPart)
	{
		super();

		this.parts = parts;
	}


	public render(): string
	{
		return this.parts.render();
	}

}


export class ASTQuery extends ASTNode
{


	public selectors: Array<ASTSelector>;


	constructor(selectors: Array<ASTSelector>)
	{
		super();

		this.selectors = selectors;
	}


	public render(): string
	{
		return map(this.selectors, (selector: ASTSelector) => {
			return selector.render();
		}).join(', ');
	}

}


export class ASTElement extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
	}


	public render(): string
	{
		return this.name;
	}

}


export class ASTClass extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
	}


	public render(): string
	{
		return `.${this.name}`;
	}

}


export class ASTId extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
	}


	public render(): string
	{
		return `#${this.name}`;
	}

}


export class ASTPseudoClass extends ASTRule
{


	public name: string;

	public fn: ASTSelector;


	constructor(name: string, fn?: ASTSelector)
	{
		super();

		this.name = name;
		this.fn = fn;
	}


	public render(): string
	{
		let result = `:${this.name}`;

		if (exists(this.fn)) {
			result += `(${this.fn.render()})`;
		}

		return result;
	}

}


export class ASTPseudoElement extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
	}


	public render(): string
	{
		return `::${this.name}`;
	}

}


export class ASTAttribute extends ASTRule
{


	public caseSensitive: boolean;

	public name: string;

	public operator: string;

	public value: string;


	constructor(name: string, operator?: string, value?: string, caseSensitive: boolean = true)
	{
		super();

		this.name = name;
		this.operator = operator;
		this.value = value;
		this.caseSensitive = caseSensitive;
	}


	public render(): string
	{
		const result = [
			'[',
			this.name,
		];

		if (exists(this.operator) && exists(this.value)) {
			result.push(this.operator);
			result.push(this.value);
		}

		if (!this.caseSensitive) {
			result.push(' i');
		}

		result.push(']');

		return result.join('');
	}

}


export class ASTDescendant extends ASTCombinator
{


	public render(): string
	{
		return `${this.left.render()} ${this.right.render()}`;
	}

}


export class ASTChild extends ASTCombinator
{


	public render(): string
	{
		return `${this.left.render()} > ${this.right.render()}`;
	}

}


export class ASTAdjacentSibling extends ASTCombinator
{


	public render(): string
	{
		return `${this.left.render()} + ${this.right.render()}`;
	}

}


export class ASTGeneralSibling extends ASTCombinator
{


	public render(): string
	{
		return `${this.left.render()} ~ ${this.right.render()}`;
	}

}

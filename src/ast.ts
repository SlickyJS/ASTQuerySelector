export abstract class ASTNode
{
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

}


export class ASTSelector extends ASTNode
{


	public parts: ASTSelectorPart;


	constructor(parts: ASTSelectorPart)
	{
		super();

		this.parts = parts;
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

}


export class ASTElement extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
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

}


export class ASTId extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
	}

}


export class ASTPseudoClass extends ASTRule
{


	public name: string;


	constructor(name: string)
	{
		super();

		this.name = name;
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

}


export class ASTDescendant extends ASTCombinator
{
}


export class ASTChild extends ASTCombinator
{
}


export class ASTAdjacentSibling extends ASTCombinator
{
}


export class ASTGeneralSibling extends ASTCombinator
{
}

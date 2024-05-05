declare class Molang {
	parse(expression: string | number, variables?: Record<string, number>): number
	global_variables: Record<string, string | number | ((...args: number[]) => number)>
	variableHandler: (variable: string, variables?: Record<string, number>) => number
}

declare interface MolangExpression {
	animation: _Animation
	animator: BoneAnimator
	channel: string
	key: string
	kf: _Keyframe
	type: string
	value: string
}

declare function getAllMolangExpressions(): MolangExpression[]

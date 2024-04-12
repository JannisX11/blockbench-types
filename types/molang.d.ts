declare class Molang {
	parse(expression: string | number, variables?: Record<string, number>): number
	global_variables: Record<string, number | ((...args: number[]) => number)>
}

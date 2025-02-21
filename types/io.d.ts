declare global {
	function autoParseJSON(data: string, feedback?: boolean): any
	function autoStringifyJSON(data: any): string
}

export {}

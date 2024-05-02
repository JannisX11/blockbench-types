/// <reference path="./blockbench.d.ts"/>
type ConditionResolvable =
	| undefined
	| boolean
	| ((context: any) => boolean)
	| Partial<{
			modes: string[]
			formats: string[]
			tools: string[]
			features: string[]
			selected: {
				animation?: boolean
				animation_controller?: boolean
				animation_controller_state?: boolean
				keyframe?: boolean
				group?: boolean
				texture?: boolean
				element?: boolean
				cube?: boolean
				mesh?: boolean
				locator?: boolean
				null_any?: boolean
				texture_mesh?: boolean
				outliner?: boolean
			}
			project: boolean
			method(context: any): boolean
	  }>

/**
 * Tests if a condition is truthy of falsy. Returns true if the condition is unspecified
 * @param condition Boolean, function, any or anything else
 */
declare function Condition(condition: ConditionResolvable): boolean

/**
 * Wrapper for anys that tells the custom JSON exporter to write in one line
 */
declare class oneLiner {
	constructor(data?: any)
	[key: string]: any
}

/**
 * If the input event is a touch event, convert touch event to a compatible mouse event
 */
declare function convertTouchEvent(event: MouseEvent): MouseEvent

/**
 * Adds an event listener to an element, except that is supports multiple event types simultaneously
 * @param element Target Element
 * @param events Event types, separated by space characters
 * @param func Function
 * @param option Option
 */
declare function addEventListeners(
	element: HTMLElement,
	events: string,
	func: (event: Event) => void,
	option?: any
): void

declare function compareVersions(string1: any, string2: any): boolean
declare function convertTouchEvent(event: any): any
declare function addEventListeners(el: any, events: any, func: any, option: any): void
declare function removeEventListeners(el: any, events: any, func: any, option: any): void
declare function guid(): string
declare function isUUID(s: any): any
declare function bbuid(l: any): string
declare function trimFloatNumber(value: number): string
declare function getAxisLetter(axisNumber: number): string
declare function getAxisNumber(axisLetter: string): number

/**
 * Reusable data types that can be used by anything, but should not be used to store data between function calls. Can be used to save memory on frequent function calls.
 */
declare namespace Reusable {
	const vec1: THREE.Vector3
	const vec2: THREE.Vector3
	const vec3: THREE.Vector3
	const vec4: THREE.Vector3
	const vec5: THREE.Vector3
	const vec6: THREE.Vector3
	const vec7: THREE.Vector3
	const vec8: THREE.Vector3
	const quat1: THREE.Quaternion
	const quat2: THREE.Quaternion
	const euler1: THREE.Euler
	const euler2: THREE.Euler
}

declare namespace Blockbench {
	function addCSS(css: string): void
}
declare function getCurrentGroup(): Group

/**
 * Merge the value under a certain key from one object into another
 */
declare namespace Merge {
	function number(target: object, source: object, key: string | number): void
	function string(
		target: object,
		source: object,
		key: string | number,
		validate?: (value: string) => boolean
	): void
	function molang(target: object, source: object, key: string | number): void
	function boolean(
		target: object,
		source: object,
		key: string | number,
		validate?: (value: boolean) => boolean
	): void
	function arrayVector(
		target: object,
		source: object,
		key: string | number,
		validate?: (value: number[]) => boolean
	): void
	function arrayVector2(
		target: object,
		source: object,
		key: string | number,
		validate?: (value: ArrayVector2) => boolean
	): void
}

declare class Rectangle {
	constructor(start_x: number, start_y: number, width: number, height: number)
	start_x: number
	start_y: number
	width: number
	height: number
	readonly start: ArrayVector2
	readonly w: number
	readonly h: number
	end_x: number
	end_y: number
	readonly area: number
	fromCoords(x1: number, y1: number, x2: number, y2: number): void
	fromUnorderedCoords(x1: number, y1: number, x2: number, y2: number): void
	expandTo(x: number, y: number): void
}

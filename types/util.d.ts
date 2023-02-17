/// <reference path="./blockbench.d.ts"/>
type ConditionResolvable =
	| undefined
	| boolean
	| ((context) => boolean)
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
				null_object?: boolean
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
 * Wrapper for objects that tells the custom JSON exporter to write in one line
 */
declare class oneLiner {
	constructor(data: any)
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
)

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
declare function limitNumber(number: any, min: any, max: any): any
declare function highestInObject(obj: any, inverse: any): string
declare function getRectangle(
	a: any,
	b: any,
	c: any,
	d: any
): {
	ax: any
	ay: any
	bx: any
	by: any
	x: number
	w: number
	y: number
	h: number
}
declare function doRectanglesOverlap(rect1: any, rect2: any): boolean
declare function omitKeys(obj: any, keys: any, dual_level?: boolean): {}
declare function get(options: any, name: any, defaultValue: any): any
declare function getKeyByValue(any: any, value: any): any
declare function onVueSetup(func: any): void
declare function capitalizeFirstLetter(string: any): any
declare function autoStringify(any: any): string
declare function pluralS(arr: any): '' | 's'
declare function pathToName(path: string, extension: boolean): string | ''
declare function pathToExtension(path: string): string | ''
declare function intToRGBA(int: any): {
	r: number
	g: number
	b: number
	a: number
}
declare function getAverageRGB(
	imgEl: any,
	blockSize: any
): {
	r: number
	g: number
	b: number
}
declare function stringifyLargeInt(int: any): any
declare function intersectLines(p1: any, p2: any, p3: any, p4: any): boolean
declare function pointInRectangle(point: any, rect_start: any, rect_end: any): boolean
declare function lineIntersectsReactangle(p1: any, p2: any, rect_start: any, rect_end: any): boolean
declare function cameraTargetToRotation(position: any, target: any): any[]
declare function cameraRotationToTarget(position: any, rotation: any): any
/**
 *
 * @param {*} condition Input condition. Can be undefined, a boolean, a function or a condition any
 * @param {*} context
 */
declare function Condition(condition: any, context: any): boolean
declare namespace Condition {
	function mutuallyExclusive(a: any, b: any): boolean
}
declare function asyncLoop(o: any): void
declare namespace Objector {
	function equalKeys(obj: any, ref: any): boolean
	function keyLength(obj: any): number
}
declare namespace Merge {
	export function number(obj: any, source: any, index?: any): void
	export function string(obj: any, source: any, index?: any, validate?: boolean): void
	export function molang(obj: any, source: any, index?: any): void
	export function boolean(obj: any, source: any, index?: any, validate?: boolean): void
	export function _function(obj: any, source: any, index?: any, validate?: boolean): void
	export { _function as function }
	export function arrayVector(obj: any, source: any, index?: any, validate?: boolean): void
	export function arrayVector2(obj: any, source: any, index?: any, validate?: boolean): void
}

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

/// <reference path="./blockbench.d.ts"/>
declare global {
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
	function Condition(condition: ConditionResolvable): boolean

	/**
	 * Wrapper for Objects that tells the custom JSON exporter to write in one line
	 *
	 * This is actually a class called `oneLiner`, but using some ✨ type magic ✨ it's typed as a function that returns the same value as the input to make it easier to use.
	 */
	const oneLiner: new <T>(data?: T) => T

	/**
	 * If the input event is a touch event, convert touch event to a compatible mouse event
	 */
	function convertTouchEvent(event: MouseEvent): MouseEvent

	/**
	 * Adds an event listener to an element, except that is supports multiple event types simultaneously
	 * @param element Target Element
	 * @param events Event types, separated by space characters
	 * @param func Function
	 * @param option Option
	 */
	function addEventListeners(
		element: HTMLElement,
		events: string,
		func: (event: Event) => void,
		option?: any
	): void

	function compareVersions(string1: any, string2: any): boolean
	function convertTouchEvent(event: any): any
	function addEventListeners(el: any, events: any, func: any, option: any): void
	function removeEventListeners(el: any, events: any, func: any, option: any): void
	function guid(): string
	function isUUID(s: any): any
	function bbuid(l: any): string
	function trimFloatNumber(value: number): string
	function getAxisLetter(axisNumber: number): string
	function getAxisNumber(axisLetter: string): number
	function limitNumber(number: any, min: any, max: any): any
	function highestInObject(obj: any, inverse: any): string
	function getRectangle(
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
	function doRectanglesOverlap(rect1: any, rect2: any): boolean
	function omitKeys(obj: any, keys: any, dual_level?: boolean): {}
	function get(options: any, name: any, defaultValue: any): any
	function getKeyByValue(any: any, value: any): any
	function onVueSetup(func: any): void
	function capitalizeFirstLetter(string: any): any
	function autoStringify(any: any): string
	function pluralS(arr: any): '' | 's'
	function pathToName(path: string, extension: boolean): string | ''
	function pathToExtension(path: string): string | ''
	function intToRGBA(int: any): {
		r: number
		g: number
		b: number
		a: number
	}
	function getAverageRGB(
		imgEl: any,
		blockSize: any
	): {
		r: number
		g: number
		b: number
	}
	function stringifyLargeInt(int: any): any
	function intersectLines(p1: any, p2: any, p3: any, p4: any): boolean
	function pointInRectangle(point: any, rect_start: any, rect_end: any): boolean
	function lineIntersectsRectangle(p1: any, p2: any, rect_start: any, rect_end: any): boolean
	function cameraTargetToRotation(position: any, target: any): any[]
	function cameraRotationToTarget(position: any, rotation: any): any

	/**
	 *
	 * @param condition Input condition. Can be undefined, a boolean, a function or a condition any
	 * @param context
	 * Reusable data types that can be used by anything, but should not be used to store data between function calls. Can be used to save memory on frequent function calls.
	 */
	function Condition(condition: (() => boolean) | undefined | boolean, context: any): boolean
	namespace Condition {
		function mutuallyExclusive(a: any, b: any): boolean
	}
	function asyncLoop(o: any): void
	namespace Objector {
		function equalKeys(obj: any, ref: any): boolean
		function keyLength(obj: any): number
	}
	namespace Merge {
		export function number(obj: any, source: any, index?: any): void
		export function string(obj: any, source: any, index?: any, validate?: boolean): void
		export function molang(obj: any, source: any, index?: any): void
		export function boolean(obj: any, source: any, index?: any, validate?: boolean): void
		export function _function(obj: any, source: any, index?: any, validate?: boolean): void
		export { _function as function }
		export function arrayVector(obj: any, source: any, index?: any, validate?: boolean): void
		export function arrayVector2(obj: any, source: any, index?: any, validate?: boolean): void
	}

	/**
	 * Reusable data types that can be used by anything, but should not be used to store data between function calls. Can be used to save memory on frequent function calls.
	 */
	namespace Reusable {
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

	namespace Blockbench {
		function addCSS(css: string): void
	}
	function getCurrentGroup(): Group

	/**
	 * Merge the value under a certain key from one object into another
	 */
	namespace Merge {
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

	class Rectangle {
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

	interface CompileJSONOptions {
		/**
		 * Character or string used for indentation
		 */
		indentation?: string
		/**
		 * If true, compile everything in one line and without spaces
		 */
		small?: boolean
	}
	/**
	 * Blockbench's JSON compilation / stringify implementation
	 */
	function compileJSON(json: any, options?: CompileJSONOptions): string
}

export {}

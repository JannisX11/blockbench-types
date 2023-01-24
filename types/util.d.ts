type ConditionResolvable = undefined | boolean | ((context) => boolean) | Partial<{
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
	method: (context: any) => boolean
}>

/**
 * Tests if a condition is truthy of falsy. Returns true if the condition is unspecified
 * @param condition Boolean, function, object or anything else
 */
declare function Condition(condition: any): boolean

/**
 * Wrapper for objects that tells the custom JSON exporter to write in one line
 */
declare class oneLiner {
	constructor(data: object)
}

declare const templog: (...args: any) => void

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
declare function addEventListeners(element: HTMLElement, events: string, func: (event: Event) => void, option?: any)

declare function trimFloatNumber(value: number): string
declare function getAxisLetter(axisNumber: number): string
declare function getAxisNumber(axisLetter: string): number


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

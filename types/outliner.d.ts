type ArrayVector4 = [number, number, number, number]
type ArrayVector3 = [number, number, number]
type ArrayVector2 = [number, number]


/**
 * @private
 */
declare class OutlinerNode {
	constructor ()
	uuid: UUID
	name: string
	export: boolean
	locked: boolean
	parent: Group | 'root'
	/**
	 * Initializes the node. This should always be called when creating nodes that will be used in the outliner.
	 */
	init(): this
	addTo(target?: OutlinerNode): this
	sortInBefore(target?: OutlinerNode, index_modifier?: number): this
	getParentArray(): OutlinerNode[]
	/**
	 * Unfolds the outliner and scrolls up or down if necessary to show the group or element.
	 */
	showInOutliner(): this
	/**
	 * Updates the Vue node of the element. This is only necessary in some rare situations
	 */
	updateElement(): this
	/**
	 * Removes the element.
	 */
	remove(): this
	/**
	 * Marks the name of the group or element in the outliner for renaming.
	 */
	rename(): this
	/**
	 * Saves the changed name of the element by creating an undo point and making the name unique if necessary.
	 */
	saveName(): this
	/**
	 * Create a unique name for the group or element by adding a number at the end or increasing it.
	 */
	createUniqueName(): this
	/**
	 * Checks of the group or element is a child of `group`.
	 * @param max_levels The maximum number of generations that can be between the element and the group
	 */
	isChildOf( group: Group, max_levels: number ): boolean
	/**
	 * Displays the context menu of the element
	 * @param event Mouse event, determines where the context menu spawns.
	 */
	showContexnu(event: Event | HTMLElement): this

	static uuids: {
		[uuid: UUID]: OutlinerNode
	}
}

/**
 * @private
 */
declare class OutlinerElement extends OutlinerNode {
	constructor ()
	selected: boolean
	readonly mesh: THREE.Object3D | THREE.Mesh
	getMesh(): THREE.Object3D | THREE.Mesh
	static fromSave: (data: object, keep_uuid?: boolean) => OutlinerElement
	static isParent: false
}

interface LocatorOptions {
	name: string
	from: ArrayVector3

}
declare class Locator extends OutlinerElement {
	constructor (options: Partial<LocatorOptions>, uuid?: string)

	extend(options: Partial<LocatorOptions>)
	flip(axis: number, center: number): this
	getWorldCenter(): THREE.Vector3

	static all: Locator[]
	static selected: Locator[]
	/**Check if any elements of the type are in the project */
	static hasAny: () => boolean
	/**Check if any elements of the type are currently selected */
	static hasSelected: () => boolean
}


interface NullObjectOptions {
	name?: string
	position?: ArrayVector3
	ik_target?: string
	lock_ik_target_rotation?: boolean

}
declare class NullObject extends OutlinerElement {
	constructor (options: Partial<NullObjectOptions>, uuid?: string)
	position: ArrayVector3
	ik_target: string
	lock_ik_target_rotation: boolean

	extend(options: Partial<NullObjectOptions>)
	flip(axis: number, center: number): this
	getWorldCenter(): THREE.Vector3

	static all: NullObject[]
	static selected: NullObject[]
	/**Check if any elements of the type are in the project */
	static hasAny: () => boolean
	/**Check if any elements of the type are currently selected */
	static hasSelected: () => boolean
}


interface TextureMeshOptions {
	name?: string
	texture_name?: string
	origin?: ArrayVector3
	local_pivot?: ArrayVector3
	rotation?: ArrayVector3
	scale?: ArrayVector3
}
declare class TextureMesh extends OutlinerElement {
	constructor (options: Partial<TextureMeshOptions>, uuid?: string)
	texture_name: string
	local_pivot: ArrayVector3
	scale: ArrayVector3

	extend(options: Partial<TextureMeshOptions>)
	flip(axis: number, center: number): this
	getWorldCenter(): THREE.Vector3
	moveVector(offset: ArrayVector3 | THREE.Vector3, axis: number, update?: boolean): void

	static all: TextureMesh[]
	static selected: TextureMesh[]
}



declare namespace Outliner {
	const root: OutlinerNode[]
	const elements: OutlinerElement[]
	const selected: OutlinerElement[]
}

declare const markerColors: {
	pastel: string
	standard: string
	name: string
}[]

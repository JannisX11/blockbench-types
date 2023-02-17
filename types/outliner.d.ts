/// <reference path="./index.d.ts"/>
type ArrayVector4 = [number, number, number, number]
type ArrayVector3 = [number, number, number]
type ArrayVector2 = [number, number]

/**
 * @private
 */
declare class OutlinerNode {
	constructor()
	uuid: UUID
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
	isChildOf(group: Group, max_levels: number): boolean
	/**
	 * Displays the context menu of the element
	 * @param event Mouse event, determines where the context menu spawns.
	 */
	showContexnu(event: Event | HTMLElement): this
}

/**
 * @private
 */
declare class OutlinerElement extends OutlinerNode {
	constructor()
	selected: boolean
	readonly mesh: THREE.Object3D | THREE.Mesh
	getMesh(): THREE.Object3D | THREE.Mesh
	static fromSave: (data: any, keep_uuid?: boolean) => OutlinerElement
	static isParent: false
	getSaveCopy?: (project?: boolean) => OutlinerElement
}

interface GroupOptions {
	/**Group name */
	name: string
	/**Array of
	 * declare function compileGroups(undo: boolean, lut?: ) the group pivot point */
	origin: ArrayVector3
	/**Array of the group rotation */
	rotation: ArrayVector3
	/**If a bone, whether to reset the informations of inherited bones in bedrock edition. */
	reset: boolean
	/**Whether to shade the contents of the group */
	shade: boolean
	/**Whether the group is selected */
	selected: boolean
	/**Whether the group is visible */
	visibility: boolean
	/**Whether to export the entire group */
	export: boolean
	/**Auto UV setting for the children. Can be 0, 1 or 2. */
	autouv: 0 | 1 | 2
}

declare class Group extends OutlinerNode {
	constructor(options: Partial<GroupOptions>)
	static selected: Group
	static all: Group[]

	name: string
	children: OutlinerNode[]
	origin: ArrayVector3
	rotation: ArrayVector3
	reset: boolean
	shade: boolean
	selected: boolean
	visibility: boolean
	autouv: 1 | 2 | 3
	isOpen: boolean
	ik_enabled: boolean
	ik_chain_length: number

	extend: (options: Partial<GroupOptions>) => this
	selectChildren: (event: Event) => this
	selectLow: (highlight: boolean) => this
	unselect: () => this
	matchesSelection: () => boolean
	/**
	 * Opens theOpens the group and all of its ancestor groups.
	 */
	openUp: () => this
	/**
	 * Removes the group
	 * @param undo If true, an undo point will be created.
	 */
	remove: (undo?: boolean) => this
	/**
	 * Remove the group and leave all of its children in the parent array.
	 */
	resolve: () => OutlinerNode[]
	/**
	 * Move the origin of a bone to a specific location without visually affecting the position of it's content.
	 */
	transferOrigin: (origin: ArrayVector3) => this
	/**
	 * Sort the content of the group alphabetically. This will automatically create an undo point.
	 */
	sortContent: () => this
	/**
	 * Duplicate the group
	 */
	duplicate: () => Group
	getSaveCopy: () => any
	getChildlessCopy: () => Group
	compile: (undo: boolean) => any
	forEachChild<Type extends OutlinerNode>(
		callback: (child: Type) => void,
		type?: Type,
		for_self?: boolean
	): void
}

interface LocatorOptions {
	name: string
	from: ArrayVector3
}
declare class Locator extends OutlinerElement {
	constructor(options: Partial<LocatorOptions>, uuid?: string)

	extend(options: Partial<LocatorOptions>)
	flip(axis: number, center: number): this
	getWorldCenter(): THREE.Vector3

	static all: Locator[]
	static selected: Locator[]
}

interface NullObjectOptions {
	name?: string
	position?: ArrayVector3
	ik_target?: string
	lock_ik_target_rotation?: boolean
}
declare class NullObject extends OutlinerElement {
	constructor(options: Partial<NullObjectOptions>, uuid?: string)
	position: ArrayVector3
	ik_target: string
	lock_ik_target_rotation: boolean

	extend(options: Partial<NullObjectOptions>)
	flip(axis: number, center: number): this
	getWorldCenter(): THREE.Vector3

	static all: NullObject[]
	static selected: NullObject[]
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
	constructor(options: Partial<TextureMeshOptions>, uuid?: string)
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

declare function compileGroups(undo: boolean, lut?: { [index: number]: number }): any[]

declare function parseGroups(array: any[], import_reference?: any, startIndex?: number): void

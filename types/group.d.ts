interface GroupOptions {
	/**Group name */
	name: string
	/**Array of the group pivot point */
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
	autouv: 0 | 1 | 2
	isOpen: boolean
	ik_enabled: boolean
	ik_chain_length: number

	extend(options: Partial<GroupOptions>): this
	selectChildren(event: Event): this
	selectLow(highlight: boolean): this
	unselect(): this
	matchesSelection(): boolean
	/**
	 * Opens the group and all of its ancestor groups.
	 */
	openUp(): this
	/**
	 * Removes the group
	 * @param undo If true, an undo point will be created.
	 */
	remove(undo?: boolean): this
	/**
	 * Remove the group and leave all of its children in the parent array.
	 */
	resolve(): OutlinerNode[]
	/**
	 * Move the origin of a bone to a specific location without visually affecting the position of it's content.
	 */
	transferOrigin(origin: ArrayVector3): this
	/**
	 * Sort the content of the group alphabetically. This will automatically create an undo point.
	 */
	sortContent(): this
	/**
	 * Duplicate the group
	 */
	duplicate(): Group
	getSaveCopy(): any
	getChildlessCopy(): Group
	compile(undo: boolean): any
	forEachChild(callback: (any: OutlinerNode) => void, type?: any, for_self?: boolean)
}

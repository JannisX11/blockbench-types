interface ModeOptions {
	name: string
	default_tool?: string
	selectElements?: boolean
	/**
	 * Hide certain types of nodes in the outliner, like cubes and meshes in animation mode
	 */
	hidden_node_types?: string[]
	hide_toolbars?: boolean
	hide_sidebars?: boolean
	hide_status_bar?: boolean
	condition?: ConditionResolvable
	component?: Vue.Component
	onSelect?(): void
	onUnselect?(): void
}
declare class Mode extends KeybindItem {
	constructor(id: string, options: ModeOptions)

	/**Selects the mode */
	select(): void
	/**Unselects the mode */
	unselect(): void
	/**Activates the mode */
	trigger(): void

	static selected: Mode
}

declare namespace Modes {
	const options: {
		[id: string]: Mode
	}
}

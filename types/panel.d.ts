type PanelSlot = 'left_bar' | 'right_bar' | 'top' | 'bottom' | 'float'

interface PanelOptions {
	id: string
	name: string
	icon: string
	menu?: any
	growable?: boolean
	selection_only?: boolean
	condition?: ConditionResolvable
	display_condition?: ConditionResolvable
	expand_button: boolean
	toolbars: {
		[id: string]: Toolbar
	} | Toolbar[]
	default_position: {
		slot: PanelSlot
		float_position: [number, number]
		float_size: [number, number]
		height: number
		folded: boolean
	}
	component: Vue.Component
	default_side: 'right' | 'left'
	insert_before: string
	insert_after: string
	onResize(): void
	onFold(): void
}
type PanelEvent = 'drag' | 'fold' | 'change_zindex' | 'move_to' | 'moved_to' | 'update'

/**
 * Panels are interface sections in Blockbench, that are always visible (in a specific format and mode), and can be added to the sidebars, above or below the 3D viewport, or used as free floating above the UI. Examples are the Outliner or the UV editor.
 */
declare class Panel {
	constructor (id: string, options: PanelOptions)
	constructor (options: PanelOptions)
	isVisible(): boolean
	isInSidebar(): boolean
	slot: PanelSlot
	folded: boolean
	inside_vue: Vue


	fold(state?: boolean): this
	/**
	 * If the panel is floating, move it up to the front
	 */
	moveToFront(): this
	moveTo(slot: PanelSlot, ref_panel?: Panel, before?: boolean): this
	update(dragging?: boolean): this
	dispatchEvent(event_name: PanelEvent, data?: any): void
	/**
	 * Add an event listener
	 */
	on(event_name: PanelEvent, callback: (data?) => void): void
	/**
	 * Adds a single-use event listener
	 */
	once(event_name: PanelEvent, callback: (data?) => void): void
	/**
	 * Removes an event listener
	 */
	removeListener(event_name: PanelEvent, callback: (data?) => void): void
	delete(): void
}

declare function updateInterfacePanels(): void
declare function setActivePanel(panel_id: string): void

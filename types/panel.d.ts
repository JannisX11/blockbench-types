/// <reference path="./blockbench.d.ts"/>
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
	}
	default_position: {
		slot: string
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

declare class Panel {
	constructor(id: string, options: PanelOptions)
	constructor(options: PanelOptions)
	isVisible(): boolean
	isInSidebar(): boolean
	slot: string
	folded: boolean
	fold(state?: boolean): this
	inside_vue: Vue.Component
	/**
	 * If the panel is floating, move it up to the front
	 */
	moveToFront(): this
	moveTo(slot: string, ref_panel?: Panel, before?: boolean): this
	update(dragging?: boolean): this
	dispatchEvent(event_name: PanelEvent, data?: any): void
	/**
	 * Add an event listener
	 */
	on(event_name: PanelEvent, callback: (data?) => void): void
	removeListener(event_name: PanelEvent, callback: (data?) => void): void
	delete(): void
}

declare function updateInterfacePanels(): void
declare function setActivePanel(panel_id: string): void

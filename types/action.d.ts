/**
 * Registry of all toolbar items, such as actions, tools, etc.
 */
/// <reference path="./blockbench.d.ts"/>
declare const BarItems: {
	[id: string]: BarItem
}

declare interface KeybindKeys {
	/**
	 * Main key, can be a numeric keycode or a lower case character
	 */
	key: number | string
	ctrl?: boolean | null
	shift?: boolean | null
	alt?: boolean | null
	meta?: boolean | null
}
/**
 * A customizable keybind
 */
declare class Keybind {
	constructor(keys: KeybindKeys)
	key: number
	ctrl?: boolean
	shift?: boolean
	alt?: boolean
	/**
	 * Get the name of the bound key
	 */
	getCode(): string
}
interface KeybindItemOptions {
	keybind?: Keybind
}
declare class KeybindItem extends Deletable {
	constructor(id: string, options: KeybindItemOptions)
	keybind: Keybind
}

declare class MenuSeparator {
	constructor()
}
type ActionEventName =
	| 'delete'
	| 'use'
	| 'used'
	| 'trigger'
	| 'get_node'
	| 'select'
	| 'change'
	| 'changed'
	| 'update'
	| 'open'
interface BarItemOptions extends KeybindItemOptions {
	name?: string
	description?: string
	icon?: string
	condition?: ConditionResolvable
	category?: string
	keybind?: Keybind
}
/**
 * Anything that can go into a toolbar, including actions, tools, toggles, widgets etc.
 */
declare class BarItem extends KeybindItem {
	constructor(id: string, options: BarItemOptions)
	id: string
	node: HTMLElement
	nodes: HTMLElement[]
	conditionMet(): boolean
	/**
	 * Adds a label to the HTML element of the bar item
	 * @param in_bar Set to true to generate an in-bar label, as opposed to a regular on-hover label
	 * @param action Provide the action to generate the label. This defaults to self and is only needed in special cases
	 */
	addLabel(in_bar?: boolean, action?: any): void
	/**
	 * Gets a copy of the elements HTML node that is not yet in use.
	 */
	getNode(): HTMLElement
	/**
	 * Appends the bar item to a HTML element
	 */
	toElement(destination: HTMLElement): this
	pushToolbar(bar: any): void

	/**
	 * Adds an event listener to the item
	 * @param event_name The event type to listen for
	 * @param callback
	 */
	on(event_name: ActionEventName, callback: (data: object) => void): void
	/**
	 * Adds a single-use event listener to the item
	 * @param event_name The event type to listen for
	 * @param callback
	 */
	once(event_name: ActionEventName, callback: (data: object) => void): void
	/**
	 * Removes an event listener from the item
	 * @param event_name
	 * @param callback
	 */
	removeListener(event_name: ActionEventName, callback: (data: object) => void): void
	constructor(id: string, options: BarItemOptions)
	conditionMet(): boolean
	/**
	 * Adds a label to the HTML element of the bar item
	 * @param in_bar Set to true to generate an in-bar label, as opposed to a regular on-hover label
	 * @param action Provide the action to generate the label. This defaults to self and is only needed in special cases
	 */
	addLabel(in_bar?: boolean, action?: any): void
	/**
	 * Gets a copy of the elements HTML node that is not yet in use.
	 */
	getNode(): HTMLElement
	/**
	 * Appends the bar item to a HTML element
	 */
	toElement(destination: HTMLElement): this
	pushToolbar(bar: any): void

	dispatchEvent<T = EventName>(event: T, ...args: any[]): void
}

interface ActionOptions extends BarItemOptions {
	/**
	 * Function to run when user uses the action successfully
	 */
	click(event?: Event): void
	/**
	 * Icon color. Can be a CSS color string, or an axis letter to use an axis color.
	 */
	color?: string
	/**
	 * ID of a setting that the action is slinked to
	 */
	linked_setting?: string
	children?: any[]
	/**
	 * Show the full label in toolbars
	 */
	label?: boolean
}
/**
 * Actions can be triggered to run something, they can be added to menus, toolbars, assigned a keybinding, or run via Action Control
 */
declare class Action extends BarItem {
	constructor(id: string, options: ActionOptions)
	nodes: HTMLElement[]
	/**
	 * Provide a menu that belongs to the action, and gets displayed as a small arrow next to it in toolbars.
	 */
	side_menu?: Menu
	click: ActionOptions['click']

	condition?(): boolean
	/**
	 * Trigger to run or select the action. This is the equivalent of clicking or using a keybind to trigger it. Also checks if the condition is met.
	 */
	trigger(event?: Event): boolean
	updateKeybindingLabel(): this
	/** Change the icon of the action */
	setIcon(icon: IconString): void
	toggleLinkedSetting(change: any): void
}
interface ToggleOptions extends ActionOptions {
	/**
	 * Default value of the toggle
	 */
	default?: boolean
	/**
	 * Method that gets called when the user changes the value of the toggle
	 */
	onChange?(value: boolean): void
}
/**
 * A toggle is a type of action that can be on or off. The state is not persistent between restarts by default.
 */
declare class Toggle extends Action {
	value: boolean
	constructor(id: string, options: ToggleOptions)
	/**
	 * Updates the state of the toggle in the UI
	 */
	updateEnabledState(): void
	set(value: boolean): this
	setIcon(icon: IconString): void
}

type RGBAColor = { r: number; g: number; b: number; a: number }
type ViewMode = 'textured' | 'solid' | 'wireframe' | 'uv' | 'normal'
type PaintContext = {
	/**
	 * Brush color, set by the Blockbench color panel
	 */
	color: string
	/**
	 * Opacity, as set by the Opacity slider
	 */
	opacity: number
	/**
	 * 2D Canvas context of the texture that is being edited
	 */
	ctx: CanvasRenderingContext2D
	/**X Coordinate of the position of the brush stroke */
	x: number
	/**Y Coordinate of the position of the brush stroke */
	y: number
	/**
	 * Brush size, as set by the Brush Size slider
	 */
	size: number
	/**
	 * Brush softness, as set by the Brush Softness slider
	 */
	softness: number
	/**
	 * Blockbench texture that is being edited
	 */
	texture: Texture
	/**
	 * Javascript pointer event that the brush stroke originated from
	 */
	event: PointerEvent
}
interface BrushOptions {
	/**
	 * Enable the input for blend modes when this tool is selected
	 */
	blend_modes: boolean
	/**
	 * Enable the input for shapes when this tool is selected
	 */
	shapes: boolean
	/**
	 * Enable the input for brush size when this tool is selected
	 */
	size: boolean
	/**
	 * Enable the input for softness when this tool is selected
	 */
	softness: boolean
	/**
	 * Enable the input for opacity when this tool is selected
	 */
	opacity: boolean
	/**
	 * When the brush size is an even number, offset the snapping by half a pixel so that even size brush strokes can be correctly centered
	 */
	offset_even_radius: boolean
	/**
	 * Set whether the brush coordinates get floored to snap to the nearest pixel.
	 */
	floor_coordinates: boolean | (() => boolean)
	/**
	 * Function that runs per pixel when the brush is used. Mutually exclusive with draw().
	 * @param pixel_x Local X coordinate relative to the brush center
	 * @param pixel_y Local Y coordinate relative to the brush center
	 * @param pixel_color Current color of the pixel on the texture
	 * @param local_opacity Local opacity of the current pixel on the brush, between 0 and 1. Opacity falls of to the sides of the brush if the brush is set to smooth. Opacity from the Opacity slider is not factored in yet.
	 * @param PaintContext Additional context to the paint stroke
	 */
	changePixel(
		pixel_x: number,
		pixel_y: number,
		pixel_color: RGBAColor,
		local_opacity: number,
		PaintContext: PaintContext
	): RGBAColor
	/**
	 * Function that runs when a new brush stroke starts. Return false to cancel the brush stroke
	 * @param context
	 */
	onStrokeStart(context: {
		texture: Texture
		x: number
		y: number
		uv?: any
		event: PointerEvent
		raycast_data: RaycastResult
	}): boolean
	/**
	 * Function that runs when a new brush stroke starts. Return false to cancel the brush stroke
	 * @param context
	 */
	onStrokeMove(context: {
		texture: Texture
		x: number
		y: number
		uv?: any
		event: PointerEvent
		raycast_data: RaycastResult
	}): boolean
	/**
	 * Function that runs when a new brush stroke starts.
	 * @param context
	 */
	onStrokeEnd(context: {
		texture: Texture
		x: number
		y: number
		uv?: any
		raycast_data: RaycastResult
	}): void
	/**
	 * Alternative way to create a custom brush, mutually exclusive with the changePixel() function. Draw runs once every time the brush starts or moves, and also along the bath on lines.
	 * @param context
	 */
	draw(context: {
		ctx: CanvasRenderingContext2D
		x: number
		y: number
		size: number
		softness: number
		texture: Texture
		event: PointerEvent
	}): void
}
interface ToolOptions extends ActionOptions {
	selectFace?: boolean
	selectElements?: boolean
	transformerMode?: 'translate' | ''
	animation_channel?: string
	toolbar?: string
	alt_tool?: string
	modes?: string[]
	allowed_view_modes?: ViewMode
	paintTool?: boolean
	brush?: BrushOptions
}
interface WidgetOptions extends BarItemOptions {
	id?: string
}
/**
 * A tool, such as move tool, vertex snap tool, or paint brush
 */
declare class Tool extends Action {
	constructor(id: string, options: ToolOptions)
	animation_channel: string
	select(): this | undefined
	trigger(event: Event): boolean
}
declare class Widget extends BarItem {
	constructor(id: string, options: WidgetOptions)
}
type NumSliderOptions = WidgetOptions & {
	settings?: {
		default?: number
		min?: number
		max?: number
		interval?: number
		step?: number
	}
	change?(value: (n: number) => number): void
	get?(): number
}
declare class NumSlider extends Widget {
	constructor(id: string, options: NumSliderOptions)
	startInput(event: Event): void
	setWidth(width: any): this
	getInterval(event: Event): number
	slide(clientX: any, event: Event): void
	input(): void
	stopInput(): void
	arrow(difference: any, event: Event): void
	trigger(event: Event): boolean
	setValue(value: number, trim?: any): this
	change(modify: (n: number) => number): void
	get(): number
	update(): void
}
declare class BarSlider extends Widget {
	constructor(id: string, options: NumSliderOptions)
	change(event: Event): void
	set(value: number): void
	get(): number
}
interface BarSelectOptions<T> extends WidgetOptions {
	value?: T
	options: Record<string, T>
}
declare class BarSelect<T> extends Widget {
	constructor(id: string, options: BarSelectOptions<T>)
	open(event: Event): void
	trigger(event: Event): boolean | undefined
	change(value: T, event: Event): this
	getNameFor(key: string): string
	set(key: string): this
	get(): string
	value: T
}
declare class BarText extends Widget {
	constructor(
		id: string,
		options: WidgetOptions & {
			text: string
		}
	)
	set(text: any): this
	update(): this
	trigger(event: Event): boolean
}
interface ColorPickerOptions extends WidgetOptions {
	value?: string
	palette?: boolean
	onChange?: (color: tinycolor.Instance) => void
}
declare class ColorPicker extends Widget {
	value: tinycolor.Instance
	jq: JQuery
	constructor(options: ColorPickerOptions)
	constructor(id: string, options: ColorPickerOptions)
	change(color: tinycolor.Instance): void
	hide(): void
	confirm(): void
	set(color: any): this
	get(): tinycolor.Instance
}
interface ToolbarOptions {
	id: string
	name?: string
	/**
	 * If true, the toolbar will display a label abovee
	 */
	label?: boolean
	condition?: ConditionResolvable
	/**
	 * If true, the toolbar will only take as much width as needed
	 */
	narrow?: boolean
	vertical?: boolean
	/**
	 * Default content of the toolbar. Separators are available, where _ = separator, + = spaces, # = line break
	 */
	children: ('_' | '+' | '#' | string | BarItem)[]
}
declare class Toolbar {
	constructor(id: string, data: ToolbarOptions)
	constructor(data: ToolbarOptions)
	build(data: any, force: any): this
	contextmenu(event: Event): void
	editMenu(): this
	add(action: any, position: any): this
	remove(action: any): this
	update(): this
	toPlace(place: any): this
	save(): this
	reset(): this
	condition(): boolean
}
declare namespace BARS {
	const stored: {}
	const editing_bar: undefined | Toolbar
	const action_definers: (() => void)[]
	const condition: any
	function defineActions(definer: any): void
	function setupActions(): void
	function setupToolbars(): void
	function setupVue(): void
	function updateConditions(): void
	function updateToolToolbar(): void
}
/**
 * A dialog-based interface to search and trigger actions and other things
 */
declare namespace ActionControl {
	const open: boolean
	const type: string
	const max_length: number
	function select(): void
	function hide(): void
	function confirm(event: Event): void
	function cancel(): void
	function trigger(action: any, event: Event): void
	function click(action: any, event: Event): void
	function handleKeys(event: Event): boolean
}
/**
 * Stores and handles keybinds
 */
declare namespace Keybinds {
	const actions: BarItem[]
	const stored: Record<string, { key: number; ctrl: boolean; shift: boolean }>
	const extra: Record<string, KeybindItem>
	const structure: any
	function save(): void
	function reset(): void
}
declare class _ToolToolbar extends Toolbar {
	selected: Tool
}
declare const Toolbox: _ToolToolbar

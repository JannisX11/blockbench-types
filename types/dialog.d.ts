

interface DialogFormElement {
	label?: string
	/**
	 * Detailed description of the field, available behind the questionmark icon or on mouse hover
	 */
	description?: string
	type:
		| 'text'
		| 'number'
		| 'range'
		| 'checkbox'
		| 'select'
		| 'radio'
		| 'textarea'
		| 'vector'
		| 'color'
		| 'file'
		| 'folder'
		| 'save'
		| 'info'
		| 'buttons'
	/**
	 * If true, the label will be displayed without colon at the end
	 */
	nocolon?: boolean
	/**
	 * Stretch the input field across the whole width of the form
	 */
	full_width?: boolean
	/** Set the input to read-only */
	readonly?: boolean
	/** Add buttons to allow copying and sharing the text or link */
	share_text?: boolean
	/**
	 * The default value
	 */
	value?: any
	/**
	 * The default selected option for 'select', 'inline_select' and 'radio' types. Alias for 'value'
	 */
	default?: any
	placeholder?: string
	/**
	 * When using 'text' type, the text to display. Markdown is supported
	 */
	text?: string
	/**
	 * When using 'range' type, allow users to modify the numeric input
	 */
	editable_range_label?: boolean
	colorpicker?: any
	/**
	 * On numeric inputs, the minimum possible value
	 */
	min?: number
	/**
	 * On numeric inputs, the maximum possible value
	 */
	max?: number
	/**
	 * The step in which the value can be increased / decreased
	 */
	step?: number
	/**
	 * If enabled, the value is forced to multiples of the "step" value. This can be used to create integer-only inputs etc.
	 */
	force_step?: boolean
	/**
	 * The height of the input on textareas, in pixels
	 */
	height?: number
	/**
	 * Available options on select or inline_select inputs
	 */
	options?: {[key: string]: string | {name: string}}
	buttons?: string[]
	/**
	 * Allow users to toggle the entire option on or off
	 */
	toggle_enabled?: boolean
	/**
	 * Set whether the setting is toggled on or off by default. Requires 'toggle_enabled' field to be set to true
	 */
	toggle_default?: boolean
	/**
	 * Runs when any of the buttons is pressed
	 * @param button_index Index of the clicked button in the buttons list
	 */
	click?: (button_index: number) => void
}

type FormResultValue = string | number | boolean | []

interface ActionInterface {
	name: string
	description?: string
	icon: string
	click(event: Event): void
	condition: ConditionResolvable
}
interface DialogOptions {
	title: string
	id?: string
	width?: number
	/**
	 * Unless set to false, clicking on the darkened area outside of the dialog will cancel the dialog.
	 */
	cancel_on_click_outside?: boolean
	/**
	 * Default button to press to confirm the dialog. Defaults to the first button.
	 */
	confirmIndex?: number
	/**
	 * Default button to press to cancel the dialog. Defaults to the last button.
	 */
	cancelIndex?: number
	/**
	 * Function to execute when the dialog is opened
	 */
	onOpen?(): void
	/**
	 *  Function to execute when the user confirms the dialog
	 */
	onConfirm?(formResult: any): void
	/**
	 * Function to execute when the user cancels the dialog
	 */
	onCancel?(): void
	/**
	 * Triggered when the user presses a specific button
	 */
	onButton?(button_index: number, event?: Event): void
	/**
	 * Function to run when anything in the form is changed
	 */
	onFormChange?(form_result: { [key: string]: FormResultValue }): void
	/**
	 * Array of HTML any strings for each line of content in the dialog.
	 */
	lines?: (
		| HTMLElement
		| Comment
		| {
				label?: string
				widget?: Widget | (() => Widget)
				nocolon?: boolean
		  }
		| string
	)[]
	/**
	 * Creates a form in the dialog
	 */
	form?: {
		[formElement: string]: '_' | DialogFormElement
	}
	/**
	 * Vue component
	 */
	component?: Vue.Component
	/**
	 * Order that the different interface types appear in the dialog. Default is 'form', 'lines', 'component'.
	 */
	part_order?: string[]
	form_first?: boolean
	/**
	 * Creates a dialog sidebar
	 */
	sidebar?: DialogSidebarOptions
	/**
	 * Menu in the handle bar
	 */
	title_menu?: Menu
	/**
	 * Display a progress bar in the dialog
	 */
	progress_bar?: {
		/**
		 * A progress value between 0 and 1
		 */
		progress?: number
	}
	/**
	 * If true, the dialog will only have one button to close it
	 */
	singleButton?: boolean
	/**
	 * List of buttons
	 */
	buttons?: string[]
	/**
	 * A list of keyboard shortcuts that only work inside the dialog
	 */
	keyboard_actions?: {
		[id: string]: {
			keybind: Keybind
			run: (event: KeyboardEvent) => void
			condition?: ConditionResolvable
		}
	}
	/**
	 * Select on which axes the dialog can be resized. None by default
	 */
	resizable?: 'x' | 'y' | 'xy' | boolean
}

interface DialogSidebarOptions {
	pages?: {
		[key: string]: string | { label: string; icon: IconString; color?: string }
	}
	page?: string
	actions?: (Action | ActionInterface | string)[]
	onPageSwitch?(page: string): void
}
declare class DialogSidebar {
	constructor(options: DialogSidebarOptions)

	pages: {
		[key: string]: string
	}
	page: string
	actions: (Action | string)[]
	onPageSwitch(page: string): void
	build(): void
	toggle(state?: boolean): void
	setPage(page: string): void
}

declare class Dialog {
	constructor(id: string, options: DialogOptions)
	constructor(options: DialogOptions)

	id: string
	component: Vue.Component
	sidebar: DialogSidebar | null
	content_vue: Vue | null
	progress_bar?: {
		/**
		 * The current progress
		 */
		progress?: number
		/**
		 * Set the progress displayed in the progress bar
		 * @param value A progress value between 0 and 1
		 */
		setProgress(value: number): void
		/**
		 * The progress bar HTML node
		 */
		node?: HTMLDivElement
	}

	confirmIndex: number
	cancelIndex: number

	show(): this
	hide(): this
	/**
	 * Triggers the confirm event of the dialog.
	 */
	confirm(event?: Event): void
	/**
	 * Triggers the cancel event of the dialog.
	 */
	cancel(event?: Event): void
	/**
	 * Closes the dialog using the index of the pressed button
	 */
	close(button: number, event?: Event): void
	/**
	 * If the dialog contains a form, return the current values of the form
	 */
	getFormResult(): {
		[key: string]: FormResultValue
	}
	/**
	 * Function to execute when the dialog is opened
	 */
	onOpen?(): void
	/**
	 *  Function to execute when the user confirms the dialog
	 */
	onConfirm?(formResult: any): void
	/**
	 * Function to execute when the user cancels the dialog
	 */
	onCancel?(): void
	/**
	 * Triggered when the user presses a specific button
	 */
	onButton?(button_index: number, event?: Event): void
	/**
	 * Function to run when anything in the form is changed
	 */
	onFormChange?(form_result: { [key: string]: FormResultValue }): void
	/**
	 * Set the values of the dialog form inputs
	 * @param values The values to set, by form input key
	 * @param update Whether to update the dialog (call onFormChange) after setting the values. Default is true. Set to false when called from onFormChange
	 */
	setFormValues(values: { [key: string]: FormResultValue }, update: boolean): void
	/**
	 * Set whether the dialog form inputs are toggled on or off. See "toggle_enabled"
	 * @param values 
	 * @param update Whether to update the dialog (call onFormChange) after setting the values. Default is true. Set to false when called from onFormChange
	 */
	setFormToggles(values: { [key: string]: boolean }, update: boolean): void
	/**
	 * Delete the dialog any, causing it to be re-build from scratch on next open
	 */
	delete(): void

	/**
	 * Currently opened dialog
	 */
	static open: Dialog | null
	static stack: Dialog[]
}

interface ShapelessDialogOptions {
	title: string
	/**
	 * Default button to press to confirm the dialog. Defaults to the first button.
	 */
	confirmIndex?: number
	/**
	 * Default button to press to cancel the dialog. Defaults to the last button.
	 */
	cancelIndex?: number
	/**
	 *  Function to execute when the user confirms the dialog
	 */
	onConfirm?(formResult: any): void
	/**
	 * Function to execute when the user cancels the dialog
	 */
	onCancel?(): void
	/**
	 * Triggered when the user presses a specific button
	 */
	onClose?(button_index: number, event?: Event): void
	/**
	 * Vue component
	 */
	component?: Vue.Component
	/**
	 * Unless set to false, clicking on the darkened area outside of the dialog will cancel the dialog.
	 */
	cancel_on_click_outside?: boolean
}
declare class ShapelessDialog extends Dialog {
	constructor(id: string, options: ShapelessDialogOptions)

	id: string
	component: Vue.Component

	show(): this
	hide(): this
	/**
	 * Triggers the confirm event of the dialog.
	 */
	confirm(event?: Event): void
	/**
	 * Triggers the cancel event of the dialog.
	 */
	cancel(event?: Event): void
	/**
	 * Closes the dialog using the index of the pressed button
	 */
	close(button: number, event?: Event): void
	/**
	 * If the dialog contains a form, return the current values of the form
	 */
	getFormResult(): {
		[key: string]: FormResultValue
	}
	/**
	 * Set the values of the dialog form inputs
	 */
	setFormValues(values: { [key: string]: FormResultValue }): void
	/**
	 * Delete the dialog any, causing it to be re-build from scratch on next open
	 */
	delete(): void
}

interface DialogSidebarOptions {
	pages?: {
		[key: string]: string | { label: string; icon: IconString; color?: string }
	}
	page?: string
	actions?: (Action | ActionInterface | string)[]
	onPageSwitch?(page: string): void
}

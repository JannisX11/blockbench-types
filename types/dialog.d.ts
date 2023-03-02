/// <reference path="./blockbench.d.ts"/>

interface DialogFormElement {
	label?: string
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
	nocolon?: boolean
	full_width?: boolean
	/** Set the input to read-only */
	readonly?: boolean
	/** Add buttons to allow copying and sharing the text or link */
	share_text?: boolean
	value?: any
	placeholder?: string
	text?: string
	editable_range_label?: boolean
	colorpicker?: any
	min?: number
	max?: number
	step?: number
	height?: number
	options?: any
	buttons?: string[]
	click?(button_index: number): void
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
	id: string
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
	 * If true, the dialog will only have one button to close it
	 */
	singleButton?: boolean
	/**
	 * List of buttons
	 */
	buttons?: string[]
	/**
	 * Unless set to false, clicking on the darkened area outside of the dialog will cancel the dialog.
	 */
	cancel_on_click_outside?: boolean
	width?: number
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
	 */
	setFormValues(values: { [key: string]: FormResultValue }): void
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

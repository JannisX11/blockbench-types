interface DialogFormElement {
	label: string
	description?: string
	type: 'text' | 'number' | 'checkbox' | 'select' | 'radio' | 'textarea' | 'vector' | 'color' | 'file' | 'folder' | 'save' | 'info' 
	nocolon?: boolean
	readonly?: boolean
	value?: any
	placeholder?: string
	text?: string
	colorpicker?: any
	min?: number
	max?: number
	step?: number
	height?: number
	options?: object
}

type FormResultValue = string|number|boolean|[]
interface DialogOptions {
	title: string
	id: string
	/**
	 * Array of HTML object strings for each line of content in the dialog.
	 */
	lines: string[]
	/**
	 *  If false, the confirm button of the dialog is disabled
	 */
	confirmEnabled?: boolean
	/**
	 *  If false, the cancel button of the dialog is disabled
	 */
	cancelEnabled?: boolean
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
	onConfirm?: (formResult: object) => void
	/**
	 * Function to execute when the user cancels the dialog
	 */
	onCancel?: () => void
	/**
	 * Triggered when the user presses a specific button
	 */
	onButton?: (button_index: number, event?: Event) => void
	/**
	 * Function to run when anything in the form is changed
	 */
	onFormChange?: (form_result: {[key: string]: FormResultValue}) => void
	/**
	 * Creates a form in the dialog
	 */
	form?: {
		[formElement: string]: '_' | DialogFormElement
	}
	/**
	 * Vue component
	 */
	component: Vue.Component
}

declare class Dialog {
	constructor (options: DialogOptions)
	show: () => Dialog
	hide: () => Dialog
	/**
	 * Triggers the confirm event of the dialog.
	 */
	confirm: (event?: Event) => void
	/**
	 * Triggers the cancel event of the dialog.
	 */
	cancel: (event?: Event) => void
	/**
	 * Closes the dialog using the index of the pressed button
	 */
	close: (button: number, event?: Event) => void
	/**
	 * If the dialog contains a form, return the current values of the form
	 */
	getFormResult(): {
		[key: string]: FormResultValue
	}
	/**
	 * Delete the dialog object, causing it to be re-build from scratch on next open
	 */
	delete(): void
	
}

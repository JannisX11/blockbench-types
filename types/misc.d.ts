/// <reference path="./index.d.ts"/>

declare class Deletable {
	delete: () => void
}
type UUID = string

/**
 * True if Blockbench runs as a native app
 */
declare const isApp: boolean

type EventName =
	| 'remove_animation'
	| 'display_animation_frame'
	| 'before_closing'
	| 'create_session'
	| 'join_session'
	| 'quit_session'
	| 'send_session_data'
	| 'receive_session_data'
	| 'user_joins_session'
	| 'user_leaves_session'
	| 'process_chat_message'
	| 'update_settings'
	| 'update_project_settings'
	| 'save_project'
	| 'load_project'
	| 'new_project'
	| 'reset_project'
	| 'close_project'
	| 'saved_state_changed'
	| 'add_cube'
	| 'add_mesh'
	| 'add_group'
	| 'add_texture_mesh'
	| 'group_elements'
	| 'update_selection'
	| 'update_keyframe_selection'
	| 'select_all'
	| 'added_to_selection'
	| 'invert_selection'
	| 'canvas_select'
	| 'canvas_click'
	| 'change_texture_path'
	| 'add_texture'
	| 'finish_edit'
	| 'finished_edit'
	| 'undo'
	| 'redo'
	| 'load_undo_save'
	| 'change_color'
	| 'select_mode'
	| 'unselect_mode'
	| 'change_active_panel'
	| 'resize_window'
	| 'press_key'
	| 'select_format'
	| 'convert_format'
	| 'construct_format'
	| 'delete_format'
	| 'select_project'
	| 'unselect_project'
	| 'setup_project'
	| 'update_project_resolution'
	| 'merge_project'
	| 'update_view'
	| 'update_camera_position'
	| 'render_frame'
	| 'construct_model_loader'
	| 'delete_model_loader'
	| 'update_recent_project_data'
	| 'update_recent_project_thumbnail'
	| 'load_from_recent_project_data'
	| 'edit_animation_properties'
	| 'select_preview_scene'
	| 'unselect_preview_scene'

type IconString = string

interface MessageBoxOptions {
	/**
	 * Index of the confirm button within the buttons array
	 */
	confirm?: number
	/**
	 * Index of the cancel button within the buttons array
	 */
	cancel?: number
	buttons?: string[]
	translateKey?: string
	title?: string
	message?: string
	icon?: string
	width?: number
	/**
	 * Display a list of actions to do in the dialog. When clicked, the message box closes with the string ID of the command as first argument.
	 */
	commands?: {
		[id: string]: string | { text: string }
	}
}

interface PropertyOptions {
	default?: any
	condition?: any
	exposed?: boolean
	label?: string
	/**
	 * Options used for select types
	 */
	options?: object
	merge?: (instance: any, data: object) => void
	reset?: (instance: any) => void
	merge_validation?: (value: any) => boolean
}
/**
 * Creates a new property on the specified target class
 */
declare class Property extends Deletable {
	constructor(target_class: any, type: string, name: string, options?: PropertyOptions)
	class: any
	name: string
	type: string
	default: any

	isString: boolean
	isMolang: boolean
	isNumber: boolean
	isBoolean: boolean
	isArray: boolean
	isVector: boolean
	isVector2: boolean

	merge_validation: undefined | ((value: any) => boolean)
	condition?: any
	exposed?: boolean
	export?: boolean
	label?: any
	description?: any
	options?: any

	merge: (instance: any, data: object) => void
	reset: (instance: any) => void
	getDefault(instance: any): any
	copy(instance: any, target: any): void
}

declare function updateSelection(): void

/**
 * Returns a translated string in the current language
 * @param key Translation key
 * @param arguments Array of arguments that replace anchors (%0, etc.) in the translation. Items can be strings or anything that can be converted to strings
 */
declare function tl(key: string, arguments?: any[]): string

declare namespace Language {
	/**
	 * Translation data for the current language
	 */
	const data: {
		[key: string]: string
	}
	/**
	 * Two letter code indicating the currently selected language
	 */
	const code: string
	/**
	 * Add translations for custom translation strings
	 * @param language Two letter language code, e. G. 'en'
	 * @param strings Object listing the translation keys and values
	 */
	function addTranslations(language: string, strings: { [key: string]: string })
}

declare const DisplayMode: any

declare var LZUTF8: any

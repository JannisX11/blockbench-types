interface FormatPage {
	component?: Vue.Component
	content?: ({
		type: 'image' | 'h2' | 'h3' | 'h4' | 'text' | 'label' | 'image' | ''
		text?: string
		source?: string
		width?: number
		height?: number
	} | string)[]
	button_text?: string
}

interface FormatOptions {
	id: string
	icon: string
	name?: string
	description?: string
	category?: string
	target?: string | string[]
	confidential?: boolean
	condition?: Condition
	show_on_start_screen?: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void

	box_uv?: boolean
	optional_box_uv?: boolean
	single_texture?: boolean
	animated_textures?: boolean
	bone_rig?: boolean
	centered_grid?: boolean
	rotate_cubes?: boolean
	integer_size?: boolean
	meshes?: boolean
	texture_meshes?: boolean
	locators?: boolean
	canvas_limit?: boolean
	rotation_limit?: boolean
	uv_rotation?: boolean
	display_mode?: boolean
	animation_mode?: boolean
	animation_files?: boolean
	pose_mode?: boolean
	texture_folder?: boolean

	codec?: Codec
	onActivation?(): void
	onDeactivation?(): void
}

declare class ModelFormat extends Deletable {
	constructor(id: string, options: FormatOptions)
	constructor(options: FormatOptions)

	id: string
	icon: string
	name: string
	description: string
	category: string
	target: string | string[]
	confidential: boolean
	condition?: Condition
	show_on_start_screen: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void

	box_uv: boolean
	optional_box_uv: boolean
	single_texture: boolean
	model_identifier: boolean
	parent_model_id: boolean
	vertex_color_ambient_occlusion: boolean
	animated_textures: boolean
	bone_rig: boolean
	centered_grid: boolean
	rotate_cubes: boolean
	integer_size: boolean
	meshes: boolean
	texture_meshes: boolean
	locators: boolean
	canvas_limit: boolean
	rotation_limit: boolean
	uv_rotation: boolean
	java_face_properties: boolean
	select_texture_for_particles: boolean
	bone_binding_expression: boolean
	animation_files: boolean
	pose_mode: boolean
	display_mode: boolean
	animation_mode: boolean
	texture_folder: boolean

	/**
	 * Selects the format
	 */
	select(): void
	/**
	 * Creates a new model using the format. Returns false if the user clicks cancel in the 'Unsaved Changes' dialog, returns true when successful.
	 */
	new(): boolean
	/**
	 * Convert project to this format
	 */
	convertTo(): void
}

/**
 * The current format
 */
declare const Format: ModelFormat


interface ModelLoaderOptions {
	id?: string
	icon: string
	name?: string
	description?: string
	category?: string
	target?: string | string[]
	confidential?: boolean
	condition?: Condition
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void
}

declare class ModelLoader extends Deletable {
	constructor(id: string, options: ModelLoaderOptions)
	constructor(options: ModelLoaderOptions)

	id: string
	icon: string
	name: string
	description: string
	category: string
	target: string | string[]
	confidential: boolean
	condition?: Condition
	show_on_start_screen: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void
}

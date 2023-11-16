/// <reference path="./blockbench.d.ts"/>

interface FormatPage {
	component?: Vue.Component
	content?: (
		| {
				type: 'image' | 'h2' | 'h3' | 'h4' | 'text' | 'label' | 'image' | ''
				text?: string
				source?: string
				width?: number
				height?: number
		  }
		| string
	)[]
	button_text?: string
}
interface CubeSizeLimiter {
	/**
	 * Test whether the cube with the optionally provided values violates the size restrictions
	 */
	test: (
		cube: Cube,
		values?: { from: ArrayVector3; to: ArrayVector3; inflate: number }
	) => boolean
	/**
	 * Move the cube back into the restructions
	 */
	move(cube: Cube, values?: { from: ArrayVector3; to: ArrayVector3; inflate: number }): void
	/**
	 * Clamp the cube to fit into the restrictions. When an axis and direction is provided, clamp the element on that side to prevent wandering.
	 */
	clamp: (
		cube: Cube,
		values?: { from: ArrayVector3; to: ArrayVector3; inflate: number },
		axis?: number,
		direction?: boolean | null
	) => void
	/**
	 * Set to true to tell Blockbench to check and adjust the cube limit after rotating a cube
	 */
	rotation_affected?: boolean
	/**
	 * Optionally set the coordinate limits of cubes in local space
	 */
	coordinate_limits?: [number, number]
}

interface FormatOptions {
	id: string
	icon: string
	name?: string
	description?: string
	category?: string
	target?: string | string[]
	confidential?: boolean
	condition?: ConditionResolvable
	show_on_start_screen?: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void
	onSetup?(project: ModelProject, newModel?: boolean): void
	convertTo?(): void

	box_uv?: boolean
	optional_box_uv?: boolean
	single_texture?: boolean
	model_identifier?: boolean
	parent_model_id?: boolean
	vertex_color_ambient_occlusion?: boolean
	animated_textures?: boolean
	bone_rig?: boolean
	centered_grid?: boolean
	rotate_cubes?: boolean
	integer_size?: boolean
	meshes?: boolean
	texture_meshes?: boolean
	locators?: boolean
	rotation_limit?: boolean
	rotation_snap?: boolean
	uv_rotation?: boolean
	java_face_properties?: boolean
	select_texture_for_particles?: boolean
	bone_binding_expression?: boolean
	animation_files?: boolean
	texture_folder?: boolean
	image_editor?: boolean
	edit_mode?: boolean
	paint_mode?: boolean
	display_mode?: boolean
	animation_mode?: boolean
	pose_mode?: boolean
	animation_controllers?: boolean

	cube_size_limiter?: CubeSizeLimiter

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
	condition?: ConditionResolvable
	show_on_start_screen: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void
	onSetup?(): void

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
	rotation_limit: boolean
	rotation_snap: boolean
	uv_rotation: boolean
	java_face_properties: boolean
	select_texture_for_particles: boolean
	bone_binding_expression: boolean
	animation_files: boolean
	texture_folder: boolean
	image_editor: boolean
	edit_mode: boolean
	paint_mode: boolean
	display_mode: boolean
	animation_mode: boolean
	pose_mode: boolean

	codec?: Codec

	cube_size_limiter?: CubeSizeLimiter
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
declare const Formats: {
	[id: string]: ModelFormat
}

interface ModelLoaderOptions {
	id?: string
	icon: string
	name?: string
	description?: string
	category?: string
	target?: string | string[]
	confidential?: boolean
	condition?: ConditionResolvable
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
	condition?: ConditionResolvable
	show_on_start_screen: boolean
	format_page?: FormatPage
	onFormatPage?(): void
	onStart?(): void
}

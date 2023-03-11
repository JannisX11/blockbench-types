/// <reference path="./blockbench.d.ts"/>

declare class AnimationItem {
	static all: AnimationItem[]
	static selected: AnimationItem | null
	getUndoCopy?(options?: any, save?: any): any
}

interface AnimationOptions {
	name?: string
	loop?: 'once' | 'hold' | 'loop'
	override?: boolean
	anim_time_update?: string
	blend_weight?: string
	length?: number
	snapping?: number
}

interface AnimationUndoCopy {
	uuid: any
	name: any
	loop: any
	override: any
	anim_time_update: any
	blend_weight: any
	length: any
	snapping: any
	selected: any
}

declare class _Animation extends AnimationItem {
	constructor(data?: AnimationOptions)
	extend(data?: AnimationOptions): this
	getUndoCopy(options?: {}, save?: any): AnimationUndoCopy
	compileBedrockAnimation(): any
	save(): this | undefined
	select(): this | undefined
	setLength(length: number): void
	createUniqueName(references: _Animation[]): any
	rename(): this
	togglePlayingState(state: any): any
	showContextMenu(event: any): this
	getBoneAnimator(group: any): BoneAnimator
	add(undo?: boolean): this
	remove(undo: boolean, remove_from_file?: boolean): this
	getMaxLength(): number
	setLoop(value: any, undo: any): void
	calculateSnappingFromKeyframes(): number
	propertiesDialog(): void

	name: string
	uuid: string
	loop: 'once' | 'hold' | 'loop'
	override: boolean
	anim_time_update: string
	blend_weight: string
	length: number
	snapping: number
	loop_delay: string
	start_delay: string
	path: string
	playing: boolean
	saved: boolean

	effects?: EffectAnimator

	markers: TimelineMarker[]
	animators: {
		[id: string]: GeneralAnimator | undefined
	}
	saved_name?: string
	selected: boolean
	type: string
}

declare namespace Animator {
	const open: boolean
	const MolangParser: any
	const motion_trail: THREE.Object3D
	const motion_trail_lock: boolean
	const particle_effects: any
	const animations: _Animation[]
	const selected: _Animation | undefined
	function showDefaultPose(no_matrix_update?: boolean): void
	function resetParticles(): void
	function showMotionTrail(target?: Group): void
	/**
	 * Updates the preview based on the current time
	 */
	function preview(in_loop?: boolean): void
	function loadParticleEmitter(path: string, content: string): void
	/**
	 * Import a Bedrock animation file
	 * @param file File any
	 * @param animation_filter List of names of animations to import
	 */
	function loadFile(file: any, animation_filter?: string[]): void
	function resetLastValues(): void
}

interface AddChannelOptions {
	name?: string
	transform?: boolean
	mutable?: boolean
	max_data_points?: number
}
interface Channel {
	name: string
	transform: boolean
	mutable: boolean
	max_data_points: number
}
declare class GeneralAnimator {
	constructor(uuid: string | null, animation: _Animation)
	keyframes: Keyframe[]
	select(): this
	addToTimeline(): this
	addKeyframe(data: KeyframeOptions, uuid: string): Keyframe
	createKeyframe(): Keyframe
	getOrMakeKeyframe(): { before: Keyframe; result: Keyframe }
	toggleMuted(channel: string): this
	scrollTo(): this

	static addChannel(channel: string, options: AddChannelOptions): void
	channels: {
		[channel: string]: Channel
	}
	muted: {
		[channel: string]: boolean | undefined
	};
	[channel: string]: any
}

declare class BoneAnimator extends GeneralAnimator {
	name: string
	uuid: string
	rotations: Keyframe[]
	position: Keyframe[]
	scale: Keyframe[]
	getGroup(): Group
	fillValues(): void
	pushKeyframe(): void
	doRender(): boolean
	displayRotation(): void
	displayPosition(): void
	displayScale(): void
	interpolate(): void
	displayFrame(multiplier: number): void
}
declare class NullObjectAnimator extends GeneralAnimator {
	name: string
	uuid: string
	rotations: Keyframe[]
	position: Keyframe[]
	scale: Keyframe[]
	getElement(): NullObject
	doRender(): void
	displayPosition(): void
	displayIK(): void
	displayFrame(): void
}
declare class EffectAnimator extends GeneralAnimator {
	name: string
	uuid: string
	rotations: Keyframe[]
	position: Keyframe[]
	scale: Keyframe[]
	pushKeyframe(keyframe: _Keyframe): this
	displayFrame(in_loop?: boolean): void
	startPreviousSounds(): void
}

declare class TimelineMarker {
	color: number
	time: number
}

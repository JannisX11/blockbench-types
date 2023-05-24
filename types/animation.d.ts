declare class AnimationItem {
    static all: AnimationItem[]
    static selected: AnimationItem | null
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

declare class _Animation extends AnimationItem {
    constructor(data: AnimationOptions);
    extend(data: AnimationOptions): this;
    getUndoCopy(options?: {}, save?: any): {
        uuid: any;
        name: any;
        loop: any;
        override: any;
        anim_time_update: any;
        blend_weight: any;
        length: any;
        snapping: any;
        selected: any;
    };
    /**
     * Compiles the JSON tree of the animation for the Minecraft Bedrock Edition animation format.
     */
    compileBedrockAnimation(): object;
    save(): this | undefined;
    select(): this | undefined;
    setLength(length: number): void;
    createUniqueName(references: Animation[]): any;
    rename(): this;
    togglePlayingState(state: any): any;
    showContextMenu(event: any): this;
    /**
     * Returns (if necessary creates) the animator of a specific bone of the animation
     */
    getBoneAnimator(group: OutlinerNode): BoneAnimator;
    /**
     * Adds the animation to the current project and to the interface
     * @param undo If true, the addition of the animation will be registered as an edit
     */
    add(undo: any): this;
    remove(undo: any, remove_from_file?: boolean): this;
    getMaxLength(): number;
    setLoop(value: any, undo: any): void;
    /**
     * Calculate the snapping value that the animation should use, based on the time codes of the keyframes that it holds. Directly updates the value, but also returns it as a number (snaps per second)
     */
    calculateSnappingFromKeyframes(): number;
    /**
     * Opens the properties dialog
     */
    propertiesDialog(): void;

    name: string
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

    markers: TimelineMarker[]
    animators: {
        [id: string]: GeneralAnimator
    }
    saved_name?: string
    selected: boolean
    type: string
    uuid: string
}


declare namespace Animator {
    const open: boolean
    const MolangParser: object
    const motion_trail: THREE.Object3D
    const motion_trail_lock: boolean
    const particle_effects: object
    function showDefaultPose(no_matrix_update?: boolean): void
    function resetParticles(): void
    function showMotionTrail(target?: Group): void
    /**
     * Updates the preview based on the current time
     */
    function preview(): void
    function loadParticleEmitter(path: string, content: string): void
    /**
     * Import a Bedrock animation file
     * @param file File object
     * @param animation_filter List of names of animations to import
     */
    function loadFile(file: object, animation_filter?: string[])


}

interface AddChannelOptions {
    name?: string
    transform?: boolean
    mutable?: boolean
    max_data_points?: number
}
declare class GeneralAnimator {
    constructor(uuid: string, animation: Animation)
    keyframes: Keyframe[]
    select(): this
    addToTimeline(): this
    addKeyframe(data: KeyframeOptions, uuid: string): Keyframe
    createKeyframe(): Keyframe
    getOrMakeKeyframe(): {before: Keyframe, result: Keyframe}
    toggleMuted(channel: string): this
    scrollTo(): this

    static addChannel(channel: string, options: AddChannelOptions)
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
    displayFrame(): void
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
    pushKeyframe(keyframe): this
    displayFrame(in_loop): this
    startPreviousSounds(): void
}

declare class TimelineMarker {
    color: number
    time: number
}


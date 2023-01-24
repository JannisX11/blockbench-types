/// <reference types="vue" />
/// <reference types="three" />
/// <reference types="@types/tinycolor2" />
/// <reference types="@types/jquery" />
/// <reference types="wintersky" />

/// <reference types="./textures" />
/// <reference types="./action" />
/// <reference types="./animation" />
/// <reference types="./animation_controller" />
/// <reference types="./canvas" />
/// <reference types="./codec" />
/// <reference types="./file_system" />
/// <reference types="./format" />
/// <reference types="./global" />
/// <reference types="./interface" />
/// <reference types="./dialog" />
/// <reference types="./panel" />
/// <reference types="./keyframe" />
/// <reference types="./legacy" />
/// <reference types="./menu" />
/// <reference types="./outliner" />
/// <reference types="./cube" />
/// <reference types="./plugin" />
/// <reference types="./preview" />
/// <reference types="./project" />
/// <reference types="./mode" />
/// <reference types="./settings" />
/// <reference types="./timeline" />
/// <reference types="./undo" />
/// <reference types="./painter" />
/// <reference types="./screencam" />
/// <reference types="./validator" />
/// <reference types="./display_mode" />
/// <reference types="./misc" />
/// <reference types="./util" />


declare namespace Blockbench {
	const platform: 'web' | 'win32' | 'darwin' | 'linux'
	/**
	 * Blockbench version number
	 */
	const version: string
	/**
	 * URL queries when opened as web app using a link that contained queries
	 */
	const queries: {[key: string]: string} | undefined
	/**
	 * Time when Blockbench was opened
	 */
	const openTime: Date
	function reload(): void
	/**
	 * checks if Blockbench is newer than the specified version
	 * 
	 * @param version
	 * semver string
	 */
	function isNewerThan(version: string): boolean
	/**
	 * checks if Blockbench is older than the specified version
	 * 
	 * @param version
	 * semver string
	 */
	function isOlderThan(version: string): boolean
	/**
	 * Resolves an icon string as a HTML element
	 * @param icon 
	 * Material Icons, Fontawesome or custom icon string
	 * @param color 
	 * CSS color
	 */
	function getIconNode(icon: IconString, color?: string): HTMLElement
	/**
	 * Shows a passing message in the middle of the screen
	 * 
	 * @param message 
	 * Message
	 * @param time 
	 * Time in miliseconds that the message stays up
	 */
	function showQuickMessage(message: string, time?: number): void

	function showStatusMessage(message: string, time?: number): void

	function setStatusBarText(text?: string): void
	/**
	 * Set the value of a progress bar
	 * 
	 * @param progress 
	 * Progress of the bar between 0 and 1
	 * @param time 
	 * Time over which the bar is animated, in miliseconds
	 * @param bar
	 * ID of the bar element. If omitted, the main status bar will be selected
	 */
	function setProgress(progress: number, time?: number, bar?: string): void

	/**
	 * Opens a message box
	 */
	function showMessageBox(options: MessageBoxOptions, callback: (buttonID: number | string) => void): void

	function textPrompt(title: string, value: string, callback: (value: string) => void): void
	/**
	 * Opens the specified link in the browser or in a new tab
	 */
	function openLink(link: URL): void

	/**
	 * Shows a system notification
	 * @param title Title
	 * @param text Text
	 * @param icon Url or data url pointing to an icon. Defaults to Blockbench icon
	 */
	function notification(title: string, text: string, icon?: string): void
	/**
	 * Adds custom CSS code to Blockbench, globally. Returns an object that is deletable
	 * @param css CSS string
	 */
	function addCSS(css: string): Deletable

	function addFlag(flag: string): void
	function removeFlag(flag: string): void
	function hasFlag(flag: string): boolean

	function dispatchEvent(event_name: EventName, data: object): void

	function addListener(event_names: EventName, callback: (data: object) => void): void
	function on(event_names: EventName, callback: (data: object) => void): void

	function removeListener(event_names: EventName): void
}

type BlockbenchTypeOutliner = typeof Outliner
type BlockbenchTypeOutlinerNode = typeof OutlinerNode
type BlockbenchTypeOutlinerElement = typeof OutlinerElement
type BlockbenchTypeGroup = typeof Group
type BlockbenchTypeCube = typeof Cube
type BlockbenchTypeMesh = typeof Mesh
type BlockbenchTypeLocator = typeof Locator
type BlockbenchTypeNullObject = typeof NullObject
type BlockbenchTypeTextureMesh = typeof TextureMesh
type BlockbenchTypeFace = typeof Face
type BlockbenchTypeCubeFace = typeof CubeFace
type BlockbenchTypeMeshFace = typeof MeshFace
type BlockbenchTypeNodePreviewController = typeof NodePreviewController
type BlockbenchTypeAnimator = typeof Animator
type BlockbenchTypeTimeline = typeof Timeline
type BlockbenchTypeAnimationItem = typeof AnimationItem
type BlockbenchTypeAnimation = typeof Animation
type BlockbenchTypeAnimationController = typeof AnimationController
type BlockbenchTypeKeyframe = typeof Keyframe
type BlockbenchTypeKeyframeDataPoint = typeof KeyframeDataPoint
type BlockbenchTypeBoneAnimator = typeof BoneAnimator
type BlockbenchTypeNullObjectAnimator = typeof NullObjectAnimator
type BlockbenchTypeEffectAnimator = typeof EffectAnimator
type BlockbenchTypeTimelineMarker = typeof TimelineMarker
type BlockbenchTypePanel = typeof Panel
type BlockbenchTypeMode = typeof Mode
type BlockbenchTypeDialog = typeof Dialog
type BlockbenchTypeSetting = typeof Setting
type BlockbenchTypePlugin = typeof Plugin
type BlockbenchTypePreview = typeof Preview
type BlockbenchTypeToolbar = typeof Toolbar
type BlockbenchTypeLanguage = typeof Language
type BlockbenchTypePainter = typeof Painter
type BlockbenchTypeScreencam = typeof Screencam
type BlockbenchTypeSettings = typeof Settings
type BlockbenchTypeTextureAnimator = typeof TextureAnimator
type BlockbenchTypeToolbox = typeof Toolbox
type BlockbenchTypeBarItems = typeof BarItems
type BlockbenchTypeBarItem = typeof BarItem
type BlockbenchTypeAction = typeof Action
type BlockbenchTypeTool = typeof Tool
type BlockbenchTypeToggle = typeof Toggle
type BlockbenchTypeWidget = typeof Widget
type BlockbenchTypeBarSelect = typeof BarSelect
type BlockbenchTypeBarSlider = typeof BarSlider
type BlockbenchTypeBarText = typeof BarText
type BlockbenchTypeNumSlider = typeof NumSlider
type BlockbenchTypeColorPicker = typeof ColorPicker
type BlockbenchTypeKeybind = typeof Keybind
type BlockbenchTypeKeybindItem = typeof KeybindItem
type BlockbenchTypeMenu = typeof Menu
type BlockbenchTypeBarMenu = typeof BarMenu
type BlockbenchTypeResizeLine = typeof ResizeLine
type BlockbenchTypeModelProject = typeof ModelProject
type BlockbenchTypeModelFormat = typeof ModelFormat
type BlockbenchTypeCodec = typeof Codec
type BlockbenchTypeDisplaySlot = typeof DisplaySlot
type BlockbenchTypeReusable = typeof Reusable
type BlockbenchTypeTexture = typeof Texture
declare namespace Blockbench {
	const Outliner: BlockbenchTypeOutliner
	const OutlinerNode: BlockbenchTypeOutlinerNode
	const OutlinerElement: BlockbenchTypeOutlinerElement
	const Group: BlockbenchTypeGroup
	const Cube: BlockbenchTypeCube
	const Mesh: BlockbenchTypeMesh
	const Locator: BlockbenchTypeLocator
	const NullObject: BlockbenchTypeNullObject
	const TextureMesh: BlockbenchTypeTextureMesh
	const Face: BlockbenchTypeFace
	const CubeFace: BlockbenchTypeCubeFace
	const MeshFace: BlockbenchTypeMeshFace
	const NodePreviewController: BlockbenchTypeNodePreviewController
	const Animator: BlockbenchTypeAnimator
	const Timeline: BlockbenchTypeTimeline
	const AnimationItem: BlockbenchTypeAnimationItem
	const Animation: BlockbenchTypeAnimation
	const AnimationController: BlockbenchTypeAnimationController
	const Keyframe: BlockbenchTypeKeyframe
	const KeyframeDataPoint: BlockbenchTypeKeyframeDataPoint
	const BoneAnimator: BlockbenchTypeBoneAnimator
	const NullObjectAnimator: BlockbenchTypeNullObjectAnimator
	const EffectAnimator: BlockbenchTypeEffectAnimator
	const TimelineMarker: BlockbenchTypeTimelineMarker
	const Panel: BlockbenchTypePanel
	const Mode: BlockbenchTypeMode
	const Dialog: BlockbenchTypeDialog
	const Setting: BlockbenchTypeSetting
	const Plugin: BlockbenchTypePlugin
	const Preview: BlockbenchTypePreview
	const Toolbar: BlockbenchTypeToolbar
	const Language: BlockbenchTypeLanguage
	const Painter: BlockbenchTypePainter
	const Screencam: BlockbenchTypeScreencam
	const Settings: BlockbenchTypeSettings
	const TextureAnimator: BlockbenchTypeTextureAnimator
	const Toolbox: BlockbenchTypeToolbox
	const BarItems: BlockbenchTypeBarItems
	const BarItem: BlockbenchTypeBarItem
	const Action: BlockbenchTypeAction
	const Tool: BlockbenchTypeTool
	const Toggle: BlockbenchTypeToggle
	const Widget: BlockbenchTypeWidget
	const BarSelect: BlockbenchTypeBarSelect
	const BarSlider: BlockbenchTypeBarSlider
	const BarText: BlockbenchTypeBarText
	const NumSlider: BlockbenchTypeNumSlider
	const ColorPicker: BlockbenchTypeColorPicker
	const Keybind: BlockbenchTypeKeybind
	const KeybindItem: BlockbenchTypeKeybindItem
	const Menu: BlockbenchTypeMenu
	const BarMenu: BlockbenchTypeBarMenu
	const ResizeLine: BlockbenchTypeResizeLine
	const ModelProject: BlockbenchTypeModelProject
	const ModelFormat: BlockbenchTypeModelFormat
	const Codec: BlockbenchTypeCodec
	const DisplaySlot: BlockbenchTypeDisplaySlot
	const Reusable: BlockbenchTypeReusable
	const Texture: BlockbenchTypeTexture
}

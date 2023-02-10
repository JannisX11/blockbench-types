/// <reference types="@types/tinycolor2" />
/// <reference types="@types/jquery" />
/// <reference types="wintersky" />

/// <reference path="./textures.d.ts" />
/// <reference path="./action.d.ts" />
/// <reference path="./animation.d.ts" />
/// <reference path="./animation_controller.d.ts" />
/// <reference path="./canvas.d.ts" />
/// <reference path="./codec.d.ts" />
/// <reference path="./desktop.d.ts" />
/// <reference path="./dialog.d.ts" />
/// <reference path="./file_system.d.ts" />
/// <reference path="./format.d.ts" />
/// <reference path="./global.d.ts" />
/// <reference path="./interface.d.ts" />
/// <reference path="./dialog.d.ts" />
/// <reference path="./panel.d.ts" />
/// <reference path="./keyframe.d.ts" />
/// <reference path="./legacy.d.ts" />
/// <reference path="./menu.d.ts" />
/// <reference path="./mesh.d.ts" />
/// <reference path="./outliner.d.ts" />
/// <reference path="./cube.d.ts" />
/// <reference path="./plugin.d.ts" />
/// <reference path="./preview.d.ts" />
/// <reference path="./project.d.ts" />
/// <reference path="./mode.d.ts" />
/// <reference path="./settings.d.ts" />
/// <reference path="./timeline.d.ts" />
/// <reference path="./undo.d.ts" />
/// <reference path="./painter.d.ts" />
/// <reference path="./screencam.d.ts" />
/// <reference path="./validator.d.ts" />
/// <reference path="./display_mode.d.ts" />
/// <reference path="./misc.d.ts" />
/// <reference path="./util.d.ts" />
/// <reference path="./vue.d.ts" />

declare namespace Blockbench {
	const platform: 'web' | 'win32' | 'darwin' | 'linux'
	/**
	 * Blockbench version number
	 */
	const version: string
	/**
	 * URL queries when opened as web app using a link that contained queries
	 */
	const queries: { [key: string]: string } | undefined
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
	function showMessageBox(
		options: MessageBoxOptions,
		callback?: (buttonID: number | string) => void
	): void

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
	 * Adds custom CSS code to Blockbench, globally. Returns an any that is deletable
	 * @param css CSS string
	 */
	function addCSS(css: string): Deletable

	function addFlag(flag: string): void
	function removeFlag(flag: string): void
	function hasFlag(flag: string): boolean

	function dispatchEvent(event_name: EventName, data: any): void

	function addListener(event_names: EventName, callback: (data: any) => void): void
	function on(event_names: EventName, callback: (data: any) => void): void

	function removeListener(event_names: EventName): void
}

type BlockbenchTypeAction = typeof Action
type BlockbenchTypeAnimation = typeof BBAnimation
type BlockbenchTypeAnimationController = typeof AnimationController
type BlockbenchTypeAnimationItem = typeof AnimationItem
type BlockbenchTypeAnimator = typeof Animator
type BlockbenchTypeBarItem = typeof BarItem
type BlockbenchTypeBarItems = typeof BarItems
type BlockbenchTypeBarMenu = typeof BarMenu
type BlockbenchTypeBarSelect = typeof BarSelect
type BlockbenchTypeBarSlider = typeof BarSlider
type BlockbenchTypeBarText = typeof BarText
type BlockbenchTypeBoneAnimator = typeof BoneAnimator
type BlockbenchTypeCodec = typeof Codec
type BlockbenchTypeColorPicker = typeof ColorPicker
type BlockbenchTypeCube = typeof Cube
type BlockbenchTypeCubeFace = typeof CubeFace
type BlockbenchTypeDialog = typeof Dialog
type BlockbenchTypeDisplaySlot = typeof DisplaySlot
type BlockbenchTypeEffectAnimator = typeof EffectAnimator
type BlockbenchTypeFace = typeof Face
type BlockbenchTypeGroup = typeof Group
type BlockbenchTypeKeybind = typeof Keybind
type BlockbenchTypeKeybindItem = typeof KeybindItem
type BlockbenchTypeKeyframe = typeof BBKeyframe
type BlockbenchTypeKeyframeDataPoint = typeof KeyframeDataPoint
type BlockbenchTypeLanguage = typeof Language
type BlockbenchTypeLocator = typeof Locator
type BlockbenchTypeMenu = typeof Menu
type BlockbenchTypeMesh = typeof THREE.Mesh
type BlockbenchTypeMeshFace = typeof MeshFace
type BlockbenchTypeMode = typeof Mode
type BlockbenchTypeModelFormat = typeof ModelFormat
type BlockbenchTypeModelProject = typeof ModelProject
type BlockbenchTypeNodePreviewController = typeof NodePreviewController
type BlockbenchTypeNullObject = typeof NullObject
type BlockbenchTypeNullObjectAnimator = typeof NullObjectAnimator
type BlockbenchTypeNumSlider = typeof NumSlider
type BlockbenchTypeOutliner = typeof Outliner
type BlockbenchTypeOutlinerElement = typeof OutlinerElement
type BlockbenchTypeOutlinerNode = typeof OutlinerNode
type BlockbenchTypePainter = typeof Painter
type BlockbenchTypePanel = typeof Panel
type BlockbenchTypePlugin = typeof BBPlugin
type BlockbenchTypePreview = typeof Preview
type BlockbenchTypeResizeLine = typeof ResizeLine
type BlockbenchTypeReusable = typeof Reusable
type BlockbenchTypeScreencam = typeof Screencam
type BlockbenchTypeSetting = typeof Setting
type BlockbenchTypeSettings = typeof Settings
type BlockbenchTypeTexture = typeof Texture
type BlockbenchTypeTextureAnimator = typeof TextureAnimator
type BlockbenchTypeTextureMesh = typeof TextureMesh
type BlockbenchTypeTimeline = typeof Timeline
type BlockbenchTypeTimelineMarker = typeof TimelineMarker
type BlockbenchTypeToggle = typeof Toggle
type BlockbenchTypeTool = typeof Tool
type BlockbenchTypeToolbar = typeof Toolbar
type BlockbenchTypeToolbox = typeof Toolbox
type BlockbenchTypeWidget = typeof Widget

declare namespace Blockbench {
	const Action: BlockbenchTypeAction
	const Animation: BlockbenchTypeAnimation
	const AnimationController: BlockbenchTypeAnimationController
	const AnimationItem: BlockbenchTypeAnimationItem
	const Animator: BlockbenchTypeAnimator
	const BarItem: BlockbenchTypeBarItem
	const BarItems: BlockbenchTypeBarItems
	const BarMenu: BlockbenchTypeBarMenu
	const BarSelect: BlockbenchTypeBarSelect
	const BarSlider: BlockbenchTypeBarSlider
	const BarText: BlockbenchTypeBarText
	const BoneAnimator: BlockbenchTypeBoneAnimator
	const Codec: BlockbenchTypeCodec
	const ColorPicker: BlockbenchTypeColorPicker
	const Cube: BlockbenchTypeCube
	const CubeFace: BlockbenchTypeCubeFace
	const Dialog: BlockbenchTypeDialog
	const DisplaySlot: BlockbenchTypeDisplaySlot
	const EffectAnimator: BlockbenchTypeEffectAnimator
	const Face: BlockbenchTypeFace
	const Group: BlockbenchTypeGroup
	const Keybind: BlockbenchTypeKeybind
	const KeybindItem: BlockbenchTypeKeybindItem
	const Keyframe: BlockbenchTypeKeyframe
	const KeyframeDataPoint: BlockbenchTypeKeyframeDataPoint
	const Language: BlockbenchTypeLanguage
	const Locator: BlockbenchTypeLocator
	const Menu: BlockbenchTypeMenu
	const Mesh: BlockbenchTypeMesh
	const MeshFace: BlockbenchTypeMeshFace
	const Mode: BlockbenchTypeMode
	const ModelFormat: BlockbenchTypeModelFormat
	const ModelProject: BlockbenchTypeModelProject
	const NodePreviewController: BlockbenchTypeNodePreviewController
	const NullObject: BlockbenchTypeNullObject
	const NullObjectAnimator: BlockbenchTypeNullObjectAnimator
	const NumSlider: BlockbenchTypeNumSlider
	const Outliner: BlockbenchTypeOutliner
	const OutlinerElement: BlockbenchTypeOutlinerElement
	const OutlinerNode: BlockbenchTypeOutlinerNode
	const Painter: BlockbenchTypePainter
	const Panel: BlockbenchTypePanel
	const Plugin: BlockbenchTypePlugin
	const Preview: BlockbenchTypePreview
	const ResizeLine: BlockbenchTypeResizeLine
	const Reusable: BlockbenchTypeReusable
	const Screencam: BlockbenchTypeScreencam
	const Setting: BlockbenchTypeSetting
	const Settings: BlockbenchTypeSettings
	const Texture: BlockbenchTypeTexture
	const TextureAnimator: BlockbenchTypeTextureAnimator
	const TextureMesh: BlockbenchTypeTextureMesh
	const Timeline: BlockbenchTypeTimeline
	const TimelineMarker: BlockbenchTypeTimelineMarker
	const Toggle: BlockbenchTypeToggle
	const Tool: BlockbenchTypeTool
	const Toolbar: BlockbenchTypeToolbar
	const Toolbox: BlockbenchTypeToolbox
	const Widget: BlockbenchTypeWidget
}

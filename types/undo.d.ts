/// <reference path="./blockbench.d.ts"/>
interface UndoAspects {
	selection?: boolean
	elements?: OutlinerElement[]
	outliner?: boolean
	group?: Group
	textures?: Texture[]
	texture_order?: boolean
	selected_texture?: boolean
	settings?: {}
	uv_mode?: boolean
	animations?: _Animation[]
	keyframes?: Keyframe[]
	display_slots?: string[]
	exploded_view?: boolean
}
type UndoSave = {
	aspects: UndoAspects
	selection?: []
	selection_group?: UUID
	elements?: {}
	outliner?: []
	group?: {}
	textures?: {}
	texture_order?: UUID[]
	selected_texture?: UUID | null
	settings?: {}
	uv_mode?: {
		box_uv: boolean
		width: number
		height: number
	}
	animations?: {}
	keyframes?: {}
	display_slots?: {}
	exploded_views?: boolean
}
type UndoEntry = {
	before: UndoSave
	post: UndoSave
	action: string
	time: number
}
interface AmendEditForm {
	condition?: ConditionResolvable
	type?: 'number'
	label: string
	interval_type: 'position' | 'rotation'
	getInterval?(event: Event): number
	value?: number | string
	min?: number
	max?: number
	step?: number
}

declare class UndoSystem {
	constructor()
	/**
	 * Starts an edit to the current project by saving the state of the provided aspects
	 * @param aspects Aspects to save
	 */
	initEdit(aspects: UndoAspects): any
	/**
	 * Finishes an edit by saving the state of the project after it was changed
	 * @param action Description of the edit
	 */
	finishEdit(
		action: string,
		aspects?: UndoAspects
	): {
		before: any
		post: any
		action: any
		time: number
	}
	/**
	 * Cancels an event before it was finished and reset the project to the state before
	 */
	cancelEdit(): void
	/**
	 * Add keyframes to the current edit that were indirectly removed by moving other keyframes to their position
	 * @param keyframes
	 */
	addKeyframeCasualties(keyframes: Keyframe[]): void
	/**
	 * Undoes the latest edit
	 */
	undo(remote?: boolean): void
	/**
	 * Redoes the latest edit
	 */
	redo(remote?: boolean): void
	/**
	 * Redoes the latest edit
	 */
	redo(remote?: boolean): void
	/**
	 * Provides a menu to amend the latest edit with slightly changed values
	 */
	amendEdit(form: AmendEditForm, callback: (values: any, form: any) => void): void

	/**
	 * Loads a specific undo save
	 * @param save The undo save to load
	 * @param reference The current undo save for reference
	 * @param mode The load save modes
	 */
	loadSave(save: UndoSave, reference: UndoSave, mode?: 'session'): void

	history: UndoEntry[]
	index: number
}
/**
 * Blockbench's undo system of the current project to register edits to the project and switch between them

## Example

```javascript
Undo.initEdit({elements: []});

var new_cube = new Cube({name: 'kevin'}).init();
var other_cube = new Cube({name: 'lars'}).init();

Undo.finishEdit('add new cubes', {elements: [new_cube, other_cube]});
```
 */
declare let Undo: UndoSystem
interface CompileJSONOptions {
	small?: boolean
}
declare function compileJSON(json: any, options?: CompileJSONOptions): string | ArrayBuffer

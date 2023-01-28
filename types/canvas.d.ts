/// <reference path="./index.d.ts"/>
interface UpdateViewOptions {
	/**
	 * List of elements to update
	 */
	elements?: OutlinerElement[]
	/**
	 * Which aspects of the elements to update
	 */
	element_aspects?: {
		/**
		 * Update visibility of elements
		 */
		visibility?: boolean
		/**
		 * Update the position and geometry
		 */
		geometry?: boolean
		/**
		 * Update the mesh faces
		 */
		faces?: boolean
		/**
		 * Update the UV mapping
		 */
		uv?: boolean
		/**
		 * Update the painting grid
		 */
		painting_grid?: boolean
	}
	/**
	 * Groups to update
	 */
	groups?: Group[]
	/**
	 * Whether to update the selection (updates the selection outlines and interface)
	 */
	selection?: boolean
}

declare const Canvas: {
	materials: {
		[uuid: UUID]: THREE.Material
	}
	meshes: {
		[uuid: UUID]: THREE.Mesh
	}
	bones: {
		[uuid: UUID]: THREE.Object3D
	}
	/**
	 * Main scene, shared across all tabs
	 */
	scene: THREE.Scene
	/**
	 * List of the gizmos (control and UI elements) in the 3D scene
	 */
	gizmos: []
	/**
	 * The material used for all selection outlines
	 */
	outlineMaterial: THREE.LineBasicMaterial
	meshOutlineMaterial: THREE.LineBasicMaterial
	/**
	 * The material used for the wireframe view
	 */
	wireframeMaterial: THREE.MeshBasicMaterial
	solidMaterial: THREE.ShaderMaterial
	normalHelperMaterial: THREE.ShaderMaterial
	uvHelperMaterial: THREE.ShaderMaterial
	meshVertexMaterial: THREE.PointsMaterial
	/**
	 * The material used for the grids
	 */
	gridMaterial: THREE.LineBasicMaterial

	pivot_marker: THREE.Object3D

	global_light_color: THREE.Color
	global_light_side: number

	face_order: string[]

	/**
	 * Raycast on the currently selected preview
	 */
	raycast(event: MouseEvent): any
	/**
	 * Execute the callback function without any gizmos, grids and helpers visible
	 */
	withoutGizmos(cb: () => void): void
	/**
	 * Clear all elements from the scene
	 */
	clear(): void
	buildGrid(): void
	updateShading(): void
	/**
	 * Updates selected aspects of the preview
	 * @param options
	 */
	updateView(options: UpdateViewOptions): void
	/**
	 * Regenerate all elements in the scene. Very unoptimized, use with care
	 */
	updateAll(): void
	/**
	 * Update the position and shape of all elements
	 */
	updateAllPositions(): void
	/**
	 * Update the visibility of all elements
	 */
	updateVisibility(): void
	/**
	 * Update all faces in the scene
	 * @param texture Texture filter. If specified, only faces with this texture will be updated
	 */
	updateAllFaces(texture: Texture): void
	/**
	 * Update all UV maps in the scene
	 */
	updateAllUVs(): void
	/**
	 * Returns the three.js render sides based on the current settings and state
	 */
	getRenderSide(): number
	/**
	 * Update render sides of all materials
	 */
	updateRenderSides(): void
	/**
	 * Redraw the selected elements in the scene
	 * @param arr Optionally specify an array of elements to update
	 */

	updateSelected(arr: any): void
	/**
	 * Update positions and shapes of the selected elements
	 */
	updatePositions(y): void
	/**
	 * Update the faces of all selected elements (material, UV map)
	 */
	updateSelectedFaces(): void
	/**
	 * Update the UV maps of all selected elements
	 */
	updateUVs(): void
	/**
	 * Update the hierarchy and position of all bones
	 */
	updateAllBones(): void
	/**
	 * Update the position of the origin / pivot point gizmo
	 */
	updateOrigin(): boolean
	/**
	 * Update the position and shape of the specified cube
	 * @param cube Cube to update
	 * @param mesh Mesh instance of the cube
	 */
	adaptObjectPosition(cube: Cube, mesh?: THREE.Mesh): void
	/**
	 * Update the geometry faces of the specified cube
	 * @param cube Cube to update
	 */
	adaptObjectFaceGeo(cube: any): void
	/**
	 * Update the faces (material) of the specified cube
	 * @param cube Cube to update
	 * @param mesh Mesh instance of the cube
	 */
	adaptObjectFaces(cube: any, mesh: any): void
	/**
	 * Update the layered or not layered material of all elements
	 */
	updateLayeredTextures(): void
	/**
	 * Update the UV map of the specified cube
	 * @param cube Cube to update
	 * @param animation Whether to display the current animated texture frame
	 */
	updateUV(cube: Cube, animation?: boolean): any
	/**
	 * Update the materials of marker colors if new colors were added
	 */
	updateMarkerColorMaterials(): void
	/**
	 * Create an additional outline around the specified cubes
	 * @param arr List of cubes to outline
	 */
	outlineObjects(arr: Cube[]): void
	/**
	 * Calculate the size of the model, in the currently displayed shape. Returns [width, height] in blockbench units
	 */
	getModelSize(): [number, number]
}

/**
 * Marks a specific aspect of the interface to be updated in the next tick. Useful to avoid an update function getting called multiple times in the same task.
 */
declare const TickUpdates: {
	outliner: undefined | true
	selection: undefined | true
	main_uv: undefined | true
	texture_list: undefined | true
	keyframes: undefined | true
	keyframe_selection: undefined | true
	keybind_conflicts: undefined | true
}

interface NodePreviewControllerOptions {
	setup?: (element: OutlinerNode) => void
	remove?: (element: OutlinerNode) => void
	updateAll?: (element: OutlinerNode) => void
	updateTransform?: (element: OutlinerNode) => void
	updateVisibility?: (element: OutlinerNode) => void
	updateSelection?: (element: OutlinerNode) => void
	updateGeometry?: (element: OutlinerNode) => void
	updateUV?: (element: OutlinerNode) => void
	updateFaces?: (element: OutlinerNode) => void
	updatePaintingGrid?: (element: OutlinerNode) => void
	updateHighlight?: (element: OutlinerNode) => void
}
declare class NodePreviewController {
	constructor(type: typeof OutlinerNode, options: NodePreviewControllerOptions)
	type: typeof OutlinerNode
	events: {
		[event_name: string]: ((data) => void)[]
	}
	dispatchEvent(event_name: string, data: object)
	on(event_name: string, cb: (data) => void)
	removeListener(event_name: string, cb: (data) => void)

	setup(element: OutlinerNode): void
	remove(element: OutlinerNode): void
	updateAll(element: OutlinerNode): void
	updateTransform(element: OutlinerNode): void
	updateVisibility(element: OutlinerNode): void
	updateSelection(element: OutlinerNode): void
	updateGeometry(instance: OutlinerNode): void
	updateUV(instance: OutlinerNode): void
	updateFaces(instance: OutlinerNode): void
	updatePaintingGrid(instance: OutlinerNode): void
	updateHighlight(instance: OutlinerNode): void
}

/// <reference types="three" />

type TransformControlsAxisChar = 'X' | 'Y' | 'Z'
type TransformControlsMode = 'hidden' | 'translate' | 'rotate' | 'scale'
type TransformControlsSpace = 'world' | 'local'

declare module 'three' {
	interface Object3D {
		/**The outline mesh of the mesh */
		outline?: THREE.Object3D | THREE.Mesh
		fix_rotation?: THREE.Euler
		fix_position?: THREE.Vector3
		no_export?: boolean
		isElement?: boolean
		isGroup?: boolean
	}
}

declare namespace THREE {
	export class TransformControls extends THREE.Object3D {
		camera: THREE.PerspectiveCamera
		elements: HTMLElement[]
		visible: boolean
		space: TransformControlsSpace
		size: number
		axis?: TransformControlsAxisChar
		hoverAxis?: TransformControlsAxisChar
		direction: boolean
		last_valid_position: THREE.Vector3
		rotation_selection: THREE.Euler
		firstLocation: ArrayVector3
		pivot_marker: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>

		constructor(cam: THREE.PerspectiveCamera, domElement: HTMLCanvasElement)

		detach(): void
		setMode(mode: TransformControlsMode): void
		setSize(size: number): void
		setSpace(space: TransformControlsSpace): void
		getScale(): number
		setScale(scale: number): void
		update(object: THREE.Object3D): void
		fadeInControls(frames: number): void
		setCanvas(canvas: HTMLCanvasElement): void
		simulateMouseDown(e: Event): void
		updateSelection(): this
		getTransformSpace(): Group | 0
		center(): void
		cancelMovement(event: Event, keep_changes?: false): void
		displayDistance(number: number): void
		extendTransformLineOnAxis(long: boolean, axis: string): void
		extendTransformLine(long: boolean): void
		onPointerHover(event: Event): void
		onPointerDown(event: Event): void
		beforeFirstChange(event: Event): void
		onPointerMove(event: Event): void
		onPointerUp(event: Event, keep_changes?: false): void
		intersectObjects(pointer: PointerEvent, objects: THREE.Object3D[]): void
	}
}

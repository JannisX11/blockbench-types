/// <reference path="./index.d.ts"/>
interface FaceOptions {
	texture?: Texture
}
declare class Face {
	constructor()
	texture: string | false | null

	getTexture: () => Texture | null
	/**
	 * Returns a 2D rectangle around the UV face
	 */
	getBoundingRect: () => any
	reset: () => void
	/**
	 * Returns a save copy of the face, ready for serialization. Set project to true to save for a bbmodel project file
	 */
	getSaveCopy: (project?: boolean) => any
	/**
	 * Get a copy for undo tracking
	 */
	getUndoCopy: () => Face
}

type CubeFaceDirection = 'north' | 'south' | 'east' | 'west' | 'up' | 'down'
interface CubeFaceOptions extends FaceOptions {
	uv?: [number, number, number, number]
	rotation?: number
	tint?: number
	cullface?: CubeFaceDirection | ''
	material_name?: string
	enabled?: boolean
}
declare class CubeFace extends Face {
	constructor(direction: CubeFaceDirection, data: CubeFaceOptions, cube: Cube)
	cube: Cube
	direction: CubeFaceDirection
	uv: [number, number, number, number]
	readonly uv_size: ArrayVector2
	rotation: number
	tint: number
	cullface: CubeFaceDirection | ''
	material_name: string
	enabled: boolean

	extend(data: CubeFaceOptions)
	getVertexIndices: () => [number, number, number, number]
}

interface CubeOptions {
	name: string
	autouv: 1 | 2 | 3
	shade: boolean
	mirror_uv: boolean
	inflate: number
	color: number
	visibility: boolean
	from: ArrayVector3
	to: ArrayVector3
	rotation: ArrayVector3
	origin: ArrayVector3
	/**
	 * UV position for box UV mode
	 */
	uv_offset: ArrayVector2
}
declare class Cube extends OutlinerElement {
	constructor(options: Partial<CubeOptions>, uuid?: string)
	autouv: 1 | 2 | 3
	shade: boolean
	mirror_uv: boolean
	inflate: number
	visibility: boolean
	from: ArrayVector3
	to: ArrayVector3
	rotation: ArrayVector3
	origin: ArrayVector3
	faces: {
		[fkey: string]: CubeFace
	}
	/**
	 * UV position for box UV mode
	 */
	uv_offset: ArrayVector2

	extend(options: Partial<CubeOptions>): this
	/**
	 * Calculates and returns the size of a cube across a certain axis. If the axis argument is omitted, it returns all sizes as an array vector.
	 */
	size: (axis?: number, floored?: boolean) => number | ArrayVector3
	rotationAxis: () => void
	getUndoCopy: (aspects?: any) => void
	getSaveCopy: (project?: boolean) => Cube
	roll: (axis: number, steps: number, origin: ArrayVector3) => void
	flip: (axis: number, center: number, skipUV?: boolean) => void
	transferOrigin: (origin: ArrayVector3, update?: boolean) => void
	getWorldCenter: () => THREE.Vector3
	getGlobalVertexPositions: () => void
	setUVMode: (box_uv: boolean) => void
	setColor: (color: number) => void
	applyTexture: (texture: Texture, faces: true | undefined | CubeFaceDirection[]) => void
	mapAutoUV: () => void
	moveVector: (offset: ArrayVector3, axis: number, update?: boolean) => void
	resize: (
		value: number,
		axis: number,
		negative: boolean,
		allow_negative?: boolean,
		bidirectional?: boolean
	) => void

	static all: Cube[]
	static selected: Cube[]
}

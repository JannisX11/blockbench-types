interface DisplaySlotOptions {
	rotation?: ArrayVector3
	translation?: ArrayVector3
	scale?: ArrayVector3
	mirror?: [boolean, boolean, boolean]
}

declare class DisplaySlot {
	constructor(id: string, data: DisplaySlotOptions)
	rotation: ArrayVector3
	translation: ArrayVector3
	scale: ArrayVector3
	mirror: [boolean, boolean, boolean]
	/**
	 * Reset slot to default values
	 */
	default: () => this
	extend: (data: DisplaySlotOptions) => this
	copy: () => {
		rotation: ArrayVector3
		translation: ArrayVector3
		scale: ArrayVector3
		mirror: [boolean, boolean, boolean]
	}
	/**
	 * Generate the values of the slot for export
	 */
	export: () => {
		rotation: ArrayVector3
		translation: ArrayVector3
		scale: ArrayVector3
	} | undefined
	/**
	 * Visually update the UI with the data from this slot if selected
	 */
	update: () => this
}
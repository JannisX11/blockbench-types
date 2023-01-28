/// <reference path="./index.d.ts"/>
interface CodecOptions {
	name: string
	load?(model: any, file: any, add?: boolean): void
	compile?(options?: any): string | ArrayBuffer | any
	parse?(data: any, path: string): void
	export?(): void
	/**
	 * Generate a file name to suggest when exporting
	 */
	fileName?(): string
	startPath?(): string
	write?(content: any, path: string): void
	overwrite?(content: any, path: string, callback: (path) => void): void
	afterDownload?(path): void
	afterSave?(path): void

	extension: string
	/**
	 * Whether to remember the models exported using this codec
	 */
	remember: boolean
	load_filter?: {
		extensions: string[]
		type: 'json' | 'text'
		condition?: any
	}
	export_action?: Action
}

declare class Codec extends Deletable {
	constructor(id: string, options: CodecOptions)

	load?(model: any, file: object, add?: boolean): void
	compile?(options?: object): any
	parse?(data: any, path: string): void
	export?(): void
	/**
	 * Generate a file name to suggest when exporting
	 */
	fileName?(): string
	startPath?(): string
	write?(content: any, path: string): void
	overwrite?(content: any, path: string, callback: (path) => void): void
	afterDownload?(path): void
	afterSave?(path): void
	on(event_name: string, callback: (data: object) => void): void
	removeListener(event_name: string, callback: (data: object) => void): void
	dispatchEvent(data: object): void

	name: string
	extension: string
	remember: boolean
	export_action?: Action

	static getAllExtensions(): string[]
}

declare const Codecs: {
	[id: string]: Codec
}

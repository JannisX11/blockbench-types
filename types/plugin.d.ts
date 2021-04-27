interface PluginOptions {
	title: string
	author: string
	/**
	 * Description text in the plugin browser
	 */
	description: string
	/**
	 * The about text appears when the user unfolds the plugin in the plugin browser. It can contain additional information and usage instructions
	 */
	about?: string
	icon: string
	variant: 'both' | 'desktop' | 'web'
	min_version?: string
	max_version?: string
	onload?(): void
	onunload?(): void
	oninstall?(): void
	onuninstall?(): void
}

/**
 * Blockbench Plugin
 * @deprecated This won't work in 3.8.4 or earlier
 */
declare class BBPlugin {
	constructor(id: string, options: PluginOptions)

	extend(options: PluginOptions): this

	installed: boolean
	expanded: boolean
	title: string
	author: string
	/**
	 * Description text in the plugin browser
	 */
	description: string
	/**
	 * The about text appears when the user unfolds the plugin in the plugin browser. It can contain additional information and usage instructions
	 */
	about: string
	icon: string
	variant: 'both' | 'desktop' | 'web'
	min_version: string
	max_version: string
	onload(): void
	onunload(): void
	oninstall(): void
	onuninstall(): void

	static register(id: string, options: PluginOptions): BBPlugin
}

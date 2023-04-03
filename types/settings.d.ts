/// <reference path="./blockbench.d.ts"/>
declare const settings: {
	[id: string]: Setting
}

interface SettingOptions {
	name: string
	type?: 'number' | 'string' | 'boolean' | 'password' | 'select' | 'click'
	value: boolean | number | string
	condition?: ConditionResolvable
	category: string
	description?: string
	//launch_setting?: boolean
	min?: number
	max?: number
	step?: number
	icon?: string
	click?(): void
	options?: {
		[id: string]: string
	}
	onChange?(value: any): void
}

declare class Setting extends Deletable {
	constructor(id: string, options: SettingOptions)
	value: any
}
declare type SettingItems = Record<string, { name: string; open: boolean; items: SettingItems }>

declare namespace Settings {
	const structure: Record<string, SettingItems>
	const stored: Record<string, Setting>
	/**
	 * Opens the settings dialog
	 * @param options
	 */
	function open(
		options?: Partial<{
			search: string
			tab: 'setting' | 'keybindings' | 'layout_settings' | 'credits'
		}>
	): void
	/**
	 * Save all settings to the local storage
	 */
	function saveLocalStorages(): void
	/**
	 * Save the settings and apply changes
	 */
	function save(): void
	/**
	 * Returns the value of the specified setting
	 */
	function get(setting_id: string): any
}

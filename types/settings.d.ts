/// <reference path="./blockbench.d.ts"/>

declare global {
	const settings: {
		[id: string]: Setting
	}

	interface SettingOptions {
		name: string
		type?: 'number' | 'text' | 'toggle' | 'password' | 'select' | 'click'
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

	/**
	 * Settings can be used to add global configuration options to Blockbench. All settings are listed under File > Preferences > Settings.
	 */
	class Setting extends Deletable {
		constructor(id: string, options: SettingOptions)
		id: string
		type: string
		condition: any
		/**
		 * The master value, not affected by profiles
		 */
		master_value: any
		/**
		 * The active value
		 */
		value: any
		/**
		 * The value that is displayed in the settings dialog
		 */
		ui_value: any
		name: string
		description: string
		category: string
		/**
		 * If true, the setting can be used by the main process before initializing the Blockbench window. This is not available to custom settings created by plugins.
		 */
		launch_setting: boolean
		min?: number
		max?: number
		step?: number
		icon?: string
		options?: {
			[id: string]: string
		}
		hidden?: boolean
		onChange?: () => {}

		/**
		 * Sets the value of the setting, while triggering the onChange function if available, and saving the change.
		 */
		set(value: any): void
		/**
		 * Triggers the setting, as if selected in action control. This toggles boolean settings, opens a dialog for string or numeric settings, etc.
		 */
		trigger(event?: Event): void
	}
	/**
	 * Global namespace handling data and functionality related to settings.
	 */
	type SettingItems = Record<string, { name: string; open: boolean; items: SettingItems }>

	namespace Settings {
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
}

export {}

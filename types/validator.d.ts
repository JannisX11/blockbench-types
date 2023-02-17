/// <reference path="./blockbench.d.ts"/>
declare namespace Validator {
	const checks: ValidatorCheck[]

	const warnings: WarningOrError[]
	const errors: WarningOrError[]
	/**
	 * Run the validator
	 * @param trigger ID of the Blockbench event that triggered the call
	 */
	function validate(trigger?: EventName): void
	/**
	 * Opens the Validator dialog
	 */
	function openDialog(): void

	/**
	 * Cached trigger IDs
	 */
	const triggers: EventName[]
	/**
	 * Update the cached triggers list
	 */
	function updateCashedTriggers(): void
}

interface ValidatorCheckOptions {
	/**
	 * Function that runs when the validator check runs
	 */
	run(): void
	/**
	 * Names of events that automatically trigger this check
	 */
	update_triggers?: EventName[]
	condition?: ConditionResolvable
}
interface WarningOrError {
	message: string
	buttons?: {
		name: string
		icon: IconString
		click(): void
	}[]
}
declare class ValidatorCheck extends Deletable {
	constructor(id: string, options: ValidatorCheckOptions)

	/**
	 * Manually run this check
	 */
	update(): void
	/**
	 * Throw a warning. This is intended to be used inside the run() method
	 */
	warn(...warnings: WarningOrError[]): void
	/**
	 * Throw an error. This is intended to be used inside the run() method
	 */
	fail(...warnings: WarningOrError[]): void
}

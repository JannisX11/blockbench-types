declare namespace Vue {
	type Component = any
}
declare class Vue {
	constructor(component: Vue.Component)
	_data: any
	$options: any
}
declare const VuePrismEditor: Vue.Component

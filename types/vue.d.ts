declare namespace Vue {
	type Component = any
}
declare class Vue {
	_data: any
	$options: any
	extend(options: any): Vue.Component
}

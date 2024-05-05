const TypeDoc = require('typedoc')
const fs = require('fs')
const PathModule = require('path')

//const out_path = '../docs/';
const out_path = '../generated/'

async function main() {
	const app = new TypeDoc.Application()

	// If you want TypeDoc to load tsconfig.json / typedoc.json files
	app.options.addReader(new TypeDoc.TSConfigReader())
	app.options.addReader(new TypeDoc.TypeDocReader())

	app.bootstrap({
		entryPoints: [
			'./types/blockbench.d.ts',
			'./types/textures.d.ts',
			'./types/texture_layers.d.ts',
			'./types/action.d.ts',
			'./types/animation.d.ts',
			'./types/animation_controller.d.ts',
			'./types/canvas.d.ts',
			'./types/codec.d.ts',
			'./types/format.d.ts',
			'./types/global.d.ts',
			'./types/interface.d.ts',
			'./types/dialog.d.ts',
			'./types/panel.d.ts',
			'./types/keyframe.d.ts',
			'./types/legacy.d.ts',
			'./types/menu.d.ts',
			'./types/outliner.d.ts',
			'./types/group.d.ts',
			'./types/cube.d.ts',
			'./types/mesh.d.ts',
			'./types/plugin.d.ts',
			'./types/preview.d.ts',
			'./types/project.d.ts',
			'./types/mode.d.ts',
			'./types/settings.d.ts',
			'./types/timeline.d.ts',
			'./types/undo.d.ts',
			'./types/painter.d.ts',
			'./types/screencam.d.ts',
			'./types/validator.d.ts',
			'./types/shared_actions.d.ts',
			'./types/display_mode.d.ts',
			'./types/misc.d.ts',
			'./types/util.d.ts',
		],
		sort: ['source-order'],
		commentStyle: 'all',
		//json: "./json/test.json",
		//pretty: true
	})

	let skip_files = ['global', 'legacy']

	console.log('Scanning...')

	const project = app.convert()

	if (!project) return // Failed to parse types

	console.log('Scanned types')

	const external = {
		ConditionResolvable:
			'[ConditionResolvable](https://github.com/JannisX11/blockbench-types/blob/main/types/util.d.ts#L1)',

		'Vue.Component': '[Vue.Component](https://v2.vuejs.org/v2/guide/components.html)',

		Vector3: '[THREE.Vector3](https://threejs.org/docs/index.html#api/en/math/Vector3)',
		Euler: '[THREE.Euler](https://threejs.org/docs/index.html#api/en/math/Euler)',
		Quaternion:
			'[THREE.Quaternion](https://threejs.org/docs/index.html#api/en/math/Quaternion)',
		Object3D: '[THREE.Object3D](https://threejs.org/docs/index.html#api/en/core/Object3D)',
		PerspectiveCamera:
			'[THREE.PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)',
		OrthographicCamera:
			'[THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera)',
		WebGLRenderer:
			'[THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)',

		HTMLElement: '[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)',
		HTMLCanvasElement:
			'[HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)',
		HTMLAudioElement:
			'[HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)',
		CanvasRenderingContext2D:
			'[CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)',
		Date: '[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)',
		Event: '[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)',
		PointerEvent:
			'[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)',
	}
	let top_level_references = {}
	let top_level_hidden_references = {}
	for (let file of project.children) {
		let file_name = file.name.replace(/[^\w]/gi, '')
		for (let concept of file.children) {
			anchor_name = concept.name.replace(/[^\w]/gi, '').replace(/^_/, '').toLowerCase()
			if (anchor_name == file_name) anchor_name += '-1'

			if (concept.kindString == 'Interface' || concept.kindString == 'Type alias') {
				top_level_hidden_references[concept.name] = `[${concept.name}](${
					concept.sources?.[0]?.url || ''
				})`
			} else {
				top_level_references[concept.name] = file_name + '#' + anchor_name
			}
		}
	}

	function getReferenceLink(reference) {
		if (
			reference.qualifiedName &&
			(external[reference.qualifiedName] || external[reference.name])
		) {
			return external[reference.qualifiedName] || external[reference.name]
		}
		if (top_level_hidden_references[reference.name]) {
			return top_level_hidden_references[reference.name]
		}
		let link = '#' + reference.name
		if (top_level_references[reference.name]) {
			link = top_level_references[reference.name]
		}
		return `[${reference.name}](${link})`
	}
	function getType(type) {
		if (!type) return 'Function'

		switch (type.type) {
			case 'reflection':
				return `[See types](${type.declaration?.sources?.[0]?.url || ''})`

			case 'intrinsic':
				return '*' + type.name + '*'

			case 'tuple':
				return 'Array'

			case 'literal':
				return typeof type.value == 'string'
					? '`"' + type.value + '"`'
					: '`' + type.value + '`'

			case 'reference': {
				if (type.name == 'Partial' && type.typeArguments?.[0]) {
					return getType(type.typeArguments?.[0])
				}
				return getReferenceLink(type)
			}

			case 'array':
				return 'Array of ' + getType(type.elementType)

			case 'union':
				return type.types.map(t => getType(t)).join(' or ')

			default:
				return ''
		}
	}
	function addComments(object, lines, default_value) {
		if (object.comment?.summary) {
			for (let comment of object.comment.summary) {
				lines.push(comment.text, '')
			}
		} else if (default_value) {
			lines.push(default_value, '')
		}
	}
	function addArgumentTree(arguments, lines) {
		if (arguments?.length) lines.push('##### Arguments:')
		function generateArgumentList(list, depth) {
			list.forEach(object => {
				let line = ''
				let is_nested =
					object.type?.type == 'reference' &&
					object.type.reflection &&
					object.type.reflection.children &&
					object.type.reflection.kindString == 'Interface'
				for (let i = 0; i < depth; i++) {
					line += '\t'
				}
				line +=
					'* `' +
					object.name +
					'`: ' +
					(is_nested ? object.type?.name : getType(object.type))
				if (object.flags.isOptional) line += ' (Optional)'
				if (object.comment?.summary) {
					line += ' -'
					for (let comment of object.comment.summary) {
						line += ' ' + comment.text
					}
				}
				lines.push(line)

				if (is_nested) {
					generateArgumentList(object.type.reflection.children, depth + 1)
				}
			})
		}
		generateArgumentList(arguments, 0)
		lines.push('')
	}
	function generateArgumentSuffix(arguments) {
		if (arguments && arguments.length) {
			let args = ''
			let required_args = arguments
				.filter(p => !p.flags.isOptional)
				.map(p => p.name)
				.join(', ')
			let optional_args = arguments
				.filter(p => p.flags.isOptional)
				.map(p => p.name)
				.join(', ')
			if (required_args && optional_args) {
				args = required_args + '[, ' + optional_args + ']'
			} else if (required_args) {
				args = required_args
			} else if (optional_args) {
				args = '[' + optional_args + ']'
			}
			return `( ${args} )`
		} else {
			return '()'
		}
	}
	function toTitleCase(input) {
		return input
			.split(/[ _.-]/)
			.map(word => word[0].toUpperCase() + word.substring(1))
			.join(' ')
	}

	let num_files = 0
	for (let file of project.children) {
		if (skip_files.includes(file.name)) continue

		let file_name = file.name.replace(/[^\w]/gi, '')
		let display_name = toTitleCase(file.name)
		let markdown_lines = ['---', `title: ${display_name}`, '---', '', `# ${display_name}`]
		let addLine = (s, empty_after) => {
			markdown_lines.push(s || '')
			if (empty_after && s) markdown_lines.push('')
		}

		for (let concept of file.children) {
			if (concept.kindString == 'Interface') continue
			if (concept.kindString == 'Type alias') continue

			if (concept.name.startsWith('_')) concept.name = concept.name.substring(1)

			if (concept.kindString == 'Function') {
				for (let signature of concept.signatures) {
					let suffix = generateArgumentSuffix(signature.parameters)
					addLine(`## ${signature.name.replace(/^_/, '')}${suffix}`)
					addLine(`#### Global Function`, true)

					addComments(signature, markdown_lines)

					if (signature.parameters) {
						addArgumentTree(signature.parameters, markdown_lines)
					}

					if (signature.type && signature.type.name !== 'void') {
						addLine(`Returns: ${getType(signature.type)}`)
					}
				}
				addLine()
			} else {
				addLine(`## ${concept.name}`)
			}
			if (concept.kindString != 'Class' && concept.kindString != 'Function') {
				let kind = concept.kindString
				if (kind != 'Interface' && kind != 'Type alias' && kind != 'Namespace') {
					kind = 'Global ' + kind
				}
				addLine(`#### ${kind}`, true)
			}
			if (concept.kindString == 'Variable') {
				addLine(`Type: ${getType(concept.type)}`, true)
			}

			// Extend
			if (concept.extendedTypes) {
				let parents = concept.extendedTypes.map(type => {
					return getReferenceLink(type)
				})
				addLine('Extends: ' + parents.join(', '), true)
			}
			if (concept.extendedBy) {
				let parents = concept.extendedBy.map(type => {
					return getReferenceLink(type)
				})
				addLine('Extended by: ' + parents.join(', '), true)
			}
			// Comment
			addComments(concept, markdown_lines)

			// Children
			if (concept.children) {
				if (concept.children[0]) {
				}

				let handled = []
				// Constructor
				for (let child of concept.children) {
					if (child.kindString != 'Constructor') continue
					let sig_i = 0
					for (let signature of child.signatures) {
						let suffix = generateArgumentSuffix(signature.parameters)
						addLine(`### ${signature.name}${suffix}`)

						if (sig_i) {
							addLine(`*Alternative constructor signature*`, true)
							continue
						}
						addComments(signature, markdown_lines, `Creates a new ${concept.name}`)

						if (signature.parameters) {
							addArgumentTree(signature.parameters, markdown_lines)
						}
						sig_i++
						//break; // Only use first signature in types for simplicity
					}
					addLine()
					handled.push(child.id)
				}

				// Properties
				let properties = concept.children.filter(
					child =>
						(child.kindString == 'Property' || child.kindString == 'Variable') &&
						!child.type?.name?.startsWith('BlockbenchType') &&
						!child.flags.isStatic
				)
				if (properties.length) {
					addLine('| Property | Type | Description |')
					addLine('| -------- | ---- | ----------- |')
				}
				for (let child of properties) {
					addLine(
						`| ${child.name} | ${getType(child.type)} | ${
							child.comment?.summary?.[0]?.text || ''
						} |`
					)
					handled.push(child.id)
				}
				if (properties.length) {
					addLine()
				}

				// Methods
				for (let child of concept.children) {
					if (child.kindString != 'Method' && child.kindString != 'Function') continue
					for (let signature of child.signatures) {
						let prefix = child.flags.isStatic ? concept.name + '.' : ''
						let suffix = generateArgumentSuffix(signature.parameters)
						addLine(`### ${prefix}${signature.name.replace(/^_/, '')}${suffix}`)
						addComments(signature, markdown_lines)

						if (signature.parameters) {
							addArgumentTree(signature.parameters, markdown_lines)
						}

						if (signature.type && signature.type.name !== 'void') {
							addLine(`Returns: ${getType(signature.type)}`)
						}
					}
					addLine()
					handled.push(child.id)
				}

				// Misc
				for (let child of concept.children) {
					if (handled.includes(child.id)) continue
					addLine(`### ${child.name}`)
					let kind = child.kindString
					if (child.flags.isStatic) {
						kind = 'Static ' + kind
					}
					addLine(kind, true)
					if (child.kindString == 'Property') {
						addLine(`Type: ${getType(child.type)}`, true)
					}
					addComments(child, markdown_lines)
					addLine()
				}
			}

			addLine()
		}

		const path = PathModule.resolve(__dirname, out_path, `${file_name}.md`)
		fs.mkdirSync(PathModule.dirname(path), { recursive: true })
		fs.writeFileSync(path, markdown_lines.join('\r\n'), 'utf-8')
		num_files++
	}

	console.log(`Generated ${num_files} api doc files`)
}

main().catch(console.error)

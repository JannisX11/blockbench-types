interface ModelProjectOptions {
	format: ModelFormat
}

/**
 * A project instance. The tab bar can be used to switch between projects.
 */
declare class ModelProject {
	constructor(options: ModelProjectOptions)

	box_uv: boolean
	texture_width: number
	texture_height: number
	name: string
	uuid: UUID
	selected: boolean
	model_identifier: string
	/**
	 * When set to true, the project tab can no longer be selected or unselected
	 */
	locked: boolean
	thumbnail: string
	saved: boolean
	/**
	 * The path under which a project file is saved, if available
	 */
	save_path: string
	/**
	 * The path under which an exported file is saved, if available
	 */
	export_path: string
	added_models: number
	undo: UndoSystem
	BedrockEntityManager?: {}
	format: ModelFormat
	mode: string
	view_mode: string
	display_uv: string
	previews: {
		[key: string]: {}
	}
	EditSession: EditSession

	elements: OutlinerElement[]
	groups: Group[]
	selected_elements: OutlinerElement[]
	selected_group: Group | null
	mesh_selection: {
		[element_key: string]: {
			vertices: string[]
			edges: string[]
			faces: string[]
		}
	};
	selected_faces: []
	textures: Texture[]
	selected_texture: Texture | null;
	outliner: OutlinerNode[]
	animations: Animation[]
	timeline_animators: []
	display_settings: {
		[slot: string]: {
			translation: [number, number, number]
			rotation: [number, number, number]
			scale: [number, number, number]
			mirror: [boolean, boolean, boolean]
		}
	};

	get model_3d(): THREE.Object3D;
    get materials(): {
		[uuid: UUID]: THREE.ShaderMaterial
	};
    get nodes_3d(): {
		[uuid: UUID]: THREE.Object3D
	};

    getDisplayName(): string;
    openSettings(): void;
    whenNextOpen(callback: () => void): void;
    select(): boolean;
    unselect(): void;
    close(force: any): Promise<boolean>;

	static all: ModelProject[]
}

/**
 * Global variable and shortcut to get the currently opened project. If no project is open, or the New Tab is open, this value is falsy.
 */
declare const Project: ModelProject | 0

declare function setupProject(format: ModelFormat | string): boolean;
declare function newProject(format: ModelFormat | string): boolean;
declare function setProjectResolution(width: number, height: number, modify_uv?: boolean): void;
declare function updateProjectResolution(): void;

/**
 * An edit session instance. Edit sessions can be attached to a project to collaborate on it with multiple users via P2P connections.
 */
declare class EditSession {
	constructor()

	active: boolean
	hosting: boolean
	clients: {}
	client_count: number
	data_queue: []
	chat_history: []
	Project: ModelProject | null

	updateClientCound(): void
	start(username?: string): void
	join(username: string, token: string)
	quit(): void
	setState(active: boolean): void
	copyToken(): void;
    initNewModel(force?: boolean): void;
    initConnection(conn: any): void;
    sendAll(type: string, data: any): void;
    sendEdit(entry: UndoEntry): void;
    receiveData(tag: object): void;
    processData(tag: object): void;
    catchUp(): void;
	/**
	 * Send a chat message
	 * @param text Text to send. If omitted, the current text in the chat panel input is sent
	 */
    sendChat(text?: string): void;
    addChatMessage(message: any): any;
    processChatMessage(data: any): void;
}

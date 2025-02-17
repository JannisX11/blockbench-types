declare global {
	function initializeDesktopApp(): void
	function loadOpenWithBlockbenchFile(): void
	function updateRecentProjects(): void
	function addRecentProject(data: any): void
	function updateRecentProjectData(): void
	function updateRecentProjectThumbnail(): Promise<void>
	function loadDataFromModelMemory(): void
	function updateWindowState(e: any, type: any): void
	function changeImageEditor(texture: any, from_settings: any): void
	function selectImageEditorFile(texture: any): void
	function openDefaultTexturePath(): void
	function findExistingFile(paths: string[]): any
	function createBackup(init: any): void
	function closeBlockbenchWindow(): any
}

export {}

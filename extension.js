// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");
const { createFolders } = require("./create-folder");
const watch = require("./git-keep");
const fs = require("fs").promises;
/**
 * @param {vscode.ExtensionContext} context
 */
let watchObj = null;
async function listFolders(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const folders = entries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
	return folders;
}
function activate(context) {
	const disposable = vscode.commands.registerCommand(
		"kickstart-backend.generate",
		async function () {
			// Display a message box to the user
			vscode.window.showInformationMessage("Creating Folders");
			// Get workspace root folder
			const folders = vscode.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				vscode.window.showErrorMessage("No workspace folder is open.");
				return;
			}
			const workspaceRoot = folders[0].uri.fsPath;
			await createFolders(workspaceRoot, vscode.window);
		}
	);
	const gitkeep = vscode.commands.registerCommand(
		"kickstart-backend.watch",
		async () => {
			try {
				const folders = vscode.workspace.workspaceFolders;
				if (!folders || folders.length === 0) {
					vscode.window.showErrorMessage(
						"No workspace folder is open."
					);
					return;
				}
				if (watchObj) {
					watchObj.close();
					vscode.window.showInformationMessage(
						"Previous watcher stopped."
					);
				}

				const rootFolder = folders[0].uri.fsPath;
				watchObj = await watch(rootFolder);
				vscode.window.showInformationMessage("Watcher started.");
			} catch (err) {
				vscode.window.showErrorMessage(
					`Failed to start watcher: ${err.message}`
				);
			}
		}
	);
	const showListOfDir = vscode.commands.registerCommand(
		"kickstart-backend.showlistdir",
		async function () {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders || workspaceFolders.length === 0) {
				vscode.window.showErrorMessage("No workspace folder is open.");
				return;
			}

			const rootPath = workspaceFolders[0].uri.fsPath;
			const foldersList = await listFolders(rootPath);

			const options = foldersList.map((folder) => ({
				label: folder,
				detail: "Use This Folder",
			}));

			const choice = await vscode.window.showQuickPick(options, {
				placeHolder: "Choose a folder for Kickstart Backend",
			});

			if (choice) {
				createFolders(`${rootPath}/${choice.label}`, vscode.window);
			}
		}
	);

	const watchInOther = vscode.commands.registerCommand(
		"kickstart-backend.watchinother",
		async function () {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders || workspaceFolders.length === 0) {
				vscode.window.showErrorMessage("No workspace folder is open.");
				return;
			}

			const rootPath = workspaceFolders[0].uri.fsPath;
			const foldersList = await listFolders(rootPath);

			const options = foldersList.map((folder) => ({
				label: folder,
				detail: "Watch This Folder",
			}));

			const choice = await vscode.window.showQuickPick(options, {
				placeHolder: "Choose a folder to watch",
			});

			if (choice) {
				watchObj = await watch(`${rootPath}/${choice.label}`);
			}
		}
	);

	const stopWatcher = vscode.commands.registerCommand(
		"kickstart-backend.stopWatch",
		async () => {
			if (watchObj) {
				watchObj.close();
				watchObj = null;
				vscode.window.showInformationMessage("Watcher stopped.");
			} else {
				vscode.window.showWarningMessage("No watcher is running.");
			}
		}
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(gitkeep);
	context.subscriptions.push(stopWatcher);
	context.subscriptions.push(showListOfDir);
	context.subscriptions.push(watchInOther);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};

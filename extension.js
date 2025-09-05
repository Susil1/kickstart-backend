// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");
const { createFolders } = require("./create-folder");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand(
		"kickstart-backend.generate",
		async function () {
			// Display a message box to the user
			vscode.window.showInformationMessage("Creating Folders");
			await createFolders(vscode.window);
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};

const vscode = require("vscode");
const fs = require("fs").promises;
const path = require("path");

async function pathExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function createFolder(folder, window) {
	try {
		if (!(await pathExists(folder))) {
			await fs.mkdir(folder, { recursive: true });
		}
	} catch (err) {
		window.showErrorMessage(
			`Failed to create folder ${folder}: ${err.message}`
		);
	}
}

async function createFile(filePath, content = "", window) {
	try {
		if (!(await pathExists(filePath))) {
			await fs.writeFile(filePath, content);
		}
	} catch (err) {
		window.showErrorMessage(
			`Failed to create file ${filePath}: ${err.message}`
		);
	}
}

async function createFolders(window) {
	// Get workspace root folder
	const folders = vscode.workspace.workspaceFolders;
	if (!folders || folders.length === 0) {
		window.showErrorMessage("No workspace folder is open.");
		return;
	}
	const workspaceRoot = folders[0].uri.fsPath;

	const parentFolders = ["Frontend", "Backend"];
	const parentFiles = [".gitignore"];

	const childFolders = ["src"];
	const childFiles = [".env", "app.js", "README.md"];

	const grandChildFolders = [
		"config",
		"controller",
		"dao",
		"models",
		"routes",
		"services",
		"utils",
		"tests",
	];

	for (const folder of parentFolders) {
		if (folder === "Backend") {
			// Create Backend/src and subfolders
			for (const child of childFolders) {
				const childPath = path.join(workspaceRoot, folder, child);

				if (child === "src") {
					for (const grand of grandChildFolders) {
						await createFolder(path.join(childPath, grand), window);
					}
				} else {
					await createFolder(childPath, window);
				}
			}

			// Backend child files
			for (const file of childFiles) {
				const filePath = path.join(workspaceRoot, "Backend", file);
				await createFile(filePath, "", window);
			}
		} else {
			await createFolder(path.join(workspaceRoot, folder), window);
		}
	}

	// Parent-level files
	for (const file of parentFiles) {
		if (file === ".gitignore") {
			await createFile(
				path.join(workspaceRoot, file),
				"node_modules/\n*.env",
				window
			);
		} else {
			await createFile(path.join(workspaceRoot, file), "", window);
		}
	}
}

module.exports = {
	createFolders,
};

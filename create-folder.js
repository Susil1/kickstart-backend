import { log } from "console";

const fs = require("fs").promises;
const path = require("path");

async function createFolder(folder, window) {
	try {
		await fs.mkdir(folder, { recursive: true });
		console.log(folder, " Created");
	} catch (err) {
		window.showErrorMessage(
			`Failed to create folder ${folder}: ${err.message}`
		);
	}
}

async function createFile(filePath, content = "", window) {
	try {
		await fs.writeFile(filePath, content);
		console.log(filePath, " created");
	} catch (err) {
		window.showErrorMessage(
			`Failed to create file ${filePath}: ${err.message}`
		);
	}
}

async function createFolders(window) {
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
				const childPath = path.join(folder, child);

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
				const filePath = path.join("Backend", file);
				await createFile(filePath, "", window);
			}
		} else {
			await createFolder(folder, window);
		}
	}

	// Parent-level files
	for (const file of parentFiles) {
		if (file === ".gitignore") {
			await createFile(file, "node_modules/\n*.env", window);
		} else {
			await createFile(file, "", window);
		}
	}
}

module.exports = createFolders;

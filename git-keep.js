const chokidar = require("chokidar");
const vscode = require("vscode");
const fs = require("fs").promises;
const mpath = require("path");

async function safeUnlink(filePath) {
	try {
		await fs.unlink(filePath);
		console.log(`Deleted: ${filePath}`);
	} catch (err) {
		if (err.code !== "ENOENT") {
			console.error("Unlink error:", err);
		}
	}
}

async function pathExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

async function createGitKeep(folderPath) {
	if (!(await pathExists(folderPath))) return; // skip if folder is gone
	const filePath = mpath.join(folderPath, ".gitkeep");
	try {
		await fs.access(filePath); // already exists
	} catch {
		await fs.writeFile(filePath, "");
	}
}

async function listDir(folderPath) {
	try {
		const entries = await fs.readdir(folderPath, {
			withFileTypes: true,
		});
		return entries.map((entry) => entry.name); // only names
	} catch (err) {
		if (err.code !== "ENOENT") {
			console.error("Error reading directory:", err);
		}
		return [];
	}
}
async function watch(rootFolder) {
	const watcher = chokidar.watch(rootFolder, {
		persistent: true,
		ignoreInitial: false,
		ignored: /node_modules/,
		depth: Infinity, // 👈 ensures all nested dirs are tracked
	});
	// Event listeners
	watcher
		.on("ready", () => {
			console.log("Initial scan complete. Watching for changes...");
		})
		.on("add", async (filePath) => {
			try {
				if (filePath.endsWith(".gitkeep")) return;
				const folder = mpath.dirname(filePath);
				if (!(await pathExists(folder))) return;
				const files = await listDir(folder);
				if (files.length > 1 && files.includes(".gitkeep")) {
					await safeUnlink(mpath.join(folder, ".gitkeep"));
				}
			} catch {
				console.error("Error In ADD");
			}
		})
		.on("unlink", async (filePath) => {
			try {
				const folder = mpath.dirname(filePath);
				if (!(await pathExists(folder))) return;
				const files = await listDir(folder);
				if (files.length < 1) {
					await createGitKeep(folder);
				}
			} catch {
				console.error("Error In File Unlink");
			}
		})
		.on("addDir", async (dirPath) => {
			try {
				await createGitKeep(dirPath);
				const parent = mpath.dirname(dirPath);
				if (!(await pathExists(parent))) return;
				const dirs = await listDir(parent);
				if (dirs.length > 1 && dirs.includes(".gitkeep")) {
					await safeUnlink(mpath.join(parent, ".gitkeep"));
				}
			} catch {
				console.error("Error In ADDDir");
			}
		})
		.on("unlinkDir", async (dirPath) => {
			try {
				const parent = mpath.dirname(dirPath);
				if (!(await pathExists(parent))) return;
				const dirs = await listDir(parent);
				if (dirs.length <= 1) {
					await createGitKeep(parent);
				}
			} catch {
				console.error("Error In Remove Dir");
			}
		})
		.on("error", (error) => {
			console.error("Watcher error:", error);
		});

	return watcher;
}
module.exports = watch;

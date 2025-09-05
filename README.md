# Kickstart Backend

Kickstart Backend is a Visual Studio Code extension that generates a ready-to-use **project structure** for Node.js applications.  
It scaffolds both **Frontend** and **Backend** folders and ensures a clean, consistent setup with `.gitkeep` handling for empty directories.

---

## ✨ Features

-   Creates **Frontend** and **Backend** root folders.
-   Generates a well-structured `Backend/src` with subfolders:
    -   `config/`
    -   `controller/`
    -   `dao/`
    -   `models/`
    -   `routes/`
    -   `services/`
    -   `utils/`
    -   `tests/`
-   Adds:
    -   `.env`
    -   `app.js`
    -   `README.md`
    -   `.gitignore` (with `node_modules` and `.env`)
-   Inserts `.gitkeep` files into empty subfolders to keep them tracked by Git.
-   Automatically **removes `.gitkeep`** when a new file/folder is created inside.
-   If the workspace already has folders, the extension asks whether to scaffold inside an existing folder or at the root.

---

## 🚀 Commands

The following commands are available in the Command Palette (**Ctrl+Shift+P** / **Cmd+Shift+P**):

-   **Kickstart Backend: Generate Folders** – Creates the default folder structure in your workspace.
-   **Kickstart Backend: Watch Folders** – Starts a watcher for your workspace folders.
-   **Kickstart Backend: Stop Watcher** – Stops the currently active watcher.
-   **Kickstart Backend: Create Folder In SubFolder** – Choose a subfolder to scaffold inside.
-   **Kickstart Backend: Watch Folder In SubFolder** – Watch a specific subfolder for changes.

## 🛠️ Usage

1. Install **Kickstart Backend** from the VS Code Marketplace.
2. Open your project/workspace in VS Code.
3. Open the command palette (**Ctrl+Shift+P** / **Cmd+Shift+P**) and run any of the commands above.
4. If prompted, select the target folder (root or a subfolder).
5. Your scaffolded structure or watcher will start immediately.

---

## 🛠️ Extension Settings

Currently, no configuration is required.  
Future updates may include:

-   Customizable folder names
-   Optional frontend frameworks (React, Vue, Angular)
-   Database presets

---

## 🤝 Contributing

1. Fork this repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push the branch and open a Pull Request.

---

## 📜 License

MIT License.  
Free to use, modify, and share.

---

## 👤 Author

**Susil**  
[GitHub Profile](https://github.com/Susil1)

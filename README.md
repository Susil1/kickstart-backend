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

## 🚀 Usage

1. Install **Kickstart Backend** from the VS Code Marketplace.
2. Open your project/workspace in VS Code.
3. Run the command palette (**Ctrl+Shift+P** / **Cmd+Shift+P**) →  
   Search for:

Kickstart Backend: Generate Project Structure

4. Select the target folder (root or an existing one).
5. Your scaffolded structure will appear instantly.

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

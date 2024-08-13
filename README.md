# How to Run this Project🚀

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager) or [yarn](https://yarnpkg.com/)
- **My versions for reference:**
    - **node -v: v18.20.2**
    - **npm -v: 10.5.0**

## Setting Up the Project

1. **Clone the Repository**

    Clone the project repository from GitHub to your local machine.

    ```bash
    git clone https://gitlab.com/tj-cs-swe/cs10102302-2024/intelligent-worker/ji_music-frontend
    cd ji_music-frontend
    ```

2. **Install Dependencies**

    - **Delete `package-lock.json`:** If it exists, delete the `package-lock.json` file.
    - **Open Terminal in Project Directory:** Navigate to the project's root directory and open a terminal window (cmd).
    - **Clear npm Cache:** Sometimes, npm cache issues can cause dependency installation failures. Clear the npm cache to avoid such problems.

    ```bash
    npm cache clean --force
    ```

    If you encounter a warning:

    ```bash
    npm ERR! The operation was rejected by your operating system.
    npm ERR! It's possible that the file was already in use (by a text editor or antivirus),
    npm ERR! or that you lack permissions to access it.
    ```

    Adjust the permissions for the "node_cache" and "node_global" folders in your Node.js installation directory. Right-click on these folders, go to Properties -> Security -> Edit, and set the Users permissions to **Full Control**.

    - **Install Dependencies:** Install the project dependencies using npm.

    ```bash
    npm install
    ```

## Running the Development Server

1. **Start the Development Server**

    Start the Vue.js development server. This will compile the project and serve it locally, enabling live reloading when you make changes to the code.

    ```bash
    npm run serve
    ```

2. **Open in Browser**

    Open your browser and navigate to `http://localhost:8080`. You should see your Vue.js application running.

## Building for Production

1. **Build the Project**

    To create a production-ready build of your Vue.js application, run the build command. This will compile and minify your source code into the `dist` directory.

    ```bash
    npm run build
    # or
    yarn build
    ```

2. **Serve the Build**

    You can serve the contents of the `dist` directory using any web server. For testing purposes, you can use a simple HTTP server like `http-server`.

    ```bash
    npm install -g http-server
    http-server dist
    ```

3. **Open in Browser**

    Open your browser and navigate to the address provided by `http-server`, typically `http://localhost:8080`.

## Setup

This build uses node version 18.15.0 and npm version.
Install nvm and run the following commands：

```
nvm install 18.15
nvm use 18
```

To start the development server, run the following commands:

```
npm install
npm start
```

You should see something similar to this in the terminal:

```
[webpack-dev-server] Project is running at:
[webpack-dev-server] Loopback: http://localhost:8080/
...
...
webpack 5.76.1 compiled successfully in 8360 ms
```

A local server have been started and hosts a built version of the ml5 library at http://localhost:8080/dist/ml5.js. While the server is running, Webpack will automatically rebuild the library if you change and save any file in the `/src` folder.

A webpage at http://localhost:8080/examples/ should automatically open with the directory listing of the example directory. Select one of the directories to test run `ml5.js` in some example code.

## Code Formatting

To keep the coding style consistent, we will be using the Prettier formatter.

### Visual Studio Code

If you are using Visual Studio Code, you can install the Prettier extension by going to the **Extensions** tab and search for "Prettier". Click on **Prettier - Code formatter** and click **Install**.

Go to **File > Preferences > Settings**, search for "default formatter" and make sure **Prettier - Code formatter** is selected for **Editor: Default Formatter**.

To automatically format a document when saving it, search for "format on save" in the settings and make sure **Editor: Format On Save** is checked. Otherwise, you can use the VS Code keyboard shortcut to format an opened document, which is <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>f</kbd> for Windows or <kbd>shift</kbd> + <kbd>option</kbd> + <kbd>f</kbd> for Mac by default.

### Command Line

You can also format a document via the command line. To format all JavaScript documents in the repo, use:

```
npm run format
```

To format a specific document, use

```
npx prettier --write path/to/file
```

For more options with the command line, refer to the [Prettier Documentation](https://prettier.io/docs/en/cli.html)

## Building the Library

To build the ml5 library for production, run the following commands

```
npm install
npm run build
```

This will create a production version of the library in `/dist` directory.

## Process

_This section explains how this repository was creates and is for reference purposes only. The steps outlines in this section do not need to be followed by contributors._

I am building the library using Webpack, which was installed with:

```
npm install --save-dev webpack webpack cli
```

I also created package.json using `npm init` and set up a basic config file for a library build named `webpack.config.js`. I configured package.json so I could run webpack with `npm run build`.

From the original ml5 library's `src` folder, I copied over all source files from the `NeuralNetwork` directory and necessary dependency files from `utils` directory. I also copied over `index.js` from the `src` folder and deleted everything unrelated to NeuralNetwork. I then installed `@tensorflow/tfjs@4.2.0`, `@tensorflow/tfjs-vis@1.5.1`, and `axios@1.3.4` with npm.

At this point, the library can be built without error. I was only getting an error about exceeding recommended size limit. For the build, I am using the latest version of node, npm, and tfjs. I have not tested all the features of NeuralNetwork, but it appears to be working just fine.

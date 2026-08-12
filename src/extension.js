const vscode = require('vscode');
const { createStatusBar, updateStatusBar } = require('./statusBar');

/** @type {vscode.Disposable} */
let disposable;

/** @type {vscode.Disposable[]} */
let subscriptions = [];

/**
 * @function
 * @returns {void}
 */
function activate() {
    disposable = vscode.commands.registerCommand('xmasTime.run', function () {
        updateStatusBar();
        vscode.window.showInformationMessage(
            'The status bar was updated successfully.'
        );
    });

    // Register a command and a status bar item
    subscriptions.push(disposable);
    subscriptions.push(createStatusBar());

    // Register some listeners
    subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
    );
    subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar)
    );
    subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateStatusBar));

    // Update the status bar once at start
    updateStatusBar();
}

/**
 * @function
 * @returns {void}
 */
function deactivate() {
    // Disposing
    disposable.dispose();
    subscriptions.forEach((subscription) => subscription.dispose());
}

/**
 * @exports
 * @type {{
 *   activate: function(): void,
 *   deactivate: function(): void
 * }}
 */
module.exports = {
    activate,
    deactivate,
};

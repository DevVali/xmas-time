const vscode = require("vscode");
const { createStatusBar, updateStatusBar } = require("./statusBar");

let disposable;
let subscriptions = [];

function activate() {
    disposable = vscode.commands.registerCommand("xmasTime.run", function () {
        updateStatusBar();
        vscode.window.showInformationMessage(
            "The status bar was updated successfully."
        );
    });

    // Register a command and a status bar item
    subscriptions.push(disposable);
    subscriptions.push(createStatusBar());

    // Register some listeners with disposables
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

function deactivate() {
    // Disposing
    disposable.dispose();
    subscriptions.forEach((subscription) => subscription.dispose());
}

module.exports = {
    activate,
    deactivate,
};

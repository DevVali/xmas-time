const vscode = require('vscode');
const { createStatusBar, updateStatusBar } = require('./statusBar');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('xmasTime.run', function () {
		updateStatusBar();
		vscode.window.showInformationMessage('The status bar was updated successfully.');
	});

	// Register a command and a status bar item
	context.subscriptions.push(disposable);
	context.subscriptions.push(createStatusBar());

	// Register some listeners
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBar));
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar));
	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(updateStatusBar));

	// Update the status bar once at start
	updateStatusBar();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

import getTimeLeft from './getTimeLeft.js';

const vscode = require('vscode');

/**
 * @type {vscode.StatusBarItem}
 */
let statusBar;

/**
 * @function
 * @returns {vscode.StatusBarItem}
 */
function createStatusBar() {
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right
    );

    return statusBar;
}

/**
 * @function
 * @returns {void}
 */
function updateStatusBar() {
    if (
        getTimeLeft() !== 'Merry Christmas!' &&
        getTimeLeft() !== 'Christmas is over!'
    ) {
        statusBar.text = `$(watch) ${getTimeLeft()}`;
        statusBar.tooltip = `${getTimeLeft()} left until Christmas 🎄`;
    } else {
        statusBar.text = `$(sparkle) ${getTimeLeft()}`;
        statusBar.tooltip = null;
    }
    statusBar.show();
}

/**
 * @exports
 * @type {{
 *   createStatusBar: function(): vscode.StatusBarItem,
 *   updateStatusBar: function(): void
 * }}
 */
export { createStatusBar, updateStatusBar };

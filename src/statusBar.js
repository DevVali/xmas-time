const vscode = require('vscode');
const { getTimeLeft } = require('./getTimeLeft');

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
module.exports = { createStatusBar, updateStatusBar };

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
    const timeLeft = getTimeLeft();

    if (
        timeLeft !== 'Merry Christmas!' &&
        timeLeft !== 'Christmas is over!' &&
        timeLeft !== 'Invalid Xmas date!'
    ) {
        statusBar.text = `$(watch) ${timeLeft}`;
        statusBar.tooltip = `${timeLeft} left until Christmas 🎄`;
    } else {
        statusBar.text = `$(sparkle) ${timeLeft}`;
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
module.exports = { createStatusBar, updateStatusBar };

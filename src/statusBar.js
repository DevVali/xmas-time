const vscode = require('vscode');
const { getTimeLeft } = require('./getTimeLeft');

/**
 * @type {vscode.StatusBarItem}
 */
let statusBar = null;

function createStatusBar() {
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right
    );

    return statusBar;
}

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

module.exports = { createStatusBar, updateStatusBar };

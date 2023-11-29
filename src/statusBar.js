const vscode = require('vscode')
const { getTimeLeft } = require('./getTimeLeft')

/**
 * @type {vscode.StatusBarItem}
 */
let statusBar = null

function createStatusBar() {
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right
    )
    statusBar.command =
        getTimeLeft() !== 'Merry Christmas!' &&
        getTimeLeft() !== 'Christmas are over!'
            ? 'xmasTime.run'
            : null

    return statusBar
}

function updateStatusBar() {
    statusBar.text =
        getTimeLeft() !== 'Merry Christmas!' &&
        getTimeLeft() !== 'Christmas are over!'
            ? `$(watch) ${getTimeLeft()}`
            : `$(sparkle) ${getTimeLeft()}`
    statusBar.tooltip =
        getTimeLeft() !== 'Merry Christmas!' &&
        getTimeLeft() !== 'Christmas are over!'
            ? `${getTimeLeft()} left until Christmas 🎄`
            : null
    statusBar.show()
}

module.exports = { createStatusBar, updateStatusBar }

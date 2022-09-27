import * as vscode from 'vscode';

const statusBarItem = vscode.window.createStatusBarItem(
	'debugMode',
	vscode.StatusBarAlignment.Left,
	Number.MIN_SAFE_INTEGER // Furthest right on the left
);

export function activate(context: vscode.ExtensionContext) {
	console.log('The extension "debug-mode" is now active!');

	// Define item for status bar to indicate the mode is active
	statusBarItem.name = 'Debug Mode status';
	statusBarItem.text = 'DebugMode';
	statusBarItem.tooltip = 'GDB-inspired alpha-keys will trigger Debug actions (check for "debugMode.active" in keybindings)';
	statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');

	context.subscriptions.push(
		vscode.commands.registerCommand('debugMode.toggle', async () => {
			// Keep a flag to track if the debug-mode is active or not in the workspace state storage:
			let isEnabled = context.workspaceState.get("debugMode.enabled", false);
			isEnabled = !isEnabled;
			context.workspaceState.update("debugMode.enabled", isEnabled);

			if (isEnabled) {
				statusBarItem.show();
			}
			else {
				statusBarItem.hide();
			}

			// Set flag in the Context so that we can use within when-clauses
			await vscode.commands.executeCommand('setContext', 'debugMode.active', isEnabled);
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

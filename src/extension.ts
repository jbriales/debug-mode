import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('The extension "debug-mode" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('debugMode.toggle', async () => {
			// Keep a flag to track if the debug-mode is active or not in the workspace state storage:
			let isEnabled = context.workspaceState.get("debugMode.enabled", false);
			isEnabled = !isEnabled;
			context.workspaceState.update("debugMode.enabled", isEnabled);

			// Set flag in the Context so that we can use within when-clauses
			await vscode.commands.executeCommand('setContext', 'debugMode.active', isEnabled);

			vscode.window.showInformationMessage('Debug Mode: ' + (isEnabled ? "Enabled" : "Disabled"));
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

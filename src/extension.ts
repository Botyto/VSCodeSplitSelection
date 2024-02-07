import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let command = vscode.commands.registerCommand("split_selection_into_lines", function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }
		const newSelections: vscode.Selection[] = [];
		editor.selections.forEach(function (selection) {
			for (let line = selection.start.line; line <= selection.end.line; line++) {
				if (editor.document.lineAt(line).text.length == 0) { continue; }
				const start = (line == selection.start.line) ? selection.start : new vscode.Position(line, 0);
				const end = (line == selection.end.line) ? selection.end : new vscode.Position(line, editor.document.lineAt(line).text.length);
				newSelections.push(new vscode.Selection(start, end));
			}
		});
		editor.selections = newSelections;
	});
	context.subscriptions.push(command);
}

export function deactivate() { }

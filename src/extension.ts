// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('replace-umlauts.replace', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let document = editor.document;
            let text = document.getText();

            let map: { [key: string]: string } = {
                'ä': '&auml;',
                'ö': '&ouml;',
                'ü': '&uuml;',
                'Ä': '&Auml;',
                'Ö': '&Ouml;',
                'Ü': '&Uuml;',
                'ß': '&szlig;'
            };

            let replacedText = text.replace(/[äöüÄÖÜß]/g, function(s) { return map[s]; });

            editor.edit(editBuilder => {
                let range = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(text.length)
                );
                editBuilder.replace(range, replacedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}

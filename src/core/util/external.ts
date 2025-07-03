import * as vscode from 'vscode';

export const openExternalTerminal = (path: string) => {
    return vscode.commands.executeCommand('openInTerminal', vscode.Uri.file(path));
};

export const revealFolderInOS = (folder: string) => {
    return vscode.env.openExternal(vscode.Uri.file(folder));
};
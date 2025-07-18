import * as vscode from 'vscode';
import folderRoot from '@/core/folderRoot';
import path from 'path';
import { RecentItemType } from '@/constants';
import { Config } from '@/core/config/setting';

export function judgeIsCurrentFolder(path: string) {
    return comparePath(folderRoot.uri?.fsPath, path);
}

export function toSimplePath(path: string) {
    return path.toLocaleLowerCase().replace(/\\/g, '/');
}

export function judgeIncludeFolder(path: string) {
    const normalizePath = toSimplePath(path);
    return folderRoot.folderPathSet.has(normalizePath);
}

export function comparePath(path1: string = '', path2: string = '') {
    return toSimplePath(path1) === toSimplePath(path2);
}

export function getFolderIcon(path: string, color?: vscode.ThemeColor) {
    return comparePath(folderRoot.uri?.fsPath, path)
        ? new vscode.ThemeIcon('check', color)
        : new vscode.ThemeIcon('window', color);
}

export function getRecentItemIcon(type: RecentItemType): vscode.ThemeIcon {
    if (type === RecentItemType.folder) return vscode.ThemeIcon.Folder;
    else if (type === RecentItemType.file) return vscode.ThemeIcon.File;
    else if (type === RecentItemType.workspace) return new vscode.ThemeIcon('layers');
    return new vscode.ThemeIcon('info');
}

export function getGitFolderByUri(uri: vscode.Uri) {
    const repoPath = path.dirname(`${uri.fsPath.split('.git')[0]}.git`);
    return repoPath;
}

// get worktree base dir
export const getBaseWorktreeDir = (baseDir: string) => {
    const worktreePathTemplate = Config.get('worktreePathTemplate', "$BASE_PATH.worktree");
    return worktreePathTemplate.replace('$BASE_PATH', baseDir);
};

export const getBaseBundleDir = (baseDir: string) => `${baseDir}.repoBackup`;

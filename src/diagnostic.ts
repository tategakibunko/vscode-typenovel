import * as vscode from 'vscode';
import { CodeTracker } from './code-tracker';

export function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
  const track = new CodeTracker(document.getText(), document.fileName);
  const diags = track.getErrors().map(error => {
    return {
      code: '',
      message: error.message,
      range: new vscode.Range(
        new vscode.Position(error.codePos.startLine, error.codePos.startColumn),
        new vscode.Position(error.codePos.startLine, error.codePos.endColumn)
      ),
      severity: vscode.DiagnosticSeverity.Error,
      source: 'tnc',
      relatedInformation: []
    };
  })
  collection.set(document.uri, diags);
}

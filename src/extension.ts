import * as vscode from 'vscode';
import { TypeNovelCompetitionItemProvider } from './competition';
import { TypeNovelSignatureHelpProvider } from './signature';
import { updateDiagnostics } from './diagnostic';
import { TYPENOVEL_MODE } from './mode';

export function activate(context: vscode.ExtensionContext) {
  const cmplItemProvider = vscode.languages.registerCompletionItemProvider(
    TYPENOVEL_MODE,
    new TypeNovelCompetitionItemProvider(),
    ...TypeNovelCompetitionItemProvider.TRIGGER_CHARACTERS,
  );
  context.subscriptions.push(cmplItemProvider);

  const collection = vscode.languages.createDiagnosticCollection('validation');
  const onSaveProvider = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    updateDiagnostics(document, collection);
  });
  context.subscriptions.push(onSaveProvider);

  const signatureProvider = vscode.languages.registerSignatureHelpProvider(
    TYPENOVEL_MODE,
    new TypeNovelSignatureHelpProvider(),
    ...TypeNovelSignatureHelpProvider.TRIGGER_CHARACTERS,
  );
  context.subscriptions.push(signatureProvider);
}

export function deactivate() {
}
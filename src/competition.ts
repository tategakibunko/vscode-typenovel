import * as vscode from 'vscode';
import { CodeTracker } from './code-tracker';
import { BLOCK_SYMBOL, ANNOT_SYMBOL, BuiltinBlockSignatures, BuiltinAnnotSignatures } from './builtins';

export class TypeNovelCompetitionItemProvider implements vscode.CompletionItemProvider {
  static TRIGGER_CHARACTERS = [ANNOT_SYMBOL, BLOCK_SYMBOL];

  static BUILTIN_BLOCK_ITEMS = Object.keys(BuiltinBlockSignatures).sort().map(key => {
    return new vscode.CompletionItem(key.substring(1), vscode.CompletionItemKind.Function);
  });

  static BUILTIN_ANNOT_ITEMS = Object.keys(BuiltinAnnotSignatures).sort().map(key => {
    return new vscode.CompletionItem(key.substring(1), vscode.CompletionItemKind.Function);
  });

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
    switch (context.triggerCharacter) {
      case BLOCK_SYMBOL:
        return this.provideBlockCompetitionItems(document, position, token, context);
      case ANNOT_SYMBOL:
        return this.provideAnnotCompetitionItems(document, position, token, context);
    }
    return [];
  }

  private provideBlockCompetitionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
    return TypeNovelCompetitionItemProvider.BUILTIN_BLOCK_ITEMS;
  }

  private provideAnnotCompetitionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
    const text = document.getText();
    const offset = document.offsetAt(position);
    // To avoid compile error, remove single annot mark before compile.
    // [text1][$][text2] -> [text1][text2]
    const src = text.substring(0, offset - 1) + text.substring(offset + 1);
    const tracker = new CodeTracker(src, document.fileName);
    const annots = tracker.getConstraintNamesFromLine(position.line);
    // console.log(`line:${position.line}, annots:[${annots}]`);
    return annots.map(annot => {
      return new vscode.CompletionItem(annot, vscode.CompletionItemKind.Variable);
    }).concat(
      TypeNovelCompetitionItemProvider.BUILTIN_ANNOT_ITEMS
    );
  }
}

import * as vscode from 'vscode';
import { BLOCK_SYMBOL, ANNOT_SYMBOL, Builtins } from './builtins';

interface SigState {
  name: string;
  paramIndex: number;
}

export class TypeNovelSignatureHelpProvider implements vscode.SignatureHelpProvider {
  static TRIGGER_CHARACTERS = ['(', ','];

  public provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.SignatureHelpContext): vscode.ProviderResult<vscode.SignatureHelp> {
    const sigState = this.parseSigState(document, position);
    if (sigState) {
      return this.createSignature(document, position, sigState);
    }
    return undefined;
  }

  private createSignature(document: vscode.TextDocument, position: vscode.Position, state: SigState): vscode.SignatureHelp | undefined {
    const help: vscode.SignatureHelp = new vscode.SignatureHelp();
    const builtinSig = Builtins.getSignature(state.name);
    if (!builtinSig) {
      return undefined;
    }
    const info: vscode.SignatureInformation = new vscode.SignatureInformation(builtinSig.label, new vscode.MarkdownString(builtinSig.doc));
    info.parameters = builtinSig.params.map(sig => new vscode.ParameterInformation(sig.label, sig.doc));
    help.signatures = [info]; // no overloads in typenovel.
    help.activeSignature = 0;
    help.activeParameter = state.paramIndex;
    return help;
  }

  private parseSigState(document: vscode.TextDocument, position: vscode.Position): SigState | undefined {
    const line = document.lineAt(position.line).text;
    const before = line.substring(0, position.character);
    let paramIndex = 0;
    for (let i = before.length - 1; i >= 0; i--) {
      const c1 = before.charAt(i);
      if (c1 === ')') {
        return undefined; // already ended!
      }
      if (c1 === ',') {
        paramIndex++;
        continue;
      }
      if (c1 === '(') {
        for (let j = before.length - 1; j >= 0; j--) {
          const c2 = before.charAt(j);
          if (c2 === ANNOT_SYMBOL || c2 === BLOCK_SYMBOL) {
            const name = before.substring(i, j);
            return { name, paramIndex };
          }
        }
      }
    }
    return undefined;
  }
}
import {
  Compile,
  CompileNodeArgs,
  NearlyParser,
  NodeBuilder,
  TnNode,
  BlockNode,
  DefaultTnConfig,
  ValidationError,
  DuplicateConstraintChecker,
  UndefinedConstraintChecker,
  UnAnnotatedConstraintChecker,
  Constraint,
} from 'typenovel';

const validators = [
  new DuplicateConstraintChecker(),
  new UndefinedConstraintChecker(),
  new UnAnnotatedConstraintChecker(),
];

const typeNovelParser = new NearlyParser();
const astConverter = new NodeBuilder(DefaultTnConfig.markupMap || {});
const compileNodeArgs: CompileNodeArgs = {
  rootBlockName: 'body',
  typeNovelParser,
  astMappers: [],
  astConverter,
  nodeMappers: [],
};

export class CodeTracker {
  private topNode?: BlockNode;

  constructor(public src: string, public filename: string) {
    this.topNode = this.getNodeFromString(src);
  }

  public getErrors(): ValidationError[] {
    return validators
      .reduce((acm, validator) => {
        return this.topNode ? acm.concat(this.topNode.acceptNodeValidator(validator)) : acm;
      }, [] as ValidationError[])
      .sort((e1, e2) => e1.codePos.startLine - e2.codePos.startLine);
  }

  public getConstraintNamesFromLine(line: number): string[] {
    if (this.topNode) {
      const cntrs = this.getConstraintsFromLine(this.topNode, line);
      return cntrs.map(cntr => cntr.key);
    }
    console.error('topNode is not defined!');
    return [];
  }

  private getConstraintsFromLine(topNode: BlockNode, line: number): Constraint[] {
    const node = this.getNodeFromLine(topNode, line);
    return node ? node.getConstraints(true) : [];
  }

  private getNodeFromString(text: string): BlockNode {
    return Compile.nodeFromString(text, {
      path: this.filename,
      ...compileNodeArgs
    }) as BlockNode;
  }

  private getNodeFromLine(topNode: BlockNode, line: number): BlockNode | undefined {
    const topPath = topNode.codePos.path;
    let nodes = topNode.queryNode((node: TnNode) => {
      return node.isBlockNode() && node.codePos.path === topPath && (<BlockNode>node).getRange().isInside(line);
    }).sort((n1, n2) => {
      return n2.codePos.startLine - n1.codePos.startLine;
    });
    if (nodes.length === 0) {
      return undefined;
    }
    const maxLine = nodes[0].codePos.startLine;
    nodes = nodes.filter(n => n.codePos.startLine === maxLine);

    // if same line, select deepest child.
    return nodes[nodes.length - 1] as BlockNode;
  }
}

import { INode, Node } from './node';

export default class Nodes {
  constructor(public nodeMap: Map<string, Node> = new Map<string, Node>()) {}

  setNodes(nodes: INode[]) {
    nodes.forEach((node) => {
      this.addNode(node);
    });
  }

  addNode(node: INode) {
    this.nodeMap.set(node.id, new Node(node));
  }

  forEach(nodesInRange: Set<string>, iteratee: (key: string, node: Node) => void) {
    this.nodeMap.forEach((node, key) => {
      if (node.isInRange(nodesInRange)) {
        iteratee(key, node);
      }
    });
  }
}

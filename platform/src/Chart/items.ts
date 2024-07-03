import Nodes from './nodes';
import { INode, NodeItem } from './node';
import Edges from './edges';

export default class Items {
  constructor(public edges = new Edges(), public nodes = new Nodes(), public edgeType = '') {}

  setNodes(nodes: INode[]) {
    this.nodes.setNodes(nodes);
  }

  setEdges(edges) {
    this.edges.setEdges(edges);
  }

  getItems(edgeConfig, range) {
    const items: { [key: string]: NodeItem } = {};
    const nodesInRange = new Set<string>();

    this.edges.forEachItem(edgeConfig, range, (id, item) => {
      nodesInRange.add(item.id1);
      nodesInRange.add(item.id2);
      items[id] = item;
    });

    this.nodes.forEach(nodesInRange, (id, node) => {
      items[id] = node.toItem();
    });

    return items;
  }
}

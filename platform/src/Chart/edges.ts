import { Range } from '@Models';
import AggregateEdge from './aggregatedEdge';
import { Edge, IEdge, EdgeItem } from './edge';

export default class Edges {
  constructor(public edgeMap: Map<string, Edge> = new Map<string, Edge>()) {}

  setEdges(edges) {
    edges.forEach((edge) => {
      this.addEdge(edge);
    });
  }

  addEdge(edge: IEdge) {
    this.edgeMap.set(edge.id, new Edge(edge));
  }

  forEachItem(edgeConfig, range, iteratee) {
    if (edgeConfig.detailed) {
      this.forEachDetailedItem(edgeConfig, range, iteratee);
    } else {
      this.forEachAggregatedItem(edgeConfig, range, iteratee);
    }
  }

  forEachDetailedItem(edgeConfig, range: Range, iteratee: (key: string, edgeItem: EdgeItem) => void) {
    this.edgeMap.forEach((edge, key) => {
      if (edge.isInRange(range)) {
        iteratee(key, edge.toItem(edgeConfig));
      }
    });
  }

  forEachAggregatedItem(edgeConfig, range, iteratee) {
    const aggrEdges: { [key: string]: AggregateEdge } = {};

    this.edgeMap.forEach((edge: Edge) => {
      if (edge.isInRange(range)) {
        const aggregateType = edgeConfig.aggregateType === 'process_group' ? 'processGroup' : 'type';
        const id = `${edge.source}-${edge.destination}-${edge[aggregateType]}`;

        if (!(id in aggrEdges)) {
          aggrEdges[id] = new AggregateEdge(edge.source, edge.destination, edge[aggregateType]);
        }

        aggrEdges[id].push(edge);
      }
    });

    Object.entries(aggrEdges).forEach(([id, aggrEdge]) => {
      iteratee(id, aggrEdge.toItem(edgeConfig));
    });
  }
}

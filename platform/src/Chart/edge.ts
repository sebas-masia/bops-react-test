import { Numbers } from 'humanify-numbers';
import { isInRange, Range } from '@Models';

export interface IEdge {
  id: string;
  source: string;
  destination: string;
  type: string;
  processGroup: string;
  currency: string;
  currencyValue?: number;
  quantity: number;
  timestamp: Date;
}

export interface EdgeItem {
  id1: string;
  id2: string;
  end2: { arrow: boolean };
  label: {
    text: string;
    color: string;
    backgroundColor: string;
    border: { color: string; size: number };
    fontSize: number;
  };
  times: { time: Date }[];
  color: string;
  width: number;
}

export class Edge implements IEdge {
  id = '';
  source = '';
  destination = '';
  type = '';
  processGroup = '';
  currency = '';
  currencyValue?: number;
  quantity = 0;
  timestamp: Date = new Date();
  linkStyle: { color: string; width: number };

  constructor(source: IEdge) {
    Object.assign(this, source);
    this.linkStyle = {
      color: 'rgb(124, 108, 246)',
      width: 4,
    };
  }

  toItem(edgeConfig): EdgeItem {
    return {
      ...this.linkStyle,
      id1: this.source,
      id2: this.destination,
      end2: {
        arrow: true,
      },
      label: {
        text: this.getLabel(edgeConfig),
        color: '#fff',
        backgroundColor: 'rgb(1, 18, 51)',
        border: {
          color: 'rgb(39, 31, 80)',
          size: 4,
        },
        fontSize: 20,
      },
      times: [{ time: this.timestamp }],
    };
  }

  getLabel(edgeConfig) {
    const type =
      edgeConfig.aggregateType === 'process_group'
        ? this.processGroup.replaceAll('-', ' ')
        : this.type.replaceAll('-', ' ');
    if (edgeConfig.measureType === 'aggregate') {
      return type;
    }
    if (edgeConfig.measureType === 'quantity' && typeof this.quantity !== 'undefined') {
      return `${Numbers.stringify(this.quantity)} ${type}`;
    }
    if (edgeConfig.measureType === 'currency' && this.currencyValue) {
      return `${Numbers.stringify(this.currencyValue)} ${this.currency} ${type}`;
    }
    return type;
  }

  isInRange(range: Range) {
    return isInRange(range, this.timestamp);
  }
}

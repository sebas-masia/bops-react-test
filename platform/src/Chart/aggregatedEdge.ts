import { Numbers } from 'humanify-numbers';

export default class AggregateEdge {
  source: any;
  destination: any;
  type: any;
  edges: any;
  linkStyle: any;

  constructor(source, destination, type) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.edges = [];
    this.linkStyle = {
      color: 'rgb(124, 108, 246)',
      width: 4,
    };
  }

  push(edge) {
    this.edges.push(edge);
  }

  toItem(edgeConfig) {
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
      times: this.getTimestamps(),
    };
  }

  getLabel(edgeConfig) {
    if (edgeConfig.measureType === 'aggregate') {
      return this.getAggregateTypeLabel();
    }
    if (edgeConfig.measureType === 'quantity') {
      return this.getQuantityLabel();
    }
    if (edgeConfig.measureType === 'currency') {
      return this.getCurrencyLabel();
    }
    return this.type.replaceAll('-', ' ');
  }

  getAggregateTypeLabel() {
    const type = this.type.replaceAll('-', ' ');
    if (this.edges.length === 1) {
      return type;
    }
    return `${Numbers.stringify(this.edges.length)} ${type}`;
  }

  getQuantityLabel() {
    const type = this.type.replaceAll('-', ' ');
    let quantity = 0;
    this.edges.forEach((edge) => {
      if (typeof edge.quantity === 'undefined') {
        return;
      }
      quantity += parseFloat(edge.quantity);
    });
    if (quantity === 0) {
      return type;
    }
    return `${Numbers.stringify(quantity)} ${type}`;
  }

  getCurrencyLabel() {
    const type = this.type.replaceAll('-', ' ');
    let currencyValue = 0;
    const currenciesSet = new Set();
    this.edges.forEach((edge) => {
      if (typeof edge.currencyValue === 'undefined') {
        return;
      }
      currenciesSet.add(edge.currency);
      currencyValue += edge.currencyValue;
    });

    const currencies = Array.from(currenciesSet);

    const currency = [...currencies][0];
    if (currencies.length > 1) {
      console.log(`multiple currencies: ${[...currencies].join(', ')}`);
    }

    if (currencyValue === 0) {
      return type;
    }

    return `${Numbers.stringify(currencyValue)} ${currency} ${type}`;
  }

  getTimestamps() {
    const timestamps: any[] = [];
    this.edges.forEach((edge) => {
      timestamps.push({ time: edge.timestamp });
    });
    return timestamps;
  }
}

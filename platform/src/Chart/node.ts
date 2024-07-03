import { Numbers } from 'humanify-numbers';

export interface INode {
  id: string;
  title: string;
  type: string;
  name: string;
  inventory: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NodeItem {
  color: string;
  border: { color: string; width: number };
  fontIcon: { text: any; color: string };
  size: number;
  glyphs: {
    angle: number;
    radius: number;
    size: number;
    border: { color: string };
    color: string;
    label: { text: string };
  }[];
  coordinates: { lat: number; lng: number };
}

export class Node implements INode {
  static iconMap = {
    vendor: 'fa-warehouse',
    supplier: 'fa-warehouse',
    transit: 'fa-truck',
    customer: 'fa-store-alt',
    store: 'fa-store-alt',
    web: 'fa-at',
    waste: 'fa-recycle',
    retail: 'fa-cash-register',
  };

  id = '';
  title = '';
  type = '';
  name = '';
  inventory = 0;
  coordinates: { lat: number; lng: number } = { lat: 0, lng: 0 };

  constructor(source: INode) {
    Object.assign(this, source);
  }

  toItem(): NodeItem {
    const glyphs = [
      {
        angle: 180,
        radius: 42,
        size: 1.5,
        border: { color: 'rgb(102, 90, 166)' },
        color: 'rgba(102, 90, 166, 0.65)',
        label: { text: this.title },
      },
    ];

    if (this.inventory) {
      glyphs.push({
        angle: 45,
        radius: 40,
        size: 1.5,
        border: { color: 'rgb(102, 90, 166)' },
        color: 'rgba(102, 90, 166, 0.65)',
        label: { text: Numbers.stringify(this.inventory) },
      });
    }

    return {
      color: 'rgba(124, 108, 246, 0)',
      border: { color: 'rgb(124, 108, 246)', width: 2 },
      fontIcon: { text: Node.getIcon(this.type), color: 'rgb(202, 209, 216)' },
      size: 1.5,
      glyphs,
      coordinates: this.coordinates,
    };
  }

  static getIcon(type: string) {
    if (type in Node.iconMap) {
      return Node.iconMap[type];
    }

    return 'fa-industry';
  }

  isInRange(nodesInRange: Set<string>) {
    return nodesInRange.has(this.id);
  }
}

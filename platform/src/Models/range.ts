export interface Range {
  start: Date;
  end: Date;
}

export const isInRange = (range: Range, timestamp: Date) => {
  if (!range) {
    return true;
  }

  return timestamp >= range.start && timestamp < range.end;
};

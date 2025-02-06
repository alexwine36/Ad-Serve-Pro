export function percentageChange(oldValue: number, newValue: number) {
  let prevVal = oldValue;
  if (oldValue === 0) {
    prevVal = 1;
  }
  const change = newValue - oldValue;
  const percentage = (change / prevVal) * 100;
  return percentage;
}

type PercentageChangeDisplayOptions = {
  precision?: number;
  prefix?: boolean;
};

const DEFAULT_OPTIONS: Required<PercentageChangeDisplayOptions> = {
  precision: 1,
  prefix: false,
};

export function percentageChangeDisplay(
  oldValue: number,
  newValue: number,
  options?: PercentageChangeDisplayOptions
) {
  const { precision, prefix } = { ...DEFAULT_OPTIONS, ...options };
  const percentage = percentageChange(oldValue, newValue);
  if (
    percentage === Number.POSITIVE_INFINITY ||
    percentage === Number.NEGATIVE_INFINITY ||
    Number.isNaN(percentage)
  ) {
    return '∞';
  }
  let prefixStr = '';
  if (prefix) {
    prefixStr = percentage > 0 ? '+' : '';
  }
  return `${prefixStr}${Intl.NumberFormat('en-US', {
    style: 'percent',
    // minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    // useGrouping: true,
  }).format(percentage / 100)}`;
}

// Every number the estimator uses. Each entry has low / mid / high values.
// To update a number: change low / mid / high, and add `source: '...'` (where it came from)
// and `checked: 'YYYY-MM'` (when you last checked it). Entries without a source show as Placeholder.
// All values are placeholders until they have a source.

const A = [
  { id: 'hcwShare', group: 'Who needs protection', label: 'Patient-facing healthcare workers, share of population', unit: 'pct', mid: 0.03, low: 0.018, high: 0.042, note: 'Set by the country’s income group' },
  { id: 'critShare', group: 'Who needs protection', label: 'Other critical workers (utilities, food, transport, police), share of population', unit: 'pct', mid: 0.08, low: 0.05, high: 0.12 },
  { id: 'workDays', group: 'How respirators get used', label: 'Shifts per worker per month', unit: 'num', mid: 21, low: 20, high: 22 },
  { id: 'publicDays', group: 'How respirators get used', label: 'Days per month a member of the public needs one', unit: 'num', mid: 12, low: 8, high: 20 },
  { id: 'perDayStrict', group: 'How respirators get used', label: 'Disposables per shift, new for each patient', unit: 'num', mid: 4, low: 2, high: 6 },
  { id: 'perDayShift', group: 'How respirators get used', label: 'Disposables per shift, one per shift', unit: 'num', mid: 1, low: 1, high: 1.5 },
  { id: 'perDayExtended', group: 'How respirators get used', label: 'Disposables per shift, extended reuse', unit: 'num', mid: 0.2, low: 0.14, high: 0.33 },
  { id: 'filtersPerMonth', group: 'How respirators get used', label: 'Elastomeric filter pairs used per person per month', unit: 'num', mid: 0.33, low: 0.17, high: 1 },
  { id: 'spares', group: 'How respirators get used', label: 'Reusable units bought per person (spares, size mix)', unit: 'x', mid: 1.1, low: 1.05, high: 1.25 },
  { id: 'priceN95', group: 'Prices (USD)', label: 'Disposable N95 / FFP2, each', unit: 'usd', mid: 0.6, low: 0.35, high: 1.2 },
  { id: 'priceElasto', group: 'Prices (USD)', label: 'Elastomeric half-mask, each', unit: 'usd', mid: 30, low: 20, high: 45 },
  { id: 'priceFilter', group: 'Prices (USD)', label: 'Elastomeric filter pair', unit: 'usd', mid: 10, low: 6, high: 16 },
  { id: 'pricePAPR', group: 'Prices (USD)', label: 'PAPR unit, each', unit: 'usd', mid: 900, low: 600, high: 1500 },
  { id: 'paprPerMonth', group: 'Prices (USD)', label: 'PAPR filters, batteries and hoods, per person per month', unit: 'usd', mid: 15, low: 8, high: 30 },
  { id: 'surge', group: 'Prices (USD)', label: 'Price multiplier when buying during an outbreak', unit: 'x', mid: 3, low: 1.5, high: 6 },
  { id: 'fitTest', group: 'Program costs', label: 'Fit test per worker (tight-fitting respirators only)', unit: 'usd', mid: 15, low: 5, high: 40 },
  { id: 'training', group: 'Program costs', label: 'Training per worker', unit: 'usd', mid: 5, low: 2, high: 10 },
  { id: 'logisticsPct', group: 'Program costs', label: 'Storage and distribution, share of purchase cost', unit: 'pct', mid: 0.08, low: 0.04, high: 0.15 },
  { id: 'replaceDisposable', group: 'Keeping a stockpile', label: 'Disposable stock replaced each year (about 5-year shelf life)', unit: 'pct', mid: 0.2, low: 0.17, high: 0.25 },
  { id: 'replaceElasto', group: 'Keeping a stockpile', label: 'Elastomeric stock replaced each year', unit: 'pct', mid: 0.1, low: 0.07, high: 0.14 },
  { id: 'replacePAPR', group: 'Keeping a stockpile', label: 'PAPR stock replaced each year (mostly batteries)', unit: 'pct', mid: 0.15, low: 0.1, high: 0.2 },
];
// Populations are rounded 2025 figures. Healthcare worker share is a placeholder by income group.
const HCW_BY_INCOME = { high: 0.03, umid: 0.015, lmid: 0.006, low: 0.003 };
const COUNTRIES = [
  { id: 'us', name: 'United States', pop: 340e6, inc: 'high' },
  { id: 'uk', name: 'United Kingdom', pop: 69e6, inc: 'high' },
  { id: 'de', name: 'Germany', pop: 84e6, inc: 'high' },
  { id: 'br', name: 'Brazil', pop: 212e6, inc: 'umid' },
  { id: 'id', name: 'Indonesia', pop: 283e6, inc: 'umid' },
  { id: 'in', name: 'India', pop: 1450e6, inc: 'lmid' },
  { id: 'ng', name: 'Nigeria', pop: 230e6, inc: 'lmid' },
  { id: 'ke', name: 'Kenya', pop: 56e6, inc: 'lmid' },
  { id: 'custom', name: 'Custom population', pop: 10e6, inc: 'high' },
];
const SCENARIOS = {
  flu: { months: 4, hcw: true, crit: false, pub: false, pubShare: 0.5 },
  p2020: { months: 12, hcw: true, crit: true, pub: false, pubShare: 0.5 },
  severe: { months: 18, hcw: true, crit: true, pub: true, pubShare: 0.5 },
};

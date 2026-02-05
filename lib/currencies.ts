export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
  buyRate: number;
  sellRate: number;
  remitRate: number | null;
}

export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    country: 'us',
    buyRate: 83.25,
    sellRate: 82.85,
    remitRate: 83.55,
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    country: 'eu',
    buyRate: 90.45,
    sellRate: 89.95,
    remitRate: 90.85,
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    country: 'gb',
    buyRate: 105.2,
    sellRate: 104.6,
    remitRate: 105.7,
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    country: 'au',
    buyRate: 54.3,
    sellRate: 53.9,
    remitRate: 54.65,
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    country: 'ca',
    buyRate: 61.45,
    sellRate: 61.05,
    remitRate: 61.8,
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    country: 'sg',
    buyRate: 62.15,
    sellRate: 61.75,
    remitRate: 62.5,
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    country: 'ae',
    buyRate: 22.68,
    sellRate: 22.45,
    remitRate: 22.85,
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
    country: 'sa',
    buyRate: 22.2,
    sellRate: 21.95,
    remitRate: 22.4,
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    country: 'jp',
    buyRate: 0.56,
    sellRate: 0.55,
    remitRate: 0.57,
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    country: 'ch',
    buyRate: 95.8,
    sellRate: 95.2,
    remitRate: 96.3,
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    country: 'nz',
    buyRate: 50.25,
    sellRate: 49.85,
    remitRate: 50.6,
  },
  {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    country: 'hk',
    buyRate: 10.65,
    sellRate: 10.55,
    remitRate: 10.75,
  },
  {
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    country: 'th',
    buyRate: 2.42,
    sellRate: 2.38,
    remitRate: 2.45,
  },
  {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM',
    country: 'my',
    buyRate: 17.85,
    sellRate: 17.65,
    remitRate: null,
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    country: 'cn',
    buyRate: 11.55,
    sellRate: 11.4,
    remitRate: null,
  },
  {
    code: 'KRW',
    name: 'South Korean Won',
    symbol: '₩',
    country: 'kr',
    buyRate: 0.062,
    sellRate: 0.06,
    remitRate: null,
  },
];

export const popularCurrencies = currencies.slice(0, 8);

export function formatCurrency(amount: number, decimals = 2): string {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find((c) => c.code === code);
}

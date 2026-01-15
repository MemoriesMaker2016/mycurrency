type RateMode = 'buy' | 'sell';
type ProductType = 'notes' | 'card';

const NOTES_MARGIN: Record<string, number> = {
  USD: 1,
  EUR: 1,
  GBP: 1,
  AED: 1,
  CAD: 1,
  AUD: 1,
  SGD: 1,
};

const CARD_MARGIN: Record<string, number> = {
  USD: 1.2,
  EUR: 2,
  GBP: 3,
  AED: 0.8,
  CAD: 1.2,
  AUD: 1.2,
  SGD: 1.2,
};

export async function getLiveRate(
  currency: string,
  mode: RateMode,
  product: ProductType
) {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/41c1dfcaafbe62240415827f/latest/INR`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  const foreignPerInr = data?.conversion_rates?.[currency];
  if (!foreignPerInr) return null;

  // convert to INR per 1 foreign
  let inrPerForeign = 1 / foreignPerInr;

  const margin =
    product === 'notes'
      ? NOTES_MARGIN[currency] || 1.5
      : CARD_MARGIN[currency] || 1;

  // apply margins on INR value
  if (mode === 'sell') inrPerForeign += margin;
  if (mode === 'buy') inrPerForeign -= margin * 0.6;

  return +inrPerForeign.toFixed(2);
}

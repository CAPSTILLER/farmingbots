// Fetch DexScreener / token info for $CAPH on Base
const tokenAddress = "0x1d1bcd1459259429accde23e24e1782f83e97ba3";
let volume24h = 1000;
let priceUsd = 0.00000025;
try {
  const res = await http.fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
  if (res && res.pairs && res.pairs.length > 0) {
    const pair = res.pairs[0];
    volume24h = pair.volume && pair.volume.h24 ? pair.volume.h24 : volume24h;
    priceUsd = pair.priceUsd ? parseFloat(pair.priceUsd) : priceUsd;
  }
} catch (e) {
  // fallback
}

const k = 0.00002;
const perfection = Math.min(99.5, Math.max(10.0, 10 + 90 * (1 - Math.exp(-k * volume24h))));

return {
  tokenAddress,
  symbol: "CAPH",
  volume24h,
  priceUsd,
  perfection: parseFloat(perfection.toFixed(2)),
  imperfection: parseFloat((100 - perfection).toFixed(2)),
  timestamp: Date.now()
};

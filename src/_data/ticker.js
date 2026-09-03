// Market ticker under the date bar. Nine instruments, scrolling as one marquee.
// Edit by hand, or point at a feed later — the template duplicates whatever is
// in this array so the loop is seamless. Keep "dir" honest: it drives the colour.
module.exports = [
  { label: "Nikkei 225", value: "42,180.55", move: "+1.24%", dir: "up" },
  { label: "ASX 200", value: "8,412.30", move: "+0.68%", dir: "up" },
  { label: "Hang Seng", value: "19,744.12", move: "-0.42%", dir: "down" },
  { label: "S&P 500", value: "6,318.77", move: "+0.31%", dir: "up" },
  { label: "Nasdaq", value: "20,905.44", move: "+0.55%", dir: "up" },
  { label: "PSEi", value: "7,102.86", move: "-0.19%", dir: "down" },
  { label: "Brent Crude", value: "$81.42", move: "+2.10%", dir: "up" },
  { label: "Gold", value: "$2,684.10", move: "+0.44%", dir: "up" },
  { label: "AUD/USD", value: "0.6742", move: "-0.23%", dir: "down" },
];

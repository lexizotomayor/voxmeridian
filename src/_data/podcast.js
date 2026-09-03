// The Meridian Briefing.
//
// The podcast does not exist yet. These four entries are LAYOUT STAND-INS so the
// homepage band and /podcast/ have something to set — which is why every one of
// them has no audio URL and the section carries the demo caveat.
//
// Two ways to make this honest:
//   show: false            hides the homepage band and drops /podcast/ from the nav
//   real episodes          replace the array, give each one an "audio" URL, set
//                          sample: false, and the caveat line disappears
module.exports = {
  show: true,
  sample: true,
  title: "The Meridian Briefing",
  blurb:
    "One conversation a week about the documents behind the week's news — the clause, the loan, or the licence that actually decided the story.",
  caveat:
    "The Briefing has not recorded yet. These episode titles show how the section will run.",
  episodes: [
    { ep: 42, title: "What the pact really buys", len: "24 min", dek: "Four clauses, read in order, and what each one gives away.", audio: null },
    { ep: 41, title: "Inside the AUKUS inquiry, hearing by hearing", len: "31 min", dek: "Three phases, two submarine classes, one timeline nobody will be in office for.", audio: null },
    { ep: 40, title: "Why Pacific fuel prices follow the Gulf", len: "19 min", dek: "Freight, insurance, and a storage buffer thinner than most people assume.", audio: null },
    { ep: 39, title: "Island economies and the mining boom", len: "27 min", dek: "Volume was flat. The whole increase was price — and price does not build anything.", audio: null },
  ],
};

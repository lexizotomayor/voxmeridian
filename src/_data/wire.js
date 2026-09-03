// The Wire: aggregation items, newest day first.
// Editable in the CMS under "The Wire".
//
// RULES, not preferences:
//   1. Every item names the newsroom that did the work and links the actual article.
//   2. The summary is written here, in our words, short. Never paste the outlet's copy.
//   3. No item without a working outbound URL. A credit with a dead or generic link is
//      a false credit.
//   4. Our own reporting never appears in this feed.
const days = [
  {
    label: "Wednesday 2 September",
    items: [
      {
        time: "2 Sep", place: "Koror",
        title: "Forum foreign ministers publish their outcomes ahead of the leaders' retreat",
        section: "Security & Diplomacy",
        summary:
          "The secretariat has released the outcomes document from this year's Forum Foreign Ministers Meeting — the paper that shapes what leaders sign in Koror. Worth reading before the communiqué rather than after it.",
        source: "Pacific Islands Forum Secretariat",
        url: "https://forumsec.org/publications/outcomes-2026-forum-foreign-ministers-meeting",
      },
    ],
  },
  {
    label: "Tuesday 1 September",
    items: [
      {
        time: "1 Sep", place: "Koror",
        title: "Protect the tuna or lose billions, the fisheries agency tells leaders",
        section: "Business",
        summary:
          "Forum Fisheries Agency director-general Noan Pakop argued the future value of the region's tuna depends on keeping illegal fishing under control, and pressed partners for stronger surveillance and monitoring.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-three-01-september-2026/",
      },
      {
        time: "1 Sep", place: "Koror",
        title: "Solomon Islands asks partners to fund a regional fisheries surveillance centre",
        section: "Business",
        summary:
          "The pitch is to fuse vessel-monitoring data, fisheries intelligence and the Pacific Fusion Centre's feeds into one operational picture, on the argument that the loss happens at sea rather than in the licensing office.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-three-01-september-2026/",
      },
      {
        time: "1 Sep", place: "Koror",
        title: "Fusion Centre chief wants the region to go after criminal profits, not just cargo",
        section: "Security & Diplomacy",
        summary:
          "Organised crime is a business, the centre's chief told the Forum, and the response should read like one — fused agency intelligence used to interdict drugs at sea, and the money followed afterwards.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-three-01-september-2026/",
      },
      {
        time: "1 Sep", place: "Koror",
        title: "The Pacific supplies over half the world's tuna and handles about 15 per cent of it",
        section: "Business",
        summary:
          "The FFA put the figure to the leaders' roundtable alongside two instruments: the East New Britain Initiative to keep more of the value in the islands, and the Regional Fisheries Surveillance Centre to secure the resource itself.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-one-01-september-2026/",
      },
      {
        time: "1 Sep", place: "Honiara",
        title: "Government House confirms the resignation of three Solomon Islands ministers",
        section: "Politics",
        summary:
          "The confirmation lands in the same week the prime minister flew into Palau for the Forum and left the next morning over a motion of no confidence filed at home.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-one-01-september-2026/",
      },
      {
        time: "1 Sep", place: "Rarotonga",
        title: "Cook Islands delegation returns from the tuna commission's science meeting",
        section: "Business",
        summary:
          "This year's assessments found yellowfin neither overfished nor subject to overfishing. The delegation backed using them as the best available science ahead of the commission's session in Vanuatu in December.",
        source: "PACNEWS / Islands Business",
        url: "https://islandsbusiness.com/pacnews/pacnews-two-01-september-2026/",
      },
    ],
  },
  {
    label: "Monday 31 August",
    items: [
      {
        time: "31 Aug", place: "Koror",
        title: "Missing leaders will not derail the Forum's outcomes, secretariat says",
        section: "Politics",
        summary:
          "Five members went into the week represented below leader level. The secretariat's answer is that national positions were deliberated in advance, so the decisions still hold.",
        source: "RNZ Pacific",
        url: "https://www.rnz.co.nz/news/pacific/1200583/missing-leaders-won-t-derail-pacific-islands-forum-outcomes-secretariat-says",
      },
      {
        time: "31 Aug", place: "Koror",
        title: "Tiering the Forum's partners is the quiet fight of the week",
        section: "Security & Diplomacy",
        summary:
          "The partnerships policy endorsed last year would split the Forum's dialogue and development partners into two tiers with different levels of access. Where China and the United States land is the whole question.",
        source: "RNZ Pacific",
        url: "https://www.rnz.co.nz/news/pacific/1179835/pacific-leaders-gather-in-palau-ahead-of-key-pif-meeting",
      },
      {
        time: "31 Aug", place: "Koror",
        title: "Security, climate and drugs on the agenda as Palau seeks a missile-test condemnation",
        section: "Security & Diplomacy",
        summary:
          "President Surangel Whipps Jr wants leaders to condemn China's recent missile test in the Pacific; Beijing has answered with accusations of double standards. Taiwan attends in Koror as a development partner.",
        source: "ABC News",
        url: "https://www.abc.net.au/news/2026-08-31/pacific-islands-forum-leaders-meeting-politically-charged/107095316",
      },
      {
        time: "31 Aug", place: "Auckland",
        title: "At least five leaders absent, with questions raised over foreign influence",
        section: "Politics",
        summary:
          "Kiribati, Fiji, Vanuatu, Samoa and Solomon Islands opened the meeting without top-level representation. Several leaders are using the gap to argue the Forum itself needs to change.",
        source: "1News",
        url: "https://www.1news.co.nz/2026/08/31/at-least-five-leaders-absent-from-pacific-islands-forum/",
      },
    ],
  },
];

// Flat list, newest first — used by the homepage and the section pages.
const all = days.reduce((acc, d) => acc.concat(d.items.map((it) => ({ ...it, day: d.label }))), []);

module.exports = { days, today: days[0].items, all };

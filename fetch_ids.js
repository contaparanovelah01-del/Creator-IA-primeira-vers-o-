const channels = [
  "MrBeast", "T-Series", "Cocomelon - Nursery Rhymes", "SET India", "Kids Diana Show",
  "PewDiePie", "Like Nastya", "Vlad and Niki", "Zee Music Company", "WWE",
  "Blackpink", "Goldmines", "Sony SAB", "5-Minute Crafts", "BANGTANTV",
  "Justin Bieber", "HYBE LABELS", "Zee TV", "Pinkfong", "ChuChu TV",
  "Colors TV", "Shemaroo", "Dude Perfect", "T-Series Apna Punjab", "Wave Music",
  "Sony PAL", "El Reino Infantil", "Eminem", "Badabun", "Sony Music India",
  "LooLoo Kids", "Ed Sheeran", "Ariana Grande", "Taylor Swift", "JuegaGerman",
  "Billie Eilish", "Bad Bunny", "Fernanfloo", "Felipe Neto", "Whindersson Nunes",
  "A4", "Katy Perry", "Alan Walker", "Marshmello", "Vevo",
  "Toys and Colors", "Ryan's World", "Enaldinho", "Você Sabia?", "Luccas Neto",
  "CarryMinati", "Total Gaming", "Markiplier", "Jacksepticeye", "Smosh",
  "Ninja", "KSI", "Logan Paul", "Jake Paul", "MrBeast Gaming",
  "Technoblade", "Dream", "TommyInnit", "DanTDM", "SSundee",
  "LazarBeam", "ZHC", "Moriah Elizabeth", "Blippi", "Super Simple Songs",
  "CoComelon", "Brave Wilderness", "Veritasium", "Vsauce", "Kurzgesagt",
  "Mark Rober", "Marques Brownlee", "Linus Tech Tips", "Mrwhosetheboss", "iJustine",
  "Gordon Ramsay", "Babish Culinary Universe", "Joshua Weissman", "First We Feast", "Rosanna Pansino",
  "TED-Ed", "CrashCourse", "CGP Grey", "Oversimplified", "Tom Scott",
  "IGN", "GameSpot", "Polygon", "IGN Games", "Machinima",
  "NikkieTutorials", "James Charles", "Jeffree Star", "Tati", "Brad Mondo"
];

async function getIds() {
  const ids = [];
  for (const name of channels) {
    try {
      const res = await fetch("http://localhost:3000/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: "search",
          params: { part: "snippet", type: "channel", q: name, maxResults: 1 }
        })
      });
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        ids.push(data.items[0].snippet.channelId);
      }
    } catch (e) {}
  }
  const fs = require('fs');
  fs.writeFileSync('valid_ids.json', JSON.stringify(ids));
  console.log("Found", ids.length, "IDs");
}
getIds();

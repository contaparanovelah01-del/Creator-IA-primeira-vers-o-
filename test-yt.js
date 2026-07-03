fetch("http://localhost:3000/api/youtube", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    endpoint: "search",
    params: { part: "snippet", type: "channel", order: "viewCount", maxResults: 10 }
  })
}).then(r => r.json()).then(d => console.log(d)).catch(console.error);

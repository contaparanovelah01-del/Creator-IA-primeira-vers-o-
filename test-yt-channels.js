const ids = 'UCX6OQ3DkcsbYNE6H8uQQuVA,UCq-Fj5jknLsUf-MWSy4_brA,UCbCmjCuTUZos6Inko4u57UQ,UC-lHJZR3Gqxm24_Vd_AJ5Yw,UCk8GzjMOrta8yxDcKfylJYw,UCJ5v_MCY6GNUBTO8-D3XoAg,UCvlE5gTbOvjiolFlSm0OQZA,UC295-Dw_tDNtZXFeIGAW6oA,UCOmHUn--16B90oW2L6FRR3A,UCIwFjwMjI0y7PDBVEO9-bgQ,UCRijo3ddMTht_IHyXcwxcuQ,UCFFbwnve3yF62-tVXkTyHqg,UCpEhnqL0y41EpW2TvWAHD7Q,UCJplp5SjeGSdVdwsfb9QKeA,UC0C-w0YjGpqDXGB8IHb662A,UC16niRr50-MSBwiO3YDb3RA,UCYfdidRxbB8Qhf0Nx7ioOYw,UCP6uPeUU6WGk3m6DqO6c3Mw,UCa7s_DED8yC2P9U3A58h63g,UCpvm7bg6pXKo1Pr6k5kxG9A';
fetch("http://localhost:3000/api/youtube", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    endpoint: "channels",
    params: { part: "snippet,statistics", id: ids }
  })
}).then(r => r.json()).then(d => console.log(d.items.length, d.items[0].snippet.title)).catch(console.error);

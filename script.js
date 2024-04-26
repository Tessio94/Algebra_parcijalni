"use strict";

// const URL = "https://itunes.apple.com/search?term=indie&entity=song";
// const URL = "https://itunes.apple.com/search?term=indie&country=us&entity=song"
const URL = "https://itunes.apple.com/search?";

const search = document.querySelector(".search");
const tablicaPjesama = document.querySelector("#results");
// const loader = document.querySelector("#loader");

async function traziPjesmu(e) {
  tablicaPjesama.innerHTML = "";
  tablicaPjesama.innerHTML = `<div id="loader"></div>`;
  // loader.style.display = "block";
  const input = e.target.value.toLowerCase();

  const res = await fetch(`${URL}term=${input}&country=us&entity=song`);
  const data = await res.json();
  console.log(data.results);
  tablicaPjesama.innerHTML = "";
  // loader.style.display = "none";

  const pjesme = data.results.map((song) => {
    return {
      artist:
        song.artistName.length > 15
          ? song.artistName.slice(0, 15) + "..."
          : song.artistName,
      track:
        song.trackName.length > 15
          ? song.trackName.slice(0, 15) + "..."
          : song.trackName,
      img: song.artworkUrl100,
      year: song.releaseDate.slice(0, 4),
    };
  });
  if (pjesme.length === 0) {
    tablicaPjesama.innerHTML = `<h2 class="no-results">No results found</h2>`;
  }
  pjesme.forEach((pjesma) => kreirajPjesmu(pjesma));
}

function kreirajPjesmu(pjesma) {
  const li = document.createElement("li");
  li.classList.add("song");
  li.innerHTML = `
  <img src="${pjesma.img}"/>
  <div class="song-description">
  <h3>${pjesma.artist}</h3>
  <h4>${pjesma.track}</h4>
  <p>${pjesma.year}</p>
  </div>
  `;

  tablicaPjesama.appendChild(li);
}

function truncateText(charLimit) {
  const originalText = item.textContent;
  if (originalText.length > charLimit) {
    item.textContent = originalText.slice(0, charLimit) + "...";
  }
}

search.addEventListener("input", traziPjesmu);

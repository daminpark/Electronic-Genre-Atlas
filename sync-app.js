const FIRST_RUN_KEY = "electronic-genre-atlas-sync-intro-seen";
const UI_KEY = "electronic-genre-atlas-ui-v1";

const todayKey = () => new Date().toLocaleDateString("sv-SE");
const spotifySearch = (query) => `https://open.spotify.com/search/${encodeURIComponent(query)}/playlists`;
const spotifyEmbed = (url) => {
  const match = String(url || "").match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0` : "";
};

const noteLenses = {
  general: {
    field: "notes",
    label: "What did you hear? What would you steal?",
    placeholder: "Kick pattern, bass movement, mood, arrangement trick, club memory...",
    prompts: [
      ["Drums", "The drum pattern feels like..."],
      ["Bass", "The bass or low end works by..."],
      ["Mood", "The mood of this genre is..."],
      ["Memory", "This reminds me of..."],
    ],
  },
  producing: {
    field: "productionNotes",
    label: "Production notes: sounds, arrangement, Reaktor ideas.",
    placeholder: "Sound design, groove, arrangement, reference texture, Reaktor patch idea...",
    prompts: [
      ["Drums", "Production: the drum programming idea is..."],
      ["Bass", "Production: the bass or low-end idea is..."],
      ["Arrange", "Production: the arrangement move I notice is..."],
      ["Reaktor", "Production: a Reaktor idea I want to try is..."],
    ],
  },
  djing: {
    field: "djNotes",
    label: "DJ notes: energy, mixability, set position.",
    placeholder: "Warm-up or peak-time, transition ideas, compatible genres, crowd energy...",
    prompts: [
      ["Energy", "DJing: this feels like a..."],
      ["Mix", "DJing: I would mix this with..."],
      ["Moment", "DJing: this belongs in the set when..."],
      ["Crowd", "DJing: the crowd reaction would be..."],
    ],
  },
};

const exploreGroups = [
  { name: "House", blurb: "Groove, swing, vocals, chords", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { name: "Techno", blurb: "Machine rhythm, pressure, hypnosis", indices: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { name: "Electro & Breaks", blurb: "Broken drums, 808s, syncopation", indices: [19, 20, 21, 22, 23, 24] },
  { name: "UK Club & Bass", blurb: "Shuffle, sub, soundsystem weight", indices: [25, 26, 27, 28, 29, 30, 31, 32] },
  { name: "Drum & Bass", blurb: "Fast breaks, bass pressure, edits", indices: [33, 34, 35, 36, 37] },
  { name: "Trance & Rave", blurb: "Lift, speed, euphoria, intensity", indices: [38, 39, 40, 41, 42, 43, 44] },
  { name: "Ambient & Experimental", blurb: "Texture, space, abstraction", indices: [45, 46, 47, 48, 49] },
];

const soundNote = "Representative genre-map playlist from The Sounds of Spotify.";
const officialNote = "Spotify editorial playlist chosen as the broadest reliable discovery lane.";
const fallbackNote = "Focused Spotify playlist chosen after checking the visible tracklist against this atlas label.";

const sound = (id, title) => ({ id, title, note: soundNote });
const official = (id, title) => ({ id, title, note: officialNote });
const fallback = (id, title) => ({ id, title, note: fallbackNote });

const curatedPlaylists = {
  "Chicago house": sound("6Wel9lJLvOpiZHBJNF19jn", "The Sound of Chicago House"),
  "Deep house": official("37i9dQZF1DWUbycBFSWTh7", "Deep House Grooves"),
  "Acid house": fallback("0VOlh838CetdFueN0jfnMj", "The Hacienda Acid House Classics"),
  "Garage house": sound("1QOMMQeQ9X79U3JtRZXy57", "The Sound of Garage House"),
  "French house": sound("5oZMnQNApteFlWDTo0xrtb", "The Sound of Filter House"),
  "Microhouse": sound("6FbDQuTcGT0IoZCtsbCISv", "The Sound of Microhouse"),
  "Minimal house": sound("3RWFXMd9ne5jj30u8ZTbEx", "The Sound of Minimal Tech House"),
  "Tech house": sound("7HxEKL4NF7ZKakfTZiekTr", "The Sound of Tech House"),
  "Afro house": sound("6JBXZSjISi9ugN1Q0Ku9cN", "The Sound of Afro House"),
  "Amapiano": sound("7xgfzFRkpWzI55LljwwuhO", "The Sound of Amapiano"),
  "Detroit techno": sound("6eKMGlc0PX3mNLAJOFUDUB", "The Sound of Detroit Techno"),
  "Minimal techno": sound("68uxlFAvnITCyQs0U8qr6n", "The Sound of Minimal Techno"),
  "Dub techno": sound("13Kst5O4iuiTXwJcbBTJ26", "The Sound of Dub Techno"),
  "Hypnotic techno": sound("0AMKoVVpxXFatz3BJwtdfz", "The Sound of Hypnotic Techno"),
  "Hardgroove techno": fallback("1QEYHy5k9dtfLgQgC4HrqN", "Hard Groove Techno"),
  "Industrial techno": sound("4dKxJnBaUEkEarU8qT0AMN", "The Sound of Industrial Techno"),
  "Hard techno": official("37i9dQZF1DWXCzcvFxzeno", "Hard Techno"),
  "Acid techno": sound("1f0ODk7IQYTRx3PxZlCeAy", "The Sound of Acid Techno"),
  "Ambient techno": sound("4K8cqoXccxo7fPmBEqVKQm", "The Sound of Ambient Techno"),
  "Electro": sound("0lcI32pCLNqSkd5KwhxUpY", "The Sound of Nu Electro"),
  "Detroit electro": fallback("7odYafBzDknEHk3ObmllH7", "Detroit Electro"),
  "Miami bass": sound("6eYnoJVvfS5mnh53jWRcVC", "The Sound of Miami Bass"),
  "Breakbeat": sound("1yckyfEZtFkkq7UPXHbLwi", "The Sound of Breakbeat"),
  "Big beat": sound("370tEYE4lZui1vrufdq7xy", "The Sound of Big Beat"),
  "Nu skool breaks": sound("6BfYBqrSm30CXrqFwecv5d", "The Sound of Nu Skool Breaks"),
  "UK garage": sound("62PxpGVt45pYZ8O66VVZWP", "The Sound of UK Garage"),
  "2-step garage": sound("3YOSwaEFJsA3fbYH8lArkR", "The Sound of 2-Step"),
  "Speed garage": sound("74tAe4b6IqbWoEZPusHk5d", "The Sound of Speed Garage"),
  "Bassline": sound("6FOwXg5jZLFmTSokaSrPRb", "The Sound of Bassline"),
  "Grime": sound("6tpwcBIh10DbSUksx3mRB5", "The Sound of Grime"),
  "Dubstep": fallback("5Y3hC1SQTkWCEylRAyBiPA", "Old School UK Dubstep"),
  "Post-dubstep": sound("62T9WUAB2E7Xw6PmHRSlaQ", "The Sound of Future Garage"),
  "UK bass": sound("0I8grtFFc4NxQ28GwWDCsW", "The Sound of UK Bass"),
  "Jungle": sound("35Ezi6bCni1zwVOW2rOWDj", "The Sound of Jungle"),
  "Liquid drum & bass": sound("5mu96o6F1pWzA5C9R8LAOm", "The Sound of Liquid Funk"),
  "Neurofunk": sound("4Pbi9IXKK2lD9VnHO2wGxO", "The Sound of Neurofunk"),
  "Techstep": fallback("7igauQlZYsKLdopqJJ6TbF", "Classic Techstep DnB"),
  "Footwork / juke": sound("2TGq3rEqYHLaHh8cFyg8vm", "The Sound of Footwork"),
  "Trance": sound("5vBxJ3Y2DbAna3xBJpGz0z", "The Sound of Trance"),
  "Progressive trance": sound("3LfgRDV6HceI9exDCtTJo3", "The Sound of Progressive Trance"),
  "Goa trance": sound("7iuklwaJAAJFkN7FEGPDvo", "The Sound of Goa Trance"),
  "Psytrance": sound("5bTmOsC15wxJWZozRrKqZG", "The Sound of Goa Psytrance"),
  "Hardcore": sound("1PUbKeyQcEE5MgfdaJRsgw", "The Sound of Hardcore Techno"),
  "Gabber": sound("6X1FPMpA9bOtPJvIUvb1vh", "The Sound of Gabber"),
  "Breakcore": sound("3OBvO6hmsS5BsYbciDddW7", "The Sound of Breakcore"),
  "Ambient": sound("6CIyPj34GTpAkNwoWToLNT", "The Sound of Ambient"),
  "Dark ambient": sound("1mhHpC0idew8lgWQkEJnOL", "The Sound of Dark Ambient"),
  "IDM": official("37i9dQZF1DXbjZQOVqxNHv", "IDM Essentials"),
  "Downtempo / trip-hop": sound("2wrc23l7JdQVcpPIcDGaed", "The Sound of Trip Hop"),
  "Deconstructed club": sound("3uwJeZkSKE219OiTdOV0b0", "The Sound of Deconstructed Club"),
};

const genres = window.genres.map((genre) => {
  const playlist = curatedPlaylists[genre.name];
  const playlistUrl = playlist
    ? `https://open.spotify.com/playlist/${playlist.id}`
    : spotifySearch(`${genre.name} ${genre.family} playlist`);
  return {
    ...genre,
    playlistTitle: playlist ? playlist.title : `Find a ${genre.name} discovery playlist`,
    playlistCuratorNote: playlist
      ? playlist.note
      : "Opens Spotify playlist search so you can pick the strongest current discovery playlist.",
    spotifyPlaylistUrl: playlistUrl,
    spotifyEmbedUrl: spotifyEmbed(playlistUrl),
  };
});

const els = {
  settingsToggle: document.querySelector("#settings-toggle"),
  settingsClose: document.querySelector("#settings-close"),
  syncDrawer: document.querySelector("#sync-drawer"),
  accountStatus: document.querySelector("#account-status"),
  loginForm: document.querySelector("#login-form"),
  username: document.querySelector("#username"),
  logout: document.querySelector("#logout"),
  title: document.querySelector("#genre-title"),
  family: document.querySelector("#genre-family"),
  dayCount: document.querySelector("#day-count"),
  bpm: document.querySelector("#bpm"),
  drums: document.querySelector("#drums"),
  energy: document.querySelector("#energy"),
  explanation: document.querySelector("#explanation"),
  playlistLink: document.querySelector("#playlist-link"),
  sourceNote: document.querySelector("#source-note"),
  spotifyEmbed: document.querySelector("#spotify-embed"),
  tracks: document.querySelector("#tracks"),
  notes: document.querySelector("#notes"),
  noteLabel: document.querySelector("#note-label"),
  noteLensButtons: document.querySelectorAll(".note-lens-button"),
  listened: document.querySelector("#listened"),
  rating: document.querySelector("#rating"),
  saveStatus: document.querySelector("#save-status"),
  completion: document.querySelector("#completion-message"),
  prompts: document.querySelectorAll(".prompt-chip"),
  path: document.querySelector("#path-list"),
  familyGrid: document.querySelector("#family-grid"),
  returnCurrent: document.querySelector("#return-current"),
  tasteSummary: document.querySelector("#taste-summary"),
};

let state = defaultState();
let uiState = loadUIState(state);
let revision = null;
let currentUser = null;
let viewingIndex = dailySuggestionIndex(state);
let onlineSaveTimer = 0;
let onlineSaveVersion = 0;
let isRendering = false;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function defaultState() {
  return {
    startedOn: todayKey(),
    currentIndex: 0,
    entries: {},
    openExploreGroups: ["House"],
  };
}

function dateFromKey(value) {
  const [year, month, day] = String(value || todayKey()).split("-").map(Number);
  return new Date(year || 2026, (month || 1) - 1, day || 1);
}

function dailySuggestionIndex(sourceState = state) {
  const started = dateFromKey(sourceState.startedOn || todayKey());
  const today = dateFromKey(todayKey());
  const days = Math.max(0, Math.floor((today - started) / 86400000));
  return days % genres.length;
}

function parseJSON(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadUIState(sourceState = {}) {
  const fallbackOpenGroups = Array.isArray(sourceState.openExploreGroups) ? sourceState.openExploreGroups : ["House"];
  const ui = {
    openExploreGroups: fallbackOpenGroups,
    noteLens: "general",
    ...(parseJSON(localStorage.getItem(UI_KEY)) || {}),
  };
  if (!Array.isArray(ui.openExploreGroups)) {
    ui.openExploreGroups = fallbackOpenGroups;
  }
  ui.openExploreGroups = ui.openExploreGroups.filter((group) => typeof group === "string" && group.trim());
  if (!noteLenses[ui.noteLens]) {
    ui.noteLens = "general";
  }
  return ui;
}

function saveUIState() {
  localStorage.setItem(UI_KEY, JSON.stringify(uiState));
}

function activeNoteLens() {
  return noteLenses[uiState.noteLens] ? uiState.noteLens : "general";
}

function activeNoteConfig() {
  return noteLenses[activeNoteLens()];
}

function hasAnyNote(entry) {
  return Object.values(noteLenses).some((lens) => String(entry[lens.field] || "").trim().length > 0);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.error || `HTTP ${response.status}`);
  return json;
}

async function init() {
  try {
    const me = await api("/api/me");
    if (me.username) {
      await loadOnlineUser(me.username);
    } else {
      setLoggedOut();
    }
  } catch {
    setLoggedOut("Offline");
  }
  if (!currentUser && !localStorage.getItem(FIRST_RUN_KEY)) {
    openSyncDrawer(true);
  }
  render();
}

function openSyncDrawer(firstRun = false) {
  els.syncDrawer.hidden = false;
  els.syncDrawer.classList.toggle("is-first-run", firstRun);
  els.settingsClose.textContent = "Close";
  if (!els.loginForm.hidden) {
    window.setTimeout(() => els.username.focus(), 0);
  }
}

function closeSyncDrawer() {
  localStorage.setItem(FIRST_RUN_KEY, "1");
  els.syncDrawer.hidden = true;
  els.syncDrawer.classList.remove("is-first-run");
}

function setLoggedOut(message = "Not synced") {
  onlineSaveVersion += 1;
  clearTimeout(onlineSaveTimer);
  currentUser = null;
  revision = null;
  els.accountStatus.textContent = message;
  els.loginForm.hidden = false;
  els.logout.hidden = true;
  setSaveStatus("Sign in to save");
}

async function loadOnlineUser(username) {
  currentUser = username;
  els.accountStatus.textContent = `Synced as ${username}`;
  els.loginForm.hidden = true;
  els.logout.hidden = false;
  const payload = await api("/api/state");
  revision = payload.revision;
  state = { ...defaultState(), ...payload.state };
  uiState = loadUIState(state);
  viewingIndex = Math.min(viewingIndex, genres.length - 1);
  setSaveStatus("Saved online");
}

function setSaveStatus(text) {
  els.saveStatus.textContent = text;
}

function saveState(instant = false) {
  if (!currentUser) {
    setSaveStatus("Sign in to save");
    return;
  }
  onlineSaveVersion += 1;
  const requestVersion = onlineSaveVersion;
  setSaveStatus("Saving online...");
  clearTimeout(onlineSaveTimer);
  const run = async () => {
    const revisionSnapshot = revision;
    const stateSnapshot = JSON.parse(JSON.stringify(state));
    try {
      const payload = await api("/api/state", {
        method: "PUT",
        body: JSON.stringify({ revision: revisionSnapshot, state: stateSnapshot }),
      });
      revision = payload.revision;
      if (requestVersion !== onlineSaveVersion) {
        saveState(true);
        return;
      }
      state = { ...defaultState(), ...payload.state };
      setSaveStatus("Saved online");
      render(false);
    } catch (error) {
      els.saveStatus.textContent = `Sync error: ${error.message}`;
    }
  };
  if (instant) run();
  else onlineSaveTimer = window.setTimeout(run, 450);
}

function getEntry(index) {
  if (!state.entries[index]) {
    state.entries[index] = {
      notes: "",
      productionNotes: "",
      djNotes: "",
      listened: false,
      completedOn: "",
      playlistOpened: false,
      rating: 0,
    };
  }
  return state.entries[index];
}

function entryComplete(index) {
  const entry = getEntry(index);
  return entry.listened && hasAnyNote(entry);
}

function render() {
  isRendering = true;
  try {
    const genre = genres[viewingIndex];
    const entry = getEntry(viewingIndex);
    const isDaily = viewingIndex === dailySuggestionIndex();

    els.title.textContent = genre.name;
    els.family.textContent = `${genre.family} family`;
    els.dayCount.textContent = isDaily ? `${todayKey()} · suggested` : "Free browsing";
    els.bpm.textContent = genre.bpm;
    els.drums.textContent = genre.drums;
    els.energy.textContent = genre.energy;
    els.explanation.textContent = genre.explanation;
    els.playlistLink.href = genre.spotifyPlaylistUrl;
    els.playlistLink.textContent = genre.spotifyEmbedUrl ? "Open playlist in Spotify" : "Search Spotify playlists";
    els.sourceNote.textContent = `${genre.playlistTitle}. ${genre.playlistCuratorNote}`;
    els.spotifyEmbed.innerHTML = genre.spotifyEmbedUrl
      ? `<iframe title="${escapeHTML(genre.name)} Spotify playlist" src="${genre.spotifyEmbedUrl}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
      : `<p class="spotify-fallback">No stable playlist embed curated yet. Use the Spotify button to choose the strongest current ${escapeHTML(genre.name)} discovery playlist.</p>`;
    const noteConfig = activeNoteConfig();
    els.noteLabel.textContent = noteConfig.label;
    els.notes.placeholder = noteConfig.placeholder;
    els.notes.value = entry[noteConfig.field] || "";
    els.listened.checked = entry.listened;

    els.tracks.innerHTML = (genre.tracks || [])
      .map((track) => `<li><a href="https://open.spotify.com/search/${encodeURIComponent(track)}" target="_blank" rel="noreferrer">${escapeHTML(track)}</a></li>`)
      .join("");

    renderRating(entry.rating || 0);
    renderNoteLens();
    renderPromptChips();
    renderCompletion(isDaily);
    renderPath();
    renderExplore();
    renderTasteSummary();
  } finally {
    isRendering = false;
  }
}

function renderCompletion(isDaily) {
  const complete = entryComplete(viewingIndex);
  if (!complete) {
    els.completion.textContent = isDaily
      ? "This is today's suggestion, but you can jump anywhere. Mark it listened and add a note if it gives you something."
      : "Open exploration. Notes, ratings, and listening status sync for any genre you choose.";
  } else if (isDaily) {
    els.completion.textContent = "Daily suggestion saved. Keep wandering, or come back tomorrow for a new prompt.";
  } else {
    els.completion.textContent = "Saved. You can revisit and add more notes anytime.";
  }
}

function renderRating(rating) {
  els.rating.innerHTML = [1, 2, 3, 4, 5]
    .map((value) => `
      <button class="rating-button ${value <= rating ? "is-lit" : ""}" type="button" role="radio" aria-checked="${value === rating}" aria-label="${value} out of 5" data-rating="${value}">★</button>
    `)
    .join("");
}

function renderNoteLens() {
  const active = activeNoteLens();
  els.noteLensButtons.forEach((button) => {
    const selected = button.dataset.noteLens === active;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function renderPromptChips() {
  const prompts = activeNoteConfig().prompts;
  els.prompts.forEach((button, index) => {
    const [label, prompt] = prompts[index] || ["Idea", "I notice..."];
    button.textContent = label;
    button.dataset.prompt = prompt;
  });
}

function renderPath() {
  const dailyIndex = dailySuggestionIndex();
  els.path.innerHTML = genres
    .map((genre, index) => {
      const complete = entryComplete(index);
      const current = index === viewingIndex;
      const rating = getEntry(index).rating || 0;
      const stateLabel = complete ? "Done" : index === dailyIndex ? "Daily" : "Open";
      return `
        <li class="path-item ${complete ? "is-complete" : ""}">
          <button class="path-button ${current ? "is-current" : ""} ${index === dailyIndex ? "is-suggested" : ""}" type="button" data-index="${index}">
            <span class="path-number">${String(index + 1).padStart(2, "0")}</span>
            <span><span class="path-name">${escapeHTML(genre.name)}</span><span class="path-family">${escapeHTML(genre.family)}</span></span>
            <span class="path-state">${stateLabel}${rating ? ` · ${"★".repeat(rating)}` : ""}</span>
          </button>
        </li>`;
    })
    .join("");
}

function renderExplore() {
  const dailyIndex = dailySuggestionIndex();
  const openGroups = new Set(Array.isArray(uiState.openExploreGroups) ? uiState.openExploreGroups : []);
  els.familyGrid.innerHTML = exploreGroups
    .map((group, groupIndex) => {
      const isOpen = openGroups.has(group.name);
      const panelId = `family-panel-${groupIndex}`;
      return `
      <section class="family-section ${isOpen ? "is-open" : ""}" data-family="${escapeHTML(group.name)}">
        <button class="family-toggle" type="button" aria-expanded="${isOpen}" aria-controls="${panelId}">
          <span><strong>${escapeHTML(group.name)}</strong><span>${escapeHTML(group.blurb)} · ${group.indices.length} styles</span></span>
        </button>
        <div id="${panelId}" class="subgenre-list" ${isOpen ? "" : "hidden"}>
          ${group.indices.map((index) => {
            const genre = genres[index];
            const rating = getEntry(index).rating || 0;
            const complete = entryComplete(index);
            const status = complete ? "Done" : index === dailyIndex ? "Daily" : "Open";
            return `
              <button class="subgenre-row ${index === viewingIndex ? "is-current" : ""}" type="button" data-index="${index}">
                <span><strong>${escapeHTML(genre.name)}</strong><span>${escapeHTML(genre.bpm)} · ${escapeHTML(genre.drums)} · <em>${status}</em>${rating ? ` · ${"★".repeat(rating)}` : ""}</span></span>
                <span>${genre.spotifyEmbedUrl ? "Playlist" : "Search"}</span>
              </button>`;
          }).join("")}
        </div>
      </section>`;
    })
    .join("");
}

function renderTasteSummary() {
  const rated = genres
    .map((genre, index) => ({ genre, index, rating: getEntry(index).rating || 0 }))
    .filter((item) => item.rating > 0)
    .sort((a, b) => b.rating - a.rating || a.index - b.index);
  els.tasteSummary.innerHTML = rated.length
    ? rated.slice(0, 6).map((item) => `<button class="taste-item" type="button" data-index="${item.index}"><strong>${escapeHTML(item.genre.name)}</strong><span>${"★".repeat(item.rating)}</span></button>`).join("")
    : '<p class="taste-empty">Rate genres as you go; your strongest pulls will collect here.</p>';
}

function updateCurrentEntry(patch) {
  Object.assign(getEntry(viewingIndex), patch);
  if (entryComplete(viewingIndex) && !getEntry(viewingIndex).completedOn) {
    getEntry(viewingIndex).completedOn = todayKey();
  }
  saveState();
  render(false);
}

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = els.username.value.trim().toLowerCase();
  try {
    await api("/api/login", { method: "POST", body: JSON.stringify({ username }) });
    localStorage.setItem(FIRST_RUN_KEY, "1");
    await loadOnlineUser(username);
    render();
    closeSyncDrawer();
  } catch (error) {
    els.accountStatus.textContent = error.message;
  }
});

els.settingsToggle.addEventListener("click", () => openSyncDrawer(false));
els.settingsClose.addEventListener("click", closeSyncDrawer);

els.logout.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST", body: "{}" }).catch(() => {});
  setLoggedOut();
  state = defaultState();
  uiState = loadUIState(state);
  viewingIndex = dailySuggestionIndex(state);
  render();
});

els.notes.addEventListener("input", () => updateCurrentEntry({ [activeNoteConfig().field]: els.notes.value }));
els.noteLensButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!noteLenses[button.dataset.noteLens]) return;
    uiState.noteLens = button.dataset.noteLens;
    saveUIState();
    render(false);
  });
});
els.listened.addEventListener("change", () => updateCurrentEntry({ listened: els.listened.checked }));
els.playlistLink.addEventListener("click", () => updateCurrentEntry({ playlistOpened: true }));
els.rating.addEventListener("click", (event) => {
  const button = event.target.closest(".rating-button");
  if (!button) return;
  const rating = Number(button.dataset.rating);
  const currentRating = getEntry(viewingIndex).rating || 0;
  updateCurrentEntry({ rating: currentRating === rating ? 0 : rating });
});

els.path.addEventListener("click", (event) => {
  const button = event.target.closest(".path-button");
  if (!button) return;
  viewingIndex = Number(button.dataset.index);
  render();
});

els.familyGrid.addEventListener("click", (event) => {
  const toggle = event.target.closest(".family-toggle");
  if (toggle) {
    const section = toggle.closest(".family-section");
    const family = section.dataset.family;
    const openGroups = new Set(Array.isArray(uiState.openExploreGroups) ? uiState.openExploreGroups : []);
    if (openGroups.has(family)) openGroups.delete(family);
    else openGroups.add(family);
    uiState.openExploreGroups = [...openGroups];
    saveUIState();
    renderExplore();
    return;
  }

  const button = event.target.closest(".subgenre-row");
  if (!button) return;
  viewingIndex = Number(button.dataset.index);
  render();
  document.querySelector(".today-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.returnCurrent.addEventListener("click", () => {
  viewingIndex = dailySuggestionIndex();
  render();
  document.querySelector(".today-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

els.tasteSummary.addEventListener("click", (event) => {
  const button = event.target.closest(".taste-item");
  if (!button) return;
  viewingIndex = Number(button.dataset.index);
  render();
});

els.prompts.forEach((button) => {
  button.addEventListener("click", () => {
    const needsBreak = els.notes.value.trim().length > 0 && !els.notes.value.endsWith("\n");
    els.notes.value = `${els.notes.value}${needsBreak ? "\n\n" : ""}${button.dataset.prompt} `;
    els.notes.focus();
    updateCurrentEntry({ [activeNoteConfig().field]: els.notes.value });
  });
});

init();

// Teacher Lhorie's Game Hub: collects plays and scores in this Google Sheet.
// STEP 1: change the secret word below to your own private word. It is your teacher key.
const KEY = "CHANGE-THIS-SECRET";
// true = students can see a leaderboard of names and points. false = hide it from students.
const PUBLIC_BOARD = false;

function tab_(name, head) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); }
  if (sh.getLastRow() === 0) { sh.appendRow(head); }
  return sh;
}
const SCORES_ = ["Time", "Name", "Points", "Out of", "Game", "Subject", "Grade"];
const PLAYS_ = ["Time", "Name", "Game", "Subject", "Grade"];
function clean_(v, n) { return String(v || "").replace(/^[=+\-@\s]+/, "").slice(0, n); }

// Receives a play or a score from the hub or from one of your games.
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const name = clean_(d.n, 20);
    if (!name) { return ContentService.createTextOutput("ok"); }
    if (d.k === "play") {
      tab_("Plays", PLAYS_).appendRow([new Date(), name, clean_(d.g, 60), clean_(d.s, 20), clean_(d.gr, 20)]);
    } else {
      tab_("Scores", SCORES_).appendRow([new Date(), name, Number(d.p) || 0, Number(d.m) || 1,
        clean_(d.g, 60), clean_(d.s, 20), clean_(d.gr, 20)]);
    }
  } catch (err) {}
  return ContentService.createTextOutput("ok");
}

function rows_(name, head, keys) {
  return tab_(name, head).getDataRange().getValues().slice(1).map(function (r) {
    const o = {}; keys.forEach(function (k, i) { o[k] = r[i]; }); return o;
  });
}

// With your teacher key: full log of plays and scores. Without it: only the student leaderboard.
function doGet(e) {
  const p = (e && e.parameter) || {};
  let out = [];
  if (KEY !== "CHANGE-THIS-SECRET" && p.key === KEY) {
    out = { scores: rows_("Scores", SCORES_, ["t", "n", "p", "m", "g", "s", "gr"]),
            plays: rows_("Plays", PLAYS_, ["t", "n", "g", "s", "gr"]) };
  } else if (p.view === "board" && PUBLIC_BOARD) {
    out = rows_("Scores", SCORES_, ["t", "n", "p", "m", "g", "s", "gr"]).map(function (r) {
      return { n: r.n, p: r.p, m: r.m, g: "" };
    });
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

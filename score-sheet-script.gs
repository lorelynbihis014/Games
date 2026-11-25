// Teacher Lhorie's Game Hub: collects student scores in this Google Sheet.
function scoresSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("Scores");
  if (!sh) { sh = ss.insertSheet("Scores"); }
  if (sh.getLastRow() === 0) { sh.appendRow(["Time", "Name", "Points", "Out of", "Game", "Subject", "Grade"]); }
  return sh;
}

// Receives a score from the hub or from one of your games.
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const name = String(d.n || "").replace(/^[=+\-@\s]+/, "").slice(0, 20);
    if (name) {
      scoresSheet_().appendRow([new Date(), name, Number(d.p) || 0, Number(d.m) || 1,
        String(d.g || "").slice(0, 60), String(d.s || "").slice(0, 20), String(d.gr || "").slice(0, 20)]);
    }
  } catch (err) {}
  return ContentService.createTextOutput("ok");
}

// Sends every saved score to the Leaderboard and Dashboard.
function doGet() {
  const rows = scoresSheet_().getDataRange().getValues().slice(1).map(function (r) {
    return { t: r[0], n: r[1], p: r[2], m: r[3], g: r[4], s: r[5], gr: r[6] };
  });
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}

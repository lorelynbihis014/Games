# Teacher Lhorie’s Game Hub

## Put it online (three files, no folders to drag)
1. On github.com create a new public repository, for example `game-hub`.
2. Click **Add file, then Upload files**. Drag in `index.html`, `games.json` and `README.md` (or click **choose your files**), then **Commit changes**.
3. Open **Settings, then Pages**. Choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/game-hub/`. Share that link with your students.

## Add your games
Open your live site, go to **Dashboard**, paste your GitHub access token, press **Create all subject and grade folders** once, then pick a subject and grade, choose your `.html` game and press **Upload game**.

## See every student’s scores
1. Go to sheets.new, open **Extensions, then Apps Script**, and paste in the code from `score-sheet-script.gs` (not uploaded to GitHub). Near the top, change `CHANGE-THIS-SECRET` to your own private word. That word is your teacher key.
2. Click **Deploy, then New deployment, then Web app**. Set **Execute as** to Me and **Who has access** to Anyone. Deploy and allow permissions.
3. Copy the Web app link. On your live site open **Dashboard**, paste it under **Connect your score sheet** and press **Save sheet link**.
4. The Leaderboard now shows all students together, and the Dashboard lists each student’s average. Open your Google Sheet any time to filter by student, game or date.

Use first names or nicknames only. To send scores from your own games, open **Dashboard** and see **Send scores from my own games**.

## See who played your games (only you)
On your live site open **Dashboard**, find **Who played (private)**, type your teacher key and press **Unlock**. It is saved on your device only. You see each game with its plays and student names, the latest plays with times, and class scores. Your Google Sheet has the same data in its **Plays** and **Scores** tabs, and only you can open it.

If you change the script later, choose **Deploy, then Manage deployments**, click the pencil, set **Version** to New version and **Deploy**. The link stays the same.

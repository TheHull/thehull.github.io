# The Hull

Sito pubblico di The Hull: https://thehull.github.io/.

## Avvio locale

Da PowerShell, anche nel terminale di VS Code:

```powershell
wsl.exe --cd /home/leonardo/workspace/2026-nexus bash ./preview.sh
```

Lo script carica Node tramite nvm e installa le dipendenze se mancano. Visita **http://localhost:4321** (o la porta indicata dal server). Le modifiche si aggiornano automaticamente; **Ctrl+C** ferma il server.

Su Ubuntu, con nvm installato, dalla cartella del progetto:

```sh
source ~/.nvm/nvm.sh
nvm install
nvm use
npm ci
npm run check
npm run build
```

Il sito compilato è in `dist/`. Per visualizzarlo: `npm run preview`; per lavorarci con aggiornamento automatico: `npm run dev`.

## Contenuti

- `src/config/config.json`: nome e modulo di interesse.
- `src/content/homepage/home.md`: testo completo della home.
- `src/content/events/YYYY-MM-DD.md`: un file per evento; il nome stabilisce la data.
- `src/content/news/YYYY-MM-DD.md`: una notizia per file.
- `src/content/pages/*.md`: titoli, testi ed etichette delle pagine Events, News, Contacts e 404.
- `src/config/theme.json`: colori (riavviare l'anteprima dopo le modifiche).

Gli eventi richiedono `title` e `type` (testo libero), con `image` facoltativo:

```markdown
---
title: "Titolo"
type: "Workshop, in person"
---

Luogo, orario, relatore, link e altri dettagli.
```

Le anteprime di eventi e news usano l’inizio del contenuto Markdown: fino a 240 caratteri, mostrati su un massimo di tre righe, mantenendo i collegamenti cliccabili. Non serve un campo `description`. La home mostra quattro eventi futuri e tre notizie, con link ai dettagli. Tutti gli eventi sono in `/events/`, tutte le notizie in `/news/`. Un evento passa tra i precedenti il giorno successivo alla sua data, nel fuso Europe/Rome. Gli elenchi si aggiornano durante la build.

Ogni notizia ha una pagina dedicata. Bastano titolo e testo; immagine facoltativa:

```markdown
---
title: "Titolo della notizia"
image:
  src: "/images/news/foto.jpg"
  alt: "Descrizione della foto"
---

Testo della notizia.
```

Il blocco `image` è facoltativo. Metti le immagini in `public/images/` (ad esempio nelle sottocartelle `news/` o `events/`) e indica il percorso senza `public`; puoi anche usare un URL HTTPS. Se aggiungi un'immagine, specifica `alt` (vuoto se decorativa). Lo stesso blocco `image` funziona anche negli eventi, per foto di persone o eventi. Le immagini appaiono come miniature negli elenchi e nella home, e più grandi nelle pagine di dettaglio, senza ritagli.

## Colori

Modifica solo `src/config/theme.json`:

```json
{
  "background": "#e8f0ed",
  "foreground": "#203a36",
  "accent": "#1b646d"
}
```

Bordi e tinte secondarie sono derivati automaticamente. Riavvia `npm run dev` dopo le modifiche, oppure esegui una nuova build.

## Pubblicazione e licenze

Il repository è `TheHull/thehull.github.io`. Ogni push su `main` esegue i controlli, compila Astro e pubblica automaticamente `dist/` su GitHub Pages tramite `.github/workflows/deploy.yml`. La configurazione usa `https://thehull.github.io` come URL e `/` come percorso base; `SITE_URL` e `BASE_PATH` consentono di modificarli.

Le due pagine placeholder escluse in `.gitignore` restano locali e non vengono pubblicate.

Base: [Astroplate](https://github.com/zeon-studio/astroplate/tree/501646d0fede2471105ef0cf3c2a154cbb814c4a), ridotto a layout statici e generatore del tema; licenza MIT in `LICENSE`. Caratteri di sistema; nessun contenuto copiato da Isogeny Club.

Foto di prova `public/images/news/library.jpg`: [Susan Q Yin su Unsplash](https://unsplash.com/photos/books-on-brown-wooden-shelf-2JIvboGLeho), [Unsplash License](https://unsplash.com/license).

## Commit

Prefisso seguito dalla descrizione: `ADD: ...`, `FIX: ...`, `DEL: ...`.

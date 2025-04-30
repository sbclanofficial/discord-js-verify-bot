# ✅ Discord.js Verify Bot

Ein einfacher Discord-Bot zur Verifizierung von Nutzern mit `discord.js`.

---

## 🔧 Einrichtung

### 1. Voraussetzungen

- [Node.js](https://nodejs.org/en/download) installieren (empfohlen: aktuelle LTS-Version)
- Einen eigenen Discord-Bot erstellen und den Bot-Token bereithalten
- Den Bot auf deinen Server einladen mit den nötigen Berechtigungen (z. B. Rollen verwalten)

---

### 2. Abhängigkeiten installieren

Navigiere in das Projektverzeichnis und installiere die benötigten Pakete:

```bash
npm install discord.js dotenv
```

### 3. Umgebungsvariablen einrichten
Bearbeite die `.env`-Datei im Projektverzeichnis und trage dort deine Konfiguration ein:

```.env
DISCORD_TOKEN = dein_token_hier_einfügen
CHANNEL_ID = deine_verify_channel_id_hier_einfügen
ROLE_ID_ADD = die_rollenid_die_hinzugefügt_werden_soll
ROLE_ID_REMOVE = die_rolleid_die_entfernt_werden_soll
```

### 4. Starte den Bot
Um den Bot zu starten Schreibe in den Terminal:
```bash
node index.js
```

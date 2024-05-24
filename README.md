# wp4-2024-starter
Template voor WP4 opdracht 2024 "GLITCH". Vul dit document aan zoals beschreven in eisen rondom opleveren (zie GLITCH-assignment.pdf)

Download en installeer Node.js vanaf https://nodejs.org/en/download

Staan waarschijnlijk al goed in package.json
```bash
npm install concurrently --save-dev
   ```

```bash
npm install cross-env --save-dev
   ```


# navigeer naar
```bash
cd react
   ```
# voor windows 

*Dit commando omvat het leegmaken van poort 8087, het installeren van de requirements van pip en npm en de webapplicatie laten starten op poort 8087 en 8000.* 
```bash
npm run totaal
   ```

# voor Apple of mobiel

```bash
npm install
   ```


```bash
npm start
   ```

Download voor android: https://developer.android.com/studio (waarschijnlijk niet nodig maar ik zet hem er voor de zekerheid bij)


# ADB Port Forwarding
Installeer ADB:
Zorg ervoor dat ADB is geïnstalleerd en beschikbaar is in je systeem PATH.

Activeer ontwikkelaarsopties en USB-debugging op je Android-apparaat:

- Ga naar Instellingen > Over de telefoon.
- Tik 7 keer op Build-nummer om de ontwikkelaarsopties te activeren.
- Ga naar Instellingen > Systeem > Geavanceerd > Ontwikkelaarsopties.
- Schakel USB-debugging in.
- Verbind je telefoon via USB met je computer:

Gebruik een USB-kabel om je Android-telefoon aan je computer te koppelen.
ADB Port Forwarding:

Open een terminal of Command Prompt en voer het volgende ADB-commando uit om poort 8000 van je computer door te sturen naar poort 8000 van je telefoon:

```bash 
adb reverse tcp:8000 tcp:8000
```
Dit zorgt ervoor dat alle verzoeken die naar localhost:8000 op je telefoon gaan, worden doorgestuurd naar localhost:8000 op je computer.

### Start je Django server:
```bash
python manage.py runserver
```
### Start de React Native
```bash
npx react-native start
```


## Bronvermelding
https://scrimba.com/playlist/p7P5Hd
https://scrimba.com/scrim/cepwWUp?pl=p7P5Hd (Footer en header bestanden koppelen aan 1 javascript bestand)
https://www.youtube.com/watch?v=HmNfChkhPEg (afbeelding in javascript plaatsen)
https://github.com/open-cli-tools/concurrently (meerdere commando's tegelijk in de terminal)
# Resurrection

Het GLITCH-platform (Gamified Learning Interface Through Challenges and Heuristics) is een innovatief, thema-onafhankelijk leerplatform ontworpen om onderwijs op een dynamische en interactieve manier te benaderen. Het platform gebruikt een modulaire structuur om een breed scala aan vakken en cursussen te huisvesten, elk georganiseerd binnen specifieke domeinen om de navigatie en specialisatie voor gebruikers te vergemakkelijken.


## Clone de repository:
```bash
git clone https://github.com/Rac-Software-Development/wp4-2024-react-1d4-resurrection.git
```

### Vereisten
- Python 3.11 of nieuwer
- Django 5.0.4 of nieuwer
- De rest staat in de requirements.txt

# Installatie (docker-compose)
```bash
docker-compose up
```

# Installatie (handmatig)

## Backend (Django)
### Installeer de benodigde packages
```bash
pip install -r requirements.txt
```
### Start de server
```bash
python manage.py runserver
```

## Frontend (React Native)
### Navigeer naar de frontend map (open een nieuwe terminal)
```bash
cd react
```
### Installeer de benodigde packages
```bash
npm install
```
### Start de expo server
```bash
npx expo start --port 8087
   ```
- Voor web druk op 'w' in de terminal
- Voor Android druk op 'a' in de terminal

Android Studio: https://developer.android.com/studio (waarschijnlijk niet nodig maar ik zet hem er voor de zekerheid bij)

# Lokaal runnen van de app op je Android-apparaat en voor Android Studio

## ADB Port Forwarding (Android Apparaat)
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
Dit zorgt ervoor dat alle verzoeken die naar localhost:8000 op je telefoon gaan, worden doorgestuurd naar localhost:8000 op je computer. (Doe dit ook in de emulator)

## Accounts
- Admin: admin@hr.nl:admin
- Docent: sbergh@hr.nl:sietze
- Student: omer@hr.nl:omer

## Bronvermelding
- https://scrimba.com/playlist/p7P5Hd
- https://scrimba.com/scrim/cepwWUp?pl=p7P5Hd (Footer en header bestanden koppelen aan 1 javascript bestand)
- https://www.youtube.com/watch?v=HmNfChkhPEg (afbeelding in javascript plaatsen)
- https://github.com/open-cli-tools/concurrently (meerdere commando's tegelijk in de terminal)
- https://www.w3schools.com/react/react_components.asp
- https://docs.docker.com/compose/
- https://reactnative.dev/docs/style
- https://reactnative.dev/docs/scrollview
- https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
- https://medium.com/@devsumitg/how-to-connect-reactjs-django-framework-c5ba268cb8be

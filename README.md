# JourneyFy
![JourneyFy](./assets/app_color_icon.png)

Kelionių rezervavimo programėlė, skirta planuoti ir įgyvendinti jūsų keliones

## Turinio rodyklė
- [Įvadas](#įvadas)
- [Funkcijos](#funkcijos)
- [Diegimas](#diegimas)
- [Naudojimas](#naudojimas)
- [Technologijos](#technologijos)

## Įvadas
JourneyFy yra mobilioji programėlė, sukurta padėti naudotojams planuoti, rezervuoti ir įgyvendinti keliones. Nesvarbu, ar keliaujate laisvalaikiui, ar verslo tikslais, JourneyFy leidžia kurti keliones, prie kurių kiti naudotojai gali prisijungti, taip paversdama kelionių planavimą socialiu ir interaktyviu. Panašiai kaip BlaBlaCar.

## Funkcijos
- Kurti ir peržiūrėti keliones
- Prisijungti prie kitų naudotojų sukurtų kelionių  
- Peržiūrėti kelionės detales ir maršrutą  
- Bendrauti su kelionės dalyviais  
- Naudotojo autentifikacija ir profilio valdymas  
- Mašinos peržiūra ir valdymas


## Aplinkos kintamieji

Prieš paleisdami programėlę, sukurkite `.env` failą projekto šaknyje ir pridėkite šiuos kintamuosius:

```bash
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_DATABASE_URL=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
FIREBASE_MEASUREMENT_ID=""
MAPS_API_KEY="" (Google Maps API raktas)
```

## Naudojimas
Norėdami pradėti naudotis „JourneyFy“, atlikite šiuos veiksmus:

1. Klonuoti saugyklą:
git clone https://github.com/yourusername/journeyfy.git

2. Eikite į projekto katalogą:
cd JourneyFy

3. Įdiekite priklausomybes:
npm install

4. Paleiskite programėlę savo emuliatoriuje arba įrenginyje:
npx react-native run-android
# or
npm start


## Technologijos
- **React Native**: Dėl mobiliosios programėlės kūrimo.
- **Firebase**: Skirta vidinėms paslaugoms, įskaitant naudotojo autentifikaciją, realaus laiko duomenų bazę.


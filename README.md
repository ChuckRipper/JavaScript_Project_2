# Memo App

Memo App to aplikacja webowa oferująca grę pamięciową, w której gracze dopasowują pary kart na planszy. Gra oferuje różne poziomy trudności i pozwala graczom zapisywać swoje wyniki oraz przeglądać rankingi. Aplikacja obsługuje zarówno tryb jednoosobowy, jak i wieloosobowy, rejestrację użytkowników, uwierzytelnianie oraz system rankingowy.

## Spis treści

- [Funkcje](#funkcje)
- [Użyte technologie](#użyte-technologie)
- [Instalacja](#instalacja)
- [Konfiguracja](#konfiguracja)
- [Użycie](#użycie)
- [Endpointy API](#endpointy-api)
- [Schemat bazy danych](#schemat-bazy-danych)
- [Testy](#testy)
- [Współtworzenie](#współtworzenie)
- [Licencja](#licencja)

## Funkcje

- **Tryb jednoosobowy** z różnymi poziomami trudności (Łatwy, Średni, Trudny, Własny)
- **Tryb wieloosobowy** z możliwością tworzenia i dołączania do pokoi
- **Rejestracja i uwierzytelnianie użytkowników**
- **System zapisywania wyników i rankingów**
- **Responsywny design** dla różnych urządzeń
- **Bezpieczne haszowanie haseł** przy użyciu bcrypt
- **JSON Web Tokens (JWT)** dla bezpiecznego uwierzytelniania

## Użyte technologie

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - jQuery

- **Backend:**
  - Node.js
  - Express.js
  - Sequelize (ORM)
  - PostgreSQL (Baza danych)

- **Uwierzytelnianie i bezpieczeństwo:**
  - bcrypt
  - JSON Web Tokens (JWT)

- **Narzędzia deweloperskie:**
  - nodemon (do developmentu)
  - jest (do testowania)
  - supertest (do testowania API)

## Instalacja

Aby rozpocząć pracę z Memo App, wykonaj następujące kroki:

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/yourusername/memo-app.git
   cd memo-app
   ```
2. **Zainstaluj zależności:**
    ```bash
    npm install
    ```

## Konfiguracja

1. **Utwórz (jeśli nie istnieją) i skonfiguruj pliki środowiskowe:**

- **server/config/default.json:**

    ```json
        {
        "jwtSecret": "00a6622c3bdbb938953509a5918f769aa0d8b522a70c1ea425810b13ff6f04a4e4ed4cb4f00c429d648911b2b24985710bacb360b1f26cdc28c172536985cf8a",
        "db": {
            "username": "admin_db_dev",
            "password": "adminjs",
            "database": "memo_app_dev",
            "host": "localhost",
            "dialect": "postgres"
        },
        "adminUser": {
        "username": "admin_dev",
        "password": "adminjs",
        "email": "djczarek2@gmail.com"
        },
        "regularUser": {
        "username": "user_dev",
        "password": "userjs",
        "email": "djczarek2@gmail.com"
        }
    }
    ```

- **server/config/production.json**

    ```json
    {
        "jwtSecret": "39e5094bf706213f8ed51fb70ec767c249664aa7fc29ec6b8e1ea8e93db40f8352a4623035ca1b862833c3fb7f34c2016d277060a200eec721f9847ab1fbf105",
        "db": {
            "username": "admin_db_prod",
            "password": "adminjs",
            "database": "memo_app_prod",
            "host": "localhost",
            "dialect": "postgres"
        },
        "adminUser": {
        "username": "admin_prod",
        "password": "adminjs",
        "email": "djczarek2@gmail.com"
        },
        "regularUser": {
        "username": "user_prod",
        "password": "userjs",
        "email": "djczarek2@gmail.com"
        }
    }
    ```

2. **Zainicjalizuj bazę danych i utwórz użytkowników:**
    ```bash
    node server/utils/initUsers.js
    ```

## Użycie

1. **Uruchom serwer w trybie deweloperskim:**

    ```bash
    npm run dev
    ```

2. **Uruchom serwer w trybie produkcyjnym:**

    ```bash
    NODE_ENV=production npm start
    ```

3. **Uruchom testy:**

    ```bash
    npm test
    ```

## Endpointy API

Dostępne są następujące endpointy API:

- **Endpointy użytkownika:**
  - **POST** _/api/users/register_ - Rejestracja nowego użytkownika
  - **POST** _/api/users/login_ - Logowanie użytkownika
  - **GET** _/api/users/:id_ - Pobieranie szczegółów użytkownika
  - **PUT** _/api/users/:id_ - Aktualizacja danych użytkownika
  - **DELETE** _/api/users/:id_ - Usuwanie użytkownika
- **Endpointy gry:**
  - **POST** _/api/scores_ - Dodawanie nowego wyniku
  - **PUT** _/api/scores/:id_ - Aktualizacja wyniku
  - **GET** _/api/scores_ - Pobieranie wszystkich wyników
  - **DELETE** _/api/scores/:id_ - Usuwanie wyniku
- **Endpointy pokoju:**
  - **POST** _/api/rooms_ - Tworzenie nowego pokoju
  - **POST** _/api/rooms/join_ - Dołączanie do pokoju
  - **GET** _/api/rooms/:roomId_ - Pobieranie szczegółów pokoju

## Schemat bazy danych

 Aplikacja używa bazy danych PostgreSQL z następującym schematem:

- **Users (userModel)**:
  - _id (Klucz główny)_
  - _username (String, Unikalny)_
  - _password (String)_
  - _email (String, Unikalny)_
  - _role (Enum: 'user', 'admin')_
  - _created_at (Date)_
- **Scores (scoreModel)**:
  - _id (Klucz główny)_
  - _user_id (Klucz obcy)_
  - _score (Integer)_
  - _game_time (Integer)_
  - _created_at (Date)_
- **Rooms (roomModel)**:
  - _id (Klucz główny)_
  - _room_code (String, Unikalny)_
  - _creator_id (Klucz obcy)_
  - _created_at (Date)_
- **RoomPlayers (roomPlayerModel)**:
  - _room_id (Klucz obcy, Klucz główny)_
  - _player_id (Klucz obcy, Klucz główny)_

## Testy

Aplikacja zawiera testy jednostkowe i integracyjne przy użyciu jest i supertest.

- **Testy jednostkowe:**
  - _tests/unit/gameController.test.js_
  - _tests/unit/roomController.test.js_
  - _tests/unit/userController.test.js_
- **Testy integracyjne:**
  - _tests/integration/gameRoutes.test.js_
  - _tests/integration/roomRoutes.test.js_
  - _tests/integration/userRoutes.test.js_
Opis

Aplikacja CRUD do zarządzania klientami. Użytkownicy mogą się zarejestrować, 
zalogować i po uwierzytelnieniu wykonywać operacje CRUD na klientach. 
Dostęp do wszystkich funkcji CRUD jest zabezpieczony i możliwy tylko dla zalogowanych użytkowników.

---

Production

Frontend: https://projekt-crud-kacper-omen.onrender.com

Backend: https://projekt-crud-kacper-omen-backend.onrender.com

---

Staging (CI / Render Deploy Hook)

Brak własnej domeny — staging tworzy się automatycznie poprzez pipeline GitHub Actions.

Backend zostaje przebudowany po wywołaniu Deploy Hook.

---

Technologie

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express + Mongoose  
**Baza danych:** MongoDB Atlas

---

Instrukcja uruchomienia lokalnie:

W pliku api.js w frontend/src zmień wartość API_URL na http://localhost:3000/api/clients
W pliku AppContext.jsx w frontend/src/context zmień wartość AUTH_API_URL na http://localhost:3000/api/auth

Uruchom backend:

cd backend  
npm install  
npm run dev

Serwer powinien działać pod adresem http://localhost:3000

---

Uruchom frontend

cd frontend  
npm install  
npm run dev

Frontend będzie dostępny pod adresem http://localhost:5173

---

Testy

Projekt zawiera testy unit i integration.

Uruchomienie testów:

cd backend
npm test

Testy integracyjne używają bazy testowej skonfigurowanej w .env.test.

---

Konto testowe:
email: q@gmail.com
hasło: 12345678

Instrukcja logowania:
Przejść do panelu logowania, wprowadzić dane i klikąć przycisk login

---

Endpointy API:

GET	  /api/clients  Pobiera listę wszystkich klientów

GET	/api/clients/:id    Pobiera dane klienta po ID

POST /api/clients   Dodaje nowego klienta	

PUT	/api/clients/:id	Aktualizuje dane klienta

DELETE	/api/clients/:id	Usuwa klienta

POST /api/auth/register   Rejestracja nowego użytkownika	

POST /api/auth/login   Logowanie użytkownika	

POST /api/auth/logout   Wylogowanie użytkownika

GET /api/auth/me   Pobranie zalogowanego użytkownika

---

![Zrzut strony głównej](./screenshots/home.png)
![Zrzut strony logowania](./screenshots/login.png)
![Zrzut strony rejestracji](./screenshots/register.png)
![Zrzut strony klientów](./screenshots/clients.png)
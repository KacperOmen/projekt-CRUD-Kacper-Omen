Opis

Aplikacja CRUD do zarządzania klientami.

---

Technologie

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Node.js + Express + Mongoose  
**Baza danych:** MongoDB Atlas

---

Instrukcja uruchomienia

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

Endpointy API:

GET	  /api/clients  Pobiera listę wszystkich klientów

GET	/api/clients/:id    Pobiera dane klienta po ID

POST /api/clients   Dodaje nowego klienta	

PUT	/api/clients/:id	Aktualizuje dane klienta

DELETE	/api/clients/:id	Usuwa klienta

---

![Zrzut ekranu aplikacji](./UI.png)

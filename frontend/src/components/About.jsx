export default function AppDescription() {
  return (
    <section className="max-w-3xl mx-auto my-12 px-4 text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        O aplikacji
      </h3>
      <p className="text-gray-600 text-lg leading-relaxed">
        Ta aplikacja została stworzona w oparciu o stack MERN – MongoDB, Express, React oraz Node.js. 
        Pozwala na zarządzanie klientami w sposób prosty i efektywny. 
        Użytkownicy mogą się zarejestrować, zalogować i po uwierzytelnieniu wykonywać operacje CRUD 
        na klientach. Dostęp do wszystkich funkcji CRUD jest zabezpieczony i możliwy tylko dla zalogowanych użytkowników. 
      </p>
    </section>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-6">
          SitesSaaS
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Crie sites profissionais para seu comércio em minutos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Restaurantes</h3>
            <p className="text-gray-600 mb-4">Cardápio digital, pedidos online</p>
          </div>
          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">Barbearias</h3>
            <p className="text-gray-600 mb-4">Agendamento online, portfólio</p>
          </div>
          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">E muito mais</h3>
            <p className="text-gray-600 mb-4">Salões, academias, lojas, farmácias</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition"
          >
            Criar meu site agora
          </Link>
        </div>
      </div>
    </main>
  );
}

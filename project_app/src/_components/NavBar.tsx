export default function NavBar() {
  return (
    <nav className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <a href="/">
        <img src="/assets/images/logo-new-blue.png" alt="" />
      </a>
      <div className="space-x-4">
        <a href="/simular" className="text-gray-600 hover:text-gray-900">
          Simulação
        </a>
        <a href="/listagem" className="text-gray-600 hover:text-gray-900">
          Listagem
        </a>
      </div>
    </nav>
  );
}

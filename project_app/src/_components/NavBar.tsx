export default function NavBar() {
  return (
    <nav className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <img src="/assets/images/logo-new-blue.png" alt="" />
      <div className="space-x-4">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="/simulacao" className="text-gray-600 hover:text-gray-900">
          Simulação
        </a>
      </div>
    </nav>
  );
}

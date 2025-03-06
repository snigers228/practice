"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="absolute top-0 left-80 right-0 bg-transparent py-4 px-6">
        <div className="flex items-center">
          <button className="mr-6 p-2 rounded-lg bg-[#cda274] ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">ФОТО ВЫСТАВКА</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] ">
        <div className="relative w-[800px] h-[600px] m-20">
          <Image
            src="https://source.unsplash.com/random/800x600"
            alt="Фото выставка"
            width={800}
            height={600}
            className="rounded-tl-[80px] rounded-br-[80px]"
          />
          <div className="absolute inset-0 bg-black/30 rounded-tl-[80px] rounded-br-[80px] p-8 text-left">
            <h2 className="text-4xl font-bold text-white mb-4 max-w-[600px]">
              Добро пожаловать в мир неограниченного творчества
            </h2>
            <p className="text-l max-w-[400px] text-white mb-8">
              Присоединяйтесь к тысячам креативных людей, которые уже нашли все необходимое для своих проектов
            </p>
            <div className="flex gap-4 bg-white w-80 rounded-lg">
              <button 
                onClick={handleRegister}
                className="bg-[#cda274] text-white px-7 py-2 rounded-lg transition-colors"
              >
                Регистрация →
              </button>
              <button 
                onClick={handleLogin}
                className="bg-[#cda274] text-white px-9 py-2 rounded-lg hover:bg-beige-600 transition-colors"
              >
                Вход →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

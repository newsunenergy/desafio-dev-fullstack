"use client";
import { Button } from "@/components/ui/button";
import { general_routes } from "@/src/routes/general";
import github from "@/public/svgs/github.svg";
import linkedin from "@/public/svgs/linkedin.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="mt-28 flex flex-col text-center gap-5 items-center">
      <h1 className="font-bold text-white text-[40px]">Bem-vindo ao Newsun!</h1>
      <p className="text-[#484E64] font-bold max-w-[700px]">
        Simule e otimize a compensação energética das suas unidades consumidoras
        com facilidade e precisão.
      </p>
      <Button
        className="bg-[#8D7AFF] max-w-60"
        onClick={() => router.push(general_routes.simulate)}
      >
        Começar a economizar
      </Button>

      <div className="flex items-center gap-4 mt-5">
        <p className="text-white font-bold">Matheus Leite</p>
        <div className="w-[1px] h-[11px] bg-[#484E64]"></div>
        <div className="flex gap-3">
          <Link href={"https://github.com/matheusleite01"} target="_blank">
            <Image src={github} alt="github" className="cursor-pointer" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/matheus-leite-02902319b/"}
            target="_blank"
          >
            <Image src={linkedin} alt="linkedin" className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

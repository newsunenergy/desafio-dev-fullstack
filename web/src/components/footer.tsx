import { Code, Palette } from 'lucide-react'

export function Footer() {
  return (
    <footer className=" w-full flex-col items-center px-4 py-6 bg-[#1E1E1E] mt-[450px] ">
      <div className="mt-6 text-[0.8125rem] text-gray-400 mobileL:mt-5">
        <p className="mb-2 text-center">
          <Code aria-hidden className="mb-[2px] mr-1.5 inline h-4 w-4" />
          Made with 💜
        </p>
      </div>
    </footer>
  )
}

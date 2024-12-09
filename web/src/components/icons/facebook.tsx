import type { SVGProps } from 'react'

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1.5rem"
      height="1.5rem"
      className="hover:fill-[#0866FF] transition-all"
      viewBox="0 0 256 256"
      {...props}
    >
      <title>Facebook</title>

      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm8 191.63V152h24a8 8 0 0 0 0-16h-24v-24a16 16 0 0 1 16-16h16a8 8 0 0 0 0-16h-16a32 32 0 0 0-32 32v24H96a8 8 0 0 0 0 16h24v63.63a88 88 0 1 1 16 0Z" />
    </svg>
  )
}

import { CircleNotch } from "phosphor-react"

export function LoadingPage() {
  return (
    <div className="flex-col-center w-h-screen">
      <CircleNotch size={32} className="spin text-color-vorboss1" />
      <p>Loading data</p>
    </div>
  )
}

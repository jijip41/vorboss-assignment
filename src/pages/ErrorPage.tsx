import { CircleWavyWarning } from "phosphor-react"

export function ErrorPage() {
  return (
    <div className="flex-col-center w-h-screen">
      <CircleWavyWarning size={32} className="text-color-vorboss1" />
      <p>Sorry, something went wrong</p>
    </div>
  )
}

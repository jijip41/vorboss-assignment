import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Header } from "./common/components/Header.jsx"
import { Home } from "./pages/Home"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Home />
    </QueryClientProvider>
  )
}

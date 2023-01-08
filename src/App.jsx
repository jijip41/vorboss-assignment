import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Header } from "./common/components/Header.jsx"
import { Home } from "./pages/Home.jsx"

const queryClient = new QueryClient()

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Home />
    </QueryClientProvider>
  )
}

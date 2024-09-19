
import Header from "./components/molecules/Header"
import { ThemeProvider } from "./components/theme-provider"
import { Home } from "lucide-react"

function  App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <Home/>
    </ThemeProvider>
  )
}

export default App

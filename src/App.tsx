
import { Outlet } from "react-router-dom"
import Header from "./components/molecules/Header"
import Navbar from "./components/molecules/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import Footer from "./components/molecules/Footer"
function  App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <Navbar/>
      <main className=" overflow-x-hidden">
         <Outlet></Outlet>
       </main>
       <Footer/>
       <Toaster/>
    </ThemeProvider>
  )
}

export default App

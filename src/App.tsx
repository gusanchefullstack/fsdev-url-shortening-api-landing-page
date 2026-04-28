import './styles/global.css'
import { Header } from './components/Header/Header'
import { HeroSection } from './components/Hero/HeroSection'
import { UrlShortener } from './components/UrlShortener/UrlShortener'
import { StatisticsSection } from './components/Statistics/StatisticsSection'
import { BoostSection } from './components/Boost/BoostSection'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UrlShortener />
        <StatisticsSection />
        <BoostSection />
      </main>
      <Footer />
    </>
  )
}

export default App

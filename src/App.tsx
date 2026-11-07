import AIPrincipleLab from './components/AIPrincipleLab'
import BottomNav from './components/BottomNav'
import Ethics from './components/Ethics'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MapPanel from './components/MapPanel'
import Sources from './components/Sources'
import Timeline from './components/Timeline'
import Vision from './components/Vision'
import { ui } from './data/ui'
import { LangProvider, useLang } from './lib/i18n'

function Shell() {
  const { t } = useLang()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-paper"
      >
        {t(ui.a11y.skip)}
      </a>

      <Header />

      <main id="main" className="pb-16 md:pb-0">
        <Hero />
        <Timeline />
        <MapPanel />
        <AIPrincipleLab />
        <Vision />
        <Ethics />
        <Sources />
      </main>

      <Footer />
      <BottomNav />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  )
}

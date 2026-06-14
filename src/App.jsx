import Header  from './components/Header.jsx'
import Hero    from './components/Hero.jsx'
import About   from './components/About.jsx'
import Services from './components/Services.jsx'
import Contact  from './components/Contact.jsx'
import Footer   from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

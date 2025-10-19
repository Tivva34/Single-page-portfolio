import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
<About />
<Projects />
<Skills />
<Contact />
      </main>
    </>
  );
}

export default App;
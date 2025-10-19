import { useEffect, useState } from "react";

export default function Nav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={active === link.id ? "active" : ""}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
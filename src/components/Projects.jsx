import { useEffect, useState } from "react";
import { motion } from "framer-motion";
  
const defaultImage = `${import.meta.env.BASE_URL}projects/default-project.png`;

const repoScreenshots = {
  "Bonz.ai": `${import.meta.env.BASE_URL}projects/Bonz.ai.png`,
  "Shui": `${import.meta.env.BASE_URL}projects/Shui.png`,
  "IMDO": `${import.meta.env.BASE_URL}projects/IMDO.png`,
  "Nasa-SpaceViewer": `${import.meta.env.BASE_URL}projects/Nasa2.png`,
  "ReadingSloth": `${import.meta.env.BASE_URL}projects/ReadingSloth.png`,
  "FadingLightDemo" : `${import.meta.env.BASE_URL}projects/FadingLight4.png`,

};

const truncate = (str, n) => (str?.length > n ? str.slice(0, n - 1) + "..." : str);

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [repoLanguages, setRepoLanguages] = useState({});
  const username = "Tivva34";

  useEffect(() => {
    console.log("Fetching repos...");
 
    // Only use token in development, not in production build
    const token = import.meta.env.DEV ? import.meta.env.VITE_GITHUB_TOKEN : undefined; 
    
    const headers = token ? { Authorization: `token ${token}` } : {};
    
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`, { headers })
      .then((res) => res.json())
      .then((data) => {
        console.log("All repos:", data);
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error("API returned non-array:", data);
          return;
        }
        
        const filtered = data.filter((repo) => !repo.fork);
        console.log("Filtered (no forks):", filtered);
        const selectedRepos = ["Bonz.ai", "IMDO", "Nasa-SpaceViewer", "ReadingSloth", "Shui", "FadingLightDemo"]; 
        const finalRepos = filtered.filter((repo) =>
          selectedRepos.includes(repo.name)
        );
        console.log("Final repos to display:", finalRepos);
        setRepos(finalRepos);

        finalRepos.forEach((repo) => {
          fetch(repo.languages_url, { headers })
            .then((res) => res.json())
            .then((langs) => {
              console.log(`Languages for ${repo.name}:`, langs);
              if (langs && typeof langs === 'object' && !langs.message) {
                setRepoLanguages((prev) => ({
                  ...prev,
                  [repo.name]: Object.keys(langs)
                }));
              }
            });
        });
      })
      .catch((err) => console.error("Error fetching repos:", err));
  }, []);
  
  const languageLogos = {
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    CSharp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  };

  return (
    <section id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        GitHub Repositories
      </motion.h2>
      <div className="projects-grid">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="project-image-viewport">
              <img
                src={repoScreenshots[repo.name] || defaultImage}
                alt={repo.name + " preview"}
                className="project-image"
              />
            </div>
            <h3>{repo.name}</h3>
            <p>{truncate(repo.description || "No description provided.", 140)}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              {repoLanguages[repo.name]
                ? repoLanguages[repo.name].map((lang) => {
                    let key = lang;
                    if (lang === "C#") key = "CSharp";
                    if (lang === "C++") key = "CPlusPlus";
                    if (lang === "HTML") key = "HTML";
                    if (lang === "CSS") key = "CSS";
                    if (lang === "Shell") key = "Shell";
                    if (lang === "SCSS") key = "SCSS";
                    return languageLogos[key] ? (
                      <img
                        key={lang}
                        src={languageLogos[key]}
                        alt={lang + " logo"}
                        title={lang}
                        style={{ width: "24px", height: "24px" }}
                      />
                    ) : (
                      <span key={lang} style={{ fontSize: "0.85rem", color: "#d6c6ef" }}>{lang}</span>
                    );
                  })
                : <span style={{ fontSize: "0.85rem", color: "#d6c6ef" }}>N/A</span>}
            </div>
            <p>
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary project-btn"
            >
              View on GitHub
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

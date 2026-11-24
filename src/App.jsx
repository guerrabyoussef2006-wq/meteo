import { useState, useEffect } from "react";

function App() {
    const villes = [
        { nom: "Casablanca", lat: 33.5731, lon: -7.5898 },
        { nom: "Rabat", lat: 34.0209, lon: -6.8416 },
        { nom: "Marrakech", lat: 31.6295, lon: -7.9811 },
        { nom: "Tanger", lat: 35.7595, lon: -5.8340 },
        { nom: "Agadir", lat: 30.4278, lon: -9.5981 },
        { nom: "Fès", lat: 34.0181, lon: -5.0078 },
        { nom: "Meknès", lat: 33.8935, lon: -5.5473 },
        { nom: "Oujda", lat: 34.6814, lon: -1.9086 },
        { nom: "Tétouan", lat: 35.5785, lon: -5.3684 },
        { nom: "Kenitra", lat: 34.2610, lon: -6.5802 },
        { nom: "Salé", lat: 34.0531, lon: -6.7985 },
        { nom: "Safi", lat: 32.2994, lon: -9.2372 },
        { nom: "El Jadida", lat: 33.2316, lon: -8.5007 },
        { nom: "Béni Mellal", lat: 32.3373, lon: -6.3498 },
        { nom: "Nador", lat: 35.1681, lon: -2.9335 },
        { nom: "Khouribga", lat: 32.8811, lon: -6.9063 },
        { nom: "Settat", lat: 33.0010, lon: -7.6166 },
        { nom: "Larache", lat: 35.1932, lon: -6.1567 },
        { nom: "Ifrane", lat: 33.5228, lon: -5.1107 },
        { nom: "Essaouira", lat: 31.5085, lon: -9.7595 },
        { nom: "Ouarzazate", lat: 30.9335, lon: -6.9370 },
        { nom: "Errachidia", lat: 31.9314, lon: -4.4266 },
        { nom: "Taza", lat: 34.2133, lon: -4.0083 },
        { nom: "Guelmim", lat: 28.9870, lon: -10.0574 },
        { nom: "Laâyoune", lat: 27.1536, lon: -13.2033 },
        { nom: "Dakhla", lat: 23.6848, lon: -15.9570 },
        { nom: "Chefchaouen", lat: 35.1688, lon: -5.2636 },
        { nom: "Al Hoceima", lat: 35.2490, lon: -3.9370 },
        { nom: "Taroudant", lat: 30.4700, lon: -8.8769 },
        { nom: "Tiznit", lat: 29.6974, lon: -9.7316 },
        { nom: "Ksar El Kebir", lat: 35.0017, lon: -5.9045 },
        { nom: "Sidi Kacem", lat: 34.2215, lon: -5.7077 },
        { nom: "Sidi Slimane", lat: 34.2647, lon: -5.9250 },
        { nom: "Fquih Ben Salah", lat: 32.5000, lon: -6.7000 },
        { nom: "Taourirt", lat: 34.4073, lon: -2.8973 },
        { nom: "Jerada", lat: 34.3100, lon: -2.1600 },
        { nom: "Azrou", lat: 33.4344, lon: -5.2213 },
        { nom: "Midelt", lat: 32.6852, lon: -4.7367 },
        { nom: "Sefrou", lat: 33.8318, lon: -4.8350 },
        { nom: "Tan-Tan", lat: 28.4380, lon: -11.1030 },
        { nom: "Berkane", lat: 34.9204, lon: -2.3194 },
        { nom: "Aït Melloul", lat: 30.3342, lon: -9.4972 },
        { nom: "Mohammedia", lat: 33.6866, lon: -7.3830 },
        { nom: "Bouskoura", lat: 33.4492, lon: -7.6524 },
        { nom: "Chichaoua", lat: 31.5430, lon: -8.7620 },
        { nom: "Zagora", lat: 30.3300, lon: -5.8380 },
        { nom: "Figuig", lat: 32.1090, lon: -1.2280 },
        { nom: "M'Diq", lat: 35.6850, lon: -5.3250 },
        { nom: "Fnideq", lat: 35.8490, lon: -5.3570 },
        { nom: "Oulad Teima", lat: 30.3950, lon: -9.2080 },
        { nom: "Youssoufia", lat: 32.2463, lon: -8.5294 },
        { nom: "Guercif", lat: 34.2257, lon: -3.3536 },
        { nom: "Imouzzer", lat: 33.7300, lon: -4.9800 },
        { nom: "Boujdour", lat: 26.1250, lon: -14.4840 },
        { nom: "Tinghir", lat: 31.5147, lon: -5.5328 },
        { nom: "Asilah", lat: 35.4650, lon: -6.0340 },
        { nom: "Khemisset", lat: 33.8240, lon: -6.0660 },
        { nom: "Moulay Yacoub", lat: 34.0870, lon: -5.1810 },
        { nom: "El Kelaâ des Sraghna", lat: 32.0500, lon: -7.4080 },
        { nom: "Akhfenir", lat: 28.0950, lon: -12.0510 },
        { nom: "M'der", lat: 32.0000, lon: -6.0000 }
    ];

    const [ville, setVille] = useState("Casablanca");
    const [recherche, setRecherche] = useState("");
    const [meteo, setMeteo] = useState(null);
    const [jours, setJours] = useState([]);
    const [mode, setMode] = useState("dark");
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");

    function getDescription(code) {
        if (code === 0) return "Ciel dégagé";
        if (code === 1) return "Peu nuageux";
        if (code === 2) return "Partiellement nuageux";
        if (code === 3) return "Ciel couvert";
        if (code === 45 || code === 48) return "Brouillard";
        if (code >= 51 && code <= 57) return "Bruine";
        if (code >= 61 && code <= 67) return "Pluie";
        if (code >= 71 && code <= 77) return "Neige";
        if (code >= 80 && code <= 82) return "Averses";
        if (code >= 85 && code <= 86) return "Averses de neige";
        if (code >= 95 && code <= 99) return "Orage";
        return "Temps variable";
    }

    function getIcon(code) {
        if (code === 0) return "☀️";
        if (code === 1) return "🌤️";
        if (code === 2) return "⛅";
        if (code === 3) return "☁️";
        if (code === 45 || code === 48) return "🌫️";
        if (code >= 51 && code <= 57) return "🌦️";
        if (code >= 61 && code <= 67) return "🌧️";
        if (code >= 71 && code <= 77) return "❄️";
        if (code >= 80 && code <= 82) return "🌧️";
        if (code >= 85 && code <= 86) return "🌨️";
        if (code >= 95 && code <= 99) return "⛈️";
        return "🌤️";
    }

    function getImage(nom) {
        if (
            nom === "Marrakech" ||
            nom === "Ouarzazate" ||
            nom === "Zagora"
        ) {
            return "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1400&q=80";
        }

        if (
            nom === "Agadir" ||
            nom === "Essaouira" ||
            nom === "Dakhla"
        ) {
            return "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80";
        }

        if (nom === "Chefchaouen") {
            return "https://images.unsplash.com/photo-1597212618444-7c4f5e1b7b1c?auto=format&fit=crop&w=1400&q=80";
        }

        if (nom === "Casablanca") {
            return "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1400&q=80";
        }

        return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80";
    }

    function chargerMeteo(nom) {
        const villeChoisie = villes.find(function (item) {
            return item.nom === nom;
        });

        if (!villeChoisie) return;

        setChargement(true);
        setErreur("");

        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            villeChoisie.lat +
            "&longitude=" +
            villeChoisie.lon +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
            "&timezone=auto"
        )
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Erreur de récupération des données");
                }
                return response.json();
            })
            .then(function (data) {
                setMeteo(data.current);

                const listeJours = data.daily.time.map(function (date, index) {
                    return {
                        date: date,
                        code: data.daily.weather_code[index],
                        max: data.daily.temperature_2m_max[index],
                        min: data.daily.temperature_2m_min[index]
                    };
                });

                setJours(listeJours);
                setVille(nom);
                setChargement(false);
            })
            .catch(function () {
                setErreur("Impossible de récupérer les données météo.");
                setChargement(false);
            });
    }

    useEffect(function () {
        chargerMeteo(ville);
    }, []);

    function rechercherVille(nom) {
        const villeTrouvee = villes.find(function (item) {
            return item.nom.toLowerCase() === nom.toLowerCase();
        });

        if (villeTrouvee) {
            setRecherche("");
            chargerMeteo(villeTrouvee.nom);
        }
    }

    const villesFiltrees = villes.filter(function (item) {
        return item.nom.toLowerCase().includes(recherche.toLowerCase());
    });

    function formatJour(date, index) {
        if (index === 0) return "Aujourd'hui";

        const dateObj = new Date(date + "T12:00:00");

        return dateObj.toLocaleDateString("fr-FR", {
            weekday: "short"
        }).replace(".", "");
    }

    const temperatures = jours.map(function (jour) {
        return jour.min;
    });

    const temperaturesMax = jours.map(function (jour) {
        return jour.max;
    });

    const minGlobal = Math.min.apply(null, temperatures);
    const maxGlobal = Math.max.apply(null, temperaturesMax);

    function calculerLargeur(min, max) {
        const amplitude = maxGlobal - minGlobal || 1;

        const largeur = ((max - min) / amplitude) * 100;

        return Math.max(20, Math.min(100, largeur));
    }

    return (
        <div className={"application " + (mode === "dark" ? "sombre" : "clair")}>

            {/* NAVIGATION */}

            <header className="navbar">
                <div className="logo">
                    <span className="logo-icon">☀️</span>
                    <span> Météo<span className="logo-highlight">Maroc</span></span>
                </div>

                <button
                    className="theme-button"
                    onClick={function () {
                        setMode(mode === "dark" ? "light" : "dark");
                    }}
                >
                    {mode === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre"}
                </button>
            </header>

            {/* CONTENU */}

            <main className="container">

                <section className="intro">
                    <span className="badge-intro">☁️ Météo en temps réel</span>
                    <h1>La météo <span>au Maroc</span></h1>
                    <p>Découvrez les conditions météorologiques de votre ville.</p>
                </section>

                {/* RECHERCHE */}

                <section className="search-section">
                    <div className="search-box">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Rechercher une ville marocaine..."
                            value={recherche}
                            onChange={function (event) {
                                setRecherche(event.target.value);
                            }}
                            onKeyDown={function (event) {
                                if (event.key === "Enter") {
                                    rechercherVille(recherche);
                                }
                            }}
                        />

                        {recherche !== "" && (
                            <button
                                className="clear-search"
                                onClick={function () {
                                    setRecherche("");
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {recherche !== "" && (
                        <div className="search-results">
                            {villesFiltrees.slice(0, 8).map(function (item) {
                                return (
                                    <button
                                        key={item.nom}
                                        className="search-result"
                                        onClick={function () {
                                            rechercherVille(item.nom);
                                        }}
                                    >
                                        <span>📍</span>
                                        {item.nom}
                                    </button>
                                );
                            })}

                            {villesFiltrees.length === 0 && (
                                <p className="no-results">
                                    Aucune ville trouvée
                                </p>
                            )}
                        </div>
                    )}
                </section>

                {/* CHARGEMENT */}

                {chargement && (
                    <div className="loading">
                        <div className="loader"></div>
                        <p>Chargement de la météo...</p>
                    </div>
                )}

                {/* ERREUR */}

                {erreur !== "" && (
                    <div className="error-message">
                        {erreur}
                    </div>
                )}

                {/* METEO */}

                {!chargement && meteo && (
                    <>
                        <section
                            className="weather-main"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90deg, rgba(5,15,30,0.85), rgba(5,15,30,0.25)), url(" +
                                    getImage(ville) +
                                    ")"
                            }}
                        >
                            <div className="weather-content">
                                <div className="location">
                                    <span>📍</span>
                                    <h2>{ville}, Maroc</h2>
                                </div>

                                <p className="weather-description">
                                    {getDescription(meteo.weather_code)}
                                </p>

                                <div className="weather-temperature">
                                    <span className="big-icon">
                                        {getIcon(meteo.weather_code)}
                                    </span>

                                    <h1>
                                        {Math.round(meteo.temperature_2m)}
                                        <span>°C</span>
                                    </h1>
                                </div>

                                <p className="feels-like">
                                    Ressenti {Math.round(meteo.apparent_temperature)}°C
                                </p>
                            </div>
                        </section>

                        {/* DETAILS */}

                        <section className="details-grid">
                            <div className="detail-card">
                                <div className="detail-icon">💧</div>
                                <p>Humidité</p>
                                <h3>
                                    {meteo.relative_humidity_2m}%
                                </h3>
                            </div>

                            <div className="detail-card">
                                <div className="detail-icon">💨</div>
                                <p>Vent</p>
                                <h3>
                                    {meteo.wind_speed_10m} km/h
                                </h3>
                            </div>

                            <div className="detail-card">
                                <div className="detail-icon">🌡️</div>
                                <p>Ressenti</p>
                                <h3>
                                    {Math.round(meteo.apparent_temperature)}°C
                                </h3>
                            </div>
                        </section>

                        {/* PREVISIONS 5 JOURS */}

                        <section className="forecast-section">

                            <div className="forecast-header">
                                <div>
                                    <h2>Prévisions</h2>
                                    <p>Les 5 prochains jours</p>
                                </div>

                                <span className="forecast-label">
                                    5 JOURS
                                </span>
                            </div>

                            <div className="forecast-list">

                                {jours.map(function (jour, index) {
                                    return (
                                        <div
                                            className="forecast-item"
                                            key={jour.date}
                                        >
                                            <div className="forecast-day">
                                                <span>
                                                    {formatJour(jour.date, index)}
                                                </span>
                                            </div>

                                            <div className="forecast-icon">
                                                {getIcon(jour.code)}
                                            </div>

                                            <div className="forecast-description">
                                                {getDescription(jour.code)}
                                            </div>

                                            <div className="forecast-temperatures">
                                                <span className="forecast-max">
                                                    {Math.round(jour.max)}°
                                                </span>

                                                <div className="temperature-bar">
                                                    <div
                                                        className="temperature-fill"
                                                        style={{
                                                            width: calculerLargeur(
                                                                jour.min,
                                                                jour.max
                                                            ) + "%",
                                                            marginLeft:
                                                                ((jour.min - minGlobal) /
                                                                    (maxGlobal - minGlobal || 1)) *
                                                                100 + "%"
                                                        }}
                                                    ></div>
                                                </div>

                                                <span className="forecast-min">
                                                    {Math.round(jour.min)}°
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </section>
                    </>
                )}
            </main>

            {/* FOOTER */}

            <footer className="footer">
                <p>☀️ Météo Maroc</p>
                <span>Les données météorologiques sont fournies par Open-Meteo.</span>
                <p className="footer-copy">
                    © 2026 - Météo Maroc
                </p>
            </footer>

        </div>
    );
}

export default App;
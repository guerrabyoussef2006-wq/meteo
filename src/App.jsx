import { useState, useEffect } from "react";

function App() {

    const [ville, setVille] = useState(null);
    const [meteo, setMeteo] = useState(null);
    const [jours, setJours] = useState([]);
    const [recherche, setRecherche] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState("");
    const [mode, setMode] = useState(false);

    // Rechercher une ville
    const rechercherVille = (nom) => {

        setRecherche(nom);

        if (nom.trim() === "") {
            setSuggestions([]);
            return;
        }

        fetch("https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(nom) +
            "&count=10&language=fr&format=json&countryCode=MA")

            .then(response => response.json())

            .then(data => {
                setSuggestions(data.results || []);
            })

            .catch(() => {
                setSuggestions([]);
            });
    };

    // Charger la météo
    const chargerMeteo = (villeChoisie) => {

        setChargement(true);
        setErreur("");
        setMeteo(null);
        setSuggestions([]);
        setRecherche("");

        const url = "https://api.open-meteo.com/v1/forecast?latitude=" +
            villeChoisie.latitude +
            "&longitude=" +
            villeChoisie.longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
            "&timezone=auto";

        fetch(url)

            .then(response => response.json())

            .then(data => {

                setMeteo(data.current);

                const liste = data.daily.time.map((date, index) => ({
                    date: date,
                    code: data.daily.weather_code[index],
                    max: data.daily.temperature_2m_max[index],
                    min: data.daily.temperature_2m_min[index]
                }));

                setJours(liste);
                setVille(villeChoisie);
                setChargement(false);

            })

            .catch(() => {
                setErreur("Impossible de récupérer la météo.");
                setChargement(false);
            });
    };

    // Description météo
    const getDescription = (code) => {

        if (code === 0) return "Ciel dégagé";
        if (code <= 3) return "Partiellement nuageux";
        if (code <= 48) return "Brouillard";
        if (code <= 57) return "Bruine";
        if (code <= 67) return "Pluie";
        if (code <= 77) return "Neige";
        if (code <= 82) return "Averses";
        if (code <= 86) return "Neige";
        return "Orage";
    };

    // Icône météo
    const getIcon = (code) => {

        if (code === 0) return "☀️";
        if (code <= 3) return "⛅";
        if (code <= 48) return "🌫️";
        if (code <= 67) return "🌧️";
        if (code <= 77) return "❄️";
        if (code <= 82) return "🌦️";
        return "⛈️";
    };

    // Formater les jours
    const formatJour = (date) => {

        return new Date(date + "T12:00:00")
            .toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "short"
            });
    };

    // Charger Casablanca au démarrage
    useEffect(() => {

        fetch("https://geocoding-api.open-meteo.com/v1/search?name=Casablanca&count=1&language=fr&format=json&countryCode=MA")

            .then(response => response.json())

            .then(data => {

                if (data.results && data.results.length > 0) {
                    chargerMeteo(data.results[0]);
                } else {
                    setErreur("Ville introuvable.");
                }

            })

            .catch(() => {
                setErreur("Impossible de charger la météo.");
            });

    }, []);

    // Calculer les températures pour les barres
    const temperatures = jours.map(jour => jour.max);

    const temperatureMin = Math.min(...temperatures);
    const temperatureMax = Math.max(...temperatures);

    return (

        <div className={mode ? "application sombre" : "application clair"}>

            {/* NAVBAR */}

            <nav className="navbar">

                <div className="logo">
                    <span className="logo-icon">🌤️</span>
                    Météo<span className="logo-highlight">Maroc</span>
                </div>

                <button
                    className="theme-button"
                    onClick={() => setMode(!mode)}
                >
                    {mode ? "☀️ Mode clair" : "🌙 Mode sombre"}
                </button>

            </nav>

            <main className="container">

                {/* INTRODUCTION */}

                <section className="intro">

                    <span className="badge-intro">
                        🌍 MÉTÉO DU MAROC
                    </span>

                    <h1>
                        Découvrez la météo <span>du Maroc</span>
                    </h1>

                    <p>
                        Consultez les conditions météorologiques de votre ville.
                    </p>

                </section>

                {/* RECHERCHE */}

                <section className="search-section">

                    <div className="search-box">

                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Rechercher une ville..."
                            value={recherche}
                            onChange={(e) => rechercherVille(e.target.value)}
                        />

                        {recherche && (
                            <button
                                className="clear-search"
                                onClick={() => {
                                    setRecherche("");
                                    setSuggestions([]);
                                }}
                            >
                                ✕
                            </button>
                        )}

                    </div>

                    {suggestions.length > 0 && (

                        <div className="search-results">

                            {suggestions.map((item, index) => (

                                <button
                                    key={index}
                                    className="search-result"
                                    onClick={() => chargerMeteo(item)}
                                >
                                    📍 {item.name}
                                    {item.admin1 ? " - " + item.admin1 : ""}
                                </button>

                            ))}

                        </div>

                    )}

                    {recherche && suggestions.length === 0 && (
                        <div className="no-results">
                            Aucune ville trouvée
                        </div>
                    )}

                </section>

                {/* CHARGEMENT */}

                {chargement && (

                    <div className="loading">
                        <div className="loader"></div>
                        Chargement de la météo...
                    </div>

                )}

                {/* ERREUR */}

                {erreur && (
                    <div className="error-message">
                        {erreur}
                    </div>
                )}

                {/* MÉTÉO ACTUELLE */}

                {meteo && ville && (

                    <>

                        <section
                            className="weather-main"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(10,20,40,0.85), rgba(10,20,40,0.15)), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200)"
                            }}
                        >

                            <div className="weather-content">

                                <div className="location">
                                    <span>📍</span>
                                    <h2>{ville.name}</h2>
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
                                        <span>°</span>
                                    </h1>

                                </div>

                                <p className="feels-like">
                                    Ressenti : {Math.round(meteo.apparent_temperature)}°
                                </p>

                            </div>

                        </section>

                        {/* DÉTAILS */}

                        <section className="details-grid">

                            <div className="detail-card">
                                <div className="detail-icon">💧</div>
                                <p>Humidité</p>
                                <h3>{meteo.relative_humidity_2m}%</h3>
                            </div>

                            <div className="detail-card">
                                <div className="detail-icon">💨</div>
                                <p>Vitesse du vent</p>
                                <h3>{meteo.wind_speed_10m} km/h</h3>
                            </div>

                            <div className="detail-card">
                                <div className="detail-icon">🌡️</div>
                                <p>Température ressentie</p>
                                <h3>{Math.round(meteo.apparent_temperature)}°</h3>
                            </div>

                        </section>

                        {/* PRÉVISIONS */}

                        <section className="forecast-section">

                            <div className="forecast-header">

                                <div>
                                    <h2>Prévisions météo</h2>
                                    <p>Les 5 prochains jours</p>
                                </div>

                                <span className="forecast-label">
                                    5 JOURS
                                </span>

                            </div>

                            <div className="forecast-list">

                                {jours.slice(0, 5).map((jour) => {

                                    const largeur = temperatureMax === temperatureMin
                                        ? 100
                                        : ((jour.max - temperatureMin) /
                                            (temperatureMax - temperatureMin)) * 100;

                                    return (

                                        <div className="forecast-item" key={jour.date}>

                                            <span className="forecast-day">
                                                {formatJour(jour.date)}
                                            </span>

                                            <span className="forecast-icon">
                                                {getIcon(jour.code)}
                                            </span>

                                            <span className="forecast-description">
                                                {getDescription(jour.code)}
                                            </span>

                                            <div className="forecast-temperatures">

                                                <span className="forecast-max">
                                                    {Math.round(jour.max)}°
                                                </span>

                                                <div className="temperature-bar">

                                                    <div
                                                        className="temperature-fill"
                                                        style={{ width: largeur + "%" }}
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

                <p>🌤️ Météo Maroc</p>

                <p>Données météorologiques fournies par Open-Meteo</p>

                <p className="footer-copy">
                    © 2026 - Tous droits réservés
                </p>

            </footer>

        </div>

    );
}

export default App;
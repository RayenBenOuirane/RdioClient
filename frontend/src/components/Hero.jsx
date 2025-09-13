import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadio } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-logo">
          <div className="hero-logo-icon">      <FontAwesomeIcon icon={faRadio} />
</div>
          <h1 className="hero-title">AIRadio</h1>
        </div>

        <p className="hero-subtitle">
          Experience the future of radio with AI-hosted shows, intelligent music curation, and real-time listener
          interaction.
        </p>

        <button className="get-started-btn">Get Started</button>

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🎵</span>
            <h3>24/7 Live Broadcasting</h3>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎧</span>
            <h3>High Quality Audio</h3>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h3>Dynamic Programming</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

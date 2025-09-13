const Features = () => {
  const brands = ["Apple Music", "Amazon Music", "SoundCloud", "Pandora", "iHeartRadio", "Spotify"];

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">Trusted by Industry Leaders</h2>

        <div className="carousel-wrapper">
          <div className="carousel-track">
            {brands.concat(brands).map((brand, index) => (
              <div key={index} className="feature-brand">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

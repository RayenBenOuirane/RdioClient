import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Programs from "../components/Programs"
import DiscoverMood from "../components/DiscoverMood copy 2"
import Footer from "../components/Footer"
import RadioHero from "../components/RadioHero"

const HomePage = () => {
  const newsItems = [
      "🎵 New episode of our podcast available now!",
      "📻 Exclusive interview with the artist of the week at 6 PM",
      "🔥 Top 10 hits of the week to discover",
      "🎉 Special contest: win concert tickets",
      "🌟 Our flagship show 'The Night Owls' returns tonight at 10 PM"
    ];

  return (
    <div>
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <Features />
      <Programs />
      <RadioHero />
      <DiscoverMood />
      <Footer />
    </div>
    <div className="news-ticker-bottom">
        <div className="news-ticker-label-bottom">NEWS</div>
        <div className="news-ticker-content-bottom">
          <div className="news-ticker-items-bottom">
            {newsItems.concat(newsItems).map((item, index) => ( // Duplicate for smooth loop
              <div key={index} className="news-ticker-item-bottom">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
  )
}

export default HomePage

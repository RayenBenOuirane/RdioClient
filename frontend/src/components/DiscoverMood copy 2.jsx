 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceSmile,
  faVolumeUp,
  faMicrophone,
  faGuitar
} from '@fortawesome/free-solid-svg-icons';

const DiscoverMood = () => {

const moods = [
  { name: "Chill", icon: <FontAwesomeIcon icon={faFaceSmile} />, color: "mood-button-yellow" },
  { name: "Upbeat", icon: <FontAwesomeIcon icon={faVolumeUp} />, color: "mood-button-yellow" },
  { name: "Talk Shows", icon: <FontAwesomeIcon icon={faMicrophone} />, color: "mood-button-yellow" },
  { name: "Rock", icon: <FontAwesomeIcon icon={faGuitar} />, color: "mood-button-yellow" },
];


  return (
    <section className="discover-mood-section">
      <div className="discover-mood-container">
        <h2 className="discover-mood-title">Discover by Mood</h2>
        <p className="discover-mood-subtitle">Find your perfect music vibe</p>

        <div className="mood-grid">
          {moods.map((mood, index) => (
            <div key={index} className="mood-item">
              <button className={`mood-button ${mood.color}`}>{mood.icon}</button>
              <span className="mood-name">{mood.name}</span>
              <span className="mood-count">200 songs</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscoverMood

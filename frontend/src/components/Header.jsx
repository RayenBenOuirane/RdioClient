import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadio } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
<div className="logo-icon">
      <FontAwesomeIcon icon={faRadio} />
    </div>          <span className="logo-text">AIRadio</span>
        </div>

        <nav className="nav">
          <a href="#" className="nav-link">
            Shows
          </a>
          <a href="#" className="nav-link">
            About
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header

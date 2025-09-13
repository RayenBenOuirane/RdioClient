import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadio } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
      <FontAwesomeIcon icon={faRadio} />
              </div>
              <span className="footer-brand-name">AIRadio</span>
            </div>
            <p className="footer-description">
              The future of radio is here with AI-powered broadcasting and intelligent music curation.
            </p>
          </div>

          <div>
            <h4 className="footer-section-title">Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="contact" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-section-title">Connect</h4>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Twitter">
  <FontAwesomeIcon icon={faTwitter} />
</a>
<a href="#" className="footer-social-link" aria-label="Facebook">
  <FontAwesomeIcon icon={faFacebook} />
</a>
<a href="#" className="footer-social-link" aria-label="Instagram">
  <FontAwesomeIcon icon={faInstagram} />
</a>

            </div>
          </div>

          <div>
            <p className="footer-description">
              Experience the future with intelligent radio programming and AI-powered music discovery.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 AIRadio. All rights reserved. | Powered by AI and Music Lovers</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

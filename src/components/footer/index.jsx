import Container from '../container';

import facebook from '../../assets/images/facebook.png'
import twitter from '../../assets/images/twitter.png'
import instagram from '../../assets/images/instagram.png'
import linkedin from '../../assets/images/linkedin.png'

import './style.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
      <nav className='footer__nav'>
        <div>
          <p className='footer__title'>Finstreet 118 2561 Fintown</p>
          <p className='footer__title'>Hello@finsweet.com  <span>020 7993 2905</span></p>
        </div>
        <ul className='footer__list'>
          <li>
            <a target='_blank' href="https://www.facebook.com">
              <img src={facebook} alt="facebook" />
            </a>
            
          </li>
          <li>
            <a target='_blank' href="https://twitter.com">
              <img src={twitter} alt="twitter" />
            </a>
          </li>
          <li>
            <a target='_blank' href="https://www.instagram.com/">
              <img src={instagram} alt="instagram" />
            </a>
          </li>
          <li>
            <a target='_blank' href="https://www.linkedin.com">
              <img src={linkedin} alt="linkedin" />
            </a>
          </li>
        </ul>
      </nav>
      </Container>
      </footer>
  )
}

export default Footer
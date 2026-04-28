import { useState } from 'react'
import styles from './Header.module.css'
import logoSvg from '/images/logo.svg'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" aria-label="Shortly home" className={styles.logo}>
          <img src={logoSvg} alt="Shortly" width="121" height="33" />
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navLinks}>
            <li><a href="#features" className={styles.navLink}>Features</a></li>
            <li><a href="#pricing" className={styles.navLink}>Pricing</a></li>
            <li><a href="#resources" className={styles.navLink}>Resources</a></li>
          </ul>
          <div className={styles.navActions}>
            <a href="#login" className={styles.loginLink}>Login</a>
            <a href="#signup" className={styles.signupBtn}>Sign Up</a>
          </div>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          type="button"
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      {/* Mobile menu — always in DOM so aria-controls target is always resolvable */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavLinks}>
            <li><a href="#features" className={styles.mobileNavLink} onClick={closeMenu}>Features</a></li>
            <li><a href="#pricing" className={styles.mobileNavLink} onClick={closeMenu}>Pricing</a></li>
            <li><a href="#resources" className={styles.mobileNavLink} onClick={closeMenu}>Resources</a></li>
          </ul>
          <hr className={styles.mobileDivider} />
          <div className={styles.mobileNavActions}>
            <a href="#login" className={styles.mobileLoginLink} onClick={closeMenu}>Login</a>
            <a href="#signup" className={styles.mobileSignupBtn} onClick={closeMenu}>Sign Up</a>
          </div>
        </nav>
      </div>
    </header>
  )
}

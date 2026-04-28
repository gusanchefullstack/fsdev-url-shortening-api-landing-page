import styles from './Footer.module.css'
import logoSvg from '/images/logo.svg'

const footerLinks = {
  Features: ['Link Shortening', 'Branded Links', 'Analytics'],
  Resources: ['Blog', 'Developers', 'Support'],
  Company: ['About', 'Our Team', 'Careers', 'Contact'],
}

const socialLinks = [
  { name: 'Facebook', icon: '/images/icon-facebook.svg', href: 'https://facebook.com' },
  { name: 'Twitter', icon: '/images/icon-twitter.svg', href: 'https://twitter.com' },
  { name: 'Pinterest', icon: '/images/icon-pinterest.svg', href: 'https://pinterest.com' },
  { name: 'Instagram', icon: '/images/icon-instagram.svg', href: 'https://instagram.com' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="/" aria-label="Shortly home" className={styles.logo}>
          <img src={logoSvg} alt="Shortly" width="121" height="33" className={styles.logoImg} />
        </a>

        <nav className={styles.links} aria-label="Footer navigation">
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section} className={styles.linkGroup}>
              <h3 className={styles.groupHeading}>{section}</h3>
              <ul role="list">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className={styles.link}
                      aria-label={`${section}: ${item}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.social}>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shortly on ${s.name}`}
              className={styles.socialLink}
            >
              <img src={s.icon} alt="" width="24" height="24" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

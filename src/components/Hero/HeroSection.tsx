import styles from './HeroSection.module.css'
import illustrationSrc from '/images/illustration-working.svg'

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.heading}>
            More than just shorter links
          </h1>
          <p className={styles.description}>
            Build your brand's recognition and get detailed insights
            on how your links are performing.
          </p>
          <a href="#shorten" className={styles.cta}>Get Started</a>
        </div>
        <div className={styles.illustration} aria-hidden="true">
          <img
            src={illustrationSrc}
            alt=""
            className={styles.illustrationImg}
            width="733"
            height="482"
          />
        </div>
      </div>
    </section>
  )
}

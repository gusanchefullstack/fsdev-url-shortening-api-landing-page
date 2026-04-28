import styles from './BoostSection.module.css'

export function BoostSection() {
  return (
    <section className={styles.section} aria-labelledby="boost-heading">
      <h2 id="boost-heading" className={styles.heading}>Boost your links today</h2>
      <a href="#shorten" className={styles.cta}>Get Started</a>
    </section>
  )
}

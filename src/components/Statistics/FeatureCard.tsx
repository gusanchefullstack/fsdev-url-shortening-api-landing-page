import styles from './FeatureCard.module.css'

interface Props {
  icon: string
  title: string
  description: string
  offset?: 'none' | 'mid' | 'high'
}

export function FeatureCard({ icon, title, description, offset = 'none' }: Props) {
  return (
    <article className={`${styles.card} ${styles[`offset-${offset}`]}`}>
      <div className={styles.iconWrapper} aria-hidden="true">
        <img src={icon} alt="" width="40" height="40" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  )
}

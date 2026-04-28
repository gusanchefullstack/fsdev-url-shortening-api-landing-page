import { FeatureCard } from './FeatureCard'
import styles from './StatisticsSection.module.css'

const features = [
  {
    id: 'brand',
    icon: '/images/icon-brand-recognition.svg',
    title: 'Brand Recognition',
    description:
      "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
    offset: 'none' as const,
  },
  {
    id: 'records',
    icon: '/images/icon-detailed-records.svg',
    title: 'Detailed Records',
    description:
      'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
    offset: 'mid' as const,
  },
  {
    id: 'customizable',
    icon: '/images/icon-fully-customizable.svg',
    title: 'Fully Customizable',
    description:
      'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
    offset: 'high' as const,
  },
]

export function StatisticsSection() {
  return (
    <section className={styles.section} aria-labelledby="stats-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="stats-heading" className={styles.heading}>Advanced Statistics</h2>
          <p className={styles.subheading}>
            Track how your links are performing across the web with our
            advanced statistics dashboard.
          </p>
        </header>

        <ul className={styles.cards}>
          {features.map((f) => (
            <li key={f.id}>
              <FeatureCard
                icon={f.icon}
                title={f.title}
                description={f.description}
                offset={f.offset}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

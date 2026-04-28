import { useState } from 'react'
import type { ShortenedLink as ShortenedLinkType } from '../../types'
import styles from './ShortenedLink.module.css'

interface Props {
  link: ShortenedLinkType
}

export function ShortenedLink({ link }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.shortened)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement('textarea')
      el.value = link.shortened
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <article className={styles.card}>
      <span className={styles.original} title={link.original}>
        {link.original}
      </span>
      <div className={styles.actions}>
        <a
          href={link.shortened}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shortened}
        >
          {link.shortened}
        </a>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label={copied ? `Copied ${link.shortened}` : `Copy ${link.shortened} to clipboard`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </article>
  )
}

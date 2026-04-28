import { useId, useRef, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useUrlShortener } from '../../hooks/useUrlShortener'
import type { ShortenedLink as ShortenedLinkType } from '../../types'
import { ShortenedLink } from './ShortenedLink'
import styles from './UrlShortener.module.css'

const STORAGE_KEY = 'shortly-links'

export function UrlShortener() {
  const errorId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState('')
  const [links, setLinks] = useLocalStorage<ShortenedLinkType[]>(STORAGE_KEY, [])
  const { shorten, loading, error: apiError } = useUrlShortener()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      setValidationError('Please add a link')
      inputRef.current?.focus()
      return
    }
    setValidationError('')

    const shortened = await shorten(inputValue.trim())
    if (shortened) {
      const newLink: ShortenedLinkType = {
        id: crypto.randomUUID(),
        original: inputValue.trim(),
        shortened,
      }
      setLinks((prev) => [newLink, ...prev])
      setInputValue('')
    }
  }

  const displayError = validationError || apiError || ''

  return (
    <section className={styles.wrapper} id="shorten" aria-label="URL shortener">
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Shorten a URL"
        >
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              id="url-input"
              type="url"
              className={`${styles.input} ${displayError ? styles.inputError : ''}`}
              placeholder="Shorten a link here..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                if (validationError) setValidationError('')
              }}
              aria-label="Enter URL to shorten"
              aria-describedby={displayError ? errorId : undefined}
              aria-invalid={!!displayError}
              disabled={loading}
            />
            {displayError && (
              <p id={errorId} className={styles.errorMsg} role="alert">
                {displayError}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Shortening...' : 'Shorten It!'}
          </button>
        </form>
      </div>

      {links.length > 0 && (
        <div className={styles.results} aria-label="Shortened links">
          {links.map((link) => (
            <ShortenedLink key={link.id} link={link} />
          ))}
        </div>
      )}
    </section>
  )
}

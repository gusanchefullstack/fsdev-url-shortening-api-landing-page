import { useState } from 'react'

interface ShortenResult {
  result_url: string
}

export function useUrlShortener() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shorten = async (url: string): Promise<string | null> => {
    setError(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({ url })
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Failed to shorten URL')
      }
      const data = (await response.json()) as ShortenResult
      return data.result_url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { shorten, loading, error, setError }
}

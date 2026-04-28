import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UrlShortener } from '../components/UrlShortener/UrlShortener'

// Stub localStorage
beforeEach(() => {
  localStorage.clear()
})

describe('UrlShortener — form validation', () => {
  it('shows error when form is submitted with empty input', async () => {
    render(<UrlShortener />)
    const btn = screen.getByRole('button', { name: /shorten it/i })
    fireEvent.click(btn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please add a link')
    })
  })

  it('marks input as invalid when empty submit happens', async () => {
    render(<UrlShortener />)
    fireEvent.click(screen.getByRole('button', { name: /shorten it/i }))

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup()
    render(<UrlShortener />)

    fireEvent.click(screen.getByRole('button', { name: /shorten it/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())

    await user.type(screen.getByRole('textbox'), 'h')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('UrlShortener — API integration', () => {
  it('calls fetch on valid URL submit and shows result', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result_url: 'https://rel.ink/abc123' }),
    } as unknown as Response)

    render(<UrlShortener />)
    await user.type(screen.getByRole('textbox'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: /shorten it/i }))

    await waitFor(() => {
      expect(screen.getByText('https://rel.ink/abc123')).toBeInTheDocument()
    })
  })

  it('persists links to localStorage after shortening', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result_url: 'https://rel.ink/xyz' }),
    } as unknown as Response)

    render(<UrlShortener />)
    await user.type(screen.getByRole('textbox'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: /shorten it/i }))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('shortly-links') ?? '[]') as unknown[]
      expect(stored).toHaveLength(1)
    })
  })

  it('shows API error message when request fails', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid URL' }),
    } as unknown as Response)

    render(<UrlShortener />)
    await user.type(screen.getByRole('textbox'), 'not-a-url')
    await user.click(screen.getByRole('button', { name: /shorten it/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid URL')
    })
  })
})

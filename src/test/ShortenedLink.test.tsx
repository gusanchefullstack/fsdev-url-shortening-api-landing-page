import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ShortenedLink } from '../components/UrlShortener/ShortenedLink'
import type { ShortenedLink as LinkType } from '../types'

const mockLink: LinkType = {
  id: 'test-1',
  original: 'https://www.example.com/very/long/path',
  shortened: 'https://rel.ink/abc',
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('ShortenedLink — copy button', () => {
  it('renders the original and shortened URLs', () => {
    render(<ShortenedLink link={mockLink} />)
    expect(screen.getByText(mockLink.original)).toBeInTheDocument()
    expect(screen.getByText(mockLink.shortened)).toBeInTheDocument()
  })

  it('changes button text to "Copied!" after click', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    render(<ShortenedLink link={mockLink} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument()
    })
  })

  it('copies the shortened URL to clipboard', async () => {
    const user = userEvent.setup()
    const writeMock = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)

    render(<ShortenedLink link={mockLink} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))

    expect(writeMock).toHaveBeenCalledWith(mockLink.shortened)
  })
})

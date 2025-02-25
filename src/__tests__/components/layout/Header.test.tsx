import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/providers/theme-provider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <ThemeProvider defaultTheme="light">
        <Header />
      </ThemeProvider>
    )
  }

  it('renders the logo', () => {
    renderHeader()
    expect(screen.getByAltText(/artystone/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderHeader()
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
    expect(screen.getByText(/services/i)).toBeInTheDocument()
    expect(screen.getByText(/contact/i)).toBeInTheDocument()
  })

  it('renders book appointment button', () => {
    renderHeader()
    expect(screen.getByText(/book appointment/i)).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger is clicked', () => {
    renderHeader()
    const hamburger = screen.getByLabelText(/toggle menu/i)
    
    // Click to open
    fireEvent.click(hamburger)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(hamburger)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', () => {
    renderHeader()
    
    // Open mobile menu
    const hamburger = screen.getByLabelText(/toggle menu/i)
    fireEvent.click(hamburger)
    
    // Click a navigation link
    const aboutLink = screen.getByText(/about/i)
    fireEvent.click(aboutLink)
    
    // Menu should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('maintains accessibility attributes', () => {
    renderHeader()
    
    // Check for ARIA landmarks
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Check for button accessibility
    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    
    // Open menu and check aria-expanded
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
}) 
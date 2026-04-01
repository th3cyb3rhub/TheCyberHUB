import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Breadcrumbs } from '../Breadcrumbs'

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
    default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} {...props}>{children}</a>
    ),
}))

// Mock lucide-react icons to simple spans
vi.mock('lucide-react', () => ({
    Home: (props: Record<string, unknown>) => <span data-testid="home-icon" {...props} />,
    ChevronRight: (props: Record<string, unknown>) => <span data-testid="chevron-icon" {...props} />,
}))

describe('Breadcrumbs', () => {
    it('renders the home link', () => {
        render(<Breadcrumbs items={[]} />)
        const homeLink = screen.getByLabelText('Home')
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute('href', '/')
    })

    it('renders breadcrumb items with links', () => {
        const items = [
            { label: 'Blog', href: '/blog' },
            { label: 'My Post' },
        ]
        render(<Breadcrumbs items={items} />)

        const blogLink = screen.getByText('Blog')
        expect(blogLink).toBeInTheDocument()
        expect(blogLink.closest('a')).toHaveAttribute('href', '/blog')
    })

    it('renders the last item as plain text when no href', () => {
        const items = [
            { label: 'Challenges', href: '/challenges' },
            { label: 'Web Exploitation' },
        ]
        render(<Breadcrumbs items={items} />)

        const lastItem = screen.getByText('Web Exploitation')
        expect(lastItem).toBeInTheDocument()
        expect(lastItem.tagName).toBe('SPAN')
        expect(lastItem.closest('a')).toBeNull()
    })

    it('renders chevron separators between items', () => {
        const items = [
            { label: 'First', href: '/first' },
            { label: 'Second', href: '/second' },
        ]
        render(<Breadcrumbs items={items} />)

        const chevrons = screen.getAllByTestId('chevron-icon')
        expect(chevrons).toHaveLength(2)
    })

    it('renders the nav element with correct aria label', () => {
        render(<Breadcrumbs items={[{ label: 'Test' }]} />)
        const nav = screen.getByLabelText('Breadcrumb')
        expect(nav).toBeInTheDocument()
        expect(nav.tagName).toBe('NAV')
    })

    it('handles empty items array', () => {
        render(<Breadcrumbs items={[]} />)
        const nav = screen.getByLabelText('Breadcrumb')
        expect(nav).toBeInTheDocument()
        // Only the home link should be rendered
        const homeLink = screen.getByLabelText('Home')
        expect(homeLink).toBeInTheDocument()
    })

    it('renders multiple linked items correctly', () => {
        const items = [
            { label: 'Resources', href: '/resources' },
            { label: 'Tools', href: '/resources/tools' },
            { label: 'Nmap' },
        ]
        render(<Breadcrumbs items={items} />)

        expect(screen.getByText('Resources').closest('a')).toHaveAttribute('href', '/resources')
        expect(screen.getByText('Tools').closest('a')).toHaveAttribute('href', '/resources/tools')
        expect(screen.getByText('Nmap').closest('a')).toBeNull()
    })
})

'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Home">
                <Home className="h-4 w-4" />
            </Link>
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-gray-400 dark:text-gray-600" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    )
}

"use client"

import React, { useRef } from 'react';
import { ArrowLeft, LucideIcon, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface CheatsheetPageLayoutProps {
    title: string;
    highlightedWord?: string;
    description: string;
    icon: LucideIcon;
    children: React.ReactNode;
    pdfFilename?: string;
}

const CheatsheetPageLayout: React.FC<CheatsheetPageLayoutProps> = ({
    title,
    highlightedWord,
    description,
    icon: Icon,
    children,
    pdfFilename
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const handlePdfExport = async () => {
        if (!contentRef.current || isGenerating) return;

        setIsGenerating(true);

        try {
            const html2pdf = (await import('html2pdf.js')).default;

            const element = contentRef.current;
            const filename = pdfFilename || `${title.toLowerCase().replace(/\s+/g, '-')}-cheatsheet`;

            const opt = {
                margin: [0.5, 0.5, 0.5, 0.5],
                filename: `${filename}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: '#0a0a0a'
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (html2pdf as any)().set(opt).from(element).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    {/* Back Link */}
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            href="/cheatsheets"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Cheatsheets
                        </Link>

                        {/* PDF Export Button */}
                        <button
                            onClick={handlePdfExport}
                            disabled={isGenerating}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 rounded-lg transition-colors"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Icon className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">Cheatsheet</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                            {highlightedWord ? (
                                <>
                                    {title} <span className="text-orange-500">{highlightedWord}</span>
                                </>
                            ) : (
                                title
                            )}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div ref={contentRef} className="pdf-content">
                    {children}
                </div>
            </section>
        </div>
    );
};

export default CheatsheetPageLayout;

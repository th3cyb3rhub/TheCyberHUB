"use client"

import React, { useState, RefObject } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface PdfExportButtonProps {
    contentRef: RefObject<HTMLElement>;
    filename: string;
    title?: string;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({
    contentRef,
    filename,
    title = 'Download PDF'
}) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExport = async () => {
        if (!contentRef.current || isGenerating) return;

        setIsGenerating(true);

        try {
            // Dynamically import html2pdf to avoid SSR issues
            const html2pdf = (await import('html2pdf.js')).default;

            const element = contentRef.current;

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
        <button
            onClick={handleExport}
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
                    {title}
                </>
            )}
        </button>
    );
};

export default PdfExportButton;

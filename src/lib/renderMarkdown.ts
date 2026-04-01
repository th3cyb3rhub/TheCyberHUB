/**
 * Simple markdown-to-HTML renderer for preview purposes.
 * Used in blog write/edit and event edit pages.
 * Output MUST be sanitized with DOMPurify before rendering via dangerouslySetInnerHTML.
 */
export function renderMarkdownToHtml(text: string): string {
    return text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>')
        // Bold & Italic
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/50 border border-white/10 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-orange-400 text-sm">$2</code></pre>')
        // Inline code
        .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-orange-400 text-sm">$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-400 hover:text-orange-300 underline" target="_blank">$1</a>')
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg max-w-full my-4" />')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-orange-500 pl-4 my-4 text-gray-400 italic">$1</blockquote>')
        // Lists
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-gray-300">$1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-gray-300">$1</li>')
        // Line breaks
        .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4">')
        .replace(/\n/g, '<br />');
}

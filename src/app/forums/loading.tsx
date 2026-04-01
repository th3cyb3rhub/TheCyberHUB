export default function Loading() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/60 text-sm">Loading...</p>
            </div>
        </div>
    )
}

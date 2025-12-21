import { SkeletonRoadmapsGrid } from '@/components/ui/SkeletonRoadmap';

export default function RoadmapsLoading() {
    return (
        <div className="min-h-screen bg-black pt-32 pb-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <SkeletonRoadmapsGrid />
            </div>
        </div>
    );
}

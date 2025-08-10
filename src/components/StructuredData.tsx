// components/StructuredData.tsx
import React from 'react';

interface StructuredDataProps {
    data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data)
            }}
        />
    );
};

export default StructuredData;
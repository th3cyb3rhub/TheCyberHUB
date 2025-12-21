// components/StructuredData.tsx
import React from 'react';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface StructuredDataProps {
    data: Record<string, JsonValue>;
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
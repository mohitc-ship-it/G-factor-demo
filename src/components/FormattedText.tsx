import React from 'react';

interface FormattedTextProps {
    text: string;
    className?: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
    if (!text) return null;

    // Split by newlines to handle paragraphs and lists
    const lines = text.split('\n');

    return (
        <div className={`space-y-1 ${className}`}>
            {lines.map((line, lineIndex) => {
                // Handle empty lines as spacing
                if (!line.trim()) {
                    return <div key={lineIndex} className="h-2" />;
                }

                // Check for bullet points
                const isBullet = line.trim().startsWith('- ');
                const content = isBullet ? line.trim().substring(2) : line;

                // Parse bold text (**text**)
                const parts = content.split(/(\*\*.*?\*\*)/g);

                const formattedContent = parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                            <strong key={partIndex} className="font-bold">
                                {part.slice(2, -2)}
                            </strong>
                        );
                    }
                    return <span key={partIndex}>{part}</span>;
                });

                if (isBullet) {
                    return (
                        <div key={lineIndex} className="flex items-start gap-2 ml-2">
                            <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                            <p className="leading-relaxed">{formattedContent}</p>
                        </div>
                    );
                }

                return (
                    <p key={lineIndex} className="leading-relaxed">
                        {formattedContent}
                    </p>
                );
            })}
        </div>
    );
};

export default FormattedText;

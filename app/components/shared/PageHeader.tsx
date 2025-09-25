import React from 'react';

interface FeatureBadge {
  color: string;
  text: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  features?: FeatureBadge[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  gradientFrom,
  gradientTo,
  features
}) => {
  return (
    <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} border-b border-neutral-200 section-reveal delay-header`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            {description}
          </p>
          {features && features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-background">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className={`w-3 h-3 ${feature.color} rounded-full`}></div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
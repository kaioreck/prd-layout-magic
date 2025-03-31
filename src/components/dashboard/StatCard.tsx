
import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  tooltipText?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  tooltipText,
  trend,
  trendValue,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-100 p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-500">
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {icon && <div className="text-trinks-blue">{icon}</div>}
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      {trend && trendValue && (
        <div className="mt-2">
          <span 
            className={`text-xs font-medium px-2 py-1 rounded ${
              trend === 'up' 
                ? 'bg-green-100 text-green-800' 
                : trend === 'down' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {trend === 'up' && '↑ '}
            {trend === 'down' && '↓ '}
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;


import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Set/24', resultado: 0.0, receita: 0.0, despesa: 0.0 },
  { name: 'Out/24', resultado: 0.1, receita: 0.2, despesa: 0.1 },
  { name: 'Nov/24', resultado: 0.3, receita: 0.5, despesa: 0.2 },
  { name: 'Dez/24', resultado: 0.2, receita: 0.3, despesa: 0.1 },
  { name: 'Jan/25', resultado: 0.4, receita: 0.7, despesa: 0.3 },
  { name: 'Fev/25', resultado: 0.5, receita: 0.9, despesa: 0.4 },
];

interface RevenueChartProps {
  title: string;
  showLegend?: boolean;
  height?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  title, 
  showLegend = true,
  height = 300
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
            {showLegend && (
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
              />
            )}
            <Area 
              type="monotone" 
              dataKey="resultado" 
              stroke="#427ED7" 
              fill="#427ED7" 
              fillOpacity={0.3} 
              activeDot={{ r: 8 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

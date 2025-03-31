
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Set/24', receita: 0.4, despesa: 0.2 },
  { name: 'Out/24', receita: 0.6, despesa: 0.3 },
  { name: 'Nov/24', receita: 0.8, despesa: 0.5 },
  { name: 'Dez/24', receita: 0.9, despesa: 0.4 },
  { name: 'Jan/25', receita: 0.7, despesa: 0.3 },
  { name: 'Fev/25', receita: 1.0, despesa: 0.5 },
];

interface ComparisonChartProps {
  title: string;
  height?: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ title, height = 300 }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Wrapping with conditional rendering to prevent initial rendering issues */}
        {typeof window !== 'undefined' && (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$ ${value.toFixed(2)}`} />
              <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
              <Legend />
              <Bar dataKey="receita" name="Receita" fill="#4CAF50" />
              <Bar dataKey="despesa" name="Despesa" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;

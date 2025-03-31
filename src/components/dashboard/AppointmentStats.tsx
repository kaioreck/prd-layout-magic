
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Set/24', atendimentos: 0 },
  { name: 'Out/24', atendimentos: 3 },
  { name: 'Nov/24', atendimentos: 5 },
  { name: 'Dez/24', atendimentos: 9 },
  { name: 'Jan/25', atendimentos: 7 },
  { name: 'Fev/25', atendimentos: 10 },
];

interface AppointmentStatsProps {
  title: string;
  height?: number;
}

const AppointmentStats: React.FC<AppointmentStatsProps> = ({ title, height = 300 }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
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
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="atendimentos"
              stroke="#5F95E7"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentStats;

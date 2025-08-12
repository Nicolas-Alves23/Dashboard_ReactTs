// Dashboard.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataPoint {
  name: string;
  uv: number;
}

const initialData: DataPoint[] = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 7300 },
  { name: 'Mar', uv: 500 },
  { name: 'abr', uv: 500 },
  { name: 'may', uv: 500 },
  { name: 'jun', uv: 500 },
  { name: 'jul', uv: 500 },
];

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(initialData);

  // Atualiza o valor 'uv' do mês pelo índice de forma imutável
  const handleChange = (index: number, value: string) => {
    const parsedValue = Number(value);
    if (!isNaN(parsedValue)) {
      setData(prevData =>
        prevData.map((item, i) =>
          i === index ? { ...item, uv: parsedValue } : item
        )
      );
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard Manipulável</h2>

      {/* Inputs para editar os valores */}
      <div style={{ marginBottom: 20 }}>
        {data.map((point, idx) => (
          <div key={point.name} style={{ marginBottom: 8 }}>
            <label style={{ marginRight: 8 }}>
              {point.name}:
              <input
                type="number"
                value={point.uv}
                onChange={(e) => handleChange(idx, e.target.value)}
                style={{ marginLeft: 8, width: 100 }}
              />
            </label>
          </div>
        ))}
      </div>

      {/* Gráfico atualizado automaticamente */}
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;

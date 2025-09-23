import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'April 1',
    Tomato: 40,
    Apple: 240,
    Fish: 300,
    Lentils: 90,
    amt: 30,
  },
  {
    name: 'April 4',
    Tomato: 30,
    Apple: 170,
    Fish: 198,
    Lentils: 100,
    amt: 50,
  },
  {
    name: 'April 9',
    Tomato: 45,
    Apple: 200,
    Fish: 220,
    Lentils: 150,
    amt: 100,
  },
  {
    name: 'April 11',
    Tomato: 35,
    Apple: 250,
    Fish: 380,
    Lentils: 50,
    amt: 150,
  },
  {
    name: 'April 17',
    Tomato: 40,
    Apple: 300,
    Fish: 250,
    Lentils: 140,
    amt: 200,
  },
  {
    name: 'April 20',
    Tomato: 45,
    Apple: 100,
    Fish: 150,
    Lentils: 120,
    amt: 300,
  },
];

export default function Example() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Apple" stroke="#170cddff" activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="Tomato" stroke="#e21b25ff" />
        <Line type="monotone" dataKey="Fish" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Lentils" stroke="#c7eb12ff" />
      </LineChart>
    </ResponsiveContainer>
  );
}

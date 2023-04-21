import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
export default function ProductSalesChart({ data }) {

    const theme = useTheme();
    const pieColors =[
        theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
    ]
    // console.log(data)
    
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${percent}%`} 
    </text>
  );
};
    return (
        <Card>
        <CardHeader title="Sales Chart" />
        <ResponsiveContainer width="100%" height={500}>
            <PieChart width={250} height={250}>
            {/* <Pie data={data} dataKey="percent" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" /> */}
                <Pie
                    dataKey="percent"
                    nameKey="name"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    // label={renderCustomizedLabel}
                    // labelLine={false}
                    label
                >  {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend layout="vetical" verticalAlign="top" align="right"/>
            </PieChart>
        </ResponsiveContainer>
        </Card>


    );
}
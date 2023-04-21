import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { Card, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function UserSalesChart({ data }) {
    const theme = useTheme();
    const barColors = [
        theme.palette.error.main,
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.warning.main,
       ]
    return (
        <Card>
        <CardHeader title="User Sales Chart" />
       <ResponsiveContainer width="100%" height={500}>
         <BarChart
            data={data}
        >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="userDetails.name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="total" fill="green"  /> */}
             {/* <Bar dataKey="total" fill="green" stroke="#000000"
                    strokeWidth={5} />  */}
            <Bar dataKey="total"  stroke="#000000"
                    strokeWidth={1} >
                        {
                        data.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        ))
                    }
             </Bar> 
        </BarChart>
       </ResponsiveContainer>
       </Card>
       
        
    );
}
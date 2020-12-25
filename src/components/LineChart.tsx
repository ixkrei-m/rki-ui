import { useChartDataProvider } from "components/ChartDataProvider";
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Brush,
  AreaChart,
  Area,
} from "recharts";
import { formatValue } from "components/Chart";

function LineChart() {
  const { data, width, cases, recovered, deaths } = useChartDataProvider();

  return (
    <RechartsLine data={data} width={width} height={500}>
      <XAxis type='category' dataKey='date' height={60} />
      <YAxis type='number' width={80} />
      <Tooltip
        formatter={formatValue}
        contentStyle={{ backgroundColor: "#333", borderRadius: "6px" }}
      />
      <Legend verticalAlign='top' />
      <CartesianGrid />
      <Brush dataKey='date'>
        <AreaChart>
          <CartesianGrid />
          <Area dataKey='date' stroke='#ff7300' fill='#333' dot={false} />
        </AreaChart>
      </Brush>
      {cases && (
        <Line
          key='dailyCases'
          name='Neuinfektionen'
          type='monotone'
          dataKey='dailyCases'
          stroke='#ff7300'
          strokeWidth={2}
        />
      )}
      {recovered && (
        <Line
          key='dailyRecovered'
          name='Genesen'
          type='monotone'
          dataKey='dailyRecovered'
          stroke='#076fc4'
          strokeWidth={2}
        />
      )}
      {deaths && (
        <Line
          key='dailyDeaths'
          name='Todesfälle'
          type='monotone'
          dataKey='dailyDeaths'
          stroke='#8a34da'
          strokeWidth={2}
        />
      )}
    </RechartsLine>
  );
}

export default LineChart;

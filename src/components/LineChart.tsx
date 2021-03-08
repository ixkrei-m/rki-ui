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
import { formatValue } from "helper";
import { useChartControlContext } from "components/ChartControl";

function LineChart() {
  const { width, data, handleOnChangeBrush, cartesian } = useChartControlContext();

  const startIndex = cartesian[LineChart.name].startIndex;
  const endIndex = cartesian[LineChart.name].endIndex;
  const { cases, recovered, deaths } = cartesian[LineChart.name];

  return (
    <RechartsLine data={data!} width={(width && width) || 0} height={500}>
      <XAxis type='category' dataKey='date' height={60} />
      <YAxis type='number' width={80} />
      <Tooltip
        formatter={formatValue}
        contentStyle={{ backgroundColor: "#333", borderRadius: "6px" }}
      />
      <Legend verticalAlign='top' />
      <CartesianGrid />
      <Brush
        dataKey='date'
        startIndex={startIndex}
        endIndex={endIndex}
        onChange={({ startIndex, endIndex }) =>
          handleOnChangeBrush(LineChart.name, startIndex, endIndex)
        }
      >
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
          dot={false}
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
          dot={false}
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
          dot={false}
        />
      )}
    </RechartsLine>
  );
}

export default LineChart;

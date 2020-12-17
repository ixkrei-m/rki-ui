import React, { useState } from "react";
import { useChartDataProvider } from "components/ChartDataProvider";
import { Visibility, VisibilityEventData, Header } from "semantic-ui-react";
import {
  BarChart as RechartsBar,
  Bar,
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

function BarChart() {
  const { data, cases, recovered, deaths } = useChartDataProvider();
  const [width, setWidth] = useState(0);

  return (
    <Visibility
      updateOn='repaint'
      onUpdate={(nothing: null, data: VisibilityEventData) => setWidth(data.calculations.width)}
    >
      <Header as='h3' inverted content='Fallzahlen Total' />
      <RechartsBar data={data} width={width} height={500}>
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
        {cases && <Bar key='cases' name='Infektionen' dataKey='cases' fill='#ff7300' />}
        {recovered && <Bar key='recovered' name='Genesen' dataKey='recovered' fill='#076fc4' />}
        {deaths && <Bar key='deaths' name='Todesfälle' dataKey='deaths' fill='#8a34da' />}
      </RechartsBar>
    </Visibility>
  );
}

export default BarChart;

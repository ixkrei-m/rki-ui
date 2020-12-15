import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { Header, Label, Loader } from "semantic-ui-react";
import {
  LineChart,
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

interface IGeneral {
  lastUpdate: string;
  id: number;
  recovered: number;
  cases: number;
  dailyCases: number;
  dailyRecovered: number;
  dailyDeaths: number;
  createdAt: string;
  updatedAt: string;
  date: Moment;
}

interface IFetchError {
  code: number;
  text: string;
}

function Chart() {
  const [data, setData] = useState<IGeneral[]>(undefined!);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IFetchError>(undefined!);

  useEffect(() => {
    setLoading(true);

    fetch("https://corona.maximilianhaindl.de/api/general")
      .then((res) => {
        if (res.ok)
          res.json().then((rawData) => {
            setLoading(false);
            rawData.rep.generals.shift();
            const data = rawData.rep.generals.map((item: IGeneral) => ({
              ...item,
              date: moment(item.date).format("dd L"),
            }));
            setData(data);
          });
        else {
          setError({ code: res.status, text: res.statusText });
          setLoading(false);
        }
      })
      .catch((error) => {
        setError({ code: error.code, text: error.msg });
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {!loading && error && (
        <div>
          <Header inverted as='h3' content='Error' />
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      {!loading && data && (
        <LineChart data={data} width={1028} height={500}>
          <XAxis type='category' dataKey='date' height={60} />
          <YAxis type='number' width={80} />
          <Tooltip
            wrapperStyle={{ borderColor: "white", borderRadius: "5px" }}
            contentStyle={{ backgroundColor: "#333" }}
          />
          <Legend />
          <CartesianGrid />
          <Brush dataKey='date' startIndex={data.length - 7}>
            <AreaChart>
              <CartesianGrid />
              <Area dataKey='date' stroke='#ff7300' fill='#333' dot={false} />
            </AreaChart>
          </Brush>
          <Line
            key='dailyCases'
            type='monotone'
            dataKey='dailyCases'
            stroke='#ff7300'
            strokeWidth={2}
          />
          <Line
            key='dailyRecovered'
            type='monotone'
            dataKey='dailyRecovered'
            stroke='#076fc4'
            strokeWidth={2}
          />
          <Line
            key='dailyDeaths'
            type='monotone'
            dataKey='dailyDeaths'
            stroke='#5910ce'
            strokeWidth={2}
          />
        </LineChart>
      )}
      <Loader active={loading}>
        <Label circular basic size='large' content='hole Daten...' color='orange' />
      </Loader>
    </React.Fragment>
  );
}

export default Chart;

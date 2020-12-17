import React, { useEffect, useState } from "react";
import { Grid, Header, Loader, Icon } from "semantic-ui-react";
import moment, { Moment } from "moment";
import { useTransition, animated } from "react-spring";
import { TooltipPayload } from "recharts";

import ChartDataProvider from "components/ChartDataProvider";
import LineChart from "components/LineChart";
import BarChart from "components/BarChart";

export interface IGeneral {
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

/**
 * helper function to format number with separators
 */
export function formatValue(
  value: string | number | React.ReactText[],
  name: string,
  entry: TooltipPayload,
  index: number
) {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function Chart() {
  const [data, setData] = useState<IGeneral[]>(undefined!);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IFetchError>(undefined!);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("");

  const chartComponents = [<LineChart />, <BarChart />];

  useEffect(() => {
    setLoading(true);

    fetch("https://corona.maximilianhaindl.de/api/general")
      .then((res) => {
        if (res.ok) {
          res.json().then((rawData) => {
            setLoading(false);
            const data = rawData.rep.generals.map((item: IGeneral) => ({
              ...item,
              date: moment(item.date).format("dd L"),
            }));
            setData(data);
          });
        } else {
          setError({ code: res.status, text: res.statusText });
          setLoading(false);
        }
      })
      .catch((error) => {
        setError({ code: error.code, text: error.msg });
        setLoading(false);
      });
  }, []);

  const transitions = useTransition(chartComponents[index], index, {
    from: {
      opacity: 0,
      transform: direction === "left" ? "translateX(-100%)" : "translateX(100%)",
    },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: {
      opacity: 0,
      transform: direction === "left" ? "translateX(50%)" : "translateX(-50%)",
    },
  });

  return (
    <React.Fragment>
      {!loading && error && (
        <React.Fragment>
          <Header inverted as='h3' content='Fehler beim Laden der Daten' />
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </React.Fragment>
      )}

      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column
            onClick={() => {
              setDirection("left");
              setIndex((old) => (old - 1 + chartComponents.length) % chartComponents.length);
            }}
            className='center-button row-background-left'
            width='3'
          >
            <Icon size='big' color='grey' name='angle left' />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column
            onClick={() => {
              setDirection("right");
              setIndex((old) => (old + 1) % chartComponents.length);
            }}
            className='center-button row-background-right'
            width='3'
          >
            <Icon size='big' color='grey' name='angle right' />
          </Grid.Column>
        </Grid.Row>

        {data && !error && !loading && (
          <Grid.Row>
            <div className='chart-container'>
              {transitions.map(({ item, props, key }) => {
                return (
                  <animated.div key={key} style={{ ...props, position: "absolute", width: "100%" }}>
                    <ChartDataProvider data={data}>{item}</ChartDataProvider>
                  </animated.div>
                );
              })}
            </div>
          </Grid.Row>
        )}
        <Loader active={loading} inverted />
      </Grid>
    </React.Fragment>
  );
}

export default Chart;

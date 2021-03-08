import React from "react";
import { Header } from "semantic-ui-react";
import { useTransition, animated } from "react-spring";

import ChartControl, { ChartComponents } from "components/ChartControl";

interface RenderProps {
  direction: string;
  index: number;
}

interface RenderTransitionHeaderProps extends RenderProps {
  headers: string[];
}

interface RenderTransitionChartProps extends RenderProps {
  chartComponents: ChartComponents[];
}

function Chart() {
  return (
    <ChartControl>
      <ChartControl.Switch />
      <ChartControl.Header>
        {(direction, index, headers) => (
          <RenderTransitionHeader direction={direction} index={index} headers={headers} />
        )}
      </ChartControl.Header>
      <ChartControl.Chart>
        {(direction, index, chartComponents) => {
          return (
            <RenderTransitionChart
              direction={direction}
              index={index}
              chartComponents={chartComponents}
            />
          );
        }}
      </ChartControl.Chart>
      <ChartControl.Toggles />
    </ChartControl>
  );
}

function RenderTransitionHeader(props: RenderTransitionHeaderProps) {
  const { direction, index, headers } = props;

  const headerTransitions = useTransition(headers[index], index, {
    from: {
      opacity: 0,
      transform: direction === "left" ? "translateX(-100%)" : "translateX(100%)",
    },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: {
      opacity: 0,
      transform: direction === "left" ? "translateX(80%)" : "translateX(-50%)",
    },
  });

  return (
    <React.Fragment>
      {headerTransitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={{ ...props, position: "absolute", width: "100%" }}>
            <Header as='h3' inverted content={item} />
          </animated.div>
        );
      })}
    </React.Fragment>
  );
}

function RenderTransitionChart(props: RenderTransitionChartProps) {
  const { direction, index, chartComponents } = props;

  const component = chartComponents[index];

  const chartTransitions = useTransition(component, index, {
    config: { mass: 2, tension: 75, friction: 16 },
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
    <div className='chart-container' id='chart-container'>
      {chartTransitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={{ ...props, position: "absolute", width: "100%" }}>
            {item.comp()}
          </animated.div>
        );
      })}
    </div>
  );
}

export default Chart;

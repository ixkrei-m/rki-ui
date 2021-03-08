import React from "react";
import { Header } from "semantic-ui-react";
import { useTransition, animated } from "react-spring";

import ChartControl, { ChartComponents } from "components/ChartControl";

interface RenderTransitionProps {
  chartComponents: ChartComponents[];
  direction: string;
  index: number;
}

function Chart() {
  return (
    <ChartControl>
      <ChartControl.Switch />
      <ChartControl.Header>
        {(direction, index, chartComponents) => (
          <RenderTransitionHeader
            direction={direction}
            index={index}
            chartComponents={chartComponents}
          />
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

function RenderTransitionHeader(props: RenderTransitionProps) {
  const { direction, index, chartComponents } = props;

  const headerTransitions = useTransition(chartComponents[index], index, {
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
            <Header as='h3' inverted content={item.props.header} />
          </animated.div>
        );
      })}
    </React.Fragment>
  );
}

function RenderTransitionChart(props: RenderTransitionProps) {
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
            {item.comp({ name: item.name })}
          </animated.div>
        );
      })}
    </div>
  );
}

export default Chart;

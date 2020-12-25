import React, { useState } from "react";
import { Checkbox, CheckboxProps, Grid, Visibility, VisibilityEventData } from "semantic-ui-react";
import { IGeneral } from "./Chart";

interface OwnProps {
  children: JSX.Element;
  data: IGeneral[];
}

interface ChartState {
  data: IGeneral[];
  width: number;
  cases: boolean;
  recovered: boolean;
  deaths: boolean;
}

const ChartDataProviderContext = React.createContext<ChartState>(undefined!);

export function useChartDataProvider() {
  const context = React.useContext(ChartDataProviderContext);

  if (context === undefined)
    throw new Error("useChartDataProvider must be used within ChartDataProvider.");

  return context;
}

export default function ChartDataProvider(ownProps: OwnProps) {
  const { data } = ownProps;

  const [cases, setCases] = useState(true);
  const [recovered, setRecovered] = useState(true);
  const [deaths, setDeaths] = useState(true);
  const [width, setWidth] = useState(0);

  return (
    <React.Fragment>
      <Grid.Column>
        <ChartDataProviderContext.Provider value={{ data, width, cases, recovered, deaths }}>
          <Visibility
            updateOn='repaint'
            onUpdate={(nothing: null, data: VisibilityEventData) =>
              setWidth(data.calculations.width)
            }
          >
            {ownProps.children}
          </Visibility>
        </ChartDataProviderContext.Provider>
      </Grid.Column>

      <Grid>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Checkbox
              onClick={(event: any, data: CheckboxProps) => setCases((old) => !old)}
              checked={cases}
              label='Infektionen'
              slider
              className='padding white-label'
            />
            <Checkbox
              onClick={(event: any, data: CheckboxProps) => setRecovered((old) => !old)}
              checked={recovered}
              label='Genesen'
              slider
              className='padding white-label'
            />
            <Checkbox
              onClick={(event: any, data: CheckboxProps) => setDeaths((old) => !old)}
              checked={deaths}
              label='Todesfälle'
              slider
              className='padding white-label'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

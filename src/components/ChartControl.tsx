import React, { createContext, useContext } from "react";
import {
  Checkbox,
  CheckboxProps,
  Grid,
  Icon,
  Visibility,
  VisibilityEventData,
  Loader,
  Header,
} from "semantic-ui-react";
import moment, { Moment } from "moment";

import LineChart from "components/LineChart";
import BarChart from "components/BarChart";

export interface ChartComponents {
  name: string;
  comp: (props: ChartComponentProps) => JSX.Element;
  props: {
    [key: string]: any;
    header: string;
  };
}

interface HeaderProps {
  children: (direction: string, index: number, chartComponents: ChartComponents[]) => JSX.Element;
}

export interface ChartComponentProps {
  name: string;
}

interface ChartProps {
  children: (direction: string, index: number, chartComponents: ChartComponents[]) => JSX.Element;
}

export interface General {
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

interface FetchError {
  code: number;
  text: string;
}

interface CartesianState {
  [key: string]: {
    startIndex?: number;
    endIndex?: number;
    cases?: boolean;
    recovered?: boolean;
    deaths?: boolean;
  };
}

interface ChartControlState {
  chartComponents: ChartComponents[];
  index: number;
  direction: string;
  width?: number | null;
  switchCharts: (direction: string, index: number) => void;
  handleVisibility: (width: number) => void;
  handleOnChangeBrush: (componentName: string, startIndex: number, endIndex: number) => void;
  handleOnChangeToggle: (
    componentName: string,
    cases?: boolean,
    recovered?: boolean,
    deaths?: boolean
  ) => void;
  cartesian: CartesianState;
  data: General[];
  loading: boolean;
  error?: FetchError;
}

const ChartControlContext = createContext<ChartControlState>(undefined!);

export const useChartControlContext = () => {
  const context = useContext(ChartControlContext);

  if (context === undefined)
    throw new Error("useChartControlContext has to be used within ChartControlContext.Provider");

  return context;
};

class ChartControl extends React.Component<{}, ChartControlState> {
  static Consumer = ChartControlContext.Consumer;
  public chartComponents: ChartComponents[];

  constructor(props: {}) {
    super(props);

    this.chartComponents = [
      { name: "LineChart", comp: LineChart, props: { header: "Fallzahlen pro Tag" } },
      { name: "BarChart", comp: BarChart, props: { header: "Fallzahlen Total" } },
    ];

    this.state = {
      chartComponents: this.chartComponents,
      index: 0,
      direction: "",
      width: 0,
      switchCharts: this.handleSwitchCharts,
      handleVisibility: this.handleVisibility,
      handleOnChangeBrush: this.handleOnChangeBrush,
      handleOnChangeToggle: this.handleOnChangeToggle,
      cartesian: this.createCartesianState(),
      data: undefined!,
      loading: false,
      error: undefined,
    };
  }

  public componentDidMount() {
    this.setState({ ...this.state, loading: true });

    fetch("https://corona.maximilianhaindl.de/api/general")
      .then((res) => {
        if (res.ok) {
          res.json().then((rawData) => {
            this.setState({ ...this.state, loading: false });

            const data: General[] = rawData.rep.generals.map((item: General) => ({
              ...item,
              date: moment(item.date).format("dd L"),
            }));

            this.setState({
              ...this.state,
              data,
              width: document.getElementById("chart-container")?.clientWidth,
              cartesian: this.getDefaultIndex(data),
            });
          });
        } else {
          this.setState({
            ...this.state,
            error: { code: res.status, text: res.statusText },
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          error: { code: error.status, text: error.statusText },
          loading: false,
        });
      });
  }

  private getDefaultIndex(data: General[]) {
    const object: CartesianState = {};

    this.chartComponents.forEach(({ name }) => {
      object[name] = {
        ...this.state.cartesian[name],
        startIndex: data.length - 30,
      };
    });

    return object;
  }

  private createCartesianState() {
    let object: CartesianState = {};
    const state = { cases: true, recovered: true, deaths: true, startIndex: 0, endIndex: 0 };

    this.chartComponents.forEach(({ name }) => {
      object[name] = state;
    });

    return object;
  }

  public handleSwitchCharts = (direction: string, index: number) =>
    this.setState({ ...this.state, direction, index });

  public handleVisibility = (width: number) => this.setState({ ...this.state, width });

  public handleOnChangeBrush = (componentName: string, startIndex: number, endIndex: number) =>
    this.setState({
      ...this.state,
      cartesian: {
        ...this.state.cartesian,
        [componentName]: { ...this.state.cartesian[componentName], startIndex, endIndex },
      },
    });

  public handleOnChangeToggle = (
    componentName: string,
    cases?: boolean,
    recovered?: boolean,
    deaths?: boolean
  ) =>
    this.setState({
      ...this.state,
      cartesian: {
        ...this.state.cartesian,
        [componentName]: { ...this.state.cartesian[componentName], cases, recovered, deaths },
      },
    });

  static Switch() {
    return (
      <ChartControl.Consumer>
        {({ switchCharts, index, chartComponents }) => (
          <Grid.Row>
            <Grid.Column
              onClick={() => {
                switchCharts("left", (index - 1 + chartComponents.length) % chartComponents.length);
              }}
              className='center-button row-background-left'
              width='3'
            >
              <Icon size='big' color='grey' name='angle left' />
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
            {/** @todo: ^get rid of this shit^ */}
            <Grid.Column
              onClick={() => {
                switchCharts("right", (index + 1) % chartComponents.length);
              }}
              className='center-button row-background-right'
              width='3'
            >
              <Icon size='big' color='grey' name='angle right' />
            </Grid.Column>
          </Grid.Row>
        )}
      </ChartControl.Consumer>
    );
  }

  static Header(props: HeaderProps) {
    const { children } = props;

    return (
      <ChartControl.Consumer>
        {({ index, direction, chartComponents, loading, error }) => {
          return (
            <Grid.Row>
              <Grid.Column>
                {!loading && !error && children(direction, index, chartComponents)}
                {!loading && error && (
                  <Header inverted as='h3' content='Fehler beim Laden der Daten' />
                )}
              </Grid.Column>
            </Grid.Row>
          );
        }}
      </ChartControl.Consumer>
    );
  }

  static Chart(props: ChartProps) {
    const { children } = props;

    return (
      <ChartControl.Consumer>
        {({ direction, index, handleVisibility, chartComponents, loading, error }) => {
          return (
            <Grid.Row>
              <Grid.Column>
                <Visibility
                  onUpdate={(nothing: null, data: VisibilityEventData) => {
                    handleVisibility(data.calculations.width);
                  }}
                >
                  {!loading && !error && <div>{children(direction, index, chartComponents)}</div>}
                  {!loading && error && <RenderFetchErrorMessage error={error} />}
                </Visibility>
                <Loader active={loading} inverted content='Lade Daten...' size='large' />
              </Grid.Column>
            </Grid.Row>
          );
        }}
      </ChartControl.Consumer>
    );
  }

  static Toggles() {
    return (
      <ChartControl.Consumer>
        {({ handleOnChangeToggle, cartesian, chartComponents, index, loading, error }) => {
          const { cases, recovered, deaths } = cartesian[chartComponents[index].name];
          const { name } = chartComponents[index];

          return (
            !loading &&
            !error && (
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Checkbox
                    name='cases'
                    onClick={(event: any, data: CheckboxProps) =>
                      handleOnChangeToggle(name, !cases, recovered, deaths)
                    }
                    checked={cases}
                    label='Infektionen'
                    className='padding white-label'
                    slider
                  />
                  <Checkbox
                    name='recovered'
                    onClick={(event: any, data: CheckboxProps) =>
                      handleOnChangeToggle(name, cases, !recovered, deaths)
                    }
                    checked={recovered}
                    label='Genesen'
                    className='padding white-label'
                    slider
                  />
                  <Checkbox
                    name='deaths'
                    onClick={(event: any, data: CheckboxProps) =>
                      handleOnChangeToggle(name, cases, recovered, !deaths)
                    }
                    checked={deaths}
                    label='Todesfälle'
                    className='padding white-label'
                    slider
                  />
                </Grid.Column>
              </Grid.Row>
            )
          );
        }}
      </ChartControl.Consumer>
    );
  }

  public render(): React.ReactNode {
    return (
      <ChartControlContext.Provider value={{ ...this.state }}>
        <Grid columns='equal'>{this.props.children}</Grid>
      </ChartControlContext.Provider>
    );
  }
}

interface RenderFetchErrorMessageProps {
  error: FetchError;
}

function RenderFetchErrorMessage(props: RenderFetchErrorMessageProps) {
  const { error } = props;

  return (
    <React.Fragment>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </React.Fragment>
  );
}

export default ChartControl;

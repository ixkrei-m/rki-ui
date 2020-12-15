import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/de";

import Chart from "Chart";

moment.locale("de");

function App() {
  return (
    <Container as='main' style={{ padding: "100px 0" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header inverted as='h1'>
              Corona Statistiken direkt vom Robert-Koch-Institut
              <Header.Subheader>Daten werden jeden Tag um 10:00 Uhr aktualisiert</Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Chart />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;

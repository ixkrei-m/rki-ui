import React from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";

import Chart from "components/Chart";

function Layout() {
  return (
    <React.Fragment>
      <div className='pre-main-content'>
        <Container as='main'>
          <Header inverted as='h1'>
            Corona Charts für Deutschland
            <Header.Subheader>Daten werden täglich um 10:00 Uhr aktualisiert</Header.Subheader>
          </Header>
          <Divider section hidden />

          <Grid columns='1' centered>
            <Grid.Column>
              <Chart />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Layout;

import React from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";

import Chart from "components/Chart";
import Footer from "components/Footer";

function Layout() {
  return (
    <React.Fragment>
      <div className='pre-main-content'>
        <div className='main-content'>
          <Container as='main'>
            <Header inverted as='h1' content='Corona Charts für Deutschland 🇩🇪' />
            <Divider section hidden />

            <Grid columns='1' centered>
              <Grid.Column>
                <Chart />
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </div>

      <Container as='footer' fluid className='no-margin'>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default Layout;

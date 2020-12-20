import React from "react";
import { Segment, Grid, Icon, Button, SemanticICONS, Image } from "semantic-ui-react";

const Footer = () => {
  const brandIcons = ["github"];

  return (
    <React.Fragment>
      <Image src='/assets/images/footer-background.png' />
      <Segment attached className='custom-segment' padded='very'>
        <Grid container padded='vertically' stackable columns='equal'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column textAlign='left'>
              <span>
                Die Daten kommen indirekt vom Robert Koch-Institut und werden t&auml;glich um 10:00
                Uhr deutscher Zeit aktualisiert.
              </span>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <span>Made with ❤️ in React and Typescript</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='left'>
              <span>
                Link zur{" "}
                <a
                  href='https://github.com/marlon360/rki-covid-api'
                  rel='noreferrer'
                  target='_blank'
                >
                  Datenquelle
                </a>
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='left'>
              {brandIcons.map((name) => (
                <Button
                  key={name}
                  as='a'
                  href={`https://${name}.com/ixkrei-m`}
                  target='_blank'
                  icon
                  circular
                  color='olive'
                >
                  <Icon name={name as SemanticICONS} color='black' />
                </Button>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default Footer;

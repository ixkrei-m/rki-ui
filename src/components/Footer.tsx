import React from "react";
import { Segment, Grid, Icon, Button, SemanticICONS, Image } from "semantic-ui-react";

const Footer = () => {
  const brandIcons = ["github"];

  return (
    <React.Fragment>
      <Image src='/assets/images/footer-background.png' />
      <Segment attached className='footer-segment-main'>
        <Grid container padded='vertically' stackable columns='equal'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column textAlign='left'>
              <span>
                Datenquelle ist die API von{" "}
                <a
                  href='https://github.com/marlon360/rki-covid-api'
                  rel='noreferrer'
                  target='_blank'
                >
                  Marlon L&uuml;ckert
                </a>{" "}
                , welche offizielle Daten direkt vom Robert Koch-Institut bezieht. Die Daten werden
                täglich um 10:00 Uhr deutscher Zeit aktualisiert.
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='left'>
              <span>Made with ❤️ in Bavaria</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className='footer-segment-brand-buttons'>
        <Grid container padded='vertically' stackable columns='equal'>
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

import React from "react";
import moment from "moment";

import Layout from "components/Layout";

import "moment/locale/de";

moment.locale("de");

function App() {
  return (
    <React.Fragment>
      <Layout />
    </React.Fragment>
  );
}

export default App;

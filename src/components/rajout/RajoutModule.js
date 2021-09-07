import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { RajoutProvider } from "../../context/RajoutContext";
import { StationProvider } from "../../context/StationContext";
import AddRajout from "./AddRajout";
import EditRajout from "./EditRajout";
import RajoutList from "./RajoutList";
function RajoutModule() {
  return (
    <p> TETS</p>
    // <StationProvider>
    //   <CuveProvider>
    //     <RajoutProvider>
    //       <Switch>
    //         <Route exact path="/rajout" component={RajoutList} />
    //         <Route
    //           exact
    //           path="/rajout/edit-rajout"
    //           render={(props) => <EditRajout {...props} />}
    //         />
    //         <Route
    //           exact
    //           path="/rajout/add-rajout"
    //           render={(props) => <AddRajout {...props} />}
    //         />
    //       </Switch>
    //     </RajoutProvider>
    //   </CuveProvider>
    // </StationProvider>
  );
}

export default RajoutModule;

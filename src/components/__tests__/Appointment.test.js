//We are rendering `<Appointment />` down below, so we need React.createElement
import React from "react";

//We import our helper functions from the react-testing-library
//The render function allows us to render Components
import { render, cleanup } from "@testing-library/react";

//We import the component that we are testin
import Appointment from "components/appointment/index";

//------------------------------------

// afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Appointment />);
// });
//-------------------------------------
afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
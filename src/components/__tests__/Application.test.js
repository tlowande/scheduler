import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getByPlaceholderText,
  getByAltText,
  getAllByTestId
} from "@testing-library/react";

import Application from "components/Application";

//_____________________________

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {

    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(res => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      })
    //option to use await-async (add "async" to the "it" function)
    // await waitForElement(() => getByText("Monday"))
    //fireEvent.click(getByText("Tuesday"));
    //expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))
    // console.log(prettyDOM(container))

    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    // console.log(prettyDOM(appointment))
  })


}) 

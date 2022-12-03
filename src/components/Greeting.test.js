import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Greeting from "./Greeting";

// test suite name; we can have multiple test suites and each suite can contain multiple tests
describe("Greeting component", () => {
  test("renders Hello World as a test", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // .. nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you if the button was NOT clicked", () => {
    render(<Greeting />);

    const paragraphElement = screen.getByText("good to see you", {
      exact: false,
    });
    expect(paragraphElement).toBeInTheDocument();
  });

  test("renders 'Changed!' if the button was clicked", () => {
    render(<Greeting />);

    // this will work since we only have one button; probably not ideal when we have multiple, we should use something else then, like getByText or similar
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const paragraphElement = screen.getByText("Changed!", {
      exact: true,
    });
    expect(paragraphElement).toBeInTheDocument();
  });

  test("doesn't render 'good to see you' if the button was clicked", () => {
    render(<Greeting />);

    // this will work since we only have one button; probably not ideal when we have multiple, we should use something else then, like getByText or similar
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // getByText will fail in case no element is found, which makes it inappropriate for negative cases; we should use queryByText in these cases, which return null in case an element is not found
    const paragraphElement = screen.queryByText("good to see you", {
      exact: false,
    });

    // these two are redundant, but I want to display both options
    expect(paragraphElement).toBeNull();
    expect(paragraphElement).not.toBeInTheDocument();
  });
});

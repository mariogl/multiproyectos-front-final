import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a link with 'Challenges'", () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const link = screen.queryByRole("link", { name: /challenges/i });

      expect(link).toBeInTheDocument();
    });
  });
});

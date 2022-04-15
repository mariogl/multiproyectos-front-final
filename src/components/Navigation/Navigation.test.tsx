import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a link with 'Projects'", () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const link = screen.queryByRole("link", { name: /projects/i });

      expect(link).toBeInTheDocument();
    });
  });
});

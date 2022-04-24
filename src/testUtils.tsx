import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";

const customRender = (ui: JSX.Element) => {
  render(<Provider store={store}>{ui}</Provider>);
};

export default customRender;

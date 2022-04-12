import { fireEvent, render } from "@testing-library/react";
import SelectFilter from "./SelectFilter";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import * as earthquakesModule from "../../slices/earthquakes";

describe("SelectFilter", () => {
  it("must render", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SelectFilter type="select" matchKey="magType" value={""} />
      </Provider>
    );

    expect(getByText(/magType/i)).toBeInTheDocument();
  });

  it("must update the filter value", () => {
    const spy = jest.spyOn(earthquakesModule, "setFilterValue");

    const { getByRole } = render(
      <Provider store={store}>
        <SelectFilter type="select" matchKey="magType" value={"mg"} />
      </Provider>
    );

    const select = getByRole(/combobox/) as HTMLSelectElement;

    fireEvent.change(select, { target: { value: "" } });

    expect(spy).toHaveBeenCalledWith({
      matchKey: "magType",
      type: "select",
      value: "",
    });
  });
});

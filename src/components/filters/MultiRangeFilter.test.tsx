import { render } from "@testing-library/react";
import MultiRangeFilter from "./MultiRangeFilter";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("MultiRangeFilter", () => {
  it("must render", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MultiRangeFilter
          type="multiRange"
          matchKey="mag"
          value={[
            {
              absolute: Math.random(),
              percentage: Math.random(),
            },
            {
              absolute: Math.random(),
              percentage: Math.random(),
            },
          ]}
        />
      </Provider>
    );

    expect(getByText(/mag/i)).toBeInTheDocument();
  });

  it("must show sliders handles - third party library", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <MultiRangeFilter
          type="multiRange"
          matchKey="mag"
          value={[
            {
              absolute: 2,
              percentage: 20,
            },
            {
              absolute: 8,
              percentage: 80,
            },
          ]}
        />
      </Provider>
    );

    const sliders = getAllByRole("slider");

    expect(sliders[0]).toBeInTheDocument();
    expect(sliders[1]).toBeInTheDocument();
  });
});

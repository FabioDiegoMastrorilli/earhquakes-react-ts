import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  MultiRangeFilterType,
  MultiRangeFilterValueType,
} from "../../slices/earthquakes.types";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { setFilterValue } from "../../slices/earthquakes";
import { getDomainValueFromPercentage } from "../../utilities/filters";

export default function MultiRangeFilter({
  matchKey,
  type,
  value,
}: MultiRangeFilterType) {
  const { earthquakes } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  const limits = useMemo(() => {
    const range = earthquakes?.map(
      (earthquake) => earthquake.properties[matchKey]
    ) || [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];

    return [Math.min(...range), Math.max(...range)] as [number, number];
  }, [earthquakes, matchKey]);

  return (
    <>
      <label>{matchKey}</label>

      <Slider
        range
        min={0}
        max={100}
        value={[
          value ? value[0].percentage : 0,
          value ? value[1].percentage : 100,
        ]}
        onChange={(value) => {
          const filterValues: MultiRangeFilterValueType = Array.isArray(value)
            ? [
                {
                  percentage: value[0],
                  absolute: getDomainValueFromPercentage(value[0], ...limits),
                },
                {
                  percentage: value[1],
                  absolute: getDomainValueFromPercentage(value[1], ...limits),
                },
              ]
            : [
                {
                  absolute: limits[0],
                  percentage: 0,
                },
                {
                  absolute: limits[1],
                  percentage: 100,
                },
              ];

          dispatch(
            setFilterValue({
              type,
              matchKey,
              value: filterValues,
            })
          );
        }}
        pushable
      />
    </>
  );
}

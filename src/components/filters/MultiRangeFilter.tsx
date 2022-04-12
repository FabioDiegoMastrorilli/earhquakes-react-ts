import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  MultiRangeFilterType,
  MultiRangeFilterValueType,
} from "../../slices/earthquakes.types";
import Slider from "rc-slider";
import { setFilterValue } from "../../slices/earthquakes";
import { getDomainValueFromPercentage } from "../../utilities/filters";
import { Label } from "reactstrap";

import "rc-slider/assets/index.css";

export default function MultiRangeFilter({
  label,
  matchKey,
  type,
  value,
}: MultiRangeFilterType) {
  const { items } = useAppSelector((state) => state.earthquakes);
  const dispatch = useAppDispatch();

  const limits = useMemo(() => {
    const range = items?.map((item) => item.properties[matchKey]) || [
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ];

    return [Math.min(...range), Math.max(...range)] as [number, number];
  }, [items, matchKey]);

  const labelId = `${matchKey}Label`;

  return (
    <>
      <Label id={labelId} className="mb-3 pb-1">
        {label || matchKey}
      </Label>

      <Slider
        ariaLabelledByForHandle={labelId}
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

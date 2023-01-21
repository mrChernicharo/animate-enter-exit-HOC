import { RefObject, useRef, useEffect } from "react";

export function useGrowShrinkContainer(
  shouldRender: boolean,
  ref: RefObject<HTMLDivElement>
) {
  const containerHeight = useRef(0);
  const containerWidth = useRef(0);

  const grow = (
    delayTime: number,
    flexibleContainerX: boolean,
    flexibleContainerY: boolean
  ) => {
    if (!flexibleContainerX && !flexibleContainerY) return;
    ref.current?.animate(
      [
        {
          ...(flexibleContainerY && { height: 0 }),
          ...(flexibleContainerX && { width: 0 }),
        },
        {
          ...(flexibleContainerY && {
            height: `calc(${containerHeight.current}px)`,
          }),
          ...(flexibleContainerX && {
            width: `calc(${containerWidth.current}px)`,
          }),
        },
      ],
      { duration: delayTime * 0.5, easing: "ease-out" }
    );
  };

  const shrink = (
    delayTime: number,
    flexibleContainerX: boolean,
    flexibleContainerY: boolean
  ) => {
    if (!flexibleContainerX && !flexibleContainerY) return;

    ref.current?.animate(
      [
        {
          ...(flexibleContainerY && {
            height: `calc(${containerHeight.current}px)`,
          }),
          ...(flexibleContainerX && {
            width: `calc(${containerWidth.current}px)`,
          }),
        },
        {
          ...(flexibleContainerY && { height: 0 }),
          ...(flexibleContainerX && { width: 0 }),
        },
      ],
      { duration: delayTime * 0.5, easing: "ease-out" }
      // { duration: delayTime * 0.5, easing: "ease-in-out" }
      // { duration: delayTime * 0.5, easing: "cubic-bezier(0.1, 0.7, 1.0, 0.1)" }
    );
  };

  const cleanup = (
    flexibleContainerX: boolean,
    flexibleContainerY: boolean
  ) => {
    if (!flexibleContainerX && !flexibleContainerY) return;

    containerHeight.current = 0;
    containerWidth.current = 0;
  };

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      containerHeight.current = ref.current?.getBoundingClientRect().height;
      containerWidth.current = ref.current?.getBoundingClientRect().width;
    }
  }, [ref, shouldRender]);

  return { grow, shrink, cleanup };
}

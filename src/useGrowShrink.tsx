import { RefObject, useRef, useEffect } from "react";

export function useGrowShrinkContainer(
  shouldRender: boolean,
  ref: RefObject<HTMLDivElement>
) {
  const containerHeight = useRef(0);
  const containerWidth = useRef(0);

  const grow = (
    delayTime: number,
    animateContainerX: boolean,
    animateContainerY: boolean
  ) => {
    if (!animateContainerX && !animateContainerY) return;
    ref.current?.animate(
      [
        {
          ...(animateContainerY && { height: 0 }),
          ...(animateContainerX && { width: 0 }),
        },
        {
          ...(animateContainerY && {
            height: `calc(${containerHeight.current}px)`,
          }),
          ...(animateContainerX && {
            width: `calc(${containerWidth.current}px)`,
          }),
        },
      ],
      { duration: delayTime * 0.5, easing: "ease-out" }
    );
  };

  const shrink = (
    delayTime: number,
    animateContainerX: boolean,
    animateContainerY: boolean
  ) => {
    if (!animateContainerX && !animateContainerY) return;

    ref.current?.animate(
      [
        {
          ...(animateContainerY && {
            height: `calc(${containerHeight.current}px)`,
          }),
          ...(animateContainerX && {
            width: `calc(${containerWidth.current}px)`,
          }),
        },
        {
          ...(animateContainerY && { height: 0 }),
          ...(animateContainerX && { width: 0 }),
        },
      ],
      { duration: delayTime * 0.5, easing: "ease-out" }
      // { duration: delayTime * 0.5, easing: "ease-in-out" }
      // { duration: delayTime * 0.5, easing: "cubic-bezier(0.1, 0.7, 1.0, 0.1)" }
    );
  };

  const remove = (
    animateContainerX: boolean,
    animateContainerY: boolean
  ) => {
    if (!animateContainerX && !animateContainerY) return;

    containerHeight.current = 0;
    containerWidth.current = 0;
  };

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      containerHeight.current = ref.current?.getBoundingClientRect().height;
      containerWidth.current = ref.current?.getBoundingClientRect().width;
    }
  }, [ref, shouldRender]);

  return { grow, shrink, remove };
}

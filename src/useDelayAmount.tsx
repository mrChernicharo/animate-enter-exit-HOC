import { RefObject, useRef, useState, useEffect } from "react";
import { useGrowShrinkContainer } from "./useGrowShrink";

export function useDelayUnmount(
  isMounted: boolean,
  delayTime: number,
  ref: RefObject<HTMLDivElement>,
  animateContainerX = false,
  animateContainerY = false
) {
  const animateContainer = animateContainerX || animateContainerY;
  const [shouldRender, setShouldRender] = useState(false);

  const { grow, shrink, remove } = useGrowShrinkContainer(shouldRender, ref);

  useEffect(() => {
    let timeoutId: number;

    // expand container (immediately)
    if (isMounted && !shouldRender) {
      setShouldRender(true);

      if (animateContainer) {
        setTimeout(() => {
          grow(delayTime, animateContainerX, animateContainerY);
        }, 0);
      }
    }

    // shrink container (after delay)
    else if (!isMounted && shouldRender) {
      if (animateContainer) {
        setTimeout(() => {
          shrink(delayTime, animateContainerX, animateContainerY);
        }, delayTime * 0.5);
      }

      // then remove container (in the end)
      timeoutId = setTimeout(() => {
        setShouldRender(false);
        if (animateContainer) {
          remove(animateContainerX, animateContainerY);
        }
      }, delayTime);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
}

// import { RefObject, useRef, useState, useEffect } from "react";

// function useDelayUnmount(
//   isMounted: boolean,
//   delayTime: number,
//   ref: RefObject<HTMLDivElement>
// ) {
//   const containerHeight = useRef(0);
//   const [shouldRender, setShouldRender] = useState(false);

//   useEffect(() => {
//     if (ref.current?.getBoundingClientRect) {
//       containerHeight.current = ref.current?.getBoundingClientRect().height;
//     }
//   }, [ref, shouldRender]);

//   useEffect(() => {
//     let timeoutId: number;
//     if (isMounted && !shouldRender) {
//       console.log("animate enter!", containerHeight.current);

//       setShouldRender(true);
//       setTimeout(() => {
//         console.log("entering!", containerHeight.current);
//         ref.current?.animate(
//           [{ height: 0 }, { height: `${containerHeight.current}px` }],
//           { duration: delayTime * 0.5 }
//         );
//       }, 0);

//       setTimeout(() => {
//         console.log("will enter!", containerHeight.current);
//       }, delayTime * 0.5);

//       setTimeout(() => {
//         console.log("entered!", containerHeight.current);
//       }, delayTime);
//     } else if (!isMounted && shouldRender) {
//       console.log("animate removal!", containerHeight.current);

//       setTimeout(() => {
//         console.log("will remove!", containerHeight.current);
//         ref.current?.animate(
//           [{ height: `${containerHeight.current}px` }, { height: 0 }],
//           { duration: delayTime * 0.5 }
//         );
//       }, delayTime * 0.5);

//       timeoutId = setTimeout(() => {
//         containerHeight.current = 0;
//         setShouldRender(false);
//         console.log("removed!", containerHeight.current);
//       }, delayTime);
//     }
//     return () => clearTimeout(timeoutId);
//   }, [isMounted, delayTime, shouldRender]);

//   return shouldRender;
// }
// export { useDelayUnmount };

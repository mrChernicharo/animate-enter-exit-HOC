export const DEFS: { [k: string]: { enter: Keyframe[]; exit: Keyframe[] } } = {
  slide: {
    enter: [
      {
        opacity: 0,
        transform: `translateX(-200px)`,
      },
      {
        opacity: 1,
        transform: `translateX(0)`,
      },
    ],
    exit: [
      {
        opacity: 1,
        transform: `translateX(0)`,
      },
      {
        opacity: 0,
        transform: `translateX(-200px)`,
      },
    ],
  },
  fade: {
    enter: [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    exit: [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
  },
  bounce: {
    enter: [
      {
        opacity: 0,
        transform: "scale(0)",
      },
      {
        transform: "scale(1.2)",
      },
      {
        opacity: 1,
        transform: "scale(1)",
      },
    ],
    exit: [
      {
        opacity: 1,
        transform: "scale(1.2)",
      },
      {
        opacity: 0,
        transform: "scale(0)",
      },
    ],
  },
  // custom: {},
};

const enterKeyframes = [
  {
    opacity: 0,
    transform: `translateX(-200px)`,
  },
  {
    opacity: 1,
    transform: `translateX(0)`,
  },
];

const exitKeyframes = [
  {
    opacity: 1,
    transform: `translateX(0)`,
  },
  {
    opacity: 0,
    transform: `translateX(-200px)`,
  },
];

const exitAnimationOptions = (duration: number): KeyframeAnimationOptions => {
  return { duration: duration / 2, fill: "both" };
};
const enterAnimationOptions = (duration: number): KeyframeAnimationOptions => {
  return { duration: duration / 2, delay: duration / 2, fill: "both" };
};

export const enterAnimation = (
  duration: number
): [Keyframe[], KeyframeAnimationOptions] => [
  enterKeyframes,
  enterAnimationOptions(duration),
];

export const exitAnimation = (
  duration: number
): [Keyframe[], KeyframeAnimationOptions] => [
  exitKeyframes,
  exitAnimationOptions(duration),
];

export const onEnter = (
  duration: number,
  type: keyof typeof DEFS
): [Keyframe[], KeyframeAnimationOptions] => [
  DEFS[type].enter,
  enterAnimationOptions(duration),
];

export const onExit = (
  duration: number,
  type: keyof typeof DEFS
): [Keyframe[], KeyframeAnimationOptions] => [
  DEFS[type].exit,
  exitAnimationOptions(duration),
];

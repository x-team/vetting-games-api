import { useCallback, useEffect, useMemo, useState } from "react";
import createTimeTracking from "./createTimeTracking";
import debounce from "@utils/debounce";
import { IDLE_TIMEOUT } from "@constants";

const ACTIVITY_EVENTS = [
  "mousemove",
  "click",
  "keydown",
  "scroll",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

export default function useTimeTracking(preloadState) {
  const [timeTracking] = useState(() => createTimeTracking(preloadState));
  const [state, setState] = useState(() => timeTracking.getState());
  const [task, setTask] = useState(() => timeTracking.getTask());

  const awayDebounced = useMemo(() => {
    return debounce(
      () => {
        if (timeTracking.getTask() === "active") {
          timeTracking.tracking("away");
        }
      },
      IDLE_TIMEOUT ? Number(IDLE_TIMEOUT) : 1000
    );
  }, [timeTracking]);

  const handleActivity = useCallback(() => {
    awayDebounced();
    if (timeTracking.getTask() === "away") {
      timeTracking.tracking("active");
    }
  }, [awayDebounced, timeTracking]);

  const handleStateChange = useCallback(() => {
    setState({ ...timeTracking.getState() });
    setTask(timeTracking.getTask());
  }, [timeTracking]);

  useEffect(() => {
    timeTracking.start();
    timeTracking.subscribe(handleStateChange);
    awayDebounced();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, handleActivity);
    }

    return () => {
      timeTracking.stop();
      timeTracking.unsubscribe(handleStateChange);

      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, handleActivity);
      }
    };
  }, [timeTracking]);

  const tracking = useCallback(
    (task) => {
      timeTracking.tracking(task);
    },
    [timeTracking]
  );

  const stop = useCallback(() => {
    timeTracking.stop();
  }, [timeTracking]);

  return { state, task, tracking, stop };
}

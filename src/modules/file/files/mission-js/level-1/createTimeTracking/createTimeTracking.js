export default function createTimeTracking(preloadState) {
  const state = preloadState || {};
  const listeners = [];
  let currentTask = null;
  let currentInterval = null;
  let running = false;

  function subscribe(listener) {
    listeners.push(listener);
  }

  function unsubscribe(listener) {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  }

  function notify() {
    for (const listener of listeners) {
      listener();
    }
  }

  function start() {
    if (running) return;

    running = true;
    currentInterval = setInterval(() => {
      if (currentTask) {
        state[currentTask] = (state[currentTask] || 0) + 1;
        notify();
      }
    }, 1000);
  }

  function stop() {
    clearInterval(currentInterval);
    currentInterval = null;
    currentTask = null;
    running = false;
    notify();
  }

  function tracking(task) {
    currentTask = task;
    start();
    notify();
  }

  function getState() {
    return state;
  }

  function getTask() {
    return currentTask;
  }

  return {
    subscribe,
    unsubscribe,
    start,
    stop,
    tracking,
    getState,
    getTask,
  };
}

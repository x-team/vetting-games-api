        window.addEventListener(event, () => {
          awayDebounced();
          if (timeTracking.getTask() === "away") {
            timeTracking.tracking("active");
          }
        });
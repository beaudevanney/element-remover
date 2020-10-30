(function () {
  console.log('Created by https://github.com/joshua0308');

  /**
   * UTILITY FUNCTIONS
   */
  function throttled(delay, fn) {
    let last_call = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - last_call < delay) {
        return;
      }
      last_call = now;
      return fn(...args);
    }
  }

  function createHighlightBox(color) {
    const element = document.createElement("div");
    document.body.appendChild(element);

    element.style.position = "absolute";
    element.style.background = color;
    element.style.zIndex = "998";

    return element;
  }

  function createAlertScreenBox(color) {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.background = color;
    element.style.zIndex = "999";
    document.body.appendChild(element);
    element.style.width = "100%";
    element.style.height = "100%";
    element.style.top = "0px";
    element.style.left = "0px";
    return element;
  }

  /**
   * ELEMENT REMOVER
   */
  const highlight_box_color = "rgba(255, 0, 0, 0.3)";
  let previous_hovered_element;

  const highlight_box = createHighlightBox(highlight_box_color);

  function handleMouseMoveForElementRemover(e) {
    let current_hovered_element;

    if (e.target === highlight_box) {
      current_hovered_element = document.elementsFromPoint(e.clientX, e.clientY)[1];
    } else {
      current_hovered_element = e.target;
    }

    // if the same element is chosen, return early
    if (previous_hovered_element === current_hovered_element) return;
    previous_hovered_element = current_hovered_element;

    const target_offset = current_hovered_element.getBoundingClientRect();
    const target_height = target_offset.height;
    const target_width = target_offset.width;
    // add a border around hover box
    const boxBorder = 5;
    highlight_box.style.width = target_width + boxBorder * 2 + "px";
    highlight_box.style.height = target_height + boxBorder * 2 + "px";
    // need scrollX and scrollY to account for scrolling
    highlight_box.style.top = target_offset.top + window.scrollY - boxBorder + "px";
    highlight_box.style.left = target_offset.left + window.scrollX - boxBorder + "px";
  }

  function handleMouseClick(e) {
    let current_clicked_element;

    if (e.target === highlight_box) {
      current_clicked_element = document.elementsFromPoint(e.clientX, e.clientY)[1];
    } else {
      current_clicked_element = e.target;
    }

    if (previous_hovered_element === current_clicked_element) {
      current_clicked_element.remove();
    }
  }

  /**
   * MOUSE SHAKE DETECTOR
   */
  const alert_screen_box_color = "rgba(153, 235, 255, 0.5)";
  const detect_threshold = 100;
  let direction = 1;
  let counter = 0;
  let previous_x;
  let current_x;

  function handleMouseMoveForDetectMouseShake(e) {
    current_x = e.clientX;
    if ((current_x - previous_x) * direction > detect_threshold) {
      direction = direction * -1;
      counter += 1;

      if (counter > 2) {
        highlight_box.remove();
        document.removeEventListener('mousemove', throttledHandleMouseMove);
        const alert_screen_box = createAlertScreenBox(alert_screen_box_color);

        setTimeout(() => {
          alert_screen_box.remove();

        }, 250);
      }
    } else {
      counter = 0;
    }

    previous_x = current_x;
  }

  /**
   * COMBINE MOUSE SHAKE DETECTOR AND ELEMENT REMOVER
   */
  function combinedHandleMouseMove(e) {
    handleMouseMoveForElementRemover(e);
    handleMouseMoveForDetectMouseShake(e);
  }

  /**
   * EVENT LISTENERS
   */
  const mouse_move_throttle_time = 100;
  const throttledHandleMouseMove = throttled(mouse_move_throttle_time, combinedHandleMouseMove);

  document.addEventListener("mousemove", throttledHandleMouseMove)
  document.addEventListener('click', handleMouseClick)
})()
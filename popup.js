(function elementRemover() {
  /**
   * UTILITY FUNCTIONS
   */
  function throttled(delay, fn) {
    let last_call = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - last_call < delay) {
        return;
      }
      last_call = now;
      return fn(...args);
    };
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
    element.style.height = document.body.clientHeight + "px";
    element.style.top = "0px";
    element.style.left = "0px";
    return element;
  }

  /**
   * HIGHLIGHT & REMOVE ELEMENT
   */
  const highlight_box_color = "rgba(255, 0, 0, 0.3)";
  let previous_hovered_element;

  const highlight_box = createHighlightBox(highlight_box_color);

  function applyHighlightBoxStyle(element) {
    const target_offset = element.getBoundingClientRect();
    const target_height = target_offset.height;
    const target_width = target_offset.width;
    const boxBorder = 5;
    highlight_box.style.width = target_width + boxBorder * 2 + "px";
    highlight_box.style.height = target_height + boxBorder * 2 + "px";
    // need scrollX and scrollY to account for scrolling
    highlight_box.style.top = target_offset.top + window.scrollY - boxBorder + "px";
    highlight_box.style.left = target_offset.left + window.scrollX - boxBorder + "px";
  }

  function highlightElementWhenHoveredOver(e) {
    let current_hovered_element;

    if (e.target === highlight_box) {
      current_hovered_element = document.elementsFromPoint(e.clientX, e.clientY)[1];
    } else {
      current_hovered_element = e.target;
    }

    if (previous_hovered_element !== current_hovered_element) {
      previous_hovered_element = current_hovered_element;
      applyHighlightBoxStyle(current_hovered_element);
    }
  }

  function removeElementWhenClicked(e) {
    let current_clicked_element;

    if (e.target === highlight_box) {
      current_clicked_element = document.elementsFromPoint(e.clientX, e.clientY)[1];
    } else {
      current_clicked_element = e.target;
    }

    if (previous_hovered_element === current_clicked_element) {
      current_clicked_element.remove();

      // once the element is removed, re-adjust the highlight_box to the element below the removed one
      previous_hovered_element = document.elementsFromPoint(e.clientX, e.clientY)[1];
      applyHighlightBoxStyle(previous_hovered_element);
    }
  }

  /**
   * DEACTIVATE ELEMENT REMOVER
   */
  const alert_screen_box_color = "rgba(153, 235, 255, 0.5)";
  const detect_threshold = 100;
  let direction = 1;
  let counter = 0;
  let previous_x;
  let current_x;

  function deactivateElementRemover() {
    highlight_box.remove();
    document.removeEventListener("mousemove", throttledHandleMouseMove);
    document.removeEventListener("click", removeElementWhenClicked);
    document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-button");

  toggleButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
    });
  });
});

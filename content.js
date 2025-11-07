function addTimestampBelowMessage(messageBubble) {
  const parent = messageBubble.parentElement;
  if (!parent || parent.querySelector(".prompt-timestamp")) return;

  const timeNow = new Date();
  const formattedDate = timeNow.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const formattedTime = timeNow.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const timestamp = document.createElement("div");
  timestamp.className = "prompt-timestamp";
  timestamp.textContent = `${formattedDate} • ${formattedTime}`;

  parent.insertAdjacentElement("afterend", timestamp);
}

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === 1) {
        const userBubble = node.querySelector(".user-message-bubble-color");
        if (userBubble) {
          addTimestampBelowMessage(userBubble);
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

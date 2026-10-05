import { createElement } from "../utils/dom";

const SCROLL_LOCK_CLASS = "modal-open";

export const openModal = (buildContent) => {
  const overlay = createElement("div", {
    className: "modal",
    attrs: { role: "presentation" },
  });

  const dialog = createElement("div", {
    className: "modal__dialog",
    attrs: { role: "dialog", "aria-modal": "true", tabindex: "-1" },
  });

  const close = () => {
    overlay.remove();
    document.body.classList.remove(SCROLL_LOCK_CLASS);
    document.removeEventListener("keydown", handleKeydown);
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") close();
  };

  dialog.append(buildContent({ close }));
  overlay.append(dialog);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.body.append(overlay);
  document.body.classList.add(SCROLL_LOCK_CLASS);
  document.addEventListener("keydown", handleKeydown);
  dialog.focus();

  return { close };
};

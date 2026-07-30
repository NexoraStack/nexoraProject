import { useEffect, useRef, useId } from "react";

// Built on the native <dialog> element so focus trapping, Escape-to-close and the
// backdrop come from the platform instead of hand-rolled listeners.
export default function Modal({ open, onClose, title, description, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleBackdropClick(event) {
    // Clicks on the backdrop are reported with the dialog itself as the target.
    if (event.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl bg-bg-base p-0 text-text-primary shadow-xl backdrop:bg-text-primary/40"
    >
      <div className="px-6 pb-6 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-display text-lg font-semibold">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-1.5 -mt-1 rounded-lg px-2 py-1 text-xl leading-none text-text-secondary transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-hover"
          >
            &times;
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </dialog>
  );
}

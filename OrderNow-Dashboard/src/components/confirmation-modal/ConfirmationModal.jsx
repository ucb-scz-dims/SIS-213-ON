import React from "react";
import Button from "../Button/Button";

function ConfirmationModal({
  onClose,
  onConfirm,
  title,
  message,
  cancelText,
  confirmText,
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2
          id="modalTitle"
          className="text-xl font-bold text-gray-900 sm:text-2xl"
        >
          {title}
        </h2>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">{message}</p>
        </div>

        <footer className="mt-6 flex justify-end gap-2">
          <Button
            text={cancelText}
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
          />
          <Button
            text={confirmText}
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
          />
        </footer>
      </div>
    </div>
  );
}

export default ConfirmationModal;

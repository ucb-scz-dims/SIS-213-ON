import React from 'react';

export default function ClosedBusinessModal({ isOpen, onBackToList, onContinue }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
      />
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Restaurante fuera de horario
        </h2>
        <p className="text-gray-600 mb-6">
          Este restaurante está cerrado en este momento.
          ¿Qué te gustaría hacer?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onBackToList}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Volver a la lista
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

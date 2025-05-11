import React, { useState } from "react";
import Button from "../Button/Button";

function CheckboxFilter({ title, items, resetName, onChange}) {
  const [counterSelected, setCounterSelected] = useState(0);
  const [selectedItems, setSelectedItems] = useState([])

  const handleChange = (event) => {
    const checked = event.target.checked;
    const targetKey = event.target.id;
    let newSelectedItems;
    if (checked) {
        setCounterSelected(counterSelected + 1);
        newSelectedItems = [...selectedItems, targetKey];
        setSelectedItems(newSelectedItems);
    } 
    else {
        newSelectedItems = selectedItems.filter(id => id !== targetKey);
        setSelectedItems(newSelectedItems);
        setCounterSelected(counterSelected - 1);
    }

    onChange(newSelectedItems);
  };

  const handleChangeReset = () => {
    const newSelectedItems = [];
    setCounterSelected(0);
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  }
  
  return (
    <div className="space-y-4 inline-block relative">
      <details className="group overflow-visible rounded border border-gray-300 shadow-sm">
        <summary className="flex items-center justify-between gap-2 p-3 text-gray-700 transition-colors hover:text-gray-900 [&::-webkit-details-marker]:hidden">
          <span className="text-sm font-medium"> {title} </span>

          <span className="transition-transform group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="absolute left-0 mt-1 divide-y divide-gray-300 bg-gray-200 rounded-lg border-red-900">
          <div className="flex items-center justify-between px-3 py-2 gap-10">
            <span className="text-sm text-gray-700">
              {counterSelected} {counterSelected === 1 ? "Seleccionado" : "Seleccionados"}
            </span>

            <div className="flex flex-row gap-5">
              <Button
                type="button"
                className="text-sm text-gray-700 underline transition-colors hover:text-gray-900"
                onClick={handleChangeReset}
              >
                {resetName}
              </Button>
            </div>
          </div>

          <fieldset className="p-3">
            <div className="flex flex-col items-start gap-3">
              {Object.entries(items).map(([key, value]) => (
                <label
                  key={key}
                  htmlFor={key}
                  className="inline-flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    className="size-5 rounded border-gray-300 shadow-sm"
                    id={key}
                    onChange={(event) => handleChange(event)}
                    checked={selectedItems.includes(key)}
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {value}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>
    </div>
  );
}

export default CheckboxFilter;

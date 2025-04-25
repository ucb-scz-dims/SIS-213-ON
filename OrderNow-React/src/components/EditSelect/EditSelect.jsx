import React, {useState} from "react";

export const EditSelect = ({name = "title", edit = false, options = ["vacio"], additionalText = ""}) => {
    const [stateEdit, setStateEdit] = useState(edit);
    const [currentOption, setCurrentOption] = useState(options[0]);
    return (
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">{name}</h3>
            <div className="flex justify-between items-center">
                {stateEdit ? (
                    <div>
                        <select value={currentOption} onChange={(e) => setCurrentOption(e.target.value)}
                        className="text-sm text-gray-800 border px-2 py-1 rounded mr-2 w-full">
                            {options.map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setStateEdit(false)} className="text-blue-500 text-sm ml-2">
                            Guardar
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm"> {currentOption} {additionalText} </p>
                        <button onClick={() => setStateEdit(true)} className="text-blue-500 text-sm ml-2">
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default EditSelect;
export function validateProductForm(formData) {
    const newErrors = {};
    const regOnlyNumbers = /^(\d)*(\.)?([0-9]{1})?$/;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripcion del producto es requerida';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    }

    if(!regOnlyNumbers.test(formData.price.trim())) {
        newErrors.price  = 'Campo inválido. Inserte solamente numeros con maximo un decimal.'
    }



    return newErrors;
}
export function validateProductForm(formData) {
    const newErrors = {};
    const regOnlyNumbers = /^\d+(\.\d{1,2})?$/;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripcion del producto es requerida';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido';
    }
    else if(!regOnlyNumbers.test(formData.price.trim())) {
      newErrors.price  = 'Inserte números mayores a cero con máximo dos decimales'
    }
    else if (isNaN(formData.price)) {
      newErrors.price = 'El precio debe ser un numero';
    }
    
    return newErrors;
}
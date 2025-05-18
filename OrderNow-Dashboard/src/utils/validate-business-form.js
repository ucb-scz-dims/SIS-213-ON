const validateBusinessForm = (formData) => {
    const newErrors = {};

    const phoneRegex = /^\+?[\d\s-]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }


    return newErrors;
}


export default validateBusinessForm;
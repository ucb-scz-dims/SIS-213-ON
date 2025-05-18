import React, { useEffect, useRef, useState } from 'react';
import { Store, Home, Phone, AlignLeft } from 'lucide-react';
import validateBusinessForm from '../../utils/validate-business-form';
import { BusinessService } from '../../services/BusinessService';
import { Link, useParams } from 'react-router-dom'


export default function RegistrationForm() {

  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const isEditing = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
  });

  const fetchBussiness = async () => {
    try {
      const business = await BusinessService.getBusinessById(id);
      setFormData({
        name: business.name,
        address: business.address,
        description: business.description,
      });
    }
    catch(error) {
      console.error(error);
      alert("Error al obtener el restaurante");
    }
  }

  useEffect(() => {
    if(!id)
      return;

    isEditing.current = true;
    fetchBussiness();
  }, [])

  const saveBusiness = async (businessData) => {
    try {
      (isEditing.current ? await BusinessService.updateBusiness(businessData, id) : await BusinessService.createBusiness(businessData));
      return true;
    } catch (err) {
      console.error('Error inesperado:', err);
      return false;
    }
  };


  const validateForm = () => {
    const newErrors = validateBusinessForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm())
      return;

    const success = await saveBusiness(formData);

    if(!success) {
      alert("No se a podido realizar la operación. Intentar otra vez");
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    if(!isEditing.current){
      setFormData({
        name: '',
        address: '',
        description: '',
        phone: ''
      });
    }
    
      
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEditing.current ? "Actualizar restaurante" : "Registrar restaurante"}</h2>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            {isEditing.current ? "Actualizacion exitosa" : "Registro exitoso"}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Store size={20} />
              <span>Nombre del restaurante</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Home size={20} />
              <span>Dirección</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <AlignLeft size={20} />
              <span>Descripción</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Phone size={20} />
              <span>Teléfono</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+591 XXXXXXXX"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div> */}

        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          {isEditing.current ? "Actualizar restaurante" : "Registrar restaurante"}
        </button>
      </form>

        {isEditing.current && (<Link to="/" className="text-center text-blue-500">
         ¿Quieres editar los horarios del restaurante?
        </Link>)}
      
    </div>
  );
}
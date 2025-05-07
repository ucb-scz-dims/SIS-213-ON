import React, { useState } from 'react';
import { Store, Clock, Home, Phone, AlignLeft } from 'lucide-react';

import getSupaBaseClient from '../../supabase/supabase-client';



export default function RegistrationForm() {
  const supaBaseCom = getSupaBaseClient('com')

  const fetchBusiness = async () => {
    const { data, error } = await supaBaseCom
      .from('businesses')
      .select('*');

    if (error) {
      error.message;
      return;
    }

    const ordered = data.sort((a, b) => b.is_open - a.is_open);
    setBusinesses(ordered);

  };

  const insertBusiness = async (businessData) => {
    try {
      const { data, error } = await supaBaseCom
        .from('businesses')
        .insert([{
          name: businessData.name,
          address: businessData.address,
          description: businessData.description,
          open_time: businessData.openingTime,
          close_time: businessData.closingTime,
          is_open: true,
          user_id: 1,
        }]);
  
      if (error) {
        console.error('Error inserting data:', error.message);
        return false;
      }
  
      console.log('Data inserted successfully:', data);
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      return false;
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    phone: '',
    openingTime: '',
    closingTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Número de teléfono inválido';
    }

    if (!formData.openingTime) {
      newErrors.openingTime = 'El horario de apertura es requerido';
    }

    if (!formData.closingTime) {
      newErrors.closingTime = 'El horario de cierre es requerido';
    } else if (formData.openingTime && formData.closingTime <= formData.openingTime) {
      newErrors.closingTime = 'El horario de cierre debe ser posterior al de apertura';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await insertBusiness(formData);
      if (success) {
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({
          name: '',
          address: '',
          description: '',
          phone: '',
          openingTime: '',
          closingTime: ''
        });
      }
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Restaurante</h2>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          ¡Registro exitoso!
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

        <div>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Clock size={20} />
              <span>Horario de apertura</span>
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.openingTime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.openingTime && <p className="text-red-500 text-sm mt-1">{errors.openingTime}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Clock size={20} />
              <span>Horario de cierre</span>
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.closingTime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.closingTime && <p className="text-red-500 text-sm mt-1">{errors.closingTime}</p>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
      >
        Registrar Restaurante
      </button>
    </form>
  );
}
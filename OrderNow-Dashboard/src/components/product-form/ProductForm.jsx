import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Link, Box, AlignLeft, CircleAlert, AArrowDown, Podcast } from 'lucide-react';
import getSupaBaseClient from '../../supabase/supabase-client';
import { validateProductForm } from '../../utils/validateProductForm';
import Button from '../Button/Button';
import { useParams } from 'react-router-dom';

const supabaseClient = getSupaBaseClient();

export default function ProductForm() {
  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    urlImage: '',
    productState: "true"
  });

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabaseClient
        .schema("com")
        .from("products")
        .select()
        .eq('id', id)
        .single()

      if(error) {
        alert("Hubo un error al obtener los datos del producto");
        console.error(error.message);
        return;
      }

      if(!data) {
        alert("El producto no pudo ser encontrado");
        return;
      }

      setFormData({
        name: data.name,
        description: data.description,
        price: String(data.price),
        urlImage: data.image_url,
        productState: String(data.available)
      });

      setIsEditing(true);
    }
    catch(err) {
      alert("Hubo un error al acceder a la base de datos");
      console.error(err);
    }
  }

  useEffect(() => {
    if(!id) {
      return;
    }

    fetchProduct();
  }, [id]);

  const validateForm = () => {
    const newErrors = validateProductForm(formData);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const insertProduct = async (productData) => {
    const { error } = await supabaseClient
      .schema("com")
      .from("products")
      .insert({
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        image_url: (productData.urlImage === "" ? null : productData.urlImage),
        business_id: 1, //TODO Cambiar al id de restaurante, una vez finalizado el inicio de sesion
        available: (productData.productState === "true")
      });

    return error;
  }

  const updateProduct = async(productData) => {
    const { error } = await supabaseClient
      .schema("com")
      .from("products")
      .update({
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        image_url: (productData.urlImage === "" ? null : productData.urlImage),
        available: (productData.productState === "true")
      })
      .eq('id', id);

    return error;
  }

  const submitForm = async (productData) => {
    if(isEditing && !id) {
      console.error("El identificador del producto no fue encontrado");
      alert("Hubo un error al identificar el producto. Recargue la página");
      return false;
    }

    try {
      const error = (isEditing ? await updateProduct(productData) : await insertProduct(productData));

      if(error) {
        console.error(error.message);
        alert((isEditing ? "Error al actualizar el producto. Intentalo de nuevo" : "Hubo un error al crear el producto. Inténtelo de nuevo"));
        return false;
      }

      return true;
    }
    catch(err) {
      console.error("Error inesperado:", err);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm())
      return;

    if(isSubmitting)
      return;

    setIsSubmitting(true); 
    const success = submitForm(formData);

    if(!success) {
      setIsSubmitting(false);
      return;
    }

    if(!isEditing)
      setFormData({
        name: "",
        description: "",
        price: "",
        urlImage: "",
        productState: "true",
      });
     
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsSubmitting(false);
    }, 1500);

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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEditing ? "Modificación de producto" : "Registrar producto"}
      </h2>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          {isEditing ? "Modificación exitosa" : "Registro exitoso"}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Box size={20} />
            <span>Nombre del producto</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ingresar nombre del producto"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <AlignLeft size={20} />
            <span>Descripcion</span>
          </label>
          <input
            type="text"
            name="description"
            placeholder="Descripcion corta del producto"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <CircleDollarSign size={20} />
            <span>Precio (Bs)</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.price
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Link size={20} />
            <span>Imagen Url</span>
          </label>
          <input
            type="text"
            name="urlImage"
            value={formData.urlImage}
            onChange={handleChange}
            placeholder="Url de la imagen de tu producto"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.urlImage
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.urlImage && (
            <p className="text-red-500 text-sm mt-1">{errors.urlImage}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <CircleAlert size={20} />
            <span>Estado del producto</span>
          </label>
          <select
            name="productState"
            value={formData.productState}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.productState
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
          {errors.productState && (
            <p className="text-red-500 text-sm mt-1">{errors.productState}</p>
          )}
        </div>
      </div>

      <Button 
        text={isEditing ? "Modificar producto" : "Registrar producto"}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-20"
        disabled={isSubmitting}
      />
    </form>
  );
}
import React from 'react';
import Layout from './Layout';

function Restaurante() 
{
    return(
        <>

                <main className="max-w-6xl mx-auto px-4 pt-24 pb-8">
                    {/* Restaurant Info */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Burger King - Centro Santa Cruz
                        </h2>
                        <p className="text-gray-600">Calle Sucre 24 →</p>
                        <p className="text-sm text-gray-600">
                        20 - 30 min • Bs 4 Min • Bs 15
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* Categories */}
                    {/* 
                    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {["Ofertas", "Novedades", "Postres", "Acompañantes y ensaladas", "Bebidas", "Tu primer pedido"].map((cat) => (
                        <button
                        key={cat}
                        className="px-4 py-2 bg-white rounded-full shadow-sm whitespace-nowrap text-gray-700 hover:bg-gray-50"
                        >
                        {cat}
                        </button>
                    ))}
                    </div>
                    */}


                    {/* Product Sections */}
                    <Section title="Productos con descuentos">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    </Section>

                    <Section title="Platos recomendados">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    </Section>

                    {/* Order Sidebar or downbar */}
                    {/* 
                    <div className="fixed bottom-4 w-80 bg-gray-200 rounded-lg shadow-xl p-4 z-50">
                        <h3 className="text-gray-800 font-bold mb-4">Mi pedido</h3>
                        <div className="mb-4">
                            <h4 className="font-medium mb-1 text-gray-800">Delivery</h4>
                            <p className="text-xs text-gray-500">
                            Detalles de pedido
                            </p>
                        </div>
                    </div>
                    */}
                </main>

        </>
    )
}
const Section = ({ title, children }) => (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </section>
  );
  
  const ProductCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">Nombre del producto</h3>
        <p className="text-sm text-gray-600 mb-2">Descripcion del producto</p>
        <p className="text-lg font-bold text-gray-800">Bs 100</p>
      </div>
    </div>
  );

export default Restaurante
import React from 'react';
import ProductCard from '../ProductCard';

const ProductsListView = ({
    products,
    isMenuEnabled,
    bestSellerIds,
    loading,
    sortOption,
    handleSortChange
}) => {
    if (loading) return <p>Cargando productos...</p>;
    if (!products || products.length === 0) return <p>No hay productos para este restaurante.</p>;

    const availableProducts = products.filter(p => p.available);
    const unavailableProducts = products.filter(p => !p.available);

    return (
        <div>
            <div className="flex justify-end items-center gap-2 mb-4">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                    <option value="none">Ordenar por</option>
                    <option value="asc">Precio: Menor a Mayor</option>
                    <option value="desc">Precio: Mayor a Menor</option>
                </select>
            </div>

            {availableProducts.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Disponibles ({availableProducts.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {availableProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isMenuEnabled={isMenuEnabled}
                                isBestSeller={bestSellerIds.includes(product.id)}
                            />
                        ))}
                    </div>
                </>
            )}

            {unavailableProducts.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">No disponibles ({unavailableProducts.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unavailableProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isMenuEnabled={isMenuEnabled}
                                isBestSeller={bestSellerIds.includes(product.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductsListView;

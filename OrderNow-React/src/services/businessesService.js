import {
    getAllBusinesses,
    getAllCategories,
    getBusinessCategories,
} from "../repos/businessRepository";

export const fetchBusinessesWithCategories = async () => {
    const [businesses, categories, businessCategories] = await Promise.all([
        getAllBusinesses(),
        getAllCategories(),
        getBusinessCategories(),
    ]);

    const orderedBusinesses = businesses.sort((a, b) => b.is_open - a.is_open);

    return {
        businesses: orderedBusinesses,
        categories,
        businessCategories,
    };
};

export const filterAndSortBusinesses = (businesses, businessCategories, selectedCategory) => {
    const getWeight = (businessId) => {
        if (!selectedCategory) return 0;
        const rel = businessCategories.find(
            (bc) => bc.business_id === businessId && bc.category_id === selectedCategory
        );
        return rel ? rel.weight : 0;
    };

    if (!selectedCategory) return businesses;

    return businesses
        .filter((b) =>
            businessCategories.some(
                (bc) => bc.business_id === b.id && bc.category_id === selectedCategory
            )
        )
        .sort((a, b) => getWeight(b.id) - getWeight(a.id));
};

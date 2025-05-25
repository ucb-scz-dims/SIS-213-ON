import getSupaBaseClient from '/src/supabase-client';

const supabase = getSupaBaseClient('com');

const RestauranteFacade = {
  async obtenerRestaurantePorId(id) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async obtenerHorarioPorRestaurante(id) {
    const { data, error } = await supabase
      .from('schedule')
      .select('day, opening_time, clossing_time')
      .eq('business_id', id)
      .order('day', { ascending: true })
      .order('opening_time', { ascending: true });
    if (error) throw error;

    return data.reduce((acc, row) => {
      const d = row.day;
      if (!acc[d]) acc[d] = [];
      acc[d].push(`${row.opening_time.slice(0, 5)} – ${row.clossing_time.slice(0, 5)}`);
      return acc;
    }, {});
  },
};

export default RestauranteFacade;

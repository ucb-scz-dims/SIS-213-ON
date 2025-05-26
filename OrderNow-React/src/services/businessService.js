import { getBusinessById, getTodaySchedule } from "../repos/businessRepository";

const getDayNumber = () => {
    const d = new Date().getDay();
    return d === 0 ? 7 : d;
};

const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
};

const isOpenNow = (schedule) => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return schedule.some(({ opening_time, clossing_time }) => {
        const start = toMinutes(opening_time);
        const end = toMinutes(clossing_time);
        return nowMinutes >= start && nowMinutes < end;
    });
};

export const fetchBusinessData = async (id) => {
    const business = await getBusinessById(id);
    const dayNum = getDayNumber();
    const schedule = await getTodaySchedule(id, dayNum);
    const open = business.is_open && isOpenNow(schedule);

    const scheduleText = schedule.length
        ? schedule
            .map(({ opening_time, clossing_time }) => `${opening_time.slice(0, 5)} – ${clossing_time.slice(0, 5)}`)
            .join("  |  ")
        : "Cerrado hoy";

    return {
        business,
        schedule,
        isOpen: open,
        scheduleText,
    };
};

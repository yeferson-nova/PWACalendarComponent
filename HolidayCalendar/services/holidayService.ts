export async function loadHolidays(holidayListJson: string): Promise<Date[]> {
    const list = JSON.parse(holidayListJson);
    return list.map((d: string) => new Date(d));
}

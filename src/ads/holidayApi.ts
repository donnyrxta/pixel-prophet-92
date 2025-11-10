import { Holiday } from './types';

const NAGER_BASE = 'https://date.nager.at/api/v3';

export async function getPublicHolidays(year: number, countryCode: string): Promise<Holiday[]> {
  const res = await fetch(`${NAGER_BASE}/PublicHolidays/${year}/${countryCode}`);
  if (!res.ok) throw new Error(`Failed to fetch holidays: ${res.status}`);
  const data = await res.json();
  // Map to our type
  return (data as any[]).map((h) => ({
    date: h.date,
    localName: h.localName,
    name: h.name,
    countryCode: h.countryCode ?? countryCode,
  }));
}

export async function getUpcomingHolidays(
  countryCode: string,
  monthsAhead = 6
): Promise<Holiday[]> {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const all: Holiday[] = [
    ...(await getPublicHolidays(currentYear, countryCode)),
    ...(await getPublicHolidays(nextYear, countryCode)),
  ];
  // Filter to upcoming within monthsAhead
  const end = new Date(now);
  end.setMonth(end.getMonth() + monthsAhead);
  return all.filter((h) => {
    const d = new Date(h.date);
    return d >= now && d <= end;
  });
}


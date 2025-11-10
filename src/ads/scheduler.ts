import { Campaign, Holiday } from './types';

function toTZ(date: Date, timezone: string): string {
  // Return ISO string formatted for target timezone by adjusting via Intl
  // Note: For production, consider Luxon or date-fns-tz; keeping simple here.
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const parts = new Intl.DateTimeFormat('en-GB', options)
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') acc[p.type] = p.value;
      return acc;
    }, {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:00`;
}

export function recommendScheduleWindows(holiday: Holiday, timezone: string): string[] {
  const holidayDate = new Date(holiday.date + 'T08:00:00');
  const windows: string[] = [];
  const offsetsDays = [14, 7, 3, 1, 0];
  const hours = [9, 12, 18, 10, 8];
  offsetsDays.forEach((d, i) => {
    const dt = new Date(holidayDate);
    dt.setDate(dt.getDate() - d);
    dt.setHours(hours[i], 0, 0, 0);
    windows.push(toTZ(dt, timezone));
  });
  return windows;
}

export function buildCampaignFromHoliday(
  holiday: Holiday,
  timezone: string,
  variantTemplateIds: string[] = ['black_friday_title']
): Campaign {
  const now = new Date();
  const windows = recommendScheduleWindows(holiday, timezone);
  const id = `cmp_${holiday.countryCode}_${holiday.date}_${holiday.name.replace(/\s+/g, '-')}`;
  return {
    id,
    holiday,
    title: `${holiday.localName} Campaign`,
    description: `Automated campaign for ${holiday.localName} (${holiday.date})`,
    countryCode: holiday.countryCode,
    channels: ['web'],
    variants: variantTemplateIds.map((tplId, i) => ({ id: `v${i + 1}`, templateId: tplId as any, weight: i === 0 ? 0.5 : 0.5 })),
    status: 'draft',
    scheduledAt: windows[0],
    scheduleWindows: windows,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    metrics: { impressions: 0, clicks: 0 },
  };
}


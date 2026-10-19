export interface GanttEntry {
  id: string;
  title: string;
  start: string;
  end: string;
  phase?: string;
  phaseTone?: number;
  phases?: readonly { label: string; tone?: number }[];
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatGanttDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function formatGanttRange(
  entry: Pick<GanttEntry, "start" | "end">,
): string {
  return entry.start === entry.end
    ? formatGanttDate(entry.start)
    : `${formatGanttDate(entry.start)} – ${formatGanttDate(entry.end)}`;
}

export function ganttMonthBounds(month: string) {
  const [year, number] = month.split("-").map(Number);
  const days = new Date(Date.UTC(year, number, 0)).getUTCDate();
  return { start: `${month}-01`, end: `${month}-${days}`, days };
}

export function ganttMonths(entries: readonly GanttEntry[]): string[] {
  if (!entries.length) return [];
  const first = entries.reduce(
    (value, entry) => (entry.start < value ? entry.start : value),
    entries[0].start,
  );
  const last = entries.reduce(
    (value, entry) => (entry.end > value ? entry.end : value),
    entries[0].end,
  );
  const cursor = new Date(`${first.slice(0, 7)}-01T00:00:00Z`);
  const months: string[] = [];
  while (cursor.toISOString().slice(0, 7) <= last.slice(0, 7)) {
    months.push(cursor.toISOString().slice(0, 7));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return months;
}

/** Inclusive calendar intervals; concurrent records occupy separate tracks. */
export function layoutGanttMonth<T extends GanttEntry>(
  entries: readonly T[],
  month: string,
) {
  const bounds = ganttMonthBounds(month);
  const laneEnds: string[] = [];
  const periods = entries
    .filter((entry) => entry.start <= bounds.end && entry.end >= bounds.start)
    .sort(
      (a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end),
    )
    .map((entry) => {
      const start = entry.start < bounds.start ? bounds.start : entry.start;
      const end = entry.end > bounds.end ? bounds.end : entry.end;
      let lane = laneEnds.findIndex((previousEnd) => previousEnd < start);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = end;
      return {
        entry,
        lane,
        startDay: Number(start.slice(8)),
        endDay: Number(end.slice(8)),
        continuesBefore: entry.start < bounds.start,
        continuesAfter: entry.end > bounds.end,
      };
    });
  const firstDay = periods.length
    ? Math.min(...periods.map((period) => period.startDay))
    : 1;
  const lastDay = periods.length
    ? Math.max(...periods.map((period) => period.endDay))
    : bounds.days;
  return {
    ...bounds,
    firstDay,
    lastDay,
    visibleDays: lastDay - firstDay + 1,
    periods,
    lanes: Math.max(1, laneEnds.length),
  };
}

export interface GanttMonthGroup<T extends GanttEntry> {
  months: string[];
  entries: T[];
}

/** A boundary stays connected only when an actual record crosses it. */
export function ganttMonthGroups<T extends GanttEntry>(
  entries: readonly T[],
): GanttMonthGroup<T>[] {
  const allMonths = ganttMonths(entries);
  const groups: GanttMonthGroup<T>[] = [];
  for (const [index, month] of allMonths.entries()) {
    const active = layoutGanttMonth(entries, month).periods;
    if (!active.length) continue;
    const previous = groups[groups.length - 1];
    const connected =
      previous &&
      previous.months[previous.months.length - 1] === allMonths[index - 1] &&
      entries.some(
        (entry) => entry.start < `${month}-01` && entry.end >= `${month}-01`,
      );
    if (connected) previous.months.push(month);
    else groups.push({ months: [month], entries: [] });
  }
  return groups.map((group) => ({
    ...group,
    entries: entries.filter(
      (entry) =>
        entry.start.slice(0, 7) <= group.months[group.months.length - 1] &&
        entry.end.slice(0, 7) >= group.months[0],
    ),
  }));
}

/** Event boundaries replace empty calendar days; one bar spans all its months. */
export function layoutGanttGroup<T extends GanttEntry>(
  group: GanttMonthGroup<T>,
) {
  let nextRow = 1;
  const dateRows = new Map<string, number>();
  const months = group.months.map((month) => {
    const bounds = layoutGanttMonth(group.entries, month);
    const dates = new Set([
      `${month}-${String(bounds.firstDay).padStart(2, "0")}`,
      `${month}-${String(bounds.lastDay).padStart(2, "0")}`,
    ]);
    for (const entry of group.entries) {
      if (entry.start.startsWith(month)) dates.add(entry.start);
      if (entry.end.startsWith(month)) dates.add(entry.end);
    }
    const headingRow = nextRow++;
    const rows = [...dates].sort().map((date) => {
      const row = nextRow++;
      dateRows.set(date, row);
      return {
        date,
        row,
        entries: group.entries.filter((entry) => entry.start === date),
      };
    });
    return { month, headingRow, rows, count: bounds.periods.length };
  });
  const laneEnds = { left: [] as string[], right: [] as string[] };
  const periods = [...group.entries]
    .sort(
      (a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end),
    )
    .map((entry, index) => {
      const side = index % 2 === 0 ? ("left" as const) : ("right" as const);
      const sideEnds = laneEnds[side];
      let lane = sideEnds.findIndex((end) => end < entry.start);
      if (lane === -1) lane = sideEnds.length;
      sideEnds[lane] = entry.end;
      return {
        entry,
        lane,
        side,
        startRow: dateRows.get(entry.start)!,
        endRow: dateRows.get(entry.end)! + 1,
      };
    });
  const lanes = Math.max(1, laneEnds.left.length + laneEnds.right.length);
  return {
    months,
    // Each side approaches its own bank from the outside. Opposite-side
    // connectors can no longer overlap or pass through each other's start.
    periods: periods.map((period) => ({
      ...period,
      lane: period.side === "left" ? period.lane : lanes - 1 - period.lane,
    })),
    rowCount: nextRow - 1,
    lanes,
  };
}

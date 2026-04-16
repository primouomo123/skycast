export default function getClosestEntry(entries, preferredHours = [15, 12]) {
    if (!entries || entries.length === 0) return null;

    let bestEntry = null;
    let bestScore = Infinity;

    for (const entry of entries) {
      const hour = entry.dateTime.getUTCHours();

      preferredHours.forEach((targetHour, priorityIndex) => {
        const diff = Math.abs(hour - targetHour);

        // Lower score is better
        // priorityIndex makes 15:00 preferred over 12:00 if equally close
        const score = diff + priorityIndex * 0.01;

        if (score < bestScore) {
          bestScore = score;
          bestEntry = entry;
        }
      });
    }

    return bestEntry || entries[0];
  }
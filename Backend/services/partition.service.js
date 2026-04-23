import cron from "node-cron";
import pkg from "pg";

const { Client } = pkg;

// Returns the Monday of the week for a given date
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust for Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Returns partition name like history_2024_w14
function getPartitionName(date) {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const weekNumber = Math.ceil(
    ((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
  );
  return `history_${year}_w${String(weekNumber).padStart(2, "0")}`;
}

async function createPartitionForWeek(date) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    const weekStart = getWeekStart(date);
    const weekEnd   = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const partitionName = getPartitionName(weekStart);

    const fromDate = weekStart.toISOString().split("T")[0];
    const toDate   = weekEnd.toISOString().split("T")[0];

    // IF NOT EXISTS prevents error if partition already exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS "${partitionName}"
      PARTITION OF "History"
      FOR VALUES FROM ('${fromDate}') TO ('${toDate}');
    `);

    console.log(`Partition ready: ${partitionName} (${fromDate} → ${toDate})`);
  } catch (err) {
    console.error("Partition creation error:", err.message);
  } finally {
    await client.end();
  }
}

// On server startup — ensure current week and next week partitions exist
// Next week is created in advance so there is no gap at week boundary
export async function ensurePartitionsExist() {
  const now      = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  await createPartitionForWeek(now);      // current week
  await createPartitionForWeek(nextWeek); // next week (safety)
}

// Every Monday at 00:01 AM — create partition for the new week + the week after
export function startPartitionCron() {
  cron.schedule("1 0 * * 1", async () => {
    console.log("Running weekly partition job...");

    const now      = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    await createPartitionForWeek(now);
    await createPartitionForWeek(nextWeek);
  });

  console.log("Partition cron job scheduled.");
}
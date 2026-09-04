import fs from "fs/promises";
import path from "path";
import { DEFAULT_HERO_BANNER, type HeroBannerConfig, type HeroBannerInput } from "@/types/hero-banner";
import { getMongoClient, getMongoDbName } from "@/lib/mongodb";

const DATA_FILE = path.join(process.cwd(), "data", "hero-banner.json");

export { DEFAULT_HERO_BANNER };

function hasMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function getHeroBannerConfig(): Promise<HeroBannerConfig> {
  // 1. Try MongoDB if configured
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());
      const doc = await db.collection("settings").findOne({ id: "main-hero-banner" });
      if (doc) {
        return {
          ...DEFAULT_HERO_BANNER,
          ...(doc as unknown as HeroBannerConfig),
        };
      }
    } catch {
      // Fall through to JSON file
    }
  }

  // 2. Try reading local JSON file
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_HERO_BANNER,
      ...parsed,
    };
  } catch {
    // 3. Fallback to default
    return DEFAULT_HERO_BANNER;
  }
}

export async function saveHeroBannerConfig(
  input: HeroBannerInput,
  user = "Quản trị viên"
): Promise<HeroBannerConfig> {
  const current = await getHeroBannerConfig();
  const updated: HeroBannerConfig = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
    updatedBy: user,
  };

  // 1. Save to MongoDB if available
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());
      await db.collection("settings").updateOne(
        { id: "main-hero-banner" },
        { $set: updated },
        { upsert: true }
      );
    } catch {}
  }

  // 2. Always persist to local JSON file for reliability & offline development
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving hero banner to file:", err);
  }

  return updated;
}

export async function resetHeroBannerToDefault(user = "Quản trị viên"): Promise<HeroBannerConfig> {
  return saveHeroBannerConfig(DEFAULT_HERO_BANNER, user);
}

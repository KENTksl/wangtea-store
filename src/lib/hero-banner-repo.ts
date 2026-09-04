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

      // Try modern site_settings collection first
      const siteDoc = await db.collection("site_settings").findOne({ _id: "hero_banner" as unknown as undefined });
      if (siteDoc && (siteDoc.data || siteDoc.desktopImage)) {
        const docData = (siteDoc.data || siteDoc) as Partial<HeroBannerConfig>;
        return {
          ...DEFAULT_HERO_BANNER,
          ...docData,
        };
      }

      // Legacy fallback: settings collection
      const legacyDoc = await db.collection("settings").findOne({ id: "main-hero-banner" });
      if (legacyDoc) {
        return {
          ...DEFAULT_HERO_BANNER,
          ...(legacyDoc as unknown as HeroBannerConfig),
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

  // 1. Save to MongoDB if available (both site_settings and legacy settings for complete compatibility)
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());

      await Promise.allSettled([
        db.collection("site_settings").updateOne(
          { _id: "hero_banner" as unknown as undefined },
          { $set: { data: updated, updatedAt: new Date() } },
          { upsert: true }
        ),
        db.collection("settings").updateOne(
          { id: "main-hero-banner" },
          { $set: updated },
          { upsert: true }
        ),
      ]);
    } catch (err) {
      console.error("MongoDB save hero banner error:", err);
    }
  }

  // 2. Persist to local JSON file (graceful on read-only environments like Vercel)
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch {
    // Expected on serverless environments where disk is read-only
  }

  return updated;
}

export async function resetHeroBannerToDefault(user = "Quản trị viên"): Promise<HeroBannerConfig> {
  return saveHeroBannerConfig(DEFAULT_HERO_BANNER, user);
}

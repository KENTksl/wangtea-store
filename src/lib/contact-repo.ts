import fs from "fs/promises";
import path from "path";
import { DEFAULT_CONTACT_CONFIG, type ContactConfig, type ContactInput } from "@/types/contact";
import { getMongoClient, getMongoDbName } from "@/lib/mongodb";

const DATA_FILE = path.join(process.cwd(), "data", "contact-config.json");
const COLLECTION = "site_settings";
const DOC_ID = "contact_info";

export { DEFAULT_CONTACT_CONFIG };

function hasMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function getContactConfig(): Promise<ContactConfig> {
  // 1. Try MongoDB if configured
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());
      const doc = await db.collection(COLLECTION).findOne({ _id: DOC_ID as unknown as undefined });
      if (doc && doc.data) {
        return {
          ...DEFAULT_CONTACT_CONFIG,
          ...(doc.data as Partial<ContactConfig>),
        };
      }
    } catch (err) {
      console.error("MongoDB getContactConfig error, fallback to JSON file:", err);
    }
  }

  // 2. Read from JSON file
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<ContactConfig>;
    return {
      ...DEFAULT_CONTACT_CONFIG,
      ...parsed,
    };
  } catch {
    // 3. Fallback to default
    return DEFAULT_CONTACT_CONFIG;
  }
}

export async function saveContactConfig(
  input: ContactInput,
  username: string = "Quản trị viên"
): Promise<ContactConfig> {
  const current = await getContactConfig();

  const updated: ContactConfig = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
    updatedBy: username,
  };

  // 1. Save to JSON file
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write contact config to file:", err);
  }

  // 2. Save to MongoDB if available
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());
      await db.collection(COLLECTION).updateOne(
        { _id: DOC_ID as unknown as undefined },
        { $set: { data: updated, updatedAt: new Date() } },
        { upsert: true }
      );
    } catch (err) {
      console.error("Failed to save contact config to MongoDB:", err);
    }
  }

  return updated;
}

export async function resetContactConfigToDefault(
  username: string = "Quản trị viên"
): Promise<ContactConfig> {
  const resetConfig: ContactConfig = {
    ...DEFAULT_CONTACT_CONFIG,
    updatedAt: new Date().toISOString(),
    updatedBy: `${username} (Khôi phục mặc định)`,
  };

  // 1. Write to JSON
  try {
    const dir = path.dirname(DATA_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(resetConfig, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to reset contact config file:", err);
  }

  // 2. Update MongoDB if available
  if (hasMongoConfigured()) {
    try {
      const client = await getMongoClient();
      const db = client.db(getMongoDbName());
      await db.collection(COLLECTION).updateOne(
        { _id: DOC_ID as unknown as undefined },
        { $set: { data: resetConfig, updatedAt: new Date() } },
        { upsert: true }
      );
    } catch (err) {
      console.error("Failed to reset contact config in MongoDB:", err);
    }
  }

  return resetConfig;
}

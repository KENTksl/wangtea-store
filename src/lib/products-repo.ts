import type { Product, ProductInput } from "@/types/product";
import { ObjectId } from "mongodb";
import { getMongoClient, getMongoDbName } from "@/lib/mongodb";

const COLLECTION = "products";

function nowIso() {
  return new Date().toISOString();
}

function hasMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

function ensureMongoConfigured() {
  if (!hasMongoConfigured()) {
    throw new Error("MongoDB is not configured. Missing MONGODB_URI");
  }
}

function toStringOrEmpty(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (v === null || v === undefined ? "" : String(v).trim()))
    .filter(Boolean);
}

function normalizeProductFromDoc(d: any): Product {
  const description = toStringOrEmpty(d.description || d.note);
  const ingredients = toStringOrEmpty(d.ingredients);
  const dosage = toStringOrEmpty(d.dosage);
  const disclosureNumber = toStringOrEmpty(d.disclosureNumber);
  const applications = toStringOrEmpty(d.applications);
  const images = toStringArray(d.images);

  return {
    _id: String(d._id),
    name: toStringOrEmpty(d.name),
    description,
    ingredients,
    dosage,
    disclosureNumber,
    applications,
    images,
    createdAt: toStringOrEmpty(d.createdAt) || nowIso(),
    updatedAt: toStringOrEmpty(d.updatedAt) || toStringOrEmpty(d.createdAt) || nowIso(),
  };
}

export async function listProducts(): Promise<Product[]> {
  ensureMongoConfigured();

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());
  const docs = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(normalizeProductFromDoc);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const createdAt = nowIso();
  const updatedAt = createdAt;

  ensureMongoConfigured();

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());

  const doc = { ...input, createdAt, updatedAt };
  const result = await db.collection(COLLECTION).insertOne(doc);

  return { _id: String(result.insertedId), ...input, createdAt, updatedAt };
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>,
): Promise<Product | null> {
  const updatedAt = nowIso();

  ensureMongoConfigured();

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());

  const collection = db.collection<any>(COLLECTION);
  const filters = ObjectId.isValid(id)
    ? [{ _id: new ObjectId(id) }, { _id: id }]
    : [{ _id: id }];

  for (const filter of filters) {
    const result = await collection.updateOne(filter, {
      $set: { ...input, updatedAt },
    });
    if (result.matchedCount !== 1) continue;
    const doc = await collection.findOne(filter);
    if (!doc) return null;
    return normalizeProductFromDoc(doc);
  }

  return null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  ensureMongoConfigured();

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());

  const collection = db.collection<any>(COLLECTION);
  const filters = ObjectId.isValid(id)
    ? [{ _id: new ObjectId(id) }, { _id: id }]
    : [{ _id: id }];

  for (const filter of filters) {
    const result = await collection.deleteOne(filter);
    if (result.deletedCount === 1) return true;
  }

  return false;
}

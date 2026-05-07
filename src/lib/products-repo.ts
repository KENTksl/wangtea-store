import type { Product, ProductInput } from "@/types/product";
import { ObjectId } from "mongodb";
import { getMongoClient, getMongoDbName } from "@/lib/mongodb";
import { seededProducts } from "@/lib/products-seed";

const memoryStore = new Map<string, Product>(
  seededProducts.map((p) => [p._id, p]),
);

const COLLECTION = "products";

function nowIso() {
  return new Date().toISOString();
}

function hasMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function listProducts(): Promise<Product[]> {
  if (!hasMongoConfigured()) {
    return Array.from(memoryStore.values()).sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());
  const docs = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((d) => ({
    _id: String(d._id),
    name: String(d.name),
    category: String(d.category),
    sku: String(d.sku),
    note: String(d.note),
    packaging: String(d.packaging),
    origin: String(d.origin),
    badge: d.badge ? String(d.badge) : undefined,
    createdAt: String(d.createdAt),
    updatedAt: String(d.updatedAt),
  }));
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const createdAt = nowIso();
  const updatedAt = createdAt;

  if (!hasMongoConfigured()) {
    const _id = crypto.randomUUID();
    const product: Product = { _id, ...input, createdAt, updatedAt };
    memoryStore.set(_id, product);
    return product;
  }

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

  if (!hasMongoConfigured()) {
    const existing = memoryStore.get(id);
    if (!existing) return null;
    const next: Product = { ...existing, ...input, updatedAt };
    memoryStore.set(id, next);
    return next;
  }

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());

  const _id = ObjectId.isValid(id) ? new ObjectId(id) : null;
  if (!_id) return null;

  const result = await db
    .collection(COLLECTION)
    .findOneAndUpdate(
      { _id },
      { $set: { ...input, updatedAt } },
      { returnDocument: "after" },
    );

  const d = result?.value;
  if (!d) return null;

  return {
    _id: String(d._id),
    name: String(d.name),
    category: String(d.category),
    sku: String(d.sku),
    note: String(d.note),
    packaging: String(d.packaging),
    origin: String(d.origin),
    badge: d.badge ? String(d.badge) : undefined,
    createdAt: String(d.createdAt),
    updatedAt: String(d.updatedAt),
  };
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!hasMongoConfigured()) {
    return memoryStore.delete(id);
  }

  const client = await getMongoClient();
  const db = client.db(getMongoDbName());

  const _id = ObjectId.isValid(id) ? new ObjectId(id) : null;
  if (!_id) return false;

  const result = await db.collection(COLLECTION).deleteOne({ _id });
  return result.deletedCount === 1;
}

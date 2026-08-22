import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock the storage and db modules ──────────────────────────────────────────
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "uploads/1/abc123.png",
    url: "https://cdn.example.com/uploads/1/abc123.png",
  }),
}));

vi.mock("./db", async importOriginal => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createUpload: vi.fn().mockResolvedValue(undefined),
    getUploadsByUser: vi.fn().mockResolvedValue([
      {
        id: 1,
        userId: 1,
        fileName: "test.png",
        fileKey: "uploads/1/abc123.png",
        url: "https://cdn.example.com/uploads/1/abc123.png",
        mimeType: "image/png",
        size: 1024,
        createdAt: new Date(),
      },
    ]),
    getUploadById: vi.fn().mockResolvedValue({
      id: 1,
      userId: 1,
      fileName: "test.png",
      fileKey: "uploads/1/abc123.png",
      url: "https://cdn.example.com/uploads/1/abc123.png",
      mimeType: "image/png",
      size: 1024,
      createdAt: new Date(),
    }),
    deleteUpload: vi.fn().mockResolvedValue(undefined),
  };
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeCtx(userId = 1, role: "admin" | "user" = "admin"): TrpcContext {
  return {
    user: {
      id: userId,
      openId: "test-open-id",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("storage router", () => {
  it("upload: returns file metadata on success (admin)", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "admin"));
    const result = await caller.storage.upload({
      fileName: "test.png",
      mimeType: "image/png",
      size: 1024,
      dataBase64: Buffer.from("fake-image-data").toString("base64"),
    });
    expect(result.fileName).toBe("test.png");
    expect(result.url).toContain("cdn.example.com");
  });

  it("upload: rejects files over 20 MB", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "admin"));
    await expect(
      caller.storage.upload({
        fileName: "huge.bin",
        mimeType: "application/octet-stream",
        size: 21 * 1024 * 1024,
        dataBase64: "dGVzdA==",
      })
    ).rejects.toThrow("20 MB");
  });

  it("upload: throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "user"));
    await expect(
      caller.storage.upload({
        fileName: "test.png",
        mimeType: "image/png",
        size: 1024,
        dataBase64: "dGVzdA==",
      })
    ).rejects.toThrow();
  });

  it("list: returns files for the admin user", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "admin"));
    const files = await caller.storage.list();
    expect(Array.isArray(files)).toBe(true);
    expect(files[0]?.fileName).toBe("test.png");
  });

  it("list: throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "user"));
    await expect(caller.storage.list()).rejects.toThrow();
  });

  it("delete: removes a file owned by the admin user", async () => {
    const caller = appRouter.createCaller(makeCtx(1, "admin"));
    const result = await caller.storage.delete({ id: 1 });
    expect(result.success).toBe(true);
  });

  it("delete: throws FORBIDDEN when user does not own the file", async () => {
    const caller = appRouter.createCaller(makeCtx(99, "admin")); // different userId
    await expect(caller.storage.delete({ id: 1 })).rejects.toThrow(
      "You do not own this file."
    );
  });
});

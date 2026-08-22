import { useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Upload,
  Trash2,
  FileText,
  Image,
  Film,
  Music,
  File,
  ExternalLink,
  Loader2,
  CloudUpload,
} from "lucide-react";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function fileIcon(mimeType: string) {
  if (mimeType.startsWith("image/"))
    return <Image className="w-5 h-5 text-[#d4af37]" />;
  if (mimeType.startsWith("video/"))
    return <Film className="w-5 h-5 text-blue-400" />;
  if (mimeType.startsWith("audio/"))
    return <Music className="w-5 h-5 text-purple-400" />;
  if (mimeType === "application/pdf")
    return <FileText className="w-5 h-5 text-red-400" />;
  return <File className="w-5 h-5 text-gray-400" />;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URI prefix (e.g. "data:image/png;base64,")
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FileManager() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const utils = trpc.useUtils();
  const isAdmin = isAuthenticated && user?.role === "admin";
  const { data: files = [], isLoading } = trpc.storage.list.useQuery(
    undefined,
    {
      enabled: isAdmin,
    }
  );

  const uploadMutation = trpc.storage.upload.useMutation({
    onSuccess: () => {
      utils.storage.list.invalidate();
      toast.success("File uploaded successfully.");
    },
    onError: err => toast.error(err.message),
  });

  const deleteMutation = trpc.storage.delete.useMutation({
    onSuccess: () => {
      utils.storage.list.invalidate();
      toast.success("File deleted.");
    },
    onError: err => toast.error(err.message),
  });

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const dataBase64 = await readFileAsBase64(file);
        await uploadMutation.mutateAsync({
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          dataBase64,
        });
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // ── Auth gate ──────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B1F3B] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1F3B] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <CloudUpload className="w-16 h-16 text-[#d4af37] opacity-80" />
        <h1 className="text-3xl font-serif font-bold text-white">
          File Manager
        </h1>
        <p className="text-gray-400 max-w-sm">
          Sign in to upload and manage your files securely in the cloud.
        </p>
        <a
          href={getLoginUrl()}
          className="bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-8 py-3 rounded-md font-bold transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  // ── Admin-only gate ────────────────────────────────────────────────────────
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0B1F3B] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <CloudUpload className="w-10 h-10 text-gray-500" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">
          Access Restricted
        </h1>
        <p className="text-gray-400 max-w-sm">
          The File Manager is only available to administrators.
        </p>
        <a
          href="/"
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-md font-bold transition-colors border border-white/10"
        >
          Back to Home
        </a>
      </div>
    );
  }

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#0B1F3B]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="https://chronologicalbibleacademy.s3.us-east-2.amazonaws.com/manus-storage/cba_logo_cropped_61583c5c.png"
              alt="CBA Logo"
              className="h-9 w-9 object-contain"
            />
            <span className="font-serif font-bold text-lg tracking-wide group-hover:text-[#d4af37] transition-colors">
              CBA
            </span>
          </a>
          <span className="text-white/30 text-lg">/</span>
          <span className="text-[#d4af37] font-semibold text-sm">
            File Manager
          </span>
        </div>
        <span className="text-sm text-gray-400 hidden sm:block">
          Signed in as{" "}
          <span className="text-white font-medium">
            {user?.name ?? user?.email}
          </span>
        </span>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            File Manager
          </h1>
          <p className="text-gray-400">
            Upload, preview, and manage your files stored in the cloud.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 mb-10 ${
            dragOver
              ? "border-[#d4af37] bg-[#d4af37]/10"
              : "border-white/20 hover:border-[#d4af37]/60 hover:bg-white/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
              <p className="text-[#d4af37] font-semibold">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                <Upload className="w-7 h-7 text-[#d4af37]" />
              </div>
              <p className="text-white font-semibold text-lg">
                Drop files here or{" "}
                <span className="text-[#d4af37]">browse</span>
              </p>
              <p className="text-gray-500 text-sm">
                Any file type · Max 20 MB per file
              </p>
            </div>
          )}
        </div>

        {/* File list */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No files uploaded yet. Drop something above to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </p>
            {files.map(f => (
              <div
                key={f.id}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/8 transition-colors group"
              >
                {/* Thumbnail or icon */}
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {f.mimeType.startsWith("image/") ? (
                    <img
                      src={f.url}
                      alt={f.fileName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    fileIcon(f.mimeType)
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate text-sm">
                    {f.fileName}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {formatBytes(f.size)} · {f.mimeType} ·{" "}
                    {new Date(f.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open file"
                    className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deleteMutation.mutate({ id: f.id })}
                    disabled={deleteMutation.isPending}
                    title="Delete file"
                    className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

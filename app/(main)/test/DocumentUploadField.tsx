"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DocumentUploadFieldProps {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  /** Opens the front-facing camera directly on mobile — use for the selfie field */
  capturePhoto?: boolean;
}

const MAX_FILE_SIZE_MB = 5;

export default function DocumentUploadField({
  id,
  label,
  description,
  accept = "image/*",
  required = false,
  file,
  onChange,
  error,
  capturePhoto = false,
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleFile(selected: File | null) {
    if (!selected) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }
    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }
    onChange(selected);
    setPreviewUrl(selected.type.startsWith("image/") ? URL.createObjectURL(selected) : null);
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        capture={capturePhoto ? "user" : undefined}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-6 text-sm transition hover:bg-secondary/50 ${
            error ? "border-destructive" : "border-border"
          }`}
        >
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Click to upload</span>
          <span className="text-xs text-muted-foreground/70">
            JPG, PNG{accept.includes("pdf") ? " or PDF" : ""}, up to {MAX_FILE_SIZE_MB}MB
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt={label} className="h-12 w-12 rounded-md object-cover" />
          ) : (
            <FileText className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            onClick={() => handleFile(null)}
            className="rounded-full p-1 text-muted-foreground hover:bg-secondary"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

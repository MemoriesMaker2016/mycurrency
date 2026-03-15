"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "./UserTable";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type EditUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

interface EditUserModalProps {
  /** Pass a user to open the modal; null closes it */
  user: User | null;
  onClose: () => void;
  onSave: (id: string, data: EditUserForm) => Promise<void>;
}

// ─────────────────────────────────────────────────────────────
// Field config — add / remove fields in one place
// ─────────────────────────────────────────────────────────────
const FIELDS: {
  key: keyof EditUserForm;
  label: string;
  type?: string;
  placeholder?: string;
}[] = [
  { key: "firstName", label: "First Name", placeholder: "John" },
  { key: "lastName", label: "Last Name", placeholder: "Doe" },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
  },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
];

const EMPTY_FORM: EditUserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [form, setForm] = useState<EditUserForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(user);

  // Populate form when a user is selected
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
      setError(null);
    }
  }, [user]);

  const handleChange =
    (field: keyof EditUserForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      await onSave(user._id, form);
      onClose();
    } catch (err) {
      setError("Failed to save changes. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update details for{" "}
            <span className="font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {FIELDS.map(({ key, label, type = "text", placeholder }) => (
            <div key={key} className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={key} className="text-right text-sm">
                {label}
              </Label>
              <Input
                id={key}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={handleChange(key)}
                className="col-span-2"
                disabled={saving}
              />
            </div>
          ))}

          {/* Role Select */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-right text-sm">Role</Label>
            <Select
              value={form.role}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, role: val }))
              }
              disabled={saving}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="subadmin">Sub Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="col-span-3 text-sm text-destructive text-center">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              "Saving…"
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

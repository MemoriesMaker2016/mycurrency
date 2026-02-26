"use client";

import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type EditData = {
  name: string;
  email: string;
  phone: string;
  username: string;
  address: string;
  city: string;
  state: string;
};

type Props = {
  editData: EditData;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  /** "mobile" renders single-col, "desktop" renders 2-col grid */
  layout?: "mobile" | "desktop";
};

export default function EditProfileForm({
  editData,
  onChange,
  onSave,
  onCancel,
  layout = "desktop",
}: Props) {
  const gridClass =
    layout === "desktop"
      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
      : "grid grid-cols-1 gap-4";

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Edit Personal Details
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className={gridClass}>
          {[
            { label: "Full Name", field: "name", type: "text" },
            { label: "Username", field: "username", type: "text" },
            { label: "Email Address", field: "email", type: "email" },
            { label: "Phone Number", field: "phone", type: "text" },
            { label: "State", field: "state", type: "text" },
            { label: "City", field: "city", type: "text" },
          ].map(({ label, field, type }) => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium">{label}</label>
              <Input
                type={type}
                value={(editData as any)[field] ?? ""}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={label}
                className="bg-background"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Address</label>
          <Input
            value={editData.address ?? ""}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Complete Address"
            className="min-h-24 bg-background"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onSave} className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
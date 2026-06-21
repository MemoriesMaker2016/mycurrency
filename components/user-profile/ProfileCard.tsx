"use client";

import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import { UserProfile } from "./types";

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

export default function ProfileCard({
  profile,
  onEdit,
}: {
  profile: UserProfile;
  onEdit: () => void;
}) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-orange-500 text-2xl font-bold text-white shadow-md">
            {getInitials(profile.firstName, profile.lastName)}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {fullName}
            </h2>

            <p className="text-sm text-slate-500">
              @{profile.username}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InfoTile
          icon={Mail}
          label="Email"
          value={profile.email || "Not Provided"}
        />

        <InfoTile
          icon={Phone}
          label="Phone"
          value={profile.phone || "Not Provided"}
        />

        <InfoTile
          icon={MapPin}
          label="City / State"
          value={`${profile.city || "-"}, ${profile.state || "-"}`}
        />

        <InfoTile
          icon={User}
          label="Address"
          value={profile.address || "Not Provided"}
        />
      </div>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <p className="mt-2 text-sm font-medium text-slate-800 break-words">
        {value}
      </p>
    </div>
  );
}
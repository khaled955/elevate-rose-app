"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import AdminSidebar from "./admin-sidebar";
import AdminProfileForm from "./admin-profile-form";
import AdminChangePasswordForm from "./admin-change-password-form";
import { ActiveTab } from "@/lib/types/profile";

export default function AdminProfileWrapper() {
  // Translations
  const t = useTranslations();

  // States
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  return (
    // Outer page wrapper
    <div className="min-h-screen bg-white dark:bg-zinc-800 p-4 md:p-8">
      {/* Page title */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-1">
          {t("dashboard")}
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {t("update-profile")}
        </h1>
      </header>

      <main className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content panel */}
        <div className="lg:col-span-9">
          {activeTab === "profile" && <AdminProfileForm />}
          {activeTab === "change-password" && <AdminChangePasswordForm />}
        </div>
      </main>
    </div>
  );
}

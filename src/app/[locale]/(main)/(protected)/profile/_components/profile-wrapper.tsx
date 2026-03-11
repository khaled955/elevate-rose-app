"use client";

import { useTranslations } from "next-intl";
import SidebarButtons from "./sidebar-buttons";
import { useState } from "react";
import ProfileForm from "./profile-form";
import ChangePasswordForm from "./change-password-form";

type ActiveTabProps = "profile" | "change-password";

export default function ProfileWrapper() {
  // Translations
  const t = useTranslations();

  // States
  const [activeTab, setActiveTab] = useState<ActiveTabProps>("profile");

  return (
    <section className="w-full">
      <h1 className="my-4 text-2xl font-bold capitalize text-zinc-800 dark:text-zinc-50 sm:text-3xl md:text-5xl">
        {t("update-profile")}
      </h1>

      <main className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* side-bar */}
        <SidebarButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* profile-form */}
        {activeTab === "profile" && <ProfileForm />}

        {/* change-password */}
        {activeTab === "change-password" && <ChangePasswordForm />}
      </main>
    </section>
  );
}



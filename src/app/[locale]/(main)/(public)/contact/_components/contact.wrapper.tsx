"use client";
import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactWrapper() {
  // Translation
  const t = useTranslations("support");

  // State
  const [form, setForm] = React.useState<ContactFormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Variables
  const isDisabled =
    isSubmitting ||
    !form.name.trim() ||
    !form.email.trim() ||
    !form.message.trim();

  // Functions
  function updateField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(false);

    // validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSubmitError(t("form.error"));
      return;
    }

    try {
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 900));

      setSubmitSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      setSubmitError(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
        <div
          className={cn(
            "pointer-events-none absolute -inset-24 opacity-70 blur-3xl",
            "bg-[radial-gradient(circle_at_top,rgba(239,155,40,0.20),transparent_55%)]",
            "dark:bg-[radial-gradient(circle_at_top,rgba(239,155,40,0.18),transparent_55%)]",
          )}
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {t("title")}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-base">
              {t("subtitle")}
            </p>
          </div>

          <Badge className="w-fit rounded-full bg-maroon-600 px-4 py-2 text-sm text-white hover:bg-maroon-600">
            {t("badge")}
          </Badge>
        </div>
      </section>

      {/* Content */}
      <section className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Info cards */}
        <div className="grid gap-4 lg:col-span-5">
          <Card className="rounded-2xl border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {/* You can add translations for these labels later */}
                  Our Location
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Visit our flower studio and explore our fresh collections in
                  person.
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Riyadh, Saudi Arabia
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <Phone className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Call Us
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Our team is available to assist you with orders and questions.
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  +966 50 000 0000
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Email Support
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Send us an email and we’ll respond as soon as possible.
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  support@roseapp.com
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <Clock className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Working Hours
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  Sunday – Thursday: 9 AM – 10 PM
                  <br />
                  Friday – Saturday: 2 PM – 11 PM
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Form */}
        <Card className="rounded-2xl border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:col-span-7 sm:p-6">
          <header className="mb-5">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 sm:text-xl">
              {t("form.title")}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {t("form.description")}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t("form.name")}
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("form.name")}
                  className="h-11 rounded-xl"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t("form.email")}
                </label>
                <Input
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={t("form.email")}
                  className="h-11 rounded-xl"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t("form.phone")}
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t("form.phone")}
                  className="h-11 rounded-xl"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {t("form.subject")}
                </label>
                <Input
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder={t("form.subject")}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {t("form.message")}
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder={t("form.message")}
                className="min-h-[140px] rounded-xl"
              />
            </div>

            {/* Alerts */}
            {submitError && (
              <div
                className={cn(
                  "rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700",
                  "dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
                )}
                role="alert"
              >
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div
                className={cn(
                  "rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800",
                  "dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200",
                )}
                role="status"
                aria-live="polite"
              >
                {t("form.success")}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t("badge")}
              </p>

              <Button
                type="submit"
                disabled={isDisabled}
                className={cn(
                  "h-11 rounded-xl bg-maroon-600 px-5 text-white hover:bg-maroon-700",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <Send className="me-2 h-4 w-4" />
                    {t("form.submit")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}

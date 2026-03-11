"use client";

import * as React from "react";
import { Trash2, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Locale = string;

type DeleteAddressAlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;

  /** Locale that controls default texts */
  locale: Locale;

  title?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

export default function DeleteAlert({
  open,
  onOpenChange,
  onConfirm,
  locale = "en",
  title,
  confirmText,
  cancelText,
  isLoading = false,
}: DeleteAddressAlertProps) {
  const isAr = locale === "ar";

  const defaultTitle = isAr
    ? "هل أنت متأكد أنك تريد حذف هذا؟"
    : "Are you sure you want to delete this?";

  const defaultConfirm = isAr ? "تأكيد" : "Confirm";
  const defaultCancel = isAr ? "إلغاء" : "Cancel";
  const deletingText = isAr ? "جاري الحذف..." : "Deleting...";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[560px] md:w-1/3 rounded-2xl p-0 overflow-hidden z-[99999999]">
        {/* close-btn */}
        <div className="close-btn absolute top-2 end-2">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            aria-label={isAr ? "إغلاق" : "Close"}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={25} />
          </button>
        </div>

        <div className="p-8 sm:p-6">
          <AlertDialogHeader className="items-center text-center space-y-0">
            {/* Icon */}
            <div className="mb-7">
              <div className="relative flex items-center justify-center">
                {/* outer ring */}
                <div className="size-28 rounded-full bg-zinc-100 flex items-center justify-center">
                  {/* inner circle */}
                  <div className="size-16 rounded-full bg-zinc-200 flex items-center justify-center">
                    <Trash2 className="size-7 text-zinc-700" />
                  </div>
                </div>
              </div>
            </div>

            <AlertDialogTitle className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 leading-snug sm:text-nowrap">
              {title ?? defaultTitle}
            </AlertDialogTitle>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="gap-3 sm:gap-4 px-8 pb-8 sm:px-10 sm:pb-10 sm:flex-row">
          {/* cancel */}
          <AlertDialogCancel
            className="h-11 sm:h-12 w-full sm:w-1/2 rounded-xl border border-zinc-300 text-zinc-800 dark:bg-gray-400 hover:dark:bg-gray-500 dark:text-white transition-colors duration-300"
            disabled={isLoading}
          >
            {cancelText ?? defaultCancel}
          </AlertDialogCancel>

          {/* confirm — plain button, NOT AlertDialogAction, to prevent auto-close */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="h-11 sm:h-12 w-full sm:w-1/2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {deletingText}
              </>
            ) : (
              (confirmText ?? defaultConfirm)
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
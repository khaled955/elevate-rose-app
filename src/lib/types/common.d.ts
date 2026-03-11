import { Locale } from "next-intl";
import React from "react";

// declare type SearchParams = string | string[] | undefined;

declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type RouteProps = {
  params: {
    locale: Locale;
    productId: string;
    categoryId: string;
    occassionId: string;
  };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

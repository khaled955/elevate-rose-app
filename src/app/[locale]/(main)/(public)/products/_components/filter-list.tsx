import React from "react";

type FilterListProps = {
  children: React.ReactNode;
};
export default function FilterList({ children }: FilterListProps) {
  return <div>{children}</div>;
}

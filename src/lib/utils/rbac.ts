import { User } from "next-auth";

const POLICIES = {
  admin: [
    "view:dashboard",
    "view:products",
    "create:products",
    "update:products",
    "delete:products",
    "view:categories",
    "create:categories",
    "update:categories",
    "delete:categories",
  ],
  moderator: [
    "view:products",
    "create:products",
    "update:products",
    "view:categories",
    "create:categories",
    "update:categories",
  ],
  user: ["view:products", "view:categories"],
} as const;

type Role = User["user"]["role"];
type Permission = (typeof POLICIES)[Role][number];

export function hasPermission(permission: Permission, role?: Role) {
  if (!role) return false;

  return (POLICIES[role] as readonly Permission[]).includes(permission);
}

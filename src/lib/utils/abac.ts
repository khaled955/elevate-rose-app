import { Session, User } from "next-auth";
import { Product } from "../types/product";
import { Category } from "../types/category";
import { Review } from "../types/preview";

type Role = User["user"]["role"];

type Permissions = {
  products: {
    type: Product;
    action: "view" | "create" | "update" | "delete";
  };
  categories: {
    type: Category;
    action: "view" | "create" | "update";
  };
  reviews: {
    type: Review;
    action: "view" | "create" | "update" | "delete";
  };
};

type Policies = {
  [R in Role]: Partial<{
    [P in keyof Permissions]: Partial<{
      [A in Permissions[P]["action"]]:
        | boolean
        | ((
            user: Session["user"],
            resource?: Permissions[P]["type"],
          ) => boolean);
    }>;
  }>;
};

const POLICIES: Policies = {
  admin: {
    products: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    categories: {
      view: true,
      create: true,
      update: true,
    },
    reviews: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    products: {
      view: true,
      create: true,
      update: true,
    },
    categories: {
      view: true,
      create: true,
      update: true,
    },
    reviews: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  user: {
    categories: {
      view: true,
    },
    reviews: {
      view: true,
      create: true,
      update: (user, review) => user._id === review?.user._id,
      delete: (user, review) => user._id === review?.user._id,
    },
  },
} as const;

export function hasPermission<Object extends keyof Permissions>(
  subject: Session["user"] | null | undefined,
  object: Object,
  action: Permissions[Object]["action"],
  resource?: Permissions[Object]["type"],
) {
  if (!subject) return false;

  const permission = POLICIES[subject.role][object]?.[action];

  if (typeof permission === "function") {
    return permission(subject, resource);
  }

  if (typeof permission === "boolean") {
    return permission;
  }

  return false;
}

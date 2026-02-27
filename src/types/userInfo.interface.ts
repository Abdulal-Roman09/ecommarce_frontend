import { UserRole } from "@/lib/auth-utils";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  role: UserRole;
  status?: UserStatus;
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;

  admin?: {
    id?: string;
    email?: string;
    name?: string;
    profilePhoto?: string | null;
    contactNumber?: string;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;

  vendor?: {
    id?: string;
    email?: string;
    name?: string;
    profilePhoto?: string | null;
    contactNumber?: string;
    gender?: string;
    address?: string;
    rating?: number;
    isVerified?: boolean;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    categories?: string[];
    brands?: string[];
    shops?: string[];
  } | null;

  customer?: {
    id?: string;
    email?: string;
    name?: string;
    contactNumber?: string;
    profilePhoto?: string | null;
    presentAddress?: string | null;
    isDeleted?: boolean;
    deletedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
}
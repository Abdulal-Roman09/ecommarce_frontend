import { UserRole } from "@/lib/auth-utils";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profilePhoto?: string | null;
    address?: string | null;
    isDelete: boolean;
    contactNumber?: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  vendor?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profilePhoto?: string | null;
    address?: string | null;
    isDelete: boolean;
    contactNumber?: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    categories?: string[] | null;
  } | null;
  customer?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber?: string | null;
    address?: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

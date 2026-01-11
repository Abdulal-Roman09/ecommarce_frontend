import { UserRole } from "@/lib/auth-utils";


export interface UserInfo{
    name:string;
    id:string;
    email:string;
    role:UserRole
}
import { UsersResponse } from "@/types/pocketbase-types";
import { atom } from "jotai";

export const membersAtom = atom<UsersResponse[]>([]);

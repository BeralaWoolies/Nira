import PocketBase from "pocketbase";
import { TypedPocketBase } from "@/types/pocketbase-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

let _singletonClient: TypedPocketBase | null = null;

function createNewClient() {
  return new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_URL) as TypedPocketBase;
}

export function createBrowserClient() {
  if (!process.env.NEXT_PUBLIC_POCKETBASE_API_URL) {
    throw new Error("Pocketbase API url not defined !");
  }

  if (_singletonClient === null) {
    _singletonClient = createNewClient();

    _singletonClient.authStore.onChange(() => {
      document.cookie = _singletonClient!.authStore.exportToCookie({
        httpOnly: false,
      });
    });
  }

  if (typeof window === "undefined") {
    throw new Error("This method is only supposed to call from the Browser environment");
  }

  return _singletonClient;
}

export function createServerClient(cookieStore?: ReadonlyRequestCookies) {
  if (!process.env.NEXT_PUBLIC_POCKETBASE_API_URL) {
    throw new Error("Pocketbase API url not defined !");
  }

  if (typeof window !== "undefined") {
    throw new Error("This method is only supposed to call from the Server environment");
  }

  const client = createNewClient();
  if (cookieStore) {
    const authCookie = cookieStore.get("pb_auth");

    if (authCookie) {
      client.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
    }
  }

  return client;
}

export function createFileUrl({
  collectionId,
  recordId,
  filename,
}: {
  collectionId: string;
  recordId: string;
  filename: string;
}) {
  return `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}/api/files/${collectionId}/${recordId}/${filename}`;
}

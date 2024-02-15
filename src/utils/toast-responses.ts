import { StatusResponse } from "@/types/status-types";
import { toast } from "sonner";

export default function toastStatusResponse(response: StatusResponse) {
  if (response.success) {
    toast.success(response.success, {
      duration: 4000,
    });
  } else {
    toast.error(response.error, {
      duration: 5000,
    });
  }
}

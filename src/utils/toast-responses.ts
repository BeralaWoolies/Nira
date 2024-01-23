import { KanbanResponse } from "@/actions/kanban-board";
import { toast } from "sonner";

export default function toastKanbanResponse(response: KanbanResponse) {
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

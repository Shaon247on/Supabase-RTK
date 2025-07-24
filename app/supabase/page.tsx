"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import AddTaskDialog from "./components/addTaskDialog";
import { supabase } from "@/supabase/supabase-client";
import { taskType } from "@/types/task.type";
import { Pencil, Trash } from "lucide-react";
import moment from "moment";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearSession, setSession } from "@/services/authSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useLogoutMutation } from "@/services/cookiesSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

function getShortRelativeTime(dateString: string) {
  const now = moment();
  const then = moment(dateString);
  const diffSeconds = now.diff(then, "seconds");

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  }
  const diffMinutes = now.diff(then, "minutes");
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  const diffHours = now.diff(then, "hours");
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = now.diff(then, "days");
  return `${diffDays}d ago`;
}

export default function page() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [tasks, setTasks] = React.useState<taskType[]>([]);
  const dispatch = useDispatch();
  const redirect = useRouter();
  const [logout] = useLogoutMutation();
  const session = useSelector((state: RootState) => state.auth.session);

  console.log("Session from Redux store:", session);

  useEffect(() => {
    fatchTasks();
    fetchSession();

    const { data: authListner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session));
      }
    );
    return () => {
      authListner.subscription.unsubscribe();
    };
  }, []);

  

  useEffect(() => {
    const channel = supabase.channel("task-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "task" },
        (payload) => {
          const newTask = payload.new as taskType;
          setTasks((perv) => [...perv, newTask]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "task" },
        (payload) => {
          const updatedTask = payload.new as taskType;
          setTasks((prev) =>
            prev.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "task" },
        (payload) => {
          const deletedTask = payload.old as taskType;
          setTasks((prev) => prev.filter((task) => task.id !== deletedTask.id));
        }
      )
      .subscribe((status) => {
        console.log("channel subscription:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  console.log("Tasks fetched on component mount:", tasks);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data) {
      dispatch(setSession(data.session));
    }
  };

  const fatchTasks = async () => {
    const { error, data } = await supabase
      .from("task")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }

    setTasks(data || []);
    console.log("Fetched tasks:", data);
  };

  const handleDeleteTask = async (taskId: string) => {
    console.log(taskId);
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone."
      );
      if (!confirmed) return;
      const { error } = await supabase.from("task").delete().eq("id", taskId);

      if (error) {
        console.error("Error deleting task:", error);
        return;
      }
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("image url:", tasks)

  const handleLogout = async () => {
    await logout();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    dispatch(clearSession());
    toast.success("You have been logged out successfully.");
    redirect.push("/login");
  };
  return (
    <div className="max-w-5xl mx-auto p-4 pt-20">
      <AddTaskDialog isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      <div className="flex justify-end items-center gap-2">
        <Button
          onClick={() => {
            setId("");
            setIsOpen(true);
          }}
          variant={"outline"}
        >
          Add Task
        </Button>        
      </div>
      <h1 className="text-2xl font-bold text-center mt-10">You Tasks</h1>

      {session ? (
        <div className="max-w-2xl mx-auto mt-6 min-h-screen">
          {tasks.map((task) => (
            <div key={task.id} className="border p-4 my-2 rounded flex items-center gap-4">
              <div>
                <Image src={task.img_url || "/not-found.jpg"} alt="Task Image" width={100} height={100} className="rounded-md mb-2" /> 
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">
                  Created at:{" "}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer underline decoration-dotted">
                        {task.created_at
                          ? getShortRelativeTime(task.created_at)
                          : "N/A"}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="center"
                      className="max-w-xs"
                    >
                      {moment(task.created_at).format("L")}
                    </TooltipContent>
                  </Tooltip>
                </p>
              </div>

              <div className="flex items-start gap-2 h-[100px]">
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setId(task.id || "");
                  }}
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteTask(task?.id || "")}
                  variant={"destructive"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg">Please sign in to view your tasks.</p>
        </div>
      )}
    </div>
  );
}

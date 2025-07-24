"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/supabase/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useEffect, useState } from "react";
import { taskSchema } from "@/schema/task.schema";
import { Label } from "@/components/ui/label";

export default function AddTaskDialog({
  isOpen,
  setIsOpen,
  id,
  setId,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  id?: string;
  setId?: (id: string) => void;
}) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskImage, setTaskImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      email: "",
      img_url: "",
    },
  });

  const fetchTask = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    console.log("user email:", sessionData?.session?.user?.email);
    if (sessionData?.session?.user?.email) {
      form.setValue("email", sessionData.session.user.email);
      setUserEmail(sessionData.session.user.email);
    }
    if (!id || !isOpen) return; // Only fetch if id exists and dialog is open

    setIsLoading(true);
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Failed to load task: " + error.message);
      setIsLoading(false);
      return;
    }

    form.reset({
      title: data.title || "",
      description: data.description || "",
      email: data.email || userEmail, // Use fetched email or current user email
    });

    setIsLoading(false);
    console.log("Fetched task:", data);
  };

  useEffect(() => {
    fetchTask();
    console.log("email of the user:", userEmail);
    form.setValue("email", userEmail);
  }, [id, isOpen, form]);

  console.log("Form values:", form.getValues());
  console.log("Form errors:", form.formState.errors);

  const onSubmit = async (data: z.infer<typeof taskSchema>) => {
    setIsLoading(true);

    try {
      if (id) {
        // Edit
        const { error } = await supabase.from("task").update(data).eq("id", id);
        if (error) throw error;
        toast.success("Task updated successfully!");
        setId && setId("");
      } else {
        // Add
        const { error } = await supabase.from("task").insert(data).single();
        if (error) throw error;
        toast.success("Task added successfully!");
        setId && setId("");
      }

      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      form.reset();
      setId && setId(""); // Clear id after submission
      setIsOpen(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null>=>{
    const filePath = `${file.name}-${Date.now()}`

    console.log("Image path name:",filePath)
    
    const {error} = await supabase.storage.from("task-image").upload(filePath, file)

    if(error){
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image: " + error.message);
      return null;
    }

    const {data} = await supabase.storage.from("task-image").getPublicUrl(filePath)
 
    if(!data.publicUrl){
      console.error("Failed to get public URL for the image.");
      toast.error("Failed to get public URL for the image.");
      return null;
    }

    return data.publicUrl
  }

  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("getting the file of image:", event.target.files);
    if(event.target.files && event.target.files.length){
      const file = event.target.files[0]

      const imageUrl = await uploadImage(file)

      console.log(`Image URL: ${typeof imageUrl}`);

      if(imageUrl){
        form.setValue("img_url", imageUrl);
        setTaskImage(file);
        console.log("Image uploaded successfully:", imageUrl);
      } else {
        console.error("Failed to upload image.");
      }

    }
  };

  console.log("the id state:", id);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          // First clear the id, so no fetch will happen after closing
          setId && setId("");

          // Reset form explicitly with empty values
          form.reset({
            title: "",
            description: "",
          });
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>{id ? "Edit Task" : "Add Task"}</DialogTitle>
        <div className="max-w-lg mx-12 mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title...." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description...." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="select and image"
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting...." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

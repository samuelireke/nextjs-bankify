"use client";

import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";

const formschema = authFormSchema("sign-up");

interface DatePickerProps {
  control: Control<z.infer<typeof formschema>>;
  name: FieldPath<z.infer<typeof formschema>>;
  label: string;
}

const DatePicker = ({ control, name, label }: DatePickerProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex w-full flex-col">
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "input-class pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(
                        typeof field.value === "string"
                          ? parseISO(field.value)
                          : field.value,
                        "dd/MM/yyyy"
                      )
                    ) : (
                      <span>Select date of birth</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    {/* {console.log(field)}  */}
                  </Button>
                </FormControl>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={
                  typeof field.value === "string"
                    ? parseISO(field.value)
                    : field.value
                }
                onSelect={(date) => field.onChange(date || undefined)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="form-message  mt-2" />
        </div>
      )}
    />
  );
};

export default DatePicker;

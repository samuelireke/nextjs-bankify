import React from "react";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";

const formschema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formschema>>;
  name: FieldPath<z.infer<typeof formschema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-fill flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                {...field}
                type={
                  ["password", "passwordConfirm"].includes(name)
                    ? "password"
                    : "text"
                }
              />
            </FormControl>
            <FormMessage className="form-message mt-2"></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;

import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";

interface FieldErrorProps {
  field: string;
  state: IInputErrorState;
}

export default function InputFieldError({ field, state }: FieldErrorProps) {
  const error = getInputFieldError(state, field);
  console.log(error)

  if (!error) return null;

  return <p className="text-red-600 text-xs font-medium">{error}</p>;
}

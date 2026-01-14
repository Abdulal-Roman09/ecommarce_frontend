/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputErrorState {
  sucess: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}

export function getInputFieldError(state: any, fieldName: string) {
  if (!state?.errors) return null;

  if (Array.isArray(state.errors)) {
    const error = state.errors.find((err: any) => err.field === fieldName);
    return error?.message ?? null;
  }

  return state.errors[fieldName] ?? null;
}

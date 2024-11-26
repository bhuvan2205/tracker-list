export const handleErrors = (error: unknown, errorMessage: string) => ({
  message: error instanceof Error ? (error?.message as string) : errorMessage,
});

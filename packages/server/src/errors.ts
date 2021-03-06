export const INVALID_URL = {
  code: 400,
  message:
    "An invalid URL was submitted. Please check your submission and try again.",
};
export const REPOSITORY_NOT_FOUND = (owner: string, name: string) => ({
  code: 500,
  message: `Repository ${owner}/${name} could not be found. Please check your submission and try again.`,
});
export const SERVER_ERROR = (error: { message: string }) => ({
  code: 500,
  message: `The following server error occurred when handling your request: ${error.message} `,
});

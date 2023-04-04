export const getRootContainer = () =>
  typeof window !== "undefined" ? document.getElementById("root") : null;

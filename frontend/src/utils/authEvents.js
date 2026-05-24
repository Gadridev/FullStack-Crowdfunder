export const UNAUTHORIZED_EVENT = "auth:unauthorized";

export function dispatchUnauthorized() {
  window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
}

// NOTE: this follows the same pattern as your other apiFasad/apiCalls files —
// NEXT_PUBLIC_BACKEND_URL + a Bearer token read from localStorage. If you
// already have a shared axios instance with interceptors set up, swap the
// fetch calls below for that instance instead. Just keep these two function
// signatures the same so the rest of the checkout flow doesn't need to change.
//
// Also double-check / adjust:
// - the localStorage key ("token") to match what you actually store the JWT under
// - the endpoint paths (/orders/:id and /orders/:id/documents) to match your backend
// - the response shape in getOrderById (currently assumes { order: {...} } or a bare order object)

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getOrderById(orderId: string) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  const data = await res.json();
  return data?.order ?? data;
}

export async function submitOrderDocuments(orderId: string, formData: FormData) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/documents`, {
    method: "POST",
    // Do NOT set Content-Type here — the browser sets the multipart boundary automatically.
    headers: { ...getAuthHeaders() },
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to submit documents");
  }
  return res.json();
}

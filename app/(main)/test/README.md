# Order verification (KYC) flow

A new step after booking: instead of showing a success dialog immediately, "Book Order" now
creates the order, then sends the user to `/checkout/documents?orderId=...` to upload PAN,
Aadhar (front + back), and a selfie before the order is confirmed.

## Files

- `app/checkout/documents/page.tsx` — route entry, wraps the content in `<Suspense>` (required
  since it reads `orderId` from the URL via `useSearchParams`).
- `app/checkout/documents/DocumentsCheckoutContent.tsx` — the actual page: loads the order,
  renders the form, validates PAN/Aadhar formats, uploads files, shows a success state.
- `components/checkout/OrderSummaryCard.tsx` — the "you pay / you get" summary shown above the form.
- `components/checkout/DocumentUploadField.tsx` — reusable upload control with image preview,
  remove button, and a 5MB size guard. The selfie field opens the front camera directly on mobile.
- `apiFasad/apiCalls/orderDocuments.ts` — two new API calls: `getOrderById` and
  `submitOrderDocuments`.
- `components/exchange-calculator/exchange-calculator.tsx` — your existing calculator, with
  `handleBookOrder` updated to redirect into the new flow instead of opening the old success
  dialog. Everything else in the file is unchanged from what you shared.

## Drop-in steps

1. Copy the four new files into your project at the paths above.
2. Replace your existing `components/exchange-calculator.tsx` with the updated version here (or
   just apply the `handleBookOrder` change manually if you've touched the file since).
3. Make sure `lucide-react` is installed (you're already using it elsewhere, so likely a no-op).

## What your backend needs to support

- `GET /orders/:id` → returns the order (used to show the summary card). The fetch helper accepts
  either `{ order: {...} }` or a bare order object — adjust `getOrderById` if your shape differs.
- `POST /orders/:id/documents` (multipart/form-data) with fields: `panNumber`, `aadharNumber`,
  `panCard` (file), `aadharFront` (file), `aadharBack` (file), `selfie` (file).

Both calls currently use `fetch` directly with `Authorization: Bearer <token>` pulled from
`localStorage.getItem("token")`, matching what you said your other calls do. If your real
localStorage key is different, or if you'd rather route this through a shared axios instance
(if you have one), that's a one-line swap in `orderDocuments.ts` — the comments at the top of the
file point to exactly what to change.

## Validation rules baked in

- PAN: `ABCDE1234F` format (5 letters, 4 digits, 1 letter), case-insensitive input, normalized to
  uppercase.
- Aadhar: exactly 12 digits, non-digit characters are stripped as the user types.
- All four files (PAN, Aadhar front/back, selfie) are required; each capped at 5MB client-side.

## Still outstanding from earlier

You'd mentioned pasting your shared axios client so I could wire `getUsersDetails`,
`updateUserDetails`, and `getUsersOrder` for the profile/transactions pages through it — that
didn't come through yet (the two files you sent were the exchange page and calculator instead).
Happy to pick that back up whenever you're ready — just paste the client file.

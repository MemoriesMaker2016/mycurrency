const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

const token = localStorage.getItem("token");

export async function fetchClient<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { params, headers, ...rest } = options;

  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  const res = await fetch(`${BASE_URL}${url}${query}`, {
    credentials: "include", // important for cookie auth
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
}

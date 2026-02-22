const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function fetchClient<T>(
  url: string,  
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers, ...rest } = options;

  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  const res = await fetch(`${BASE_URL}${url}${query}`, {
    credentials: "include", // important for cookie auth
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
}

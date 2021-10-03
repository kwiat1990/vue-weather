interface ApiResponse<T> {
  data: T;
  error: string;
}

const request = async <T>(
  url: string,
  config?: RequestInit
): Promise<ApiResponse<T>> => {
  let data = null;
  let error = null;

  try {
    const response = await fetch(url, config);
    if (response.ok) {
      data = await response.json();
    } else {
      error = response.statusText;
    }
  } catch (err: any) {
    error = err?.message;
  }

  return { data, error };
};

export const getJSON = async <T>(url: string) => request<T>(url);
export const postJSON = async <TBody extends BodyInit, T>(
  url: string,
  body: TBody
) => request<T>(url, { method: "POST", body });

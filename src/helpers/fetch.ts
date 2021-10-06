import { ApiResponse } from "@/types/apiResponse.types";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_API_URL
    : process.env.BASE_URL + "/api/location";

const request = async <T>(
  endpoint: string,
  config?: RequestInit
): Promise<ApiResponse<T>> => {
  let data = null;
  let error = null;

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);
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

export const postJSON = async <Config extends BodyInit, T>(
  url: string,
  body: Config
) => request<T>(url, { method: "POST", body });

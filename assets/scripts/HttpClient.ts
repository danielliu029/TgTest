import { _decorator} from 'cc';

export interface FetchOptions {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
}

export class HttpClient {
    /**
     * GET 请求
     */
    public static async request<T>(url: URL, options?: FetchOptions): Promise<T> {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status} - ${response.statusText}`);
            }

            return await response.json() as T;
        } catch (error) {
            console.error('网络请求错误:', error);
            throw error;
        }
    }

    // GET 请求
    public static async get<T>(baseUrl: string, path: string, contentType: string, params?: Record<string, any>, authToken?: string) {
        const url = new URL(path, baseUrl);
        if (params) {
            params.forEach(([key, value]) => {
                url.searchParams.append(key, value as string);
            });
        }
        var headers = {'Content-Type': contentType};
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        return HttpClient.request<T>(url, {
            method: 'GET',
            headers: headers
        });
    }

    // POST 请求
    public static async post<T>(baseUrl: string, path: string, contentType: string, data?: any, authToken?: string) {
        const url = new URL(path, baseUrl);
        var headers = {'Content-Type': contentType};
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        return HttpClient.request<T>(url, {
            method: 'POST',
            headers: headers,
            body: contentType == "application/json" ? JSON.stringify(data) : data,
        });
    }
}
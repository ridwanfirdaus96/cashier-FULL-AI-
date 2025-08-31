// frontend/src/hooks/index.ts

import { useState, useEffect } from 'react';

interface ApiError {
    message: string;
    status?: number;
}

interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    loading: boolean;
}

export const useFetch = <T>(url: string): ApiResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (error) {
                // Type guard and proper error handling
                if (error instanceof Error) {
                    setError({ 
                        message: error.message,
                        status: (error as any).status || 500
                    });
                } else {
                    setError({ 
                        message: 'An unknown error occurred',
                        status: 500
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
};
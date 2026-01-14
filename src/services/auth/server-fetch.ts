/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getCookie } from "./jwtHendeler"

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"

const serverFetchHelper = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const { headers, ...restOptions } = options
    const accessToken = await getCookie("accessToken")

    // Construct full URL
    const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_API_URL}${endpoint}`

    const response = await fetch(url, {
        headers: {
            ...headers,
            ...(accessToken ? { "Cookie": `accessToken=${accessToken}` } : {}),
        },
        ...restOptions,
    })

    return response
}

export const serverFetchGet = async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" })

export const serverFetchPost = async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" })

export const serverFetchPut = async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" })

export const serverFetchPatch = async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" })

export const serverFetchDelete = async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" })
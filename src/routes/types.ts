type CommonResponse<T> = {
    data: T | null
    error: string | null
}

export { type CommonResponse }
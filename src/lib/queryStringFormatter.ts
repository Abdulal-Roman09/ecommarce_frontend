

export const queryStringFormatter = (
    searchParamsObj: { [key: string]: string | string[] | undefined }
): string => {
    const queryArray = Object.entries(searchParamsObj).flatMap(
        ([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(
                    (v) => `${key}=${encodeURIComponent(v)}`
                );
            }

            if (value !== undefined) {
                return `${key}=${encodeURIComponent(value)}`;
            }

            return [];
        }
    );

    return queryArray.join("&");
};

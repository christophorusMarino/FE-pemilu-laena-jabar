export const isUndefined = (s) => typeof s === "undefined";

export const resolveQueryParams = (params) => {
    if (typeof params !== "object") return "";

    const payload = Object.entries(params).reduce((result, [key, value]) => {
        if (!isUndefined(params)) result[key] = value;
        return result;
    }, {});
    return new URLSearchParams(payload).toString();
}
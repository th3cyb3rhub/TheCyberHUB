export function encodeURL(title) {
    return title
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase();
}

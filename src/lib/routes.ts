export const ORIGIN = "Sumqayit Qerb saray";
export const DESTINATION = "Cybernet montin";

export function buildDirectionsUrl(origin = ORIGIN, destination = DESTINATION) {
    const base = "https://www.google.com/maps/dir/?api=1";
    const params = new URLSearchParams({
        origin,
        destination,
        travelmode: "driving",
        dir_action: "navigate",
    });
    return `${base}&${params.toString()}`;
}

export async function shareOrCopy(url: string, title = "Marşrut") {
    if (navigator.share) {
        try {
            await navigator.share({ title, text: "Marşrutu xəritədə aç:", url });
            return true;
        } catch {
            // user cancelled or share failed → fallback to copy
        }
    }
    try {
        await navigator.clipboard.writeText(url);
        return "copied";
    } catch {
        return false;
    }
}

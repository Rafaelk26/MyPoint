export function formatTime(time) {
    if (!time) {
    return '--:--';
    }

    return time.slice(0, 5);
}
const bytesToMegaBytes = (bytes: number): number|string => (bytes / (1024 * 1024)).toFixed(2);

export default bytesToMegaBytes;
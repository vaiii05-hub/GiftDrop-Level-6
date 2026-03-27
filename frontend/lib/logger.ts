 
export const logger = {
  info: (msg: string, data?: any) => {
    console.log(`[GiftDrop INFO] ${msg}`, data || "");
  },
  error: (msg: string, error?: any) => {
    console.error(`[GiftDrop ERROR] ${msg}`, error || "");
  },
  transaction: (hash: string, action: string) => {
    console.log(`[GiftDrop TX] ${action}: ${hash}`);
  }
};
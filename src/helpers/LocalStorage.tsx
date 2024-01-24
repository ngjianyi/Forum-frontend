// Function to set an item in local storage with an expiration time
export const setWithExpiry = (key: string, value: string, expiryInHours: number): void => {
    const now = new Date();
    const expiry = now.getTime() + expiryInHours * 60 * 60 * 1000;
    const item = {
        value: value,
        expiry: expiry,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// Function to get an item from local storage and check its expiration
export const getWithExpiry = (key: string): string | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        // Item has expired
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};

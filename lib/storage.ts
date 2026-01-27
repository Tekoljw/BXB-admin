// 存储工具：memory（内存）和disk（持久化）
const memoryStorage = new Map<string, any>();

export const storageUtils = {
  memory: {
    get<T>(key: string, defaultValue?: T): T | undefined {
      return (memoryStorage.get(key) as T) ?? defaultValue;
    },
    set(key: string, value: any): void {
      memoryStorage.set(key, value);
    },
    remove(key: string): boolean {
      return memoryStorage.delete(key);
    },
    clear(): void {
      memoryStorage.clear();
    },
  },

  disk: {
    get<T>(key: string, defaultValue: T): T {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        const prefixedKey = `admin.${key}`;
        const item = localStorage.getItem(prefixedKey);
        
        if (!item) {
          return defaultValue;
        }

        const parsed = JSON.parse(item);
        
        if (parsed.expiry && parsed.expiry < Date.now()) {
          localStorage.removeItem(prefixedKey);
          return defaultValue;
        }

        return parsed.value ?? defaultValue;
      } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return defaultValue;
      }
    },

    set(key: string, value: any, ttl?: number): void {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const prefixedKey = `admin.${key}`;
        const item: { value: any; expiry?: number } = { value };

        if (ttl) {
          item.expiry = Date.now() + ttl;
        }

        localStorage.setItem(prefixedKey, JSON.stringify(item));
      } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error);
      }
    },

    remove(key: string): void {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const prefixedKey = `admin.${key}`;
        localStorage.removeItem(prefixedKey);
      } catch (error) {
        console.error(`Error removing from localStorage key "${key}":`, error);
      }
    },

    clear(): void {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith('admin.')) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    },
  },
};

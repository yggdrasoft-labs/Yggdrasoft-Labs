import NodeCache from 'node-cache';

// Cache with 5 minute TTL by default
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export const cacheMiddleware = (duration: number = 300) => {
  return (req: any, res: any, next: any) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, body, duration);
      return originalJson(body);
    };

    next();
  };
};

export const clearCache = (pattern?: string) => {
  if (pattern) {
    const keys = cache.keys();
    keys.forEach(key => {
      if (key.includes(pattern)) {
        cache.del(key);
      }
    });
  } else {
    cache.flushAll();
  }
};

export default cache;

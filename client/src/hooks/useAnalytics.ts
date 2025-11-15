import { useEffect } from 'react';
import axios from 'axios';

interface TrackEventParams {
  type: 'pageview' | 'event' | 'contact' | 'download';
  page?: string;
  eventName?: string;
  eventData?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = async (params: TrackEventParams) => {
    try {
      await axios.post('/api/analytics/track', params);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackPageView = (page: string) => {
    trackEvent({ type: 'pageview', page });
  };

  return { trackEvent, trackPageView };
};

export const usePageView = (pageName: string) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
};

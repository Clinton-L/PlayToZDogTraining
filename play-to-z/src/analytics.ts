type AnalyticsParameters = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters) {
  window.gtag?.('event', eventName, parameters)
}

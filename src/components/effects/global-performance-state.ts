export type GlobalPerformanceState = {
  isMobile: boolean;
  isScrolling: boolean;
  isDocumentVisible: boolean;
};

export const globalPerformanceState: GlobalPerformanceState = {
  isMobile: false,
  isScrolling: false,
  isDocumentVisible: true,
};
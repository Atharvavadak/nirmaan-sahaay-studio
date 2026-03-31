import React from "react";

const MobileContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen items-start justify-center bg-muted/50 p-0 sm:p-4">
    <div className="mobile-container overflow-hidden shadow-2xl sm:rounded-3xl sm:min-h-[90vh] sm:my-4">
      {children}
    </div>
  </div>
);

export default MobileContainer;

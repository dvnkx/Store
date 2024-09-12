import React, { ReactNode } from "react";

const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </section>
  );
};

export default Grid;

"use client";

import { useEffect } from "react";

const ScrollToItem = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const itemId = url.searchParams.get("item");
    if (itemId) {
      const el = document.getElementById(`item-${itemId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return null;
};

export default ScrollToItem;

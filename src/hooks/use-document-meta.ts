import { useEffect } from "react";

type DocumentMeta = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
};

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (content === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Client-side replacement for TanStack Router's per-route `head()`. */
export function useDocumentMeta(meta: DocumentMeta) {
  const { title, description, ogTitle, ogDescription, robots } = meta;
  useEffect(() => {
    document.title = title;
    if (description !== undefined) setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle);
    setMeta("property", "og:description", ogDescription);
    setMeta("name", "robots", robots);
  }, [title, description, ogTitle, ogDescription, robots]);
}

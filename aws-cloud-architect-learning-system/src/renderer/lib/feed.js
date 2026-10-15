// Minimal RSS/Atom parser for the AWS "What's New" feed. Runs in the renderer
// on text returned by the main-process fetch. Returns a normalized list of
// { title, link, date, summary }. On any error it returns an empty array so
// the caller can fall back to bundled notes.

export function parseFeed(xmlText) {
  if (!xmlText || typeof xmlText !== 'string') return [];
  try {
    const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
    if (doc.querySelector('parsererror')) return [];

    // RSS <item> or Atom <entry>
    let nodes = Array.from(doc.querySelectorAll('item'));
    const isAtom = nodes.length === 0;
    if (isAtom) nodes = Array.from(doc.querySelectorAll('entry'));

    return nodes.map((node) => {
      const get = (sel) => node.querySelector(sel)?.textContent?.trim() || '';
      const title = get('title');
      let link = '';
      if (isAtom) {
        link = node.querySelector('link')?.getAttribute('href') || '';
      } else {
        link = get('link');
      }
      const date = get('pubDate') || get('updated') || get('published');
      let summary = get('description') || get('summary') || get('content');
      // Strip HTML tags from the summary for clean display.
      summary = summary.replace(/<[^>]+>/g, '').trim();
      if (summary.length > 320) summary = summary.slice(0, 317) + '...';
      return { title, link, date, summary };
    });
  } catch {
    return [];
  }
}

// Filter feed items to those relevant to a module by matching keywords in the
// title/summary. Keeps the live feed useful per-cert without a dedicated feed.
export function filterByKeywords(items, keywords) {
  if (!keywords || keywords.length === 0) return items;
  const lowered = keywords.map((k) => k.toLowerCase());
  return items.filter((it) => {
    const hay = `${it.title} ${it.summary}`.toLowerCase();
    return lowered.some((k) => hay.includes(k));
  });
}

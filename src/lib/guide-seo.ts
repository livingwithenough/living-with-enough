import { seo } from './seo';

export function guideSeo(title: string, description: string, slug = '') {
  const path = slug ? `/guides/${slug}/` : '/guides/';
  return seo(title, description, path, '/images/japandi-room-hero.png');
}

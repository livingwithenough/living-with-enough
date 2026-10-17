export function AffiliateNotice({locale = 'ja'}:{locale?:'ja'|'en'}) {
  return <p className="affiliate-notice">{locale==='en'?'Contains advertising and affiliate links':'PR・広告を含みます'}</p>;
}

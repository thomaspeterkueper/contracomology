import Link from 'next/link'; import { notFound } from 'next/navigation';
export const revalidate=3600;
const related:Record<string,[string,string][]>={
'bach-kunstderfuge':[['Zeitformen','/de/documents/zeitformen'],['Einführung: mehrere Stimmen','/de/course']],
'beethoven-mondscheinsonate':[['Chopin – 4. Ballade','/de/texts/chopin-op52'],['Zeitformen','/de/documents/zeitformen']],
'chopin-op52':[['Beethoven – Mondscheinsonate','/de/texts/beethoven-mondscheinsonate'],['Diagnosefragen','/de/texts/diagnosefragen']],
'davies-kindofblue':[['Coltrane – A Love Supreme','/de/texts/coltrane-alovesupreme'],['Bill Evans','/de/texts/evans-waltzfordebby']],
'evans-waltzfordebby':[['Miles Davis – Kind of Blue','/de/texts/davies-kindofblue'],['Zeitformen','/de/documents/zeitformen']],
'coltrane-alovesupreme':[['Miles Davis – Kind of Blue','/de/texts/davies-kindofblue'],['Zeitformen','/de/documents/zeitformen']],
'alvinlucier':[['Steve Reich','/de/texts/reich-8musicians'],['Systemmatrix','/de/texts/systemmatrix']],
'reich-8musicians':[['Alvin Lucier','/de/texts/alvinlucier'],['Zeitformen','/de/documents/zeitformen']],
'the-cars-drive':[['Madonna – Frozen','/de/texts/madonna-frozen'],['Evanescence – My Immortal','/de/texts/evanescencemyimmortal']],
'madonna-frozen':[['The Cars – Drive','/de/texts/the-cars-drive'],['Evanescence – My Immortal','/de/texts/evanescencemyimmortal']],
'evanescencemyimmortal':[['Madonna – Frozen','/de/texts/madonna-frozen'],['Nalgae','/de/texts/nalgae']],
'nalgae':[['Kontrakomologisch lesen','/de/documents/lesen'],['Gealjot Lumina','/de/texts/kueper-gealjotlumina']],
'kueper-gealjotlumina':[['Kontrakomologisches Komponieren','/de/documents/komponieren'],['Nalgae','/de/texts/nalgae']],
'systemmatrix':[['Diagnosefragen','/de/texts/diagnosefragen'],['Einführungskurs','/de/course']],
'diagnosefragen':[['Systemmatrix','/de/texts/systemmatrix'],['Einführungskurs','/de/course']]};
const sources:Record<string,string>={
'systemmatrix':'systemmatrix','diagnosefragen':'diagnosefragen','bach-kunstderfuge':'bach-kunstderfuge','beethoven-mondscheinsonate':'beethoven-mondscheinsonate','chopin-op52':'chopin-op52','davies-kindofblue':'davies-kindofblue','evans-waltzfordebby':'evans-waltzfordebby','coltrane-alovesupreme':'coltrane-alovesupreme','alvinlucier':'alvinlucier','reich-8musicians':'reich-8musicians','the-cars-drive':'the-cars-drive','madonna-frozen':'madonna-frozen','evanescencemyimmortal':'evanescencemyimmortal','nalgae':'nalgae','kueper-gealjotlumina':'kueper-gealjotlumina'};
function clean(html:string){const m=html.match(/<article class="essay-page">([\s\S]*?)<footer class="back-nav">/);if(!m)return null;return m[1].replace(/<audio[\s\S]*?<\/audio>/g,'').replace(/<script[\s\S]*?<\/script>/g,'');}
export default async function Page({params}:{params:Promise<{locale:string;source:string}>}){const {locale,source}=await params;if(locale!=='de'||!sources[source])notFound();const res=await fetch(`https://www.thomas-kueper.de/kontrakomologie/${sources[source]}/`,{next:{revalidate:3600}});if(!res.ok)notFound();const body=clean(await res.text());if(!body)notFound();return <main className="shell"><header className="topbar"><Link className="brand" href="/de">Contracomology</Link><nav className="nav"><Link href="/de/documents">Publikationen</Link><Link href="/de/kg">Begriffe</Link></nav></header><article className="fulltext mirrored-essay" dangerouslySetInnerHTML={{__html:body}}/>{related[source]?.length?<aside className="related-reading"><p className="section-label">Weiterlesen</p><h2>Verwandte Texte</h2><div>{related[source].map(([name,href])=><Link key={href} href={href}>{name} →</Link>)}</div></aside>:null}<p className="back-link library-back"><Link href="/de/documents">← Zurück zu den Publikationen</Link></p><footer className="subpage-footer"><div className="footer-links"><Link href="/de/legal/imprint">Impressum</Link><Link href="/de/legal/privacy">Datenschutz</Link><Link href="/de/legal/terms">Nutzungsbedingungen</Link><Link href="/de/legal/ai-transparency">KI-Transparenz</Link></div><p>© 2026 Thomas Peter Küper</p></footer></main>}
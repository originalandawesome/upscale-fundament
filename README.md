# Upscale Consultancy — website "Fundament"

Statische, tweetalige website (NL + EN) voor **Upscale Consultancy Financial Services B.V.**, in de officiële huisstijl ("De Blauwdruk"): Space Grotesk + IBM Plex Sans, petrol/mint/amber-tokens, en een inline-SVG "constructielijnen"-illustratiesysteem op een 64px-blauwdrukgrid.

Dit is de standalone doorontwikkel-versie van site 1 uit de vijf-sites-showcase (juli 2026), ontworpen en gebouwd door Claude (Fable 5) in Claude Code. Showcase-artefacten (guide-pagina, PASSLOG, hub-links) zijn verwijderd.

## Lokaal draaien

Geen build step. Elke statische server werkt, bijvoorbeeld:

```
python3 -m http.server 8000
# → http://localhost:8000
```

## Structuur

- `index.html`, `diensten.html`, `werkwijze.html`, `tips.html`, `pakketten.html`, `over-ons.html`, `contact.html` — NL-pagina's
- `regio-amsterdam.html`, `almere-flevoland.html` — regiopagina's (NL-only, bewust géén EN-spiegel; ontsloten via footer + contextueel vanaf Home en Contact)
- `en/` — Engelse spiegel (7 pagina's)
- `en/english-speaking-tax-advisor.html` — expatpagina (EN-only, geen NL-spiegel; via footer)
- `voorwaarden.html`, `privacy.html` — juridische pagina's (conceptteksten, NL leidend)
- `assets/style.css`, `assets/main.js` — gedeelde stijl en interactie (EZ↔BV-toggle, tips-modals met `#checklist-ib`-deeplink, leadformulier-demo, scroll-animaties)
- `docs/` — designbriefs (huisstijlregels!) en de originele contentdocumenten (copy, voorwaarden- en privacyconcepten, huisstijl-specificatie)

## Openstaande punten voor doorbouw

1. **hreflang-tags** (in de `<head>` van elke pagina) zijn nu relatief; vervang ze door absolute URL's zodra het domein live is (plan: `upscaleconsultancy.com`, NL op de root, EN onder `/en/` — zie het design-document).
2. **Leadformulier** is een demo (toont alleen een succesmelding). Koppelen aan een formulierdienst of serverless endpoint + business-WhatsApp/mail.
3. **Juridische teksten** bevatten nog `[blokhaken]`-keuzes uit de concepten; invullen en juridisch laten toetsen.
4. **Kilometers-Excel-link** in de Kostenstructuur-tip verwijst nog naar de contactpagina (bronbestand ontbrak).

## Huisstijlregels (hard)

Geen gradiënten · mint nooit als tekstkleur op wit · amber max 1–2 per scherm · knoppen nooit vaste breedte · broodtekst ≥16px · WCAG AA. Volledige regels: `docs/brief-fundament.md` en `docs/content/Huisstijl Upscale Consultancy (1).html` (bevat het officiële logo-systeem: gefacetteerde driehoek + lockup "UPSCALE CONSULTANCY / FINANCIAL SERVICES" + favicon).

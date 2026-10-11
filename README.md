# gleaner-site

Public pages for **Gleaner** by **Spolora**.

- Landing (Apple-clean community map): https://spolora.github.io/gleaner-site/
- Privacy policy: https://spolora.github.io/gleaner-site/privacy.html

Kept separate from the private app repo so it can stay public on GitHub Free + GitHub Pages.

## Community map

The home page loads anonymous **country-level** daily signals via Supabase RPC `presence_recent`.  
Configure `config.js` with the project URL and anon key (same public values as the extension).

Run the `presence_daily` / `ping_presence` / `presence_recent` DDL from the app repo `supabase/schema.sql` in the Supabase SQL Editor before expecting live dots.

## Contact

Privacy questions: [GitHub Issues](https://github.com/Spolora/gleaner-site/issues)

## Local preview

```bash
npx --yes serve .
```

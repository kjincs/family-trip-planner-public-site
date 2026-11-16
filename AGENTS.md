# Public Family Trip Guide

- This folder is the active public website. Its own `index.html` is canonical; continue the existing static HTML/CSS/JavaScript implementation.
- The sibling `../private-site/` folder is the private backup. Do not modify its files when maintaining this public version.
- Keep the current dashboard, Chinese interface, responsive layout, all trips, and stable IDs, especially `alaska-christmas` and `peru-nine-days`.
- This site is read-only. Load published `trips-data.js` directly. Do not add editing, localStorage, JSON import, accounts, cloud storage, frameworks, or a build system unless requested.
- Preserve search, filters, route maps, separate trip webpages under `trips/`, and printing/PDF. Cards link directly to trip pages. Do not restore HTML downloads or modal-only trip views. Shared page rendering lives in `trip-template.js` and `trip-page.js`.
- Use only these family nicknames: 小鱼家、枫叶家、海豚家、虾米家. Texas and Alaska have the same two families: 小鱼家 and 虾米家. Never write a real-name-to-nickname mapping into public files, comments, documentation, or Git history.
- Hotel names and business addresses, flight numbers, travel dates, and travel logistics may be published. Do not publish real personal names, exact ages, birthdays, private addresses, contact details, personal work commitments, private documents, booking references, tickets, payment information, or membership/account identifiers. Attraction age restrictions are general travel information and may remain.
- Review every field, source link, embedded default, asset, and download template before publication. Do not copy raw private backups or the parent's `.git`, `PROJECT_NOTES.md`, or `output/` into this folder.
- Publish only this folder's reviewed contents into a separate repository with fresh history. Never change the parent repository's visibility. Do not commit, push, or enable publishing unless explicitly requested.
- Validate HTML/CSS/JavaScript, all six trips, privacy, and relevant desktop/mobile interactions. Report any remaining limitations.

- The homepage subtitle is “把地图上的向往，变成一家人的回忆。”; do not disclose the family's home city in the homepage introduction.

- Dashboard trips sort by optional ISO `startDate` ascending; missing dates go last, retaining their original relative order. Both card images and “查看行程” links open the same trip page.

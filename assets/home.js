(() => {
  'use strict';
  // Newest first. Add real, reader-facing updates here when features change.
  const updates = [
    {
      version: '0.11.2', date: '2026-09-15', category: 'Reports',
      title: 'Best Picture, by the numbers.', shortTitle: 'Oscar nominees meet the ratings',
      summary: 'A comparison of 356 Best Picture nominees from the 1970-2026 Oscar ceremonies using IMDb and Rotten Tomatoes ratings.',
      details: ['The highest- and lowest-rated nominees and winners.', 'The strongest and weakest years by average per nominee.', 'The closest-rated fields, with the data to explore.'],
      link: 'reports/oscar-best-picture.html', linkText: 'Read the report'
    },
    {
      version: '0.9.0', date: '2026-09-15', category: 'Build notes',
      title: 'Behind the converter.', shortTitle: 'Code, decisions, and a few lessons',
      summary: 'A look at how the UTC & Epoch Converter developed, from a rough sketch to the details that make time conversion interesting.',
      details: ['How the original idea changed once there was a working page.', 'Lessons from clock changes, clear inputs, and shared conversion rules.', 'A short map of the code for anyone who wants to look further.'],
      link: 'web-apps/utc-converter-behind-the-scenes.html', linkText: 'Read the code and lessons'
    },
    {
      version: '0.8.0', date: '2026-09-15', category: 'Website',
      title: "A new home for what's happening.", shortTitle: 'A home for the latest updates',
      summary: 'The site now has a front page for the latest updates, with a small archive to browse and room for more useful information.',
      details: ['A featured update with the details up front.', 'The five most recent updates, together in one place.', 'Space for an FAQ and quick info as the site grows.'],
      link: '#about', linkText: 'Explore About me'
    },
    {
      version: '0.7.1', date: '2026-09-15', category: 'Navigation',
      title: 'Every section, within reach.', shortTitle: 'Better navigation in the converter',
      summary: 'The UTC & Epoch Converter has the full site navigation, so moving between a tool and the rest of the website is easier.',
      details: ['Direct links to the main sections at the top of the converter.', 'Web Apps stays highlighted while you use the tool.', 'The header adjusts to smaller screens.'],
      link: 'web-apps/utc-converter.html', linkText: 'Open the converter'
    },
    {
      version: '0.7.0', date: '2026-09-15', category: 'Web Apps',
      title: 'From a date to an epoch.', shortTitle: 'A dedicated date-to-epoch converter',
      summary: 'Epoch tools now have their own row, including a dedicated converter that turns a date and time into a Unix timestamp.',
      details: ['Choose local time or UTC as the starting point.', 'Get the timestamp in both seconds and milliseconds.', 'Handle repeated local times when daylight saving ends.'],
      link: 'web-apps/utc-converter.html', linkText: 'Try date-to-epoch conversion'
    },
    {
      version: '0.6.0', date: '2026-09-15', category: 'Web Apps',
      title: 'Making sense of Unix timestamps.', shortTitle: 'Epoch time joins the toolkit',
      summary: 'Unix epoch conversion joins the local and UTC clocks. Turn a numeric timestamp into a readable date and time.',
      details: ['Accept timestamps in seconds or milliseconds.', 'See local and UTC results for the same instant.', 'Check the current epoch time on the live clock.'],
      link: 'web-apps/utc-converter.html', linkText: 'Explore epoch conversion'
    },
    {
      version: '0.5.0', date: '2026-09-15', category: 'Web Apps',
      title: 'The first tool: a UTC converter.', shortTitle: 'Local time meets UTC',
      summary: 'The first Web App brings live clocks and date-aware UTC conversion together in a simple two-panel layout.',
      details: ['Convert UTC to local time or go the other way.', 'Include dates so crossing midnight is clear.', 'Use the same color theme as the rest of the site.'],
      link: 'web-apps/utc-converter.html', linkText: 'Open the first Web App'
    }
  ];
  const list = document.getElementById('recent-update-list');
  if (!list) return;
  const inConcept = location.pathname.includes('/concepts/');
  const dateLabel = iso => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z'));
  function selectUpdate(index) {
    const update = updates[index];
    document.getElementById('update-title').textContent = update.title;
    document.getElementById('update-summary').textContent = update.summary;
    document.getElementById('update-category').textContent = `${index === 0 ? 'Latest update' : 'From the updates'} / ${update.category}`;
    const date = document.getElementById('update-date');
    date.dateTime = update.date;
    date.textContent = dateLabel(update.date);
    document.getElementById('update-version').textContent = `Update ${update.version}`;
    document.getElementById('update-details').replaceChildren(...update.details.map(detail => {
      const item = document.createElement('li'); item.textContent = detail; return item;
    }));
    const link = document.getElementById('update-link');
    link.href = inConcept && !update.link.startsWith('#') ? '../' + update.link : update.link;
    link.textContent = update.linkText + ' ↗';
    list.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }
  updates.slice(0, 5).forEach((update, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-controls', 'update-content');
    const meta = document.createElement('span');
    meta.className = 'recent-meta'; meta.textContent = `${update.date} · ${update.category}`;
    const title = document.createElement('strong'); title.textContent = update.shortTitle;
    const version = document.createElement('span'); version.className = 'recent-version'; version.textContent = `0${index + 1} / ${update.version}`;
    button.append(meta, title, version);
    button.addEventListener('click', () => selectUpdate(index));
    item.append(button); list.append(item);
  });
  selectUpdate(0);
})();

const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
  { name: 'Clerk', slug: 'clerk', color: '#6C47FF' },
  { name: 'Stream', slug: 'stream', color: '#005FFF' },
  { name: 'Radix', slug: 'radixui', color: '#161618' },
  { name: 'TMDB', slug: 'themoviedatabase', color: '#01B4E4' },
];

const destDir = path.join(__dirname, 'src', 'components', 'technologies');

icons.forEach((icon) => {
  const url = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${icon.slug}.svg`;

  https
    .get(url, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            console.error(
              `Failed downloading ${icon.name}: ${res.statusCode} ${rawData}`,
            );
            return;
          }
          const pathMatch = rawData.match(/<path\s+d="([^"]+)"/);
          const svgPath = pathMatch ? pathMatch[1] : '';

          const componentCode = `import React from 'react';

export default function ${icon.name}({ ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="${icon.color}"
      {...props}
    >
      <title>${icon.name}</title>
      <path d="${svgPath}" />
    </svg>
  );
}
`;
          fs.writeFileSync(
            path.join(destDir, `${icon.name}.tsx`),
            componentCode,
          );
          console.log(`Generated ${icon.name}.tsx`);
        } catch (e) {
          console.error(`Failed parsing ${icon.name}: ${e.message}`);
        }
      });
    })
    .on('error', (e) => {
      console.error(`Failed downloading ${icon.name}: ${e.message}`);
    });
});

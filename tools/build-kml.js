// data.js의 장소(P)로 Google 내 지도(My Maps)용 KML을 만든다. 실행: node tools/build-kml.js
// 한 장소는 폴더 하나에만 넣는다(스탬프 > AR > 패널 순). 좌표는 추정값이다.
const fs = require('fs');
const path = require('path');
const { P } = require('../data.js');

const FOLDERS = [['stamp', '스탬프'], ['ar', 'AR 스팟'], ['panel', '등신대 패널']];
const TAG_LABEL = { stamp: '스탬프', ar: 'AR', panel: '등신대 패널', menu: '콜라보 메뉴', shop: '굿즈' };
const xml = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function folderOf(p) {
  return FOLDERS.find(([tag]) => p.tags.includes(tag))[0];
}

function placemark(p) {
  const lines = [p.ja, p.tags.map((t) => TAG_LABEL[t]).join(' · '), p.hours, ...p.notes.map((n) => n.t), '좌표는 추정값']
    .filter(Boolean);
  return `      <Placemark>
        <name>${xml(p.name)}</name>
        <description>${xml(lines.join('\n'))}</description>
        <Point><coordinates>${p.lng},${p.lat},0</coordinates></Point>
      </Placemark>`;
}

function buildKml() {
  const folders = FOLDERS.map(([tag, label]) => `    <Folder>
      <name>${label}</name>
${P.filter((p) => folderOf(p) === tag).map(placemark).join('\n')}
    </Folder>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>츄라 미쿠 스트리트 2026</name>
${folders}
  </Document>
</kml>
`;
}

if (require.main === module) {
  const out = path.join(__dirname, '..', 'chura_miku_street_2026.kml');
  fs.writeFileSync(out, buildKml(), 'utf8');
  console.log('작성: ' + out);
}

module.exports = { buildKml, folderOf };

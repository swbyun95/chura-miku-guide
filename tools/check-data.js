// 데이터 검사: node tools/check-data.js — 실패하면 종료 코드 1.
// 기준은 HANDOFF.md(2026-11-22)의 확인된 정보다.
const fs = require('fs');
const path = require('path');
const { CONFIG, P, MENU, G, PH, NOTICES } = require('../data.js');
const { buildKml } = require('./build-kml.js');

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };
const ST = ['ok', 'todo', 'est'];
const TAGS = ['stamp', 'ar', 'panel', 'menu', 'shop'];
const ids = new Set(P.map((p) => p.id));
const byTag = (t) => P.filter((p) => p.tags.includes(t)).map((p) => p.id).sort();

// 인계 문서의 개수·목록
expect(P.length === 14, `장소는 14곳이어야 함 (현재 ${P.length})`);
expect(ids.size === P.length, '장소 id 중복');
expect(JSON.stringify(byTag('stamp')) === JSON.stringify(['asagohan', 'popup', 'shinju', 'steak', 'suimui', 'tofu']), '스탬프 6곳 목록 불일치');
expect(byTag('ar').length === 6, `AR 스팟은 6곳이어야 함 (현재 ${byTag('ar').length})`);
expect(byTag('panel').length === 5, `등신대 패널은 5곳이어야 함 (현재 ${byTag('panel').length})`);

// 콜라보 메뉴 가격(세금 포함)
const PRICES = { 'ネギネギステーキ': 2150, 'そばセット': 1700, 'そば 単品': 1200, 'ゆし豆腐セット': 1890,
  'アンダギー＆フロート': 1370, 'フロート': 900, 'ヨーグルト': 1100 };
expect(MENU.length === Object.keys(PRICES).length, '콜라보 메뉴 개수 불일치');
for (const m of MENU) {
  expect(PRICES[m.ja] === m.price, `메뉴 가격 불일치: ${m.ja}`);
  expect(ids.has(m.place), `메뉴의 장소 id 없음: ${m.place}`);
  expect(P.find((p) => p.id === m.place)?.tags.includes('menu'), `메뉴 장소에 menu 태그 없음: ${m.place}`);
}

// 장소 필드
for (const p of P) {
  expect(p.name && p.ja && p.q, `이름·검색어 누락: ${p.id}`);
  expect(p.lat > 26.1 && p.lat < 26.3 && p.lng > 127.6 && p.lng < 127.8, `좌표가 나하 범위 밖: ${p.id}`);
  expect(p.tags.length > 0 && p.tags.every((t) => TAGS.includes(t)), `태그 오류: ${p.id}`);
  expect(ST.includes(p.st) && p.notes.every((n) => ST.includes(n.st)), `상태값 오류: ${p.id}`);
}
for (const x of [...G, ...NOTICES]) expect(ST.includes(x.st), '굿즈·안내 상태값 오류');
for (const g of G) expect(g.price !== null || g.st === 'todo', `가격 없는 굿즈는 미확인이어야 함: ${g.ja}`);
for (const ph of PH) expect(ph.ja && ph.ko && ph.mean, `일본어 문장 필드 누락: ${ph.ja}`);
expect(JSON.stringify(CONFIG.signageHours) === '[8,12,18,20]', '전광판 시보 시각 불일치');

// KML이 data.js와 같은지
const kmlPath = path.join(__dirname, '..', 'chura_miku_street_2026.kml');
expect(fs.existsSync(kmlPath) && fs.readFileSync(kmlPath, 'utf8') === buildKml(), 'KML이 data.js와 다름: node tools/build-kml.js 실행');

if (errors.length) {
  console.error('실패 ' + errors.length + '건\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`통과: 장소 ${P.length}, 메뉴 ${MENU.length}, 굿즈 ${G.length}, 문장 ${PH.length}`);

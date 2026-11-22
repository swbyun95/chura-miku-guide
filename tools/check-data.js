// 데이터 검사: node tools/check-data.js — 실패하면 종료 코드 1.
// 기준은 HANDOFF.md·chura26.html(2026-11-22)의 확인된 정보와 확정 일정 okinawa_trip_handoff.md(2026-11-23)다.
const fs = require('fs');
const path = require('path');
const { CONFIG, P, MENU, G, GN, PH_GROUPS, EMERGENCY, PH, VOCAB_SETS, VOCAB_TABS, VOCAB,
  NOTICES, SOURCES, TRACK, SPOTS, DAYS, BUS, HOURS, CHECKS } = require('../data.js');
const { buildKml } = require('./build-kml.js');

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };
const ST = ['ok', 'rev', 'todo', 'est'];
const TAGS = ['stamp', 'ar', 'panel', 'menu', 'shop'];
const ids = new Set(P.map((p) => p.id));
const byTag = (t) => P.filter((p) => p.tags.includes(t)).map((p) => p.id).sort();

// 인계 문서의 개수·목록
expect(P.length === 15, `미쿠 장소는 15곳이어야 함 (현재 ${P.length})`);
expect(ids.size === P.length, '장소 id 중복');
expect(JSON.stringify(byTag('stamp')) === JSON.stringify(['asagohan', 'popup', 'shinju', 'steak', 'suimui', 'tofu']), '스탬프 6곳 목록 불일치');
expect(byTag('ar').length === 6, `AR 스팟은 6곳이어야 함 (현재 ${byTag('ar').length})`);
expect(byTag('panel').length === 6, `등신대 패널은 6곳이어야 함 (현재 ${byTag('panel').length})`);

// 콜라보 메뉴 가격(세금 포함)
const PRICES = { '初音ミクのネギネギステーキ': 2150, 'ネギネギそば セット': 1700, 'ネギネギそば 単品': 1200, 'ゆし豆腐セット': 1890,
  'サーターアンダギー＆フロートセット': 1370, '初音ミクのフロート': 900, '初音ミクのシャリッとヨーグルト': 1100 };
const GOODS = { 'ちんすこうショコラ 10個入': 1500, 'べにいもたると 3個入': 1188, 'スタンプ台紙': 500 };
for (const [ja, price] of Object.entries(GOODS)) expect(G.find((g) => g.ja === ja)?.price === price, `굿즈 가격 불일치: ${ja}`);
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
  // 애니메이트는 Google 장소 ID를 아직 받지 못했다(좌표만 Google 값).
  expect(p.geo === 'ok' && (/^ChIJ/.test(p.pid || '') || p.id === 'animate'), `Google 지도 좌표·장소 ID 누락: ${p.id}`);
}
const shinju = P.find((p) => p.id === 'shinju');
expect(shinju.warn && shinju.notes.some((n) => n.st === 'ok' && n.t.includes('11/24(화)~27(금) 휴업')), '真珠 휴업(11/24~27) 안내 누락');
for (const x of [...G, ...GN, ...NOTICES]) expect(ST.includes(x.st), '굿즈·안내 상태값 오류');
for (const s of SOURCES) expect(/^https:\/\//.test(s.url), `출처 주소 오류: ${s.name}`);
for (const g of G) expect(g.price !== null || g.st === 'todo', `가격 없는 굿즈는 미확인이어야 함: ${g.ja}`);
for (const ph of PH) expect(ph.ja && ph.ko && ph.mean && PH_GROUPS[ph.g], `일본어 문장 필드·상황 누락: ${ph.ja}`);
expect(new Set(PH.map((ph) => ph.ja)).size === PH.length, '일본어 문장 중복');
for (const [g, v] of Object.entries(PH_GROUPS)) {
  expect(v.icon && v.label && v.tip, `회화 묶음 필드 누락: ${g}`);
  expect(PH.some((ph) => ph.g === g), `회화 묶음에 문장이 없음: ${g}`);
}
for (const g of ['show', 'sos', 'trouble', 'pay']) expect(PH_GROUPS[g], `회화 묶음 누락(사용자 요청): ${g}`);
expect(Object.keys(PH_GROUPS).at(-1) === 'sos', '긴급 묶음은 잘못 누르지 않도록 맨 끝이어야 함');
expect(EMERGENCY.some((x) => x.tel === '119') && EMERGENCY.some((x) => x.tel === '110'), '긴급 전화 119·110 누락');
expect(EMERGENCY.every((x) => /^\+?[\d-]+$/.test(x.tel) && x.label && ST.includes(x.st)), '긴급 전화 형식 오류');
// 단어집: 묶음마다 단어가 있고, 모든 묶음이 타일 하나에 속하며, 일정에 나오는 역이 유이레일 목록에 있다.
for (const w of VOCAB) expect(w.ja && w.ko && w.mean && VOCAB_SETS[w.g], `단어 필드·묶음 누락: ${w.ja}`);
const tabSets = Object.values(VOCAB_TABS).flatMap((t) => t.sets);
for (const set of Object.keys(VOCAB_SETS)) {
  expect(VOCAB.some((w) => w.g === set), `단어 묶음에 단어가 없음: ${set}`);
  expect(tabSets.filter((x) => x === set).length === 1, `단어 묶음이 타일에 한 번만 있어야 함: ${set}`);
}
const rail = VOCAB.filter((w) => w.g === 'rail').map((w) => w.ja);
for (const st of ['那覇空港', '旭橋', '県庁前', '牧志', '儀保', '首里']) expect(rail.includes(st), `유이레일 역 누락: ${st}`);
expect(rail[0] === '那覇空港' && rail.at(-1) === '首里' && rail.length === 15, '유이레일 역은 나하공항~슈리 15개, 정차 순서');
expect(JSON.stringify(CONFIG.signageHours) === '[8,12,18,20]', '전광판 시보 시각 불일치');

// 미쿠 진행도: 스탬프·패널·AR 목록은 장소 태그와 같고, 노벨티는 콜라보 메뉴 3곳 + 과자 2종.
const trackIds = (k) => TRACK.find((g) => g.key === k).items.map((it) => it[0]).sort();
for (const k of ['stamp', 'panel', 'ar']) expect(JSON.stringify(trackIds(k)) === JSON.stringify(byTag(k)), `진행도 ${k} 목록이 장소 태그와 다름`);
expect(JSON.stringify(trackIds('novelty')) === JSON.stringify(['asagohan', 'beniimo', 'chinsuko', 'steak', 'tofu']), '노벨티 목록 불일치');
const mikuCodes = new Set(TRACK.flatMap((g) => g.items.map((it) => g.key + ':' + it[0])));

// 일정 장소: id가 겹치지 않고, 좌표가 있으면 나하·세나가지마 범위 안.
const allIds = new Set([...ids, ...SPOTS.map((s) => s.id), 'home']);
expect(allIds.size === ids.size + SPOTS.length + 1, '일정 장소 id가 겹침');
for (const s of SPOTS) {
  expect(s.name && s.q, `일정 장소 이름·검색어 누락: ${s.id}`);
  if (s.lat) expect(s.lat > 26.1 && s.lat < 26.3 && s.lng > 127.6 && s.lng < 127.8, `좌표가 범위 밖: ${s.id}`);
  if (s.pid) expect(/^ChIJ/.test(s.pid), `장소 ID 형식 오류: ${s.id}`);
}

// 일정: 3일, 날짜·요일, 칸 필드, 참조, 시각 순서.
expect(JSON.stringify(DAYS.map((d) => d.date)) === JSON.stringify(CONFIG.tripDates), '일정 날짜가 CONFIG.tripDates와 다름');
const DOW = '일월화수목금토';
const toMin = (t) => { const m = /(\d{1,2}):(\d{2})/.exec(t); return m ? +m[1] * 60 + +m[2] : null; };
for (const d of DAYS) {
  expect(DOW[new Date(d.date + 'T00:00:00Z').getUTCDay()] === d.dow, `요일 오류: ${d.date}`);
  expect(d.warn.length > 0 && d.warn.every((w) => w.t && (!w.st || ST.includes(w.st))), `주의사항 오류: ${d.n}일 차`);
  let prev = 0;
  for (const s of d.steps) {
    const where = `${d.n}일 차 ${s.t}`;
    expect(s.t && s.do && (s.at || s.name), `일정 칸 필드 누락: ${where}`);
    if (s.at) expect(allIds.has(s.at), `일정 장소 id 없음: ${where} ${s.at}`);
    for (const a of s.alts || []) expect(allIds.has(a) && a !== 'home', `대체 장소 id 없음: ${where} ${a}`);
    for (const c of s.miku || []) expect(mikuCodes.has(c), `진행도 코드 없음: ${where} ${c}`);
    if (s.ph) expect(PH_GROUPS[s.ph], `회화 상황 없음: ${where}`);
    if (s.st) expect(ST.includes(s.st), `상태값 오류: ${where}`);
    const m = toMin(s.t);
    if (m !== null) { expect(m >= prev, `시각이 거꾸로: ${where}`); prev = m; }
  }
}

// 3일 차 버스: 시간표가 시각순이고, 기본·마지노선 버스가 시간표와 일정에 있다.
const day3 = DAYS.find((d) => d.date === BUS.date);
expect(day3, '버스 날짜에 해당하는 일정 없음');
for (const leg of BUS.legs) {
  const deps = leg.rows.map((r) => toMin(r[0]));
  expect(deps.every((m, i) => i === 0 || m > deps[i - 1]) && leg.rows.every((r) => toMin(r[1]) > toMin(r[0])), `버스 시간표 순서 오류: ${leg.from}`);
  expect(leg.rows.some((r) => r[0] === leg.base) && day3.steps.some((s) => s.t === leg.base && s.do.includes('TK02')), `기본 버스가 시간표·일정에 없음: ${leg.base}`);
  if (leg.last) expect(leg.rows.some((r) => r[0] === leg.last), `마지노선 버스가 시간표에 없음: ${leg.last}`);
}
expect(BUS.tips.every((x) => ST.includes(x.st)) && ST.includes(BUS.st), '버스 안내 상태값 오류');
expect(HOURS.every((h) => h.length === 3 && h[0] && h[1]), '영업시간 표 형식 오류');
expect(new Set(CHECKS.map((c) => c[0])).size === CHECKS.length, '당일 확인 id 중복');

// 공개 사이트 개인정보: 전화번호·예약번호 꼴·항공편 번호·번지까지 쓴 숙소 동네 주소·한국 집 도로명 주소가 없어야 한다.
const PRIVATE = [[/\+81|\b0\d{1,3}-\d{2,4}-\d{4}\b/, '전화번호'], [/\b(?=[A-Z0-9]{6}\b)(?=[A-Z]*\d)(?=\d*[A-Z])[A-Z0-9]{6}\b/, '예약번호 꼴'],
  [/\bTW\s?\d{3}\b/, '항공편 번호'], [/辻\d/, '숙소 동네 번지'], [/[가-힣]+로\s?\d+(?:번길)?\b/, '도로명 주소']];
for (const f of ['data.js', 'index.html', 'sw.js', 'chura_miku_street_2026.kml']) {
  const text = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  for (const [re, label] of PRIVATE) expect(!re.test(text), `개인정보로 보이는 값(${label}): ${f} → ${(text.match(re) || [])[0]}`);
}

// 오프라인 저장(sw.js)이 index.html과 같은 data.js 주소를 저장하는지
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const dataSrc = (html.match(/<script src="(data\.js\?v=\d+)"/) || [])[1];
expect(dataSrc && fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8').includes(`'./${dataSrc}'`), 'sw.js의 data.js 주소가 index.html과 다름');

// KML이 data.js와 같은지
const kmlPath = path.join(__dirname, '..', 'chura_miku_street_2026.kml');
expect(fs.existsSync(kmlPath) && fs.readFileSync(kmlPath, 'utf8') === buildKml(), 'KML이 data.js와 다름: node tools/build-kml.js 실행');

if (errors.length) {
  console.error('실패 ' + errors.length + '건\n- ' + errors.join('\n- '));
  process.exit(1);
}
const stepCount = DAYS.reduce((n, d) => n + d.steps.length, 0);
console.log(`통과: 미쿠 장소 ${P.length}, 일정 장소 ${SPOTS.length}, 일정 칸 ${stepCount}, 메뉴 ${MENU.length}, 굿즈 ${G.length}, 문장 ${PH.length}`);

// 츄라 미쿠 스트리트 2026 현지 가이드 데이터.
// 출처: HANDOFF.md(2026-11-22) — 39-street.com, 공식 note, PR TIMES 제3·4탄, 피아프로 공식 블로그 정리본.
// st(상태): ok = 공식 자료로 확인됨, todo = 미확인, est = 추정.
// 좌표(lat, lng)는 모두 추정값이다. 지도 iframe과 지도 앱 링크는 좌표 대신 q(검색어)를 쓴다.

// 여행 메모와 사이트에서 바꿀 수 있는 값은 여기 한 곳에 둔다.
const CONFIG = {
  eventStart: '2026-11-01',
  eventEnd: '2026-12-13',
  // 내 지도(My Maps) 퍼가기 주소. 예: 'https://www.google.com/maps/d/embed?mid=...'
  MYMAPS: '',
  // 국제거리 전광판 시보: 매일 이 시각(정각) 15초 전부터 30초.
  signageHours: [8, 12, 18, 20],
  signageLeadSec: 15,
  signageLengthSec: 30,
  mapZoom: 17,
};

// 장소 14곳. tags: stamp(스탬프), ar(AR 스팟), panel(등신대 패널), menu(콜라보 메뉴), shop(굿즈 판매)
const P = [
  { id: 'popup', name: 'POP UP SHOP', ja: '初音ミク POP UP SHOP（昌ビル1階）', area: '국제거리',
    q: '那覇市松尾1-1-1 昌ビル', lat: 26.2148, lng: 127.6801, tags: ['stamp', 'panel', 'shop'],
    hours: '11/2부터 11:00~19:00', st: 'ok',
    notes: [
      { t: '주소 松尾1-1-1 昌ビル1階', st: 'ok' },
      { t: '스탬프 대지 판매, 완주 노벨티 교환 가능', st: 'ok' },
      { t: '등신대 패널: しし上', st: 'ok' },
      { t: '상품별 구매 수량 제한 있음', st: 'ok' },
      { t: '5,000엔 이상 랜덤 엽서 1장, 10,000엔 이상 엽서 3장 세트', st: 'ok' },
    ] },
  { id: 'steak', name: '얏파리 스테이크 3rd 국제거리 가주마루점', ja: 'やっぱりステーキ 3rd 国際通りがじゅまる店', area: '국제거리',
    q: 'やっぱりステーキ 3rd 国際通りがじゅまる店', lat: 26.2160, lng: 127.6860, tags: ['stamp', 'menu'],
    hours: '콜라보 11:00~21:30', st: 'ok', must: true,
    notes: [{ t: '꼭 가는 곳(사용자 결정)', st: 'ok' }] },
  { id: 'asagohan', name: '이츠데모 아사고항 본점', ja: 'いつでも朝ごはん 本店', area: '국제거리',
    q: 'いつでも朝ごはん 本店 那覇', lat: 26.2150, lng: 127.6830, tags: ['stamp', 'menu'],
    hours: '콜라보는 7:00~14:00만', st: 'ok', must: true,
    notes: [{ t: '꼭 가는 곳(사용자 결정)', st: 'ok' }, { t: '콜라보 메뉴는 오후 2시까지만', st: 'ok' }] },
  { id: 'tofu', name: '찻집 슈리 두부', ja: '茶屋 首里とうふ', area: '슈리',
    q: '茶屋 首里とうふ', lat: 26.2195, lng: 127.7185, tags: ['stamp', 'ar', 'menu', 'shop'],
    hours: '콜라보 10:00~18:00', st: 'ok',
    notes: [{ t: '스탬프 대지 판매, 완주 노벨티 교환 가능', st: 'ok' }, { t: 'AR 스팟', st: 'ok' }] },
  { id: 'shinju', name: '이시다타미 찻집 진주', ja: '石畳茶屋 真珠', area: '슈리',
    q: '石畳茶屋 真珠 首里', lat: 26.2135, lng: 127.7150, tags: ['stamp', 'menu'],
    hours: '콜라보 11:00~16:00, 화요일 휴무', st: 'ok', warn: true,
    notes: [
      { t: '화요일 휴무 → 11/24(화)는 쉼', st: 'ok' },
      { t: 'Google 지도에 11/25~27 휴무 표시. 인스타 @shuri_madama로 확인 필요', st: 'todo' },
      { t: '쉬는 날 스탬프를 찍을 수 있는지', st: 'todo' },
    ] },
  { id: 'suimui', name: '수이무이칸', ja: '首里杜館', area: '슈리',
    q: '首里杜館', lat: 26.2172, lng: 127.7178, tags: ['stamp', 'panel'],
    hours: '', st: 'ok',
    notes: [{ t: '스탬프는 インフォメーションセンター(안내 센터) 입구 부근', st: 'ok' }, { t: '등신대 패널: しし上', st: 'ok' }] },
  { id: 'kokusai-gate', name: '국제거리 입구', ja: '国際通り入り口', area: '국제거리',
    q: '国際通り入り口 那覇', lat: 26.2146, lng: 127.6797, tags: ['ar'], hours: '', st: 'ok', notes: [] },
  { id: 'tembusu', name: '텐부스 나하', ja: 'てんぶす那覇', area: '국제거리',
    q: 'てんぶす那覇', lat: 26.2153, lng: 127.6893, tags: ['ar'], hours: '', st: 'ok', notes: [] },
  { id: 'shisa', name: '사이온 우후 시사', ja: 'さいおんうふシーサー', area: '국제거리',
    q: 'さいおんうふシーサー', lat: 26.2163, lng: 127.6905, tags: ['ar'], hours: '', st: 'ok', notes: [] },
  { id: 'shureimon', name: '슈레이문 부근', ja: '守礼門', area: '슈리',
    q: '守礼門', lat: 26.2177, lng: 127.7163, tags: ['ar'], hours: '', st: 'ok', notes: [] },
  { id: 'ishidatami', name: '슈리 긴조초 돌다다미 길', ja: '首里金城町石畳道', area: '슈리',
    q: '首里金城町石畳道', lat: 26.2142, lng: 127.7158, tags: ['ar'], hours: '', st: 'ok', notes: [] },
  { id: 'st-airport', name: '나하 공항역', ja: '那覇空港駅', area: '유이레일',
    q: '那覇空港駅 ゆいレール', lat: 26.2065, lng: 127.6520, tags: ['panel'], hours: '', st: 'ok',
    notes: [{ t: '등신대 패널: しし上', st: 'ok' }] },
  { id: 'st-kenchomae', name: '겐초마에역', ja: '県庁前駅', area: '유이레일',
    q: '県庁前駅 ゆいレール', lat: 26.2144, lng: 127.6785, tags: ['panel'], hours: '', st: 'ok',
    notes: [{ t: '등신대 패널: maple', st: 'ok' }] },
  { id: 'st-makishi', name: '마키시역', ja: '牧志駅', area: '유이레일',
    q: '牧志駅 ゆいレール', lat: 26.2170, lng: 127.6912, tags: ['panel'], hours: '', st: 'ok',
    notes: [{ t: '등신대 패널: 福きつね', st: 'ok' }] },
];

// 콜라보 메뉴. 가격은 세금 포함. 주문하면 노벨티 카드.
const MENU = [
  { place: 'steak', ja: 'ネギネギステーキ', ko: '네기네기 스테이크', price: 2150, st: 'ok' },
  { place: 'asagohan', ja: 'そばセット', ko: '소바 세트', price: 1700, st: 'ok' },
  { place: 'asagohan', ja: 'そば 単品', ko: '소바 단품', price: 1200, st: 'ok' },
  { place: 'tofu', ja: 'ゆし豆腐セット', ko: '유시 두부 세트', price: 1890, st: 'ok' },
  { place: 'tofu', ja: 'アンダギー＆フロート', ko: '안다기 & 플로트', price: 1370, st: 'ok' },
  { place: 'tofu', ja: 'フロート', ko: '플로트', price: 900, st: 'ok' },
  { place: 'shinju', ja: 'ヨーグルト', ko: '요거트', price: 1100, st: 'ok' },
];

// 굿즈·과자. price가 null이면 공식 자료에 가격이 없다.
const G = [
  { ja: 'ちんすこうショコラ（10個入）', ko: '친스코 쇼콜라 10개입', price: 1500, note: '노벨티 카드 동봉', st: 'ok' },
  { ja: 'べにいもたると（3個入）', ko: '베니이모 타르트 3개입', price: 1188, note: '노벨티 카드 동봉', st: 'ok' },
  { ja: 'スタンプ台紙', ko: '스탬프 대지', price: null, note: 'POP UP SHOP·首里とうふ에서 판매', st: 'todo' },
  { ja: 'みんさー織 名刺入れ', ko: '민사 직물 명함지갑', price: null, note: '가격 공식 자료에 없음', st: 'todo' },
];

// 일본어 문장. ko는 한국어 발음, mean은 뜻.
const PH = [
  { ja: 'コラボメニューをください。', ko: '코라보 메뉴-오 쿠다사이.', mean: '콜라보 메뉴 주세요.' },
  { ja: 'ノベルティカードはもらえますか？', ko: '노베루티 카-도와 모라에마스카?', mean: '노벨티 카드 받을 수 있나요?' },
  { ja: 'スタンプはどこですか？', ko: '스탄푸와 도코데스카?', mean: '스탬프는 어디에 있나요?' },
  { ja: 'スタンプ台紙をください。', ko: '스탄푸 다이시오 쿠다사이.', mean: '스탬프 대지 주세요.' },
  { ja: 'スタンプラリーの景品を交換したいです。', ko: '스탄푸 라리-노 케-힌오 코-칸 시타이데스.', mean: '스탬프 랠리 경품을 교환하고 싶어요.' },
  { ja: '二人です。', ko: '후타리데스.', mean: '두 명이에요.' },
  { ja: 'これはいくらですか？', ko: '코레와 이쿠라데스카?', mean: '이거 얼마예요?' },
  { ja: 'カードで払えますか？', ko: '카-도데 하라에마스카?', mean: '카드로 계산할 수 있나요?' },
  { ja: '購入制限はいくつまでですか？', ko: '코-뉴- 세-겐와 이쿠츠마데데스카?', mean: '몇 개까지 살 수 있나요?' },
  { ja: '写真を撮ってもいいですか？', ko: '샤신오 톳테모 이이데스카?', mean: '사진 찍어도 되나요?' },
  { ja: '今日は営業していますか？', ko: '쿄-와 에-교- 시테 이마스카?', mean: '오늘 영업하나요?' },
  { ja: 'トイレはどこですか？', ko: '토이레와 도코데스카?', mean: '화장실은 어디예요?' },
];

// 확인 필요·참고 사항.
const NOTICES = [
  { t: '石畳茶屋 真珠: 화요일 휴무(11/24 쉼). Google 지도에는 11/25~27도 휴무로 표시. 인스타 @shuri_madama로 확인', st: 'todo' },
  { t: '스탬프 대지 가격, みんさー織 명함지갑 가격은 공식 자료에 없음', st: 'todo' },
  { t: 'AR 스팟은 전단지의 QR 코드로 접속', st: 'ok' },
  { t: '그리팅 이벤트(12/12)와 여행 플랜 한정 굿즈(신청 마감)는 이번 여행 기간에 해당 없음', st: 'ok' },
  { t: '장소 좌표(KML 핀)는 추정값. 지도 보기와 지도 앱 링크는 가게 이름으로 검색', st: 'est' },
];

if (typeof module !== 'undefined') module.exports = { CONFIG, P, MENU, G, PH, NOTICES };

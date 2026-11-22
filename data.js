// 츄라 미쿠 스트리트 2026 현지 가이드 데이터.
// 출처: HANDOFF.md(2026-11-22), claude.ai 조사본 chura26.html(2026-11-22, 공식 정보 + X·인스타 방문자 후기).
// st(상태): ok = 공식 자료로 확인됨, rev = 방문자 후기, todo = 미확인, est = 추정.
// 좌표(lat, lng)와 pid(Google 장소 ID)는 chura26.html의 Google 지도 값이다(geo: 'ok').
// 지도 iframe은 q(검색어)로 연다. pinByCoords: true면 iframe만 좌표로 연다(검색어로는 핀이 안 뜨는 곳).

// 사이트에서 바꿀 수 있는 값은 여기 한 곳에 둔다.
const CONFIG = {
  infoDate: '2026-11-22',
  eventStart: '2026-11-01',
  eventEnd: '2026-12-13',
  // 내 지도(My Maps) 퍼가기 주소. 예: 'https://www.google.com/maps/d/embed?mid=...'
  MYMAPS: '',
  // 국제거리 전광판 시보(松尾1-1-1, POP UP SHOP 건물): 매일 이 시각 정각 15초 전부터 30초, 오키나와 방언.
  signageHours: [8, 12, 18, 20],
  signageLeadSec: 15,
  signageLengthSec: 30,
  mapZoom: 17,
};

// 장소 14곳. tags: stamp(스탬프), ar(AR 스팟), panel(등신대 패널), menu(콜라보 메뉴), shop(굿즈·대지·교환)
const P = [
  { id: 'popup', name: '공식 POP UP SHOP', ja: 'CHURA MIKU STREET 2026 POP UP SHOP（昌ビル1階）', area: '국제거리',
    // 주소 검색은 지도에 핀이 안 떠서 iframe은 좌표로 연다. 좌표 = Google 지도의 'Sho Bldg'(松尾1-1-1).
    q: '昌ビル 那覇市松尾1-1-1', lat: 26.2136189, lng: 127.6807823, pid: 'ChIJObzFjJ1p5TQRrl8KxZVXUCw', geo: 'ok', pinByCoords: true,
    tags: ['stamp', 'panel', 'shop'], hours: '11:00~19:00 (11/1만 9:00~)', st: 'ok',
    notes: [
      { t: '주소 松尾1-1-1 昌ビル1階. 국제거리 대형 전광판(시보)과 같은 건물', st: 'ok' },
      { t: '스탬프 대지 판매(¥500), 완주 노벨티 교환', st: 'ok' },
      { t: 'AR 포토 스팟용 전단지(QR)를 계산대 등에서 받기', st: 'ok' },
      { t: '등신대 패널: しし上 (공식 모델 코스 기준)', st: 'ok' },
      { t: '상품별 구매 수량 제한. 붐비면 직원이 줄 안내', st: 'ok' },
      { t: '5,000엔 이상 랜덤 엽서 1장, 10,000엔 이상 엽서 3장 세트(선착순)', st: 'ok' },
      { t: '이벤트 맵의 영업시간 10:00 표기는 오류. 정정 11:00~19:00 (주최 측 X, 11/7)', st: 'ok' },
    ] },
  { id: 'steak', name: '얏파리 스테이크 3rd', ja: 'やっぱりステーキ 3rd 国際通りがじゅまる店（ハイサイおきなわビル2F）', area: '국제거리',
    q: 'やっぱりステーキ 3rd 国際通りがじゅまる店', lat: 26.2154541, lng: 127.6852416, pid: 'ChIJ77FKZ3dp5TQR4CHkxHa5r-c', geo: 'ok',
    tags: ['stamp', 'menu'], hours: '11:00~21:30 (L.O. 21:00)', st: 'ok', must: true,
    notes: [
      { t: '꼭 가는 곳(사용자 결정)', st: 'ok' },
      { t: '콜라보 메뉴는 6개 매장에서 팔지만 스탬프는 이 매장에만 있음', st: 'ok' },
      { t: 'おきなわ屋 2층. 국제거리의 큰 빨간 「おきなわ屋」 간판과 시사상이 표시', st: 'rev' },
    ] },
  { id: 'asagohan', name: '이츠데모 아사고항 본점', ja: 'いつでも朝ごはん 本店（松尾1-3-4 2F）', area: '국제거리',
    // 가게 이름만으로는 지점 3곳이 함께 나와 핀이 안 뜬다. 본점 주소는 공식 사이트(yapparigroup.jp/itudemogohan/) 기준.
    q: 'いつでも朝ごはん 那覇市松尾1-3-4', lat: 26.214108, lng: 127.6823292, pid: 'ChIJlzYESStp5TQRSgjwPnba2wk', geo: 'ok',
    tags: ['stamp', 'menu'], hours: '콜라보 7:00~14:00만', st: 'ok', must: true, warn: true,
    notes: [
      { t: '꼭 가는 곳(사용자 결정)', st: 'ok' },
      { t: '본점 주소 松尾1-3-4 2층. 다른 지점(ウエストイン店 등)과 헷갈리지 않기', st: 'ok' },
      { t: '실제 영업은 13:30 무렵까지라는 후기·Google 정보 → 13시 전 도착 권장', st: 'est' },
      { t: '스탬프는 가게 밖에 있어 영업시간 밖에도 찍을 수 있음', st: 'rev' },
      { t: '가게가 좁아 5명씩 입장', st: 'rev' },
    ] },
  { id: 'tofu', name: '차야 슈리토후', ja: '茶屋 首里とうふ（首里鳥堀町1-11-5）', area: '슈리',
    q: '茶屋 首里とうふ', lat: 26.2180497, lng: 127.7232175, pid: 'ChIJ_Sa-EUZr5TQRb9gfN2_f5n8', geo: 'ok',
    tags: ['stamp', 'ar', 'menu', 'shop'], hours: '10:00~18:00 (L.O. 17:00)', st: 'ok',
    notes: [
      { t: '스탬프 대지 판매, 완주 노벨티 교환 가능', st: 'ok' },
      { t: 'AR 포토 스팟. 슈리성 가는 길가에 있음', st: 'ok' },
      { t: '본사·공장(鳥堀町4丁目)과 헷갈리지 않기', st: 'ok' },
      { t: '탄산이 싫으면 말하면 탄산 없이 만들어 줌', st: 'rev' },
      { t: '행사·축제일엔 매우 붐볐음', st: 'rev' },
    ] },
  { id: 'shinju', name: '이시다타미 차야 마다마', ja: '石畳茶屋 真珠（首里金城町1-23）', area: '슈리',
    q: '石畳茶屋 真珠 首里', lat: 26.2171702, lng: 127.7158061, pid: 'ChIJ2Rl6eP1r5TQRhYIK65MM0DM', geo: 'ok',
    tags: ['stamp', 'menu'], hours: '11:00~16:00 (L.O. 15:30) · 화요일 휴무', st: 'ok', warn: true,
    notes: [
      { t: '11/24(화)~27(금) 휴업 확정 — 가게 공식 인스타(11/17·11/22 공지)', st: 'ok' },
      { t: '이 기간엔 스탬프 랠리·노벨티도 불가라고 가게가 직접 안내 → 이번 여행에선 6개 완주가 어려움', st: 'ok' },
      { t: '스탬프를 찍은 뒤 가게 앞에 오래 머물지 않기(공식 안내)', st: 'ok' },
      { t: 'Google 지도 길 안내가 좁은 계단길로 이어짐', st: 'rev' },
    ] },
  { id: 'suimui', name: '슈리무이칸', ja: '首里城公園 首里杜館（すいむいかん）', area: '슈리',
    q: '首里杜館', lat: 26.2180634, lng: 127.7160656, pid: 'ChIJQ5Fgof1r5TQR7kCy4lZVZpk', geo: 'ok',
    tags: ['stamp', 'panel'], hours: '공원 시간 내 (Google 8:30~19:30)', st: 'ok',
    notes: [
      { t: '스탬프는 首里杜館 2층 기념품점 옆 (주최 측 X)', st: 'ok' },
      { t: '무료 구역이라 입장권 없이 찍을 수 있음', st: 'ok' },
      { t: '등신대 패널: しし上 (공식 모델 코스 기준)', st: 'ok' },
    ] },
  { id: 'kokusai-gate', name: '국제거리 입구', ja: '国際通り入り口', area: '국제거리',
    q: '国際通り入り口 那覇', lat: 26.2143904, lng: 127.6801673, pid: 'ChIJWcvgmZ1p5TQRe2DXNHIIQ8A', geo: 'ok',
    tags: ['ar'], hours: '상시', st: 'ok', notes: [{ t: 'AR 포토 스팟. 대형 전광판 시보도 이 근처에서 보임', st: 'ok' }] },
  { id: 'tembusu', name: '텐부스 나하', ja: 'てんぶす那覇', area: '국제거리',
    q: 'てんぶす那覇', lat: 26.2160824, lng: 127.6892893, pid: 'ChIJa1v89Hpp5TQRTIV12JXwyLw', geo: 'ok',
    tags: ['ar'], hours: '상시 (건물 9:00~17:30 · Google)', st: 'ok', notes: [] },
  { id: 'shisa', name: '사이온 우후시사', ja: 'さいおんうふシーサー（牧志駅 앞）', area: '국제거리',
    q: 'さいおんうふシーサー', lat: 26.2176428, lng: 127.6926917, pid: 'ChIJj4qquWRp5TQRyBYXkXwu7uM', geo: 'ok',
    tags: ['ar'], hours: '상시', st: 'ok', notes: [{ t: '마키시역 바로 앞 큰 시사상', st: 'ok' }] },
  { id: 'shureimon', name: '슈레이몬 부근', ja: '守礼門付近', area: '슈리',
    q: '守礼門', lat: 26.2181408, lng: 127.7168752, pid: 'ChIJA7jAuf1r5TQR7zY_ObYBTk8', geo: 'ok',
    tags: ['ar'], hours: '상시', st: 'ok', notes: [{ t: '슈리성 무료 구역', st: 'ok' }] },
  { id: 'ishidatami', name: '긴조초 돌담길', ja: '首里金城町石畳道', area: '슈리',
    q: '首里金城町石畳道', lat: 26.2170145, lng: 127.7164396, pid: 'ChIJXYrboZhr5TQR68RUtnNk5qU', geo: 'ok',
    tags: ['ar'], hours: '상시', st: 'ok',
    notes: [
      { t: '핀은 돌담길 위쪽 입구 비석 위치. 정확한 AR 지점은 AR 화면에서 확인', st: 'ok' },
      { t: '내리막 방향으로 걷는 게 편함', st: 'est' },
    ] },
  { id: 'st-airport', name: '나하공항역', ja: 'ゆいレール 那覇空港駅', area: '유이레일',
    q: '那覇空港駅 ゆいレール', lat: 26.2064812, lng: 127.6522121, pid: 'ChIJ_0pwg8Vp5TQRtVaIpVykfdk', geo: 'ok',
    tags: ['panel'], hours: '역 운영 시간', st: 'ok', notes: [{ t: '등신대 패널: しし上. 도착하자마자 찍을 수 있음', st: 'ok' }] },
  { id: 'st-kenchomae', name: '현청앞역', ja: 'ゆいレール 県庁前駅', area: '유이레일',
    q: '県庁前駅 ゆいレール', lat: 26.2143952, lng: 127.6793372, pid: 'ChIJPwY6up1p5TQRiHJXyc48b3I', geo: 'ok',
    tags: ['panel'], hours: '역 운영 시간', st: 'ok', notes: [{ t: '등신대 패널: maple. 국제거리 입구와 가장 가까운 역', st: 'ok' }] },
  { id: 'st-makishi', name: '마키시역', ja: 'ゆいレール 牧志駅', area: '유이레일',
    q: '牧志駅 ゆいレール', lat: 26.2173056, lng: 127.6924996, pid: 'ChIJx6YcxmRp5TQRzDCiSlG0NUQ', geo: 'ok',
    tags: ['panel'], hours: '역 운영 시간', st: 'ok',
    notes: [{ t: '등신대 패널: 福きつね', st: 'ok' }, { t: '역 안에 세븐은행 ATM', st: 'rev' }] },
];

// 콜라보 메뉴. 가격은 세금 포함. 주문하면 한정 노벨티 카드(품절 시 종료).
const MENU = [
  { place: 'steak', ja: '初音ミクのネギネギステーキ', ko: '네기네기 스테이크 · 수프·샐러드·밥 무한리필 · 6개 매장', price: 2150, st: 'ok' },
  { place: 'asagohan', ja: 'ネギネギそば セット', ko: '네기네기 소바 세트 (주시·작은 반찬)', price: 1700, st: 'ok' },
  { place: 'asagohan', ja: 'ネギネギそば 単品', ko: '네기네기 소바 단품', price: 1200, st: 'ok' },
  { place: 'tofu', ja: 'ゆし豆腐セット', ko: '유시 두부 세트 (유시 두부·안다기·플로트)', price: 1890, st: 'ok' },
  { place: 'tofu', ja: 'サーターアンダギー＆フロートセット', ko: '사타 안다기 & 플로트 세트', price: 1370, st: 'ok' },
  { place: 'tofu', ja: '初音ミクのフロート', ko: '미쿠 플로트', price: 900, st: 'ok' },
  { place: 'shinju', ja: '初音ミクのシャリッとヨーグルト', ko: '샤릿토 요거트 (딸기·키위·블루베리, 픽 포함)', price: 1100, st: 'ok' },
];

// 굿즈·과자(POP UP SHOP). price가 null이면 공식 자료에 가격이 없다. 가격 앞 '각'은 종류마다 같은 가격.
const G = [
  { ja: 'ちんすこうショコラ 10個入', ko: '친스코 쇼콜라 10개입 · 노벨티 카드 동봉', price: 1500, st: 'ok' },
  { ja: 'べにいもたると 3個入', ko: '베니이모 타르트 3개입 · 노벨티 카드 동봉', price: 1188, st: 'ok' },
  { ja: 'スタンプ台紙', ko: '스탬프 대지 · POP UP SHOP·首里とうふ', price: 500, st: 'ok' },
  { ja: 'Tシャツ', ko: '티셔츠 (메인 비주얼 / 미니캐릭터) S~XL', price: 3900, each: true, st: 'ok' },
  { ja: 'アロハシャツ', ko: '알로하 셔츠 S~XL', price: 9800, st: 'ok' },
  { ja: 'ハンドタオル', ko: '빈가타풍 핸드타월', price: 1200, st: 'ok' },
  { ja: 'ステッカーセット', ko: '스티커 세트 (7종 들이)', price: 1000, st: 'ok' },
  { ja: 'ランダム缶バッジ', ko: '랜덤 캔뱃지 (6종)', price: 500, each: true, st: 'ok' },
  { ja: 'アクリルスタンド', ko: '아크릴 스탠드 (3종)', price: 1600, each: true, st: 'ok' },
  { ja: 'アクリルキーホルダー', ko: '아크릴 키홀더 (3종)', price: 1000, each: true, st: 'ok' },
  { ja: 'クリアファイル A4', ko: '클리어 파일 A4 (3종)', price: 500, each: true, st: 'ok' },
  { ja: 'マグネットステッカー', ko: '마그넷 스티커 (3종)', price: 800, each: true, st: 'ok' },
  { ja: 'トートバッグ', ko: '토트백', price: 2600, st: 'ok' },
  { ja: 'ショッパー', ko: '쇼핑백', price: 1500, st: 'ok' },
  { ja: '八重山みんさー織 名刺入れ', ko: '야에야마 민사 직물 명함지갑 · 팝업 한정, 수량 한정', price: null, st: 'todo' },
];

// 굿즈 관련 메모.
const GN = [
  { t: '콜라보 산신 세트는 전시만 (주문 제작 · 온라인 주문)', st: 'ok' },
  { t: '홀로모델 시리얼 카드(디지털 피규어)도 판매', st: 'ok' },
  { t: '온라인 숍은 기간 중 예약만, 발송은 12/14 이후', st: 'ok' },
  { t: 'アニメイト那覇国際通り店에서도 공식 굿즈 판매 + 입구에 등신대 패널 (매장 공식 X)', st: 'ok' },
  { t: '콜라보 과자의 팝업 외 판매처(현내 기념품점 이름)', st: 'todo' },
];

// 일본어 문장. ko는 한국어 발음, mean은 뜻.
const PH = [
  { ja: 'スタンプラリーの台紙、ひとつください。', ko: '스탄푸라리-노 다이시, 히토츠 쿠다사이.', mean: '스탬프 랠리 대지 하나 주세요.' },
  { ja: 'スタンプはどこで押せますか？', ko: '스탄푸와 도코데 오세마스카?', mean: '스탬프는 어디서 찍나요?' },
  { ja: 'コンプリートしたので、ノベルティと交換できますか？', ko: '콘푸리-토 시타노데, 노베루티-토 코-칸 데키마스카?', mean: '다 모았는데 노벨티로 교환할 수 있나요?' },
  { ja: '真珠さんがお休みの日は、コンプリートの代わりになる方法はありますか？',
    ko: '마다마상가 오야스미노 히와, 콘푸리-토노 카와리니 나루 호-호-와 아리마스카?', mean: '마다마가 쉬는 날엔 완주 대신할 방법이 있나요?' },
  { ja: 'ARのチラシはありますか？', ko: '에-아-루노 치라시와 아리마스카?', mean: 'AR 전단지 있나요?' },
  { ja: 'コラボメニューをひとつお願いします。', ko: '코라보 메뉴-오 히토츠 오네가이시마스.', mean: '콜라보 메뉴 하나 부탁해요.' },
  { ja: 'ノベルティカードはもらえますか？', ko: '노베루티 카-도와 모라에마스카?', mean: '노벨티 카드 받을 수 있나요?' },
  { ja: '二人です。', ko: '후타리데스.', mean: '두 명이에요.' },
  { ja: 'これはいくらですか？', ko: '코레와 이쿠라데스카?', mean: '이거 얼마예요?' },
  { ja: 'カードで払えますか？', ko: '카-도데 하라에마스카?', mean: '카드로 낼 수 있나요?' },
  { ja: '購入制限はいくつまでですか？', ko: '코-뉴- 세-겐와 이쿠츠마데데스카?', mean: '몇 개까지 살 수 있나요?' },
  { ja: '写真を撮ってもいいですか？', ko: '샤신오 톳테모 이이데스카?', mean: '사진 찍어도 되나요?' },
  { ja: '今日は営業していますか？', ko: '쿄-와 에-교- 시테 이마스카?', mean: '오늘 영업하나요?' },
  { ja: 'トイレはどこですか？', ko: '토이레와 도코데스카?', mean: '화장실은 어디예요?' },
];

// 일본어 낱말.
const WORDS = '台紙(다이시) 대지 · 押す(오스) 찍다 · 交換(코-칸) 교환 · 限定(겐테이) 한정';

// 확인 필요·참고 사항.
const NOTICES = [
  { t: '石畳茶屋 真珠는 11/24~27 휴업(가게 공식 인스타) → 스탬프 6개 완주가 어려움. 대체 방법은 POP UP SHOP 직원에게 문의(일본어 탭)', st: 'ok' },
  { t: '현재 품절·임시 휴무 공지는 출발 전날 X @ashibi_official에서 확인', st: 'todo' },
  { t: 'いつでも朝ごはん: 공식 콜라보 7:00~14:00 / Google 7:00~13:30 표시 → 13시 전 도착 권장', st: 'est' },
  { t: '스탬프 대지를 잃어버렸다는 후기가 있음 → 보관 주의', st: 'rev' },
  { t: '국제거리 시보 8시는 소리가 작다는 후기', st: 'rev' },
  { t: 'AR 포토 스팟은 전단지 QR로 접속, 스팟 가까이 가면 미쿠 등장. 앱 별도 설치 여부는 미확인', st: 'todo' },
  { t: '일부 스탬프 디자인은 바뀔 수 있음', st: 'ok' },
  { t: '명함지갑 가격은 공식 자료에 없음', st: 'todo' },
  { t: '사진 해시태그 #ミクストリート', st: 'ok' },
  { t: '이번 여행엔 해당 없음: 그리팅 이벤트 12/12(토) 14:10~14:30 首里杜館前芝生広場 / 여행 플랜 한정 굿즈(신청 마감 8/19~9/23)', st: 'ok' },
];

// 출처 링크.
const SOURCES = [
  { name: '공식 사이트', url: 'https://39-street.com' },
  { name: '공식 1일 모델 코스', url: 'https://note.com/39_street/n/nf3a5765fc25f' },
  { name: 'PR TIMES 제4탄', url: 'https://prtimes.jp/main/html/rd/p/000000113.000062459.html' },
  { name: '공식 굿즈', url: 'https://note.com/39_street/n/nd1176dede940' },
  { name: '콜라보 기념품', url: 'https://note.com/39_street/n/neea49e09edd0' },
  { name: 'いつでも朝ごはん 공식', url: 'https://yapparigroup.jp/itudemogohan/' },
];

if (typeof module !== 'undefined') module.exports = { CONFIG, P, MENU, G, GN, PH, WORDS, NOTICES, SOURCES };

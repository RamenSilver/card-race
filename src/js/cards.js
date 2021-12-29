//マークがcards_on_raceのインデックスとして扱う
const SUIT = {
  SPADE: 0,
  CLUB: 1,
  HEARTS: 2,
  DIAMOND: 3
}
let cards_on_race = [
  { "url": "../../static/torannpu-illust1.png", pos: 0 },
  { "url": "../../static/torannpu-illust14.png", pos: 0 },
  { "url": "../../static/torannpu-illust27.png", pos: 0 },
  { "url": "../../static/torannpu-illust40.png", pos: 0 }
];

let cards_in_deck = [
  { "url": "../../static/torannpu-illust2.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust3.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust4.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust5.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust6.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust7.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust8.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust9.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust10.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust11.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust12.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust13.png", suit: SUIT.SPADE },
  { "url": "../../static/torannpu-illust15.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust16.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust17.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust18.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust19.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust20.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust21.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust22.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust23.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust24.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust25.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust26.png", suit: SUIT.CLUB },
  { "url": "../../static/torannpu-illust28.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust29.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust30.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust31.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust32.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust33.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust34.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust35.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust36.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust37.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust38.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust39.png", suit: SUIT.DIAMOND },
  { "url": "../../static/torannpu-illust41.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust42.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust43.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust44.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust45.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust46.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust47.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust48.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust49.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust50.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust51.png", suit: SUIT.HEARTS },
  { "url": "../../static/torannpu-illust52.png", suit: SUIT.HEARTS }
];

let cards_on_side = [];
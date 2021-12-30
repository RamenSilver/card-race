const PREF = {
  turns: 5
}

//スタート前の準備
const pre_start = () => {
  shuffle();
  for (let i = 0; i < PREF.turns; i++) {
    cards_on_side.push(cards_in_deck.pop());
  }
  //ひっくり返されたかのフラグを追加
  // cards_on_side.forEach((card) => {
  //   card["is_turned_over"] = false;
  // });
}

const shuffle = () => {
  for (var i = cards_in_deck.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * (i + 1));
    let tmp = cards_in_deck[i];
    cards_in_deck[i] = cards_in_deck[r];
    cards_in_deck[r] = tmp;
  }
}

$(() => {
  pre_start();
})

//Enterが押された時の挙動
$(document).keypress(async(event) => {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    const card = draw_card();
    await flip_deck_card(card);
    // turn over card on side
    const min_pos = find_all_passed_line();
    turn_over_side_deck(min_pos);
    //refresh table
    refresh_table();
    get_rank();
  }

});

//デッキからカードを一枚めくる
const draw_card = () => {
  const card = cards_in_deck.pop();
  cards_on_race[card.suit].pre_pos = cards_on_race[card.suit].pos;
  cards_on_race[card.suit].pos += 1;
  if (cards_on_race[card.suit].pos > 6) {
    cards_on_race[card.suit].pos = 6;
    cards_on_race[card.suit].pre_pos = -1;
  }
  return card;
}

// 一番遅いカードのポジションを返す
const find_all_passed_line = () => {
  return cards_on_race.reduce((left, right) => {
    return left.pos < right.pos ? left : right;
  }).pos
}

//サイドカードをひっくり返す
//返したカードはフラグをtrueにする
const turn_over_side_deck = async(min_pos) => {
  if (min_pos < 2) return;
  for (let i = min_pos; i > 1; i--) {
    if (!cards_on_side[i - 2].is_turned_over) {
      const flip_card_index = PREF.turns + 1 - i;
      cards_on_side[i - 2].is_turned_over = true;
      $(`.sub-card:eq(${flip_card_index})`).append('<img class="back-sub" src="' + cards_on_side[i - 2].url + '">')
      $(`.sub-card:eq(${flip_card_index})`).addClass("sub-card-active");
      //一秒待機
      await wait_milliseconds(1000);
      $(`.sub-card:eq(${flip_card_index})`).html('<img class="front-sub" src="' + cards_on_side[i - 2].url + '">');
      cards_on_race[cards_on_side[i - 2].suit].pre_pos = cards_on_race[cards_on_side[i - 2].suit].pos;
      cards_on_race[cards_on_side[i - 2].suit].pos -= 1; //posは0未満にはならない
      return;

    }
  }
}

const refresh_table = () => {
  cards_on_race.forEach(async(card) => {
    const pos = PREF.turns + 2 - card.pos;
    const pre_pos = PREF.turns + 2 - card.pre_pos;
    const col = card.suit + 1;
    if (pos > pre_pos) {
      $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col}) img`).addClass("card-activeDown");
      await wait_milliseconds(900);
      $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col})`).html("");
    } else if (pos < pre_pos) {
      $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col}) img`).addClass("card-activeUp");
      await wait_milliseconds(900);
      $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col})`).html("");
    }
    $(`#board tbody tr:nth-child(${pos}) td:nth-child(${col})`).html('<img src="' + card.url + '">');

  });
}

// true 誰かがすでにゴール済
// false まだ誰も未ゴール
const is_goaled = () => {
  return cards_on_race.filter((card) => {
    return card.pos > PREF.turns;
  }).length > 0;
}

//カードをめくる時に一秒待機したときにレンダリングする
const flip_card = async(selector, className) => {
  //classをつける
  //レンダリング
  selector.addClass(className);
  //1秒待機する
  await wait_milliseconds(1000);
  //カードを新しいポジションに移動させる
  //レンダリング
}

const wait_milliseconds = (mil_second) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, mil_second);
  });
}


const flip_deck_card = (card) => {
  return new Promise(async(resolve) => {
    setTimeout(async() => {
      $(".flip").html('<img class="front-img" src="../../static/deck.jpg">');
      $(".flip").append('<img class="back-img" src="' + card.url + '">');
      await wait_milliseconds(1000);
      $(".flip").html("");
      $(".open").html('<img src="' + card.url + '">');
      resolve();
    }, 1300);
  })
}



const get_rank = () => {
  const rank_list = [...cards_on_race];
  rank_list.sort((left, right) => {
    return left.pos - right.pos;
  });
  console.log(cards_on_race);
  console.log(rank_list);
  rank_list.forEach((element, index) => {
    $(`th:nth-child(${element.suit})`).text(index + 1);
  })

}
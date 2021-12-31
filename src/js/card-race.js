const PREF = {
  turns: 5
}

let in_progress = false;
let interval_id = -1;
let should_skip_draw_card = false;

//スタート前の準備
const pre_start = () => {
  shuffle();
  for (let i = 0; i < PREF.turns; i++) {
    cards_on_side.push(cards_in_deck.pop());
  }
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

$(() => {
  $('#start-btn').on("click", () => {
    console.log('start')
    interval_id = setInterval(main, 2000)
  });
})

//Enterが押された時の挙動
// $(document).keypress(async(event) => {
//   const keycode = (event.keyCode ? event.keyCode : event.which);
//   if (keycode == '13') {
//     if (in_progress) return;
//     in_progress = true;
//     const card = draw_card();
//     await flip_deck_card(card);
//     // turn over card on side
//     const min_pos = find_all_passed_line();
//     turn_over_side_deck(min_pos);
//     //refresh table
//     refresh_table();
//     get_rank();
//     in_progress = false;
//   }

// });

const main = async() => {
  if (in_progress) return;
  in_progress = true;
  const min_pos = find_all_passed_line();
  if (min_pos > 1 && !cards_on_side[min_pos - 2].is_turned_over) {
    // turn over card on side
    console.log("turnover");
    await turn_over_side_deck(min_pos);
    await refresh_table();
    console.log("refresh done");
  } else {
    const card = draw_card();
    await flip_deck_card(card);
    await refresh_table();
    if (cards_on_race.filter((ele) => {
        return ele.pos == 6;
      }).length == 4) {
      await turn_over_side_deck(6);
      await refresh_table();
      const dobe = cards_on_race.filter((ele) => {
        return ele.pos != 6;
      })
      console.log(dobe);

      $(`th:nth-child(${card.suit+1})`).text("乾杯");
      $(`th:nth-child(${dobe[0].suit+1})`).text("乾杯");

    }

    if (cards_in_deck.length == 0) {
      clearInterval(interval_id);
    }



  }
  in_progress = false;
}




//デッキからカードを一枚めくる
const draw_card = () => {
  const card = cards_in_deck.pop();
  cards_on_race[card.suit].pre_pos = cards_on_race[card.suit].pos;
  cards_on_race[card.suit].pos += 1;
  if (cards_on_race[card.suit].pos >= 6) {
    cards_on_race[card.suit].pos = 6;
    cards_on_race[card.suit].pre_pos = 5;
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
  return new Promise(async(resolve) => {
    const flip_card_index = PREF.turns + 1 - min_pos;
    cards_on_side[min_pos - 2].is_turned_over = true;
    $(`.sub-card:eq(${flip_card_index})`).append('<img class="back-sub" src="' + cards_on_side[min_pos - 2].url + '">')
    $(`.sub-card:eq(${flip_card_index})`).addClass("sub-card-active");
    //一秒待機
    await wait_milliseconds(800);
    $(`.sub-card:eq(${flip_card_index})`).html('<img class="front-sub" src="' + cards_on_side[min_pos - 2].url + '">');
    cards_on_race[cards_on_side[min_pos - 2].suit].pre_pos = cards_on_race[cards_on_side[min_pos - 2].suit].pos;
    cards_on_race[cards_on_side[min_pos - 2].suit].pos -= 1; //posは0未満にはならない
    console.log("done turnover");
    resolve();
  })


}

const refresh_table = () => {
  return new Promise(async(resolve) => {
    cards_on_race.forEach(async(card) => {
      const pos = PREF.turns + 2 - card.pos;
      const pre_pos = PREF.turns + 2 - card.pre_pos;
      const col = card.suit + 1;
      if (pos > pre_pos) {
        $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col}) img`).addClass("card-activeDown");
        await wait_milliseconds(750);
        $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col})`).html("");
      } else if (pos < pre_pos) {
        $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col}) img`).addClass("card-activeUp");
        await wait_milliseconds(750);
        $(`#board tbody tr:nth-child(${pre_pos}) td:nth-child(${col})`).html("");
      }
      $(`#board tbody tr:nth-child(${pos}) td:nth-child(${col})`).html('<img src="' + card.url + '">');
    });
    resolve();
  })
}

// true 誰かがすでにゴール済
// false まだ誰も未ゴール
const is_goaled = () => {
  return cards_on_race.filter((card) => {
    return card.pos > PREF.turns;
  }).length > 0;
}

const flip_deck_card = async(card) => {
  $(".fake-flip").html('<img class="front-img" src="../../static/deck.jpg" /><img class="back-img" src="' + card.url + '" />').addClass("flip");
  await wait_milliseconds(750);
  $(".fake-flip").html("").removeClass("flip");
  $(".open").html('<img src="' + card.url + '">');
  await wait_milliseconds(800)
}



const update_rank = (card) => {

  if (cards_on_race[card.suit].pos >= 6) {
    cards_on_race[card.suit].rank = cards_on_race.filter((ele) => {
      return ele.rank < 5;
    }).length;
  } else {
    cards_on_race[card.suit].rank = 99;
  }

  cards_on_race.forEach((element) => {
    if (element.pos >= 6) {
      $(`th:nth-child(${element.suit})`).text(element.rank);
    }
  })

}

const wait_milliseconds = (mil_second) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, mil_second);
  });
}
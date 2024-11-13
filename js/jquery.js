console.log("現在時刻を表示");

// 現在時刻を表示
function updateTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // HTMLのid="time"の要素に現在時刻を表示
    $("#time").text(date.toLocaleTimeString());
    // 時間データをオブジェクトとして返す
    return { hour: hours, minute: minutes, second: seconds };
}

// 集合時刻の入力をdatetimepickerを使って行う
$(function () {
    $("#daytime").datetimepicker();
});

// No.の取得(ローカルストレージの数を表示)
$(function () {
    $("#span1").text((localStorage.length)+1);
});

// 入力情報の取得と表示
$("#cal_button").click(function () {
    // テキストボックスのvalue値を取得
    const MtgTime = $("#daytime").val();
    const hours2 = $("#pre_hours").val();
    const minutes2 = $("#pre_mins").val();  
    // spanタグに値を設定
    $("#span3").text(MtgTime);
    $("#span4").text(hours2);
    $("#span5").text(minutes2);      

    console.log("準備・移動の時間をdiffに取得");
    // diffに準備・移動時間の分数を入力
    let diff = hours2 * (60 * 60 * 1000) + minutes2 * (60 * 1000);
    console.log(diff);
    // 文字列からDateオブジェクトに変換
    const MtgTime_new = new Date(MtgTime);
    // diffの時間を追加
    const PlusTime = new Date(MtgTime_new.getTime() - diff);
    // 結果を表示
    $("#start_time").text(PlusTime.toLocaleTimeString());
}); 

//1.Save クリックイベント
$("#save_button").on("click", function () {
    // テキストボックスのvalue値を取得    
    const key = localStorage.length + 1;  //keyの番号を取得
    const titles = $("#title").val();
    const MtgTime = $("#daytime").val();
    const hours2 = $("#pre_hours").val();
    const minutes2 = $("#pre_mins").val();
    // span1に次のNoを振り分ける
    $("#span1").text((localStorage.length) + 2);
    // オブジェクトを定義
    const data = { key1: key, key2: titles, key3: MtgTime, key4: hours2, key5: minutes2 };
    // ローカルストレージに情報を格納して表示させる
    localStorage.setItem(key, JSON.stringify(data));

    // 保存後に表示を更新
    load();

    // 出る時間になったことをお知らせする
    // アラームチェックを1秒ごとに行う
    $(function () {
        setInterval(function () {
            const current = updateTime(); // 現在時刻を取得
            console.log(current);
            // 出発時間と現在時刻が一致するか確認
            if (current.hour === PlusTime.getHours() && current.minute === PlusTime.getMinutes()) {
                $("#alarm_text").text("準備を開始する時間になりました！");
                console.log(`現在の時刻が${PlusTime.getHours()}時${PlusTime.getMinutes()}分になりました。`);
            
                // 一度だけアラームを発動させるため、setIntervalをクリア
                clearInterval(this);

                // 1分後にアラームメッセージを消す
                setTimeout(endAlarm, 60000);
            }
        }, 1000);
    })
});

    // 読込関数
function load() {
        // リストをクリア
        $("#list").empty();
    
        // localStorageに保存したデータを取得
        // const data = JSON.parse(localStorage.getItem("data"));

    //     // localStorageに保存したデータを表示
    //     $.each(data, (key, value) => {
    //         const html = $('<li></li>').text(value);
    //         $("#list").append(html);
    //     })
    // };

    // localStorageに保存されたすべてのデータを表示
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));

        // 表示用のHTMLを生成
        const html = `
            <li>
                <p>No: ${data.key1}</p>
                <p>タイトル: ${data.key2}</p>
                <p>日時: ${data.key3}</p>
                <p>時間: ${data.key4}時間 ${data.key5}分</p>
            </li>
        `;
        $("#list").append(html);
    }
}

// ページ読み込み時にデータを表示
$(document).ready(function () {
    load();
});
    
// const html = `
// <li>
//     <p>①No.:${key}</p>
//     <p>②タイトル:${titles}</p>
//     <p>③集合時刻:${MtgTime}</p>
//     <p>④準備＆移動にかかる時間：${hours2}時間${minutes2}分</p>
// </li>
// `;
//     $("#list").append(html);
// }); 
    
// //3.ページ読み込み：保存データ取得表示
// for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = localStorage.getItem(key);
//     const html = `
//     <li>
//     <p>${key}</p>
//     <p>${value}</p>
//     </li>
// `;
//     $("#list").append(html);
// }
// for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const titles = localStorage.getItem(titles);
//     const MtgTime = localStorage.getItem(MtgTime);
//     const hours2 = localStorage.getItem(hours2);
//     const minutes2 = localStorage.getItem(minutes2);
//     const html = `
//     <li>
//         <p>①No.:${key}</p>
//         <p>②タイトル:${titles}</p>
//         <p>③集合時刻:${MtgTime}</p>
//         <p>④準備＆移動にかかる時間：${hours2}時間${minutes2}分</p>
//     </li>
//     `;  
//     $("#list").append(html);
// }
    




// アラームメッセージを非表示にする関数
function endAlarm() {
    console.log("1分経ったので表示が消えます。");
    $("#alarm_text").text("");
    };





    // 30%と50%のセールチェックを呼び出す
    // function sale() {
    //     sale30();
    //     sale50();
    // }

    // // 30%セール機能
    // function sale30() {
    //     const currentTime = updateTime();
    //     const sale_hour = 15; // 時
    //     const sale_minute = 0; // 分

    //     if (currentTime.hour === sale_hour && currentTime.minute === sale_minute) {
    //         $("#sale_text").text("特売になります！！！！！！！");
    //         $("#sale").text("30%引き");
    //     }
    // }

    // // 50%セール機能
    // function sale50() {
    //     const currentTime = updateTime();
    //     const sale_hour = 19; // 時
    //     const sale_minute = 0; // 分

    //     if (currentTime.hour === sale_hour && currentTime.minute === sale_minute) {
    //         $("#sale_text").text("特売になります！！！！！！！");
    //         $("#sale").text("50%引き");
    //         setTimeout(endSale, 30000); // 30秒後にセール表示を消す
    //     }
    // }

    // // セール表示を非表示にする
    // function endSale() {
    //     console.log("表示が消えます。");
    //     $("#sale_text").text("");
    //     $("#sale").text("");
    // }

    // 1秒ごとに各機能を実行
    //ここを後で表示させる
    setInterval(updateTime, 1000);
 // 現在時刻の更新
// setInterval(alarm, 1000);      /// アラームのチェック
// setInterval(sale, 1000);       // セールのチェック

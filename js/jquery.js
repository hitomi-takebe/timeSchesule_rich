console.log("紐付けチェック");

// 現在時刻の取得関数
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

// No.の表示(ローカルストレージの数を表示)
$(function () {
    $("#span1").text((localStorage.length)+1);
});

// 準備を開始時刻を計算する関数
function calculateStartTime(){
    // テキストボックスの値を取得
    const daytime = $("#daytime").val();
    const pre_hours = parseInt($("#pre_hours").val(), 10);
    const pre_mins = parseInt($("#pre_mins").val(), 10);

    // spanタグに値を設定
    $("#span3").text(daytime);
    $("#span4").text(pre_hours);
    $("#span5").text(pre_mins);

    console.log("準備・移動の時間をdiffに取得");

    // 準備・移動時間をミリ秒単位で計算
    const diff = pre_hours * (60 * 60 * 1000) + pre_mins * (60 * 1000);
    console.log(diff);
    // ミーティング時刻をDateオブジェクトに変換
    const mtgDate = new Date(daytime);

    // 準備・移動時間を引いて、開始時刻を計算
    const startTime = new Date(mtgDate.getTime() - diff);

    return startTime;
}

// 準備を開始する時間をボタンを押した際に表示
$("#cal_button").click(function () {
    const startTime = calculateStartTime(); // 準備を開始する時間を取得
    // 結果を表示
    $("#start_time").text(startTime.toLocaleTimeString());
    console.log(startTime);
});

//Save クリックイベント
$("#save_button").on("click", function () {
    // テキストボックスのvalue値を取得    
    const key = localStorage.length + 1;  //keyの番号を取得
    const titles = $("#title").val();
    const daytime = $("#daytime").val();
    const pre_hours = $("#pre_hours").val();
    const pre_mins = $("#pre_mins").val();
    const startTime = calculateStartTime(); // 準備を開始する時間を取得
    // オブジェクトを定義
    const data = { key1: key, key2: titles, key3: daytime, key4: pre_hours, key5: pre_mins , key6: startTime};
    // ローカルストレージに情報を格納する
    localStorage.setItem(key, JSON.stringify(data));
    // span1に次のNoを振り分ける
    $("#span1").text((localStorage.length) + 2);
    // 表示を更新
    load();

    // 出る時間になったことをお知らせする
    // アラームチェックを1秒ごとに行う
    $(function () {
        setInterval(function alarm() {
            const current = updateTime(); // 現在時刻を取得
            console.log(current);
            
            // テキストボックスの値を取得
            const daytime = $("#daytime").val();
            const pre_hours = parseInt($("#pre_hours").val(), 10);
            const pre_mins = parseInt($("#pre_mins").val(), 10);

            // spanタグに値を設定
            $("#span3").text(daytime);
            $("#span4").text(pre_hours);
            $("#span5").text(pre_mins);

            console.log("準備・移動の時間をdiffに取得");

            // calculateStartTime関数を使用して開始時刻を計算
            const startTime = calculateStartTime(daytime, pre_hours, pre_mins);

            
        
            // 出発時間と現在時刻が一致するか確認
            if (current.hour === startTime.getHours() && current.minute === startTime.getMinutes()) {
                $("#alarm_text").text("準備を開始する時間になりました！");
                console.log(`現在の時刻が${startTime.getHours()}時${startTime.getMinutes()}分になりました。`);
            
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
    
// アラームメッセージを非表示にする関数
function endAlarm() {
    console.log("1分経ったので表示が消えます。");
    $("#alarm_text").text("");
    };

// 1秒ごとに各機能を実行
setInterval(updateTime, 1000);
 // 現在時刻の更新
// setInterval(alarm, 1000);      /// アラームのチェック
// setInterval(sale, 1000);       // セールのチェック

let ocrcount = 0;
let fileList = [];
let fileCount = 0;

// 「ファイル選択」ボタン押下時
function start_img_select() {
    $("#image_data").css("display", "");
    $("#image_data").trigger('click');
}

// ファイルアップロード後処理
function change_img(e) {
    ocrcount = 0;
    fileList = e.files;
    fileCount = e.files.length;
    let fileName = fileList[ocrcount].name;

    // ファイル読み込みでプレビュー表示
    var reader = new FileReader();
    reader.onload = function (e) {
        $("#preview").attr('src', e.target.result);
    }
    reader.readAsDataURL(fileList[ocrcount]);

    $("#image_data").css("display", "none");
    let fileinfo = `読み込みファイル数: ${ocrcount + 1}/${fileCount}<br>${fileName}`;
    document.getElementById('fileinfo').innerHTML = fileinfo;

    // ファイル送信実行部
    call_execute_form(fileList[ocrcount]);
}

// リクエスト完了後に表示される「次へ」ボタン押下時
function nextOcr() {
    ocrcount = ocrcount + 1;
    let fileName = fileList[ocrcount].name;

    // ファイル読み込みでプレビュー表示
    var reader = new FileReader();
    reader.onload = function (e) {
        $("#preview").attr('src', e.target.result);
    }
    reader.readAsDataURL(fileList[ocrcount]);

    $("#image_data").css("display", "none");
    let fileinfo = `読み込みファイル数: ${ocrcount + 1}/${fileCount}<br>${fileName}`;
    document.getElementById('fileinfo').innerHTML = fileinfo;

    // ファイル送信実行部
    call_execute_form(fileList[ocrcount]);
}

function send_email() {
    Email.sendWithAttachment({
        Host : "smtp.yourisp.com",
        Username : "username",
        Password : "password",
        To : 'ko.watanabe.0522@gmail.com',
        From : "ko.watanabe.0522@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );    
}

// API リクエスト処理
function call_execute_form(file) {
    var url = "https://ocrxxx.jp/execute";
    var content_type = "multipart/form-data";
    var encoding = "UTF-8";
    var method = "POST";
    var data = [];

    $("#api_result").text('OCR送信中 ...');
    var fd = new FormData();
    // リクエストに必要なフォーム値をセット
    fd.append("request_id", 1);
    fd.append("image_format", "JPEG");
    fd.append("image_width", 100);
    fd.append("image_height", 100);
    // ...
    fd.append("image_data", file);

    $.ajax({
        url: url,
        contentType: false,
        scriptCharset: encoding,
        type: method,
        processData: false,
        data: fd,
        dataType: 'JSON'
    })
        .done(function (data) {
            if (data.results.length == 0) {
                $("#api_result").text(data.message);
                return;
            }

            var results = data.results[0];
            var ocr_results = results.ocr_results;
            if (ocr_results.length > 0) {

                // 取得データ処理...
                html += "<table>";
                // ...
                html += "</table>";

                // 結果確認後の「次へ」ボタン
                if (ocrcount !== (fileCount - 1)) {
                    html += '<input type="button" class="btn btn-primary" id="nextbtn" value="次へ" onClick="nextOcr();" />';
                }

                $("#api_result").html(html);
            } else {
                $("#api_result").text(JSON.stringify(data));
            }
        })
        .fail(function (data) {
            $("#api_result").text(JSON.stringify(data));
        });
}
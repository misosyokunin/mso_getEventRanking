javascript:(async () => {"use strict";/*┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓┃ＭＳＯ＿イベントランキングからイベントポイント取得内訳を取得┃┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛Developer:魚頭男（https://minesweeper.online/ja/player/16842796 ）Writing:魚頭男（https://minesweeper.online/ja/player/16842796 ）Thanks（敬称略）:nagao（https://minesweeper.online/ja/player/2554698 ）イベントポイント一覧 - マインスイーパーオンライン　アットウィキ - atwiki（アットウィキ）（https://w.atwiki.jp/minesweeper-online/pages/101.html ）イベントランキングを取得するのは面倒。というわけで、クローラーを作りました。=======================================================このツールはMinesweeper.Online様（https://minesweeper.online/ 、以下「ＭＳＯ」）より公認を受けていない、非公認のものです。当プログラムは、ＭＳＯ様とは一切関係ございませんので、このプログラムに関する質問・提言等の連絡は魚頭男（https://minesweeper.online/ja/player/16842796 、以下「魚」）までお願いします。当プログラムについて、ＭＳＯ様に連絡することは絶対にしないでください。運営者様並びにユーザー様にご迷惑にならないように努めておりますが、万が一のことがありましたら即削除いたします。=======================================================*//*＝＝＝＝＝＝＝＝＝【使い方】＝＝＝＝＝＝＝＝＝このスクリプトを実行して身を任せるだけです。1ページ辺り最短2秒で取得します（環境によっては2秒以上掛かるかもしれません）。（また、中断機能を設けておりますので、無謀な実行でも大丈夫です）。スクリプト実行中は、できるだけタブの遷移やブラウザをバックグラウンドにしないようにしてください。なお、他言語でも同じようなことができると思います。ただ、このスクリプトのままでは動きませんので、適宜変えてください（「ja」や抽出文言）。*//*【スクリプト開始チェック】*/if(location.href.includes("https://minesweeper.online/ja/event")){}else{const result = window.confirm("イベントランキングページではありません。\n過去のイベントページへ飛びますか？\n（各イベントページ遷移後に再度このスクリプトを実行してください。）");if(result){location.href = "https://minesweeper.online/ja/previous-events";}else{alert("イベントランキングページを表示させてください。");}return;}/*【定数】*/const EVENTPOINT_KIND_NAMES = {"A0": "効率","A1": "速度","A2": "フラグなし","A3": "連勝","A4": "高難易度","A5": "ＮＧ","A6": "勝利","A7": "資源","A8": "アリーナ","B0": "経験","B1": "コイン","B3": "ダイヤモンド枠","Z0": "トップシークレット","ZZ": "不明",};const EVENTPOINT_KIND_IMAGE_HASHS = {"https://minesweeper.online/img/candies/cake/507.svg?v4": "A0","https://minesweeper.online/img/candies/cake/508.svg?v4": "A1","https://minesweeper.online/img/candies/cake/509.svg?v4": "A2","https://minesweeper.online/img/candies/cake/510.svg?v4": "A3","https://minesweeper.online/img/candies/cake/511.svg?v4": "A4","https://minesweeper.online/img/candies/cake/512.svg?v4": "A5","https://minesweeper.online/img/candies/cake/513.svg?v4": "A6","https://minesweeper.online/img/candies/cake/514.svg?v4": "A7","https://minesweeper.online/img/candies/cake/515.svg?v4": "A8","https://minesweeper.online/img/candies/cake/516.svg?v4": "B3","https://minesweeper.online/img/candies/pumpkin/490.svg?v4": "B0","https://minesweeper.online/img/candies/pumpkin/491.svg?v4": "B1","https://minesweeper.online/img/candies/pumpkin/492.svg?v4": "A0","https://minesweeper.online/img/candies/pumpkin/493.svg?v4": "A1","https://minesweeper.online/img/candies/pumpkin/494.svg?v4": "A2","https://minesweeper.online/img/candies/pumpkin/495.svg?v4": "A3","https://minesweeper.online/img/candies/pumpkin/496.svg?v4": "A4","https://minesweeper.online/img/candies/pumpkin/497.svg?v4": "A5","https://minesweeper.online/img/candies/pumpkin/498.svg?v4": "A6","https://minesweeper.online/img/candies/pumpkin/499.svg?v4": "A7","https://minesweeper.online/img/candies/pumpkin/500.svg?v4": "A8","https://minesweeper.online/img/candies/pumpkin/501.svg?v4": "B3","https://minesweeper.online/img/candies/fruit/475.svg?v4": "B0","https://minesweeper.online/img/candies/fruit/476.svg?v4": "B1","https://minesweeper.online/img/candies/fruit/477.svg?v4": "A0","https://minesweeper.online/img/candies/fruit/478.svg?v4": "A1","https://minesweeper.online/img/candies/fruit/479.svg?v4": "A2","https://minesweeper.online/img/candies/fruit/480.svg?v4": "A3","https://minesweeper.online/img/candies/fruit/481.svg?v4": "A4","https://minesweeper.online/img/candies/fruit/482.svg?v4": "A5","https://minesweeper.online/img/candies/fruit/483.svg?v4": "A6","https://minesweeper.online/img/candies/fruit/484.svg?v4": "A7","https://minesweeper.online/img/candies/fruit/485.svg?v4": "A8","https://minesweeper.online/img/candies/fruit/486.svg?v4": "B3","https://minesweeper.online/img/candies/drink/460.svg?v4": "B0","https://minesweeper.online/img/candies/drink/461.svg?v4": "B1","https://minesweeper.online/img/candies/drink/462.svg?v4": "A0","https://minesweeper.online/img/candies/drink/463.svg?v4": "A1","https://minesweeper.online/img/candies/drink/464.svg?v4": "A2","https://minesweeper.online/img/candies/drink/465.svg?v4": "A3","https://minesweeper.online/img/candies/drink/466.svg?v4": "A4","https://minesweeper.online/img/candies/drink/467.svg?v4": "A5","https://minesweeper.online/img/candies/drink/468.svg?v4": "A6","https://minesweeper.online/img/candies/drink/469.svg?v4": "A7","https://minesweeper.online/img/candies/drink/470.svg?v4": "A8","https://minesweeper.online/img/candies/drink/471.svg?v4": "B3","https://minesweeper.online/img/candies/drink/472.svg?v4": "Z0","https://minesweeper.online/img/candies/icecream/445.svg?v4": "B0","https://minesweeper.online/img/candies/icecream/446.svg?v4": "B1","https://minesweeper.online/img/candies/icecream/447.svg?v4": "A0","https://minesweeper.online/img/candies/icecream/448.svg?v4": "A1","https://minesweeper.online/img/candies/icecream/449.svg?v4": "A2","https://minesweeper.online/img/candies/icecream/450.svg?v4": "A3","https://minesweeper.online/img/candies/icecream/451.svg?v4": "A4","https://minesweeper.online/img/candies/icecream/452.svg?v4": "A5","https://minesweeper.online/img/candies/icecream/453.svg?v4": "A6","https://minesweeper.online/img/candies/icecream/454.svg?v4": "A7","https://minesweeper.online/img/candies/icecream/455.svg?v4": "A8","https://minesweeper.online/img/candies/icecream/456.svg?v4": "B3","https://minesweeper.online/img/candies/like/430.svg?v4": "B0","https://minesweeper.online/img/candies/like/431.svg?v4": "B1","https://minesweeper.online/img/candies/like/432.svg?v4": "A0","https://minesweeper.online/img/candies/like/433.svg?v4": "A1","https://minesweeper.online/img/candies/like/434.svg?v4": "A2","https://minesweeper.online/img/candies/like/435.svg?v4": "A3","https://minesweeper.online/img/candies/like/436.svg?v4": "A4","https://minesweeper.online/img/candies/like/437.svg?v4": "A5","https://minesweeper.online/img/candies/like/438.svg?v4": "A6","https://minesweeper.online/img/candies/like/439.svg?v4": "A7","https://minesweeper.online/img/candies/like/440.svg?v4": "A8","https://minesweeper.online/img/candies/like/441.svg?v4": "B3","https://minesweeper.online/img/candies/flower/415.svg?v4": "B0","https://minesweeper.online/img/candies/flower/416.svg?v4": "B1","https://minesweeper.online/img/candies/flower/417.svg?v4": "A0","https://minesweeper.online/img/candies/flower/418.svg?v4": "A1","https://minesweeper.online/img/candies/flower/419.svg?v4": "A2","https://minesweeper.online/img/candies/flower/420.svg?v4": "A3","https://minesweeper.online/img/candies/flower/421.svg?v4": "A4","https://minesweeper.online/img/candies/flower/422.svg?v4": "A5","https://minesweeper.online/img/candies/flower/423.svg?v4": "A6","https://minesweeper.online/img/candies/flower/424.svg?v4": "A7","https://minesweeper.online/img/candies/flower/425.svg?v4": "A8","https://minesweeper.online/img/candies/flower/426.svg?v4": "B3","https://minesweeper.online/img/candies/egg/400.svg?v4": "B0","https://minesweeper.online/img/candies/egg/401.svg?v4": "B1","https://minesweeper.online/img/candies/egg/402.svg?v4": "A0","https://minesweeper.online/img/candies/egg/403.svg?v4": "A1","https://minesweeper.online/img/candies/egg/404.svg?v4": "A2","https://minesweeper.online/img/candies/egg/405.svg?v4": "A3","https://minesweeper.online/img/candies/egg/406.svg?v4": "A4","https://minesweeper.online/img/candies/egg/407.svg?v4": "A5","https://minesweeper.online/img/candies/egg/408.svg?v4": "A6","https://minesweeper.online/img/candies/egg/409.svg?v4": "A7","https://minesweeper.online/img/candies/egg/410.svg?v4": "A8","https://minesweeper.online/img/candies/egg/411.svg?v4": "B3","https://minesweeper.online/img/candies/egg/412.svg?v4": "Z0","https://minesweeper.online/img/candies/shard/385.svg?v4": "B0","https://minesweeper.online/img/candies/shard/386.svg?v4": "B1","https://minesweeper.online/img/candies/shard/387.svg?v4": "A0","https://minesweeper.online/img/candies/shard/388.svg?v4": "A1","https://minesweeper.online/img/candies/shard/389.svg?v4": "A2","https://minesweeper.online/img/candies/shard/390.svg?v4": "A3","https://minesweeper.online/img/candies/shard/391.svg?v4": "A4","https://minesweeper.online/img/candies/shard/392.svg?v4": "A5","https://minesweeper.online/img/candies/shard/393.svg?v4": "A6","https://minesweeper.online/img/candies/shard/394.svg?v4": "A7","https://minesweeper.online/img/candies/shard/395.svg?v4": "A8","https://minesweeper.online/img/candies/shard/396.svg?v4": "B3","https://minesweeper.online/img/candies/heart/370.svg?v4": "B0","https://minesweeper.online/img/candies/heart/371.svg?v4": "B1","https://minesweeper.online/img/candies/heart/372.svg?v4": "A0","https://minesweeper.online/img/candies/heart/373.svg?v4": "A1","https://minesweeper.online/img/candies/heart/374.svg?v4": "A2","https://minesweeper.online/img/candies/heart/375.svg?v4": "A3","https://minesweeper.online/img/candies/heart/376.svg?v4": "A4","https://minesweeper.online/img/candies/heart/377.svg?v4": "A5","https://minesweeper.online/img/candies/heart/378.svg?v4": "A6","https://minesweeper.online/img/candies/heart/379.svg?v4": "A7","https://minesweeper.online/img/candies/heart/380.svg?v4": "A8","https://minesweeper.online/img/candies/heart/381.svg?v4": "B3","https://minesweeper.online/img/candies/snowflake/355.svg?v4": "B0","https://minesweeper.online/img/candies/snowflake/356.svg?v4": "B1","https://minesweeper.online/img/candies/snowflake/357.svg?v4": "A0","https://minesweeper.online/img/candies/snowflake/358.svg?v4": "A1","https://minesweeper.online/img/candies/snowflake/359.svg?v4": "A2","https://minesweeper.online/img/candies/snowflake/360.svg?v4": "A3","https://minesweeper.online/img/candies/snowflake/361.svg?v4": "A4","https://minesweeper.online/img/candies/snowflake/362.svg?v4": "A5","https://minesweeper.online/img/candies/snowflake/363.svg?v4": "A6","https://minesweeper.online/img/candies/snowflake/364.svg?v4": "A7","https://minesweeper.online/img/candies/snowflake/365.svg?v4": "A8","https://minesweeper.online/img/candies/snowflake/366.svg?v4": "B3","https://minesweeper.online/img/candies/candy/520.svg?v4": "B0","https://minesweeper.online/img/candies/candy/521.svg?v4": "B1","https://minesweeper.online/img/candies/candy/522.svg?v4": "A0","https://minesweeper.online/img/candies/candy/523.svg?v4": "A1","https://minesweeper.online/img/candies/candy/524.svg?v4": "A2","https://minesweeper.online/img/candies/candy/525.svg?v4": "A3","https://minesweeper.online/img/candies/candy/526.svg?v4": "A4","https://minesweeper.online/img/candies/candy/527.svg?v4": "A5","https://minesweeper.online/img/candies/candy/528.svg?v4": "A6","https://minesweeper.online/img/candies/candy/529.svg?v4": "A7","https://minesweeper.online/img/candies/candy/530.svg?v4": "A8","https://minesweeper.online/img/candies/candy/531.svg?v4": "B3","https://minesweeper.online/img/candies/candy/532.svg?v4": "Z0",};const Wait = {waits : [],num : -1,add(){return new Promise((resolve) =>{this.num++;this.waits[this.num] = resolve;});},release(){this.waits[this.num]();this.waits[this.num] = "";this.num--;},time(sec){return new Promise((resolve) =>{setTimeout(function(){resolve();}, sec * 1000);});},};const mouseOverEvent = new MouseEvent("mouseover", {view: window,bubbles: true,cancelable: true});const mouseOutEvent = new MouseEvent("mouseout", {view: window,bubbles: true,cancelable: true});const TEMPLATE_DATA = {"ユーザー名": "ＸＸＸ","ユーザーリンク": "https://minesweeper.online/ja/player/16842796","総取得イベントポイント": 0,};Object.values(EVENTPOINT_KIND_NAMES).forEach((value) => {TEMPLATE_DATA[value] = 0;});/*【データ取得方法などの選択】*/const bk = document.createElement("div");bk.style = "position:fixed; top: 0px; left: 0px; background-color: rgba(0, 0, 0, 0.5); width: 100vw; height: 100vh; font-size: 2em; z-index: 100; display: flex; justify-content: center; align-items: center; flex-direction: column;";const header = document.createElement("header");bk.append(header);const h1 = document.createElement("h1");h1.textContent = "シーズン集計スクリプト";header.append(h1);const section = document.createElement("section");bk.append(section);const form = document.createElement("form");form.setAttribute("onsubmit", "return false;");section.append(form);{const label = document.createElement("label");form.append(label);const input = document.createElement("input");input.id = "_limitUserRank";input.type = "number";input.min = 0;input.max = document.getElementById("stat_my_rank")?.textContent?.replace(/.*?\/\s/, "") ?? "100";input.value = input.max;input.step = 1;input.style = "width: 8ch;";label.append(input);const span = document.createElement("span");span.textContent = "位までを取得する";label.append(span);}{const footer = document.createElement("footer");footer.style = "display: flex; width: 100%; justify-content: center;";bk.append(footer);const cancelButton = document.createElement("button");cancelButton.type = "button";cancelButton.textContent = "キャンセル";cancelButton.addEventListener("click", () => {bk.remove();});cancelButton.style = "width: 100%;";footer.append(cancelButton);const searchButton = document.createElement("button");searchButton.type = "button";searchButton.textContent = "検索";searchButton.addEventListener("click", () => {event.preventDefault();const rp = checkInputs();if(rp){alert(rp);return;}setInit();changeShowStrings();main();});searchButton.style = "width: 100%;";footer.append(searchButton);}document.body.append(bk);document.getElementById("_limitUserRank").focus();/*【データ取得】*/let limitUserRank = 0;let isLooping = true;const putDatas = [];function checkInputs(){let rs = "";const lur = Number(document.getElementById("_limitUserRank").value);if(!Number.isInteger(lur) || lur < 1){rs += `順位に変な値が入っています！（${document.getElementById("_limitUserRank").value}）`;}return rs;}function setInit(){limitUserRank = document.getElementById("_limitUserRank").value;}function changeShowStrings(){bk.innerHTML = "";bk.innerText = "イベントポイントデータ取得中…\nしばらくお待ちください…";const breakButton = document.createElement("button");breakButton.type = "button";breakButton.textContent = "終了する";breakButton.addEventListener("click", () => {isLooping = false;/*bk.remove();*/});bk.append(breakButton);const progress = document.createElement("progress");progress.id = "_progress";progress.max = limitUserRank;progress.value = 0;bk.append(progress);{const label = document.createElement("label");label.style = "cursor: pointer;";bk.append(label);const chkShowHeader = document.createElement("input");chkShowHeader.type = "checkbox";chkShowHeader.checked = false;chkShowHeader.id = "_chkShowHeader";chkShowHeader.style = "transform: scale(1.5); margin: 5px;";label.append(chkShowHeader);const span = document.createElement("span");span.textContent = "見出しも取得する";span.style = "font-size: 16px";label.append(span);}{const label = document.createElement("label");label.style = "cursor: pointer;";bk.append(label);const chkShowHeader = document.createElement("input");chkShowHeader.type = "checkbox";chkShowHeader.checked = true;chkShowHeader.id = "_chkCopyDataWhenJumpToSheet";chkShowHeader.style = "transform: scale(1.5); margin: 5px;";label.append(chkShowHeader);const span = document.createElement("span");span.textContent = "シート遷移時にデータをコピーする";span.style = "font-size: 16px";label.append(span);}}let observer = null;function main(){const target = document.body;observer = new MutationObserver(async function (mutations) {const tar = mutations[0].target;if(tar.id === "stat_my_rank"){/*"stat_pagination"よりも確実*/await Wait.time(1);/*1以下にしちゃダメ！*/const rb = await loop();if(rb){endScript();}}if(tar.classList.contains("help")){Wait.release();tar.dispatchEvent(mouseOutEvent);}});observer.observe(target, {attributes: true,/*属性変化の監視*/characterData: true,/*テキストノードの変化を監視*/childList: true,/*子ノードの変化を監視*/subtree: true,/*子孫ノードも監視対象に含める*/});if(document.querySelector("#stat_pagination .active").textContent === "1"){loop();}else{document.querySelector("#stat_pagination .first").click();}async function loop(){if(!isLooping){return true;}const rf = await getData();if(!rf){return true;}const nextButton = document.querySelector("#stat_pagination .next");if(nextButton.classList.contains("disabled")){return true;}else{nextButton.click();}}async function getData(){const trs = document.querySelectorAll("#stat_table > tbody > tr");for(let i = 0; i < trs.length; i++){const tr = trs[i];if(!tr.querySelector(":scope > td:nth-child(1)").textContent){return false;}const tempData = JSON.parse(JSON.stringify(TEMPLATE_DATA));const user_name = tr.querySelector(":scope > td:nth-child(2)").textContent;const user_link = tr.querySelector(":scope > td:nth-child(2) a").href;const user_sum_eventpoints = tr.querySelector(":scope > td:nth-child(3) strong").textContent;tempData["ユーザー名"] = user_name;tempData["ユーザーリンク"] = user_link;tempData["総取得イベントポイント"] = user_sum_eventpoints;setTimeout(() => {tr.querySelector(":scope > td:nth-child(3) span.help").dispatchEvent(mouseOverEvent);}, 100);/*100以下にしちゃダメ！*/await Wait.add();/*popoverの出現待ち*/const popover = Array.from(document.querySelectorAll(".popover")).at(-1);const spans = popover.querySelectorAll(".popover-content > span > span");spans.forEach((span) => {const eventpoints = span.textContent;const kind_key = EVENTPOINT_KIND_IMAGE_HASHS[span.querySelector("img").src] ?? "ZZ";const kind_name = EVENTPOINT_KIND_NAMES[kind_key];tempData[kind_name] = eventpoints;});document.getElementById("_progress").value++;putDatas.push(tempData);if(tr.querySelector(":scope > td:nth-child(1)").textContent === `${limitUserRank}`){return false;}}return true;}}/*【データ表示】*/function endScript(){observer.disconnect();const isShowHeader = document.getElementById("_chkShowHeader").checked;const isCopyDataWhenJumpToSheet = document.getElementById("_chkCopyDataWhenJumpToSheet").checked;bk.innerHTML = "";const textarea = document.createElement("textarea");if(isShowHeader){for(const key of Object.keys(TEMPLATE_DATA)){textarea.value += `${key}\t`;}textarea.value += "\n";}putDatas.forEach((data) => {for(const value of Object.values(data)){textarea.value += `${value}\t`;}textarea.value += "\n";});textarea.style = "font-size: 16px; width: 90%; height: 50%;";bk.append(textarea);const wrapper = document.createElement("div");wrapper.style = "height: 20%; width: 90%; font-size: 16px; display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0px;";bk.append(wrapper);const copyButton = document.createElement("button");copyButton.type = "button";copyButton.textContent = "📃コピーする";copyButton.addEventListener("click", () => {textarea.select();document.execCommand("copy");window.getSelection?.().removeAllRanges();textarea.blur();copyButton.textContent = "📃コピーしました！";setTimeout(() => {copyButton.textContent = "📃コピーする";}, 3000);});copyButton.style = "grid-column: span 2 / span 2;";wrapper.append(copyButton);const closeButton = document.createElement("button");closeButton.type = "button";closeButton.textContent = "閉じる";closeButton.addEventListener("click", () => {bk.remove();});closeButton.style = "grid-column-start: 1; grid-row-start: 2;";wrapper.append(closeButton);const jumpButton = document.createElement("button");jumpButton.type = "button";jumpButton.style = "grid-column-start: 2; grid-row-start: 2;";wrapper.append(jumpButton);const anc = document.createElement("a");anc.innerText = "コピペしにいく\n（スプレッドシートへ飛びます）";anc.href = "https://docs.google.com/spreadsheets/d/1StgWmxSqnfpxNKJA7CY2vF62wXmCDczp-PMwVRpNdMI/edit?gid=569713866#gid=569713866";anc.setAttribute("target", '_blank');if(isCopyDataWhenJumpToSheet){anc.addEventListener("click", () => {textarea.select();document.execCommand("copy");window.getSelection?.().removeAllRanges();textarea.blur();});}anc.style = "display: block;";jumpButton.append(anc);}/*【svgデータ取得用】const mouseOverEvent = new MouseEvent("mouseover", {view: window,bubbles: true,cancelable: true});document.querySelectorAll("#stat_table span.help")[8].dispatchEvent(mouseOverEvent);*/})();

/*global window */
/*global document */
"use strict";
var eki_info_map = {};
var eki_dict = {};
var eki_display_list = [];

function register_eki_info(info) {
    var index, a;
    index = info.yomi.substr(0, 1);
    a = eki_dict[index];
    if (a === undefined) {
        a = [];
        eki_dict[index] = a;
    }
    a.push(info.id);
}
function load_eki_csv(csv_text) {
    var i, cols, info, lines;
    lines = csv_text.split("\n");
    for (i = 0; i < lines.length; i = i + 1) {
        cols = lines[i].split(",");
        info = {
            id: i,
            name: cols[0],
            yomi: cols[1],
            rosen: cols[2]
        };
        eki_info_map[i] = info;
        register_eki_info(info);
    }
}

function init_load_eki_csv() {
    load_eki_csv(document.getElementById("csv").text.trim());
}

window.onload = init_load_eki_csv;

function pick_random(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function emotion(url) {
    var emo_div, image;
    emo_div = document.getElementById("emotion");
    while (emo_div.firstChild) {
        emo_div.removeChild(emo_div.firstChild);
    }
    image = document.createElement("img");
    image.src = url;
    image.width = 200;
    image.height = 200;
    emo_div.appendChild(image);
}
function emotion_good() {
    var images = [
        "https://1.bp.blogspot.com/-SWOiphrHWnI/XWS5x7MYwHI/AAAAAAABUXA/i_PRL_Atr08ayl9sZy9-x0uoY4zV2d5xwCLcBGAs/s1600/pose_dance_ukareru_man.png",
        "https://1.bp.blogspot.com/-NAu4cRevEbE/XWS5yEI290I/AAAAAAABUXE/rAFuyoWP94kjehBxqO7gcXskQMsLLcCngCLcBGAs/s1600/pose_dance_ukareru_woman.png",
        "https://1.bp.blogspot.com/-kb8uB73Cz0Y/XVjgJv4126I/AAAAAAABUMs/lPY9BoDvTcMbmAuQaK7a2N_Mqie5PLhPQCLcBGAs/s1600/kid_seikaku_kachiki_girl.png",
        "https://1.bp.blogspot.com/-4wfcL_kE4hg/XVjgJLRouRI/AAAAAAABUMo/n7wMY5kms9I6BiGxu6a5gIKkPipH7ls4wCLcBGAs/s1600/kid_seikaku_kachiki_boy.png",
        "https://1.bp.blogspot.com/-7pmF959ysUY/XNE_EDoyYDI/AAAAAAABSuQ/Q1C0pUgPGmIelMm8ce51M4x--wRa9xICwCLcBGAs/s800/hyoujou_text_man_nikoniko.png"];
    emotion(pick_random(images));
}
function emotion_not_good() {
    var images = [
        "https://1.bp.blogspot.com/-8sMAiPmvFuo/XVjgKN2BXoI/AAAAAAABUM0/IfTQp8hHWRsVk_u7s84OE6yvFJ5ekpnLwCLcBGAs/s1600/kid_seikaku_uchiki_girl.png",
        "https://1.bp.blogspot.com/-ahlT7Kd7-T0/XVjgJ3hrbFI/AAAAAAABUMw/MV4su85SnoAMYnSitR9DXVgNFuorpprwQCLcBGAs/s1600/kid_seikaku_uchiki_boy.png"
    ];
    emotion(pick_random(images));
}
function emotion_bad() {
    var images = [
        "https://3.bp.blogspot.com/-fWtIiBh_Nm0/XNE_DZEE2TI/AAAAAAABSuM/1ZP_JcOtHs80rPun-XSlPrg2VOco29FzACLcBGAs/s800/hyoujou_text_man_iraira.png",
        "https://4.bp.blogspot.com/-MCxGdw6ljLU/XNE_EoTtABI/AAAAAAABSuU/SRwSrhpBPTEiQdC7UU8S2o31ccojy9QegCLcBGAs/s800/hyoujou_text_man_punpun.png",
        "https://4.bp.blogspot.com/-JpRYwGchi7g/XNE_EogZmBI/AAAAAAABSuY/ShzAtBExmpUJb9atmMhj6wf6f47fBmo9QCLcBGAs/s800/hyoujou_text_man_shikushiku.png"
    ];
    emotion(pick_random(images));
}
function message(msg) {
    var msg_div = document.getElementById("message");
    while (msg_div.firstChild) {
        msg_div.removeChild(msg_div.firstChild);
    }
    msg_div.appendChild(
        document.createTextNode(msg)
    );
}
function is_name_match(name1, name2) {
    if (name1.indexOf("(") > 0) {
        name1 = name1.substr(0, name1.indexOf("("));
    }
    if (name2.indexOf("(") > 0) {
        name2 = name2.substr(0, name2.indexOf("("));
    }
    if (name1 === name2) {
        return true;
    }
    if (name1 + "えき" === name2) {
        return true;
    }
    if (name1 === name2 + "えき") {
        return true;
    }
    if (name1 + "駅" === name2) {
        return true;
    }
    if (name1 === name2 + "駅") {
        return true;
    }
    return false;
}
function find_eki_name(name) {
    var found, key, info;
    found = [];
    for (key in eki_info_map) {
        if (eki_info_map.hasOwnProperty(key)) {
            info = eki_info_map[key];
            if (is_name_match(info.name, name) || is_name_match(info.yomi, name)) {
                found.push(info);
            }
        }
    }
    return found;
}
function already_used(name) {
    var i, infos, j, info;
    for (i = 0; i < eki_display_list.length; i = i + 1) {
        infos = eki_display_list[i];
        for (j = 0; j < infos.length; j = j + 1) {
            info = infos[j];
            if (is_name_match(info.name, name) || is_name_match(info.yomi, name)) {
                return true;
            }
        }
    }
    return false;
}
function remove_eki(name) {
    if (name.substr(name.length - 2) === "えき") {
        return name.substr(0, name.length - 2);
    }
    return name;
}
function clean_char(c) {
    switch (c) {
    case "ぁ":
        return "あ";
    case "ぃ":
        return "い";
    case "ぅ":
        return "う";
    case "ぇ":
        return "え";
    case "ぉ":
        return "お";
    case "ゃ":
        return "や";
    case "ゅ":
        return "ゆ";
    case "ょ":
        return "よ";
    case "ざ":
        return "さ";
    case "じ":
        return "し";
    case "ず":
        return "す";
    case "ぜ":
        return "せ";
    case "ぞ":
        return "そ";
    case "だ":
        return "た";
    case "ぢ":
        return "ち";
    case "づ":
        return "つ";
    case "で":
        return "て";
    case "ど":
        return "と";
    case "ば":
        return "は";
    case "び":
        return "ひ";
    case "ぶ":
        return "ふ";
    case "べ":
        return "へ";
    case "ぼ":
        return "ほ";
    case "ぱ":
        return "は";
    case "ぴ":
        return "ひ";
    case "ぷ":
        return "ふ";
    case "ぺ":
        return "へ";
    case "ぽ":
        return "ほ";
    default:
        return c;
    }
}
function is_chain(name1, name2, len) {
    var last1, first1;
    name1 = remove_eki(name1);
    if (len === 1) {
        last1 = clean_char(name1.substr(name1.length - 1));
        first1 = clean_char(name2.substr(0, 1));
        if (last1 === first1) {
            return true;
        }
    } else if (len === 2) {
        if (name1.substr(name1.length - 2) === name2.substr(0, 2)) {
            return true;
        }
    }
    return false;
}
function get_chain_infos(prev_infos, next_infos) {
    var chain, i, j, result;
    chain = new Set();
    for (i = 0; i < prev_infos.length; i = i + 1) {
        for (j = 0; j < next_infos.length; j = j + 1) {
            if (is_chain(prev_infos[i].yomi, next_infos[j].yomi, 1)) {
                chain.add(next_infos[j].id);
            }
        }
    }
    if (chain.length === 0) {
        for (i = 0; i < prev_infos.length; i = i + 1) {
            for (j = 0; j < next_infos.length; j = j + 1) {
                if (is_chain(prev_infos[i].yomi, next_infos[j].yomi, 2)) {
                    chain.add(next_infos[j].id);
                }
            }
        }
    }
    result = [];
    chain.forEach(function (id) { result.push(eki_info_map[id]); });
    return result;
}

function is_terminator(info) {
    var yomi = remove_eki(info.yomi);
    return (yomi.substr(yomi.length - 1) === "ん") ? true : false;
}

function get_wikipedia_url(name) {
    return "https://ja.wikipedia.org/wiki/" +
        (name.replace('(', '_('));
}

function update_eki_display() {
    var tbody, i, found, row, col2, j, info, col3, a;
    tbody = document.getElementById("list");
    while (tbody.rows[0]) {
        tbody.deleteRow(0);
    }
    for (i = 0; i < eki_display_list.length; i = i + 1) {
        found = eki_display_list[i];
        row = tbody.insertRow(-1);
        row.insertCell(-1).appendChild(
            document.createTextNode((i + 1).toString(10))
        );
        col2 = row.insertCell(-1);
        for (j = 0; j < found.length; j = j + 1) {
            info = found[j];
            col2.appendChild(document.createTextNode(info.yomi));
            col2.appendChild(document.createElement("br"));
            if (is_terminator(info)) {
                col2.style.color = "red";
            }
        }
        col3 = row.insertCell(-1);
        for (j = 0; j < found.length; j = j + 1) {
            info = found[j];
            a = document.createElement('a');
            a.href = get_wikipedia_url(info.name);
            a.target = "_blank";
            a.appendChild(document.createTextNode(info.name));
            col3.appendChild(a);
            col3.appendChild(document.createElement("br"));
        }
    }
    row = tbody.insertRow(-1);
    row.insertCell(-1).appendChild(
        document.createTextNode((eki_display_list.length).toString(10))
    );
    row.insertCell(-1).innerHTML = '<input id="input" type="text" value="" />';
    row.insertCell(-1).innerHTML = '<input type="button" value="決定" onclick="input_done();" /><input type="button" value="ギブアップ！" onclick="giveup();" />';
}

function input_done() {
    var name, found, prev_infos;
    name = document.getElementById("input").value.trim();
    found = find_eki_name(name);
    if (found.length === 0) {
        message("「" + name + "」？ ...そんな駅はないよ");
        emotion_bad();
        return;
    }
    if (already_used(name)) {
        message("「" + name + "」はもう使ったよ？");
        emotion_bad();
        return;
    }
    prev_infos = eki_display_list[eki_display_list.length - 1];
    if (prev_infos !== undefined) {
        found = get_chain_infos(prev_infos, found);
        if (found.length === 0) {
            message("「" + prev_infos[0].yomi + "」 に 「" +
                    name + "」はつづかないよ");
            emotion_bad();
            return;
        }
    }
    eki_display_list.push(found);
    update_eki_display();
    emotion_good();
    message("OK!");
}
function giveup() {
    var prev_infos, all, key, possibles, all_yomi, i, info;
    prev_infos = eki_display_list[eki_display_list.length - 1];
    all = [];
    for (key in eki_info_map) {
        if (eki_info_map.hasOwnProperty(key)) {
            info = eki_info_map[key];
            if (!already_used(info.yomi)) {
                all.push(info);
            }
        }
    }
    possibles = get_chain_infos(prev_infos, all);
    if (possibles.length === 0) {
        message("終わりだよ！");
        return;
    }
    document.getElementById("input").value =
        pick_random(possibles).yomi;
    all_yomi = new Set();
    for (i = 0; i < possibles.length; i = i + 1) {
        info = possibles[i];
        all_yomi.add(info.yomi);
    }
    emotion_not_good();
    message(Array.from(all_yomi).join(", "));
}

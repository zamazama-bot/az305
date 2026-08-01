// AZ-305 Quiz Engine
// QUESTIONS      は data/questions.js  (第1回: 60問)
// QUESTIONS_SET2 は data/questions2.js (第2回: 60問)
// QUESTIONS_SET3 は data/questions3.js (本番模試A: 60問)
// QUESTIONS_SET4 は data/questions4.js (本番模試B: 60問)

(function () {
  'use strict';

  var LABELS = ['A', 'B', 'C', 'D'];

  // データファイルの読み込みに失敗しても、他のセットは使えるようにガードする。
  // （const 宣言はグローバルオブジェクトに載らないため typeof で判定する）
  function safeSet(v) { return (v && v.length) ? v : null; }

  var SETS = [
    { id: 1, label: '分野別 第1回', questions: safeSet(typeof QUESTIONS      !== 'undefined' ? QUESTIONS      : null), desc: 'ID・ガバナンス・監視／データストレージ 中心' },
    { id: 2, label: '分野別 第2回', questions: safeSet(typeof QUESTIONS_SET2 !== 'undefined' ? QUESTIONS_SET2 : null), desc: '事業継続性／インフラ／アプリアーキテクチャ 中心' },
    { id: 3, label: '本番模試 A',   questions: safeSet(typeof QUESTIONS_SET3 !== 'undefined' ? QUESTIONS_SET3 : null), desc: '本番同様のドメイン配分＋ケーススタディ形式', exam: true },
    { id: 4, label: '本番模試 B',   questions: safeSet(typeof QUESTIONS_SET4 !== 'undefined' ? QUESTIONS_SET4 : null), desc: '本番同様のドメイン配分＋ケーススタディ形式', exam: true }
  ].filter(function (s) { return s.questions !== null; });

  // answers[i] = 選択した選択肢インデックス。未回答は undefined。
  var state = {
    activeSet: null,
    current:   0,
    answers:   []
  };

  // ── 進捗の保存（端末ローカル・localStorage）────────────────────────────

  var STORAGE_PREFIX = 'az305quiz_progress_set_';

  function saveProgress() {
    if (!state.activeSet) return;
    try {
      localStorage.setItem(
        STORAGE_PREFIX + state.activeSet.id,
        JSON.stringify({ current: state.current, answers: state.answers })
      );
    } catch (e) { /* ストレージ利用不可でも致命的ではないので無視 */ }
  }

  function loadProgress(id) {
    try {
      var raw = localStorage.getItem(STORAGE_PREFIX + id);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function clearProgress(id) {
    try { localStorage.removeItem(STORAGE_PREFIX + id); } catch (e) { /* noop */ }
  }

  function getAnsweredCount(answers) {
    return answers.filter(function (a) { return a !== undefined; }).length;
  }

  // ── スコア計算（answers 配列から都度算出）────────────────────────────

  function getCorrectCount() {
    var n = 0, qs = state.activeSet.questions;
    state.answers.forEach(function (sel, i) {
      if (sel !== undefined && sel === qs[i].answer) n++;
    });
    return n;
  }

  function getWrongCount() {
    var n = 0, qs = state.activeSet.questions;
    state.answers.forEach(function (sel, i) {
      if (sel !== undefined && sel !== qs[i].answer) n++;
    });
    return n;
  }

  // ── DOM helpers ────────────────────────────────────────────────────────

  function qs(id) { return document.getElementById(id); }

  function setProgressVisible(v) {
    qs('progressWrap').style.display = v ? '' : 'none';
  }

  function updateProgress() {
    var total    = state.activeSet.questions.length;
    var answered = state.answers.filter(function (a) { return a !== undefined; }).length;
    var pct      = Math.round((answered / total) * 100);
    qs('progressBar').style.width = pct + '%';
    qs('progressLabel').textContent =
      state.activeSet.label + '  問題 ' + (state.current + 1) + ' / ' + total +
      '  （回答済み ' + answered + ' 問）';
  }

  // ── スタート画面 ───────────────────────────────────────────────────────

  function renderStart() {
    setProgressVisible(false);

    var cards = SETS.map(function (set) {
      var saved      = loadProgress(set.id);
      var answered   = saved ? getAnsweredCount(saved.answers) : 0;
      var inProgress = saved && answered > 0 && answered < set.questions.length;

      var resumeRow = inProgress
        ? '<div class="set-resume">&#128190; 進行中：' + answered + ' / ' + set.questions.length + ' 問回答済み</div>'
        : '';

      var buttonsHtml = inProgress
        ? (
            '<div class="set-btn-row">' +
            '  <span class="set-btn" onclick="event.stopPropagation();startSet(' + set.id + ')">続きから &rarr;</span>' +
            '  <span class="set-btn set-btn-secondary" onclick="event.stopPropagation();startSet(' + set.id + ',true)">最初から</span>' +
            '</div>'
          )
        : '<div class="set-btn">開始する &rarr;</div>';

      return (
        '<div class="set-card" onclick="startSet(' + set.id + ')">' +
        '  <div class="set-label">' + set.label + '</div>' +
        '  <div class="set-count">' + set.questions.length + ' 問</div>' +
        '  <div class="set-desc">' + set.desc + '</div>' +
        resumeRow +
        buttonsHtml +
        '</div>'
      );
    }).join('');

    qs('quizArea').innerHTML =
      '<div class="start-screen">' +
      '  <h2 class="start-title">模擬試験を選択してください</h2>' +
      '  <p class="start-sub">合格ライン: 700点 / 1000点（約70%正解）</p>' +
      '  <div class="set-grid">' + cards + '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  window.startSet = function (id, forceRestart) {
    var found = null;
    for (var i = 0; i < SETS.length; i++) {
      if (SETS[i].id === id) { found = SETS[i]; break; }
    }
    if (!found) return;

    state.activeSet = found;

    var saved = !forceRestart && loadProgress(id);
    if (saved && saved.answers && saved.current < found.questions.length) {
      state.current = saved.current;
      state.answers = saved.answers;
    } else {
      state.current = 0;
      state.answers = [];
      clearProgress(id);
    }

    setProgressVisible(true);
    renderQuestion();
  };

  // ── 問題描画 ───────────────────────────────────────────────────────────

  function renderQuestion() {
    window.scrollTo(0, 0);
    updateProgress();

    var q        = state.activeSet.questions[state.current];
    var total    = state.activeSet.questions.length;
    var isFirst  = state.current === 0;
    var isLast   = state.current === total - 1;
    var prevAns  = state.answers[state.current];  // undefined = 未回答
    var isAnswered = prevAns !== undefined;

    // 選択肢 HTML
    var choicesHtml = q.choices.map(function (text, i) {
      return (
        '<div class="choice" id="c' + i + '" onclick="selectChoice(' + i + ')">' +
        '  <div class="choice-badge" id="badge' + i + '">' + LABELS[i] + '</div>' +
        '  <div class="choice-text">' + text + '</div>' +
        '  <div class="choice-icon" id="icon' + i + '"></div>' +
        '</div>'
      );
    }).join('');

    // 全体の HTML
    qs('quizArea').innerHTML =
      '<div class="card">' +

      // ── メタ行（問題番号・ドメイン）
      '<div class="q-meta">' +
      '  <span class="q-number">問題 ' + (state.current + 1) + ' / ' + total + '</span>' +
      '  <span class="q-domain">' + (q.domain || '') + '</span>' +
      '</div>' +

      // ── ケーススタディ（本番模試のみ・折りたたみ）
      (q.caseStudy
        ? '<details class="q-case" open>' +
          '  <summary class="q-case-summary">&#128203; ' + q.caseStudy.title + '（クリックで開閉）</summary>' +
          '  <div class="q-case-body">' + q.caseStudy.body + '</div>' +
          '</details>'
        : '') +

      // ── シナリオ
      (q.scenario
        ? '<div class="q-scenario"><strong>【シナリオ】</strong><br>' + q.scenario + '</div>'
        : '') +

      // ── 問い
      '<p class="q-text">' + q.question + '</p>' +

      // ── 選択肢
      '<div class="choices">' + choicesHtml + '</div>' +

      // ── 正誤バナー（初期非表示）
      '<div class="answer-banner" id="banner">' +
      '  <div class="banner-icon"  id="bannerIcon"></div>' +
      '  <div>' +
      '    <div class="banner-title" id="bannerTitle"></div>' +
      '    <div class="banner-correct-ans" id="bannerSub"></div>' +
      '  </div>' +
      '</div>' +

      // ── 解説（初期非表示）
      '<div class="explanation" id="explanation">' +
      '  <div class="exp-label">&#128218; 解説</div>' +
      '  ' + q.explanation +
      '</div>' +

      // ── ボタン行
      '<div class="btn-row">' +
      '  <button class="btn btn-prev" id="btnPrev" onclick="prevQuestion()"' +
      (isFirst ? ' disabled' : '') + '>&#8592; 前の問題</button>' +
      '  <span class="btn-spacer"></span>' +
      '  <button class="btn btn-back" onclick="goBack()">セット選択</button>' +
      '  <button class="btn btn-check" id="btnCheck" onclick="checkAnswer()" disabled>回答する</button>' +
      '  <button class="btn btn-next"  id="btnNext"  onclick="nextQuestion()">' +
      (isLast ? '結果を見る' : '次の問題 &rarr;') +
      '  </button>' +
      '</div>' +

      '</div>';

    // 回答済みなら状態を復元する
    if (isAnswered) {
      applyAnsweredState(q, prevAns, isLast);
    }
  }

  // ── 回答済み状態の適用（描画後に呼ぶ）──────────────────────────────────

  function applyAnsweredState(q, selected, isLast) {
    var isCorrect = selected === q.answer;

    // 選択肢スタイル
    q.choices.forEach(function (_, i) {
      var el = qs('c' + i);
      el.classList.add('locked');
      if (i === q.answer) {
        el.classList.add('correct');
        qs('icon' + i).textContent = '\u2705';
      } else if (i === selected && !isCorrect) {
        el.classList.add('wrong');
        qs('icon' + i).textContent = '\u274C';
      }
    });

    // バナー
    var banner = qs('banner');
    banner.classList.add('show');
    if (isCorrect) {
      banner.classList.add('correct-banner');
      qs('bannerIcon').textContent  = '\u2B50';
      qs('bannerTitle').textContent = '正解！ よくできました。';
      qs('bannerSub').innerHTML     = '';
    } else {
      banner.classList.add('wrong-banner');
      qs('bannerIcon').textContent  = '\u274C';
      qs('bannerTitle').textContent = '不正解';
      qs('bannerSub').innerHTML =
        '正解は <strong>' + LABELS[q.answer] + '：' + q.choices[q.answer] + '</strong> です。';
    }

    // 解説
    qs('explanation').classList.add('show');

    // ボタン切り替え
    qs('btnCheck').style.display = 'none';
    qs('btnNext').style.display  = 'inline-block';
  }

  // ── 選択肢クリック ──────────────────────────────────────────────────────

  window.selectChoice = function (i) {
    // 回答済みの問題は変更不可
    if (state.answers[state.current] !== undefined) return;

    document.querySelectorAll('.choice').forEach(function (el) {
      el.classList.remove('selected');
    });
    qs('c' + i).classList.add('selected');
    qs('btnCheck').disabled = false;

    // 一時的に選択を保持（未確定）
    qs('btnCheck')._pending = i;
  };

  // ── 回答確定 ────────────────────────────────────────────────────────────

  window.checkAnswer = function () {
    if (state.answers[state.current] !== undefined) return;

    var selected = qs('btnCheck')._pending;
    if (selected === undefined || selected === null) return;

    // answers に記録
    state.answers[state.current] = selected;
    updateProgress();
    saveProgress();

    var q      = state.activeSet.questions[state.current];
    var isLast = state.current === state.activeSet.questions.length - 1;
    applyAnsweredState(q, selected, isLast);
  };

  // ── ナビゲーション ──────────────────────────────────────────────────────

  window.nextQuestion = function () {
    var total = state.activeSet.questions.length;
    if (state.current >= total - 1) {
      // 最終問題が回答済みなら結果へ
      if (state.answers[state.current] !== undefined) {
        renderResult();
      }
      return;
    }
    state.current++;
    saveProgress();
    renderQuestion();
  };

  window.prevQuestion = function () {
    if (state.current <= 0) return;
    state.current--;
    saveProgress();
    renderQuestion();
  };

  window.goBack = function () {
    if (confirm('セット選択画面に戻りますか？（続きから再開できるよう進捗は保存されます）')) {
      state.activeSet = null;
      state.answers   = [];
      renderStart();
    }
  };

  // ── 結果画面 ────────────────────────────────────────────────────────────

  function renderResult() {
    window.scrollTo(0, 0);
    setProgressVisible(false);
    clearProgress(state.activeSet.id);

    var total   = state.activeSet.questions.length;
    var correct = getCorrectCount();
    var wrong   = getWrongCount();
    var pct     = Math.round((correct / total) * 100);
    var pass    = pct >= 70;

    qs('quizArea').innerHTML =
      '<div class="result-card">' +

      '<div class="result-set-label">' + state.activeSet.label + ' 結果</div>' +
      '<div class="result-pct">' + pct + '%</div>' +
      '<div class="result-title">' + correct + ' 問 / ' + total + ' 問 正解</div>' +
      '<div class="result-sub">合格ライン：70%（' + Math.ceil(total * 0.7) + '問以上正解）</div>' +

      '<div class="result-badge ' + (pass ? 'badge-pass' : 'badge-fail') + '">' +
      (pass ? '\u2705 合格ライン達成！' : '\u274C もう少し学習が必要です') +
      '</div>' +

      '<div class="result-stats">' +
      '  <div><div class="stat-num green">' + correct + '</div><div class="stat-label">正解</div></div>' +
      '  <div><div class="stat-num red">'   + wrong   + '</div><div class="stat-label">不正解</div></div>' +
      '</div>' +

      '<div class="result-actions">' +
      '  <button class="btn-action btn-review" onclick="reviewAnswers()">&#128270; 問題を見直す</button>' +
      '  <button class="btn-action btn-retry"  onclick="retrySet()">&#128260; もう一度</button>' +
      '  <button class="btn-action btn-home"   onclick="goHome()">&#127968; セット選択へ</button>' +
      '</div>' +

      '</div>';
  }

  // 見直しボタン：第1問から回答済み状態で表示
  window.reviewAnswers = function () {
    state.current = 0;
    setProgressVisible(true);
    renderQuestion();
  };

  window.retrySet = function () {
    startSet(state.activeSet.id);
  };

  window.goHome = function () {
    state.activeSet = null;
    state.answers   = [];
    renderStart();
  };

  // ── 起動 ───────────────────────────────────────────────────────────────
  renderStart();

})();

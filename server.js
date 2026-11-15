<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BOBOR-LINGUO — учи сербский</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦫</text></svg>">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  :root, [data-theme="dark"] {
    --bg: #0d1117; --bg2: #161b25; --card: #1c2333; --card2: #252d40;
    --border: #2d3549; --text: #eef2fa; --muted: #7d8ba5;
    --serbian: #c6363c; --serbian2: #e04a50;
    --blue: #3b82f6; --green: #10b981; --green2: #059669;
    --yellow: #f59e0b; --purple: #8b5cf6; --red: #ef4444; --gold: #fbbf24;
    --shadow: 0 8px 32px rgba(0,0,0,0.4);
    --input-bg: #252d40;
  }
  [data-theme="light"] {
    --bg: #f5f7fb; --bg2: #e8ecf3; --card: #ffffff; --card2: #eef1f7;
    --border: #d8dfea; --text: #1a2233; --muted: #6b7891;
    --serbian: #c6363c; --serbian2: #e04a50;
    --blue: #2563eb; --green: #059669; --green2: #047857;
    --yellow: #d97706; --purple: #7c3aed; --red: #dc2626; --gold: #d97706;
    --shadow: 0 8px 32px rgba(0,0,0,0.1);
    --input-bg: #f0f3f9;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
    background: var(--bg); color: var(--text); min-height: 100vh; line-height: 1.5;
    overflow-x: hidden; font-weight: 500; transition: background 0.3s, color 0.3s;
  }
  body::before {
    content: ''; position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 800px 600px at 20% -10%, rgba(198,54,60,0.15), transparent 60%),
      radial-gradient(ellipse 600px 500px at 100% 100%, rgba(139,92,246,0.1), transparent 60%);
    pointer-events: none; z-index: 0;
  }
  [data-theme="light"] body::before {
    background:
      radial-gradient(ellipse 800px 600px at 20% -10%, rgba(198,54,60,0.08), transparent 60%),
      radial-gradient(ellipse 600px 500px at 100% 100%, rgba(139,92,246,0.06), transparent 60%);
  }
  .app { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 20px 18px 120px; min-height: 100vh; }

  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; gap: 10px; position: sticky; top: 0; padding: 8px 0;
    background: linear-gradient(180deg, var(--bg) 60%, transparent); z-index: 10;
  }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.05rem; letter-spacing: -0.3px; cursor: pointer; }
  .brand-logo {
    width: 42px; height: 42px; border-radius: 12px;
    background: linear-gradient(135deg, var(--serbian), var(--serbian2));
    display: grid; place-items: center; font-size: 1.4rem;
    box-shadow: 0 4px 16px rgba(198,54,60,0.35);
  }
  .brand-name { display: flex; flex-direction: column; line-height: 1.1; }
  .brand-name span:first-child { font-size: 1rem; font-weight: 900; letter-spacing: 0.5px; }
  .brand-name span:last-child { font-size: 0.62rem; color: var(--muted); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
  .stats-group { display: flex; gap: 6px; align-items: center; }
  .stats-pill {
    display: flex; align-items: center; gap: 5px; background: var(--card);
    border: 1px solid var(--border); padding: 7px 12px; border-radius: 20px;
    font-size: 0.8rem; font-weight: 800;
  }
  .stats-pill .val { color: var(--yellow); }
  .stats-pill.streak .val { color: var(--serbian2); }
  .icon-btn {
    width: 38px; height: 38px; border-radius: 12px; background: var(--card);
    border: 1px solid var(--border); color: var(--text); cursor: pointer;
    display: grid; place-items: center; font-size: 1rem; transition: all 0.2s; font-family: inherit;
  }
  .icon-btn:hover { background: var(--card2); }

  .section-title { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.6px; margin-bottom: 6px; }
  .section-sub { color: var(--muted); font-size: 0.92rem; margin-bottom: 22px; }

  .menu-grid { display: flex; flex-direction: column; gap: 14px; }
  .menu-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    padding: 20px; display: flex; align-items: center; gap: 18px; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative; overflow: hidden;
  }
  .menu-card::before {
    content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;
    background: linear-gradient(90deg, var(--accent, var(--serbian)), transparent); pointer-events: none;
  }
  .menu-card:hover:not(.locked) { transform: translateY(-3px); border-color: var(--accent, var(--serbian)); box-shadow: var(--shadow); }
  .menu-card:hover:not(.locked)::before { opacity: 0.08; }
  .menu-icon {
    width: 60px; height: 60px; border-radius: 16px; display: grid; place-items: center;
    font-size: 1.8rem; flex-shrink: 0;
    background: var(--icon-bg, rgba(198,54,60,0.15)); border: 1px solid var(--icon-border, rgba(198,54,60,0.3));
  }
  .menu-content { flex: 1; min-width: 0; }
  .menu-content h3 { font-size: 1.05rem; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 3px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .menu-content p { color: var(--muted); font-size: 0.84rem; font-weight: 500; }
  .menu-arrow { color: var(--muted); font-size: 1.2rem; transition: transform 0.25s; }
  .menu-card:hover:not(.locked) .menu-arrow { transform: translateX(4px); color: var(--accent, var(--serbian)); }

  .back-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
  .back-btn {
    width: 44px; height: 44px; border-radius: 12px; background: var(--card);
    border: 1px solid var(--border); color: var(--text); cursor: pointer;
    display: grid; place-items: center; font-size: 1.1rem; transition: all 0.2s;
    flex-shrink: 0; font-family: inherit;
  }
  .back-btn:hover { background: var(--card2); }
  .progress-bar-outer { flex: 1; height: 16px; background: var(--card2); border-radius: 10px; overflow: hidden; position: relative; }
  .progress-bar-inner { height: 100%; background: linear-gradient(90deg, var(--serbian), var(--serbian2)); border-radius: 10px; transition: width 0.4s ease; position: relative; }
  .progress-bar-inner::after { content: ''; position: absolute; top: 3px; left: 8px; right: 8px; height: 3px; background: rgba(255,255,255,0.3); border-radius: 3px; }
  .progress-label { font-size: 0.8rem; font-weight: 700; color: var(--muted); min-width: 40px; text-align: right; }

  .tabs { display: flex; gap: 8px; margin-bottom: 20px; background: var(--card); padding: 6px; border-radius: 14px; border: 1px solid var(--border); }
  .tab { flex: 1; background: transparent; border: none; border-radius: 10px; padding: 10px 14px; font-size: 0.88rem; font-weight: 800; color: var(--muted); cursor: pointer; transition: all 0.2s; font-family: inherit; }
  .tab.active { background: var(--serbian); color: #fff; }

  .letter-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 10px; margin-bottom: 20px; }
  .letter-btn {
    aspect-ratio: 1; border-radius: 16px; background: var(--card); border: 2px solid var(--border);
    color: var(--text); font-size: 1.4rem; font-weight: 800; cursor: pointer;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 1px; position: relative; font-family: inherit;
  }
  .letter-btn .pair { font-size: 0.7rem; color: var(--muted); font-weight: 600; letter-spacing: 0.3px; }
  .letter-btn:hover { transform: translateY(-2px); border-color: var(--serbian); background: var(--card2); }
  .letter-btn.done { background: rgba(16,185,129,0.15); border-color: var(--green); color: var(--green); }
  .letter-btn.done .pair { color: var(--green); opacity: 0.7; }
  .letter-btn .check { position: absolute; top: -4px; right: -4px; width: 20px; height: 20px; background: var(--green); border-radius: 50%; display: grid; place-items: center; font-size: 0.65rem; color: #fff; border: 2px solid var(--bg); }

  .card-panel { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 28px; margin-bottom: 18px; box-shadow: var(--shadow); }
  .big-display { text-align: center; padding: 26px 20px; }
  .big-display .main-char { font-size: 4.5rem; font-weight: 900; line-height: 1; background: linear-gradient(135deg, var(--serbian), var(--serbian2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 4px; }
  .big-display .lat-char { font-size: 1.3rem; color: var(--blue); font-weight: 700; margin-bottom: 20px; }
  .example-box { background: var(--bg2); border-radius: 14px; padding: 16px 20px; text-align: left; margin-top: 16px; }
  .example-box .ex-word { font-size: 1.15rem; font-weight: 800; margin-bottom: 4px; }
  .example-box .ex-trans { color: var(--muted); font-size: 0.9rem; }
  .info-line { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); font-size: 0.95rem; }
  .info-line:last-child { border-bottom: none; }
  .info-line .k { color: var(--muted); font-weight: 600; }
  .info-line .v { font-weight: 700; text-align: right; }

  .btn { border: none; border-radius: 14px; padding: 14px 26px; font-size: 1rem; font-weight: 800; cursor: pointer; transition: all 0.2s; font-family: inherit; letter-spacing: -0.2px; }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .btn-primary { background: linear-gradient(135deg, var(--serbian), var(--serbian2)); color: #fff; box-shadow: 0 4px 20px rgba(198,54,60,0.4); }
  .btn-primary:hover:not(:disabled) { filter: brightness(1.1); }
  .btn-green { background: linear-gradient(135deg, var(--green), var(--green2)); color: #fff; box-shadow: 0 4px 20px rgba(16,185,129,0.35); }
  .btn-ghost { background: var(--card2); color: var(--text); }
  .btn-block { width: 100%; display: block; }
  .btn-row { display: flex; gap: 10px; margin-top: 16px; }
  .btn-row .btn { flex: 1; }

  .quiz-prompt { text-align: center; margin-bottom: 24px; }
  .quiz-prompt .q-word { font-size: 2rem; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 6px; }
  .quiz-prompt .q-sub { color: var(--muted); font-size: 0.88rem; font-weight: 600; }
  .quiz-prompt .q-transcr { color: var(--blue); font-size: 0.9rem; margin-top: 6px; font-weight: 600; }
  .quiz-options { display: flex; flex-direction: column; gap: 10px; }
  .quiz-opt {
    background: var(--card); border: 2px solid var(--border); border-radius: 14px;
    padding: 16px 20px; color: var(--text); font-size: 1rem; font-weight: 700;
    cursor: pointer; text-align: left; transition: all 0.15s; font-family: inherit;
  }
  .quiz-opt:hover:not(:disabled) { border-color: var(--serbian); background: var(--card2); }
  .quiz-opt.correct { background: rgba(16,185,129,0.15); border-color: var(--green); color: var(--green); }
  .quiz-opt.wrong { background: rgba(239,68,68,0.15); border-color: var(--red); color: var(--red); }
  .quiz-opt:disabled { cursor: default; }

  .fc { perspective: 1400px; height: 240px; cursor: pointer; margin-bottom: 18px; }
  .fc-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); transform-style: preserve-3d; }
  .fc.flipped .fc-inner { transform: rotateY(180deg); }
  .fc-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; border: 2px solid var(--border); }
  .fc-front { background: var(--card); }
  .fc-back { background: linear-gradient(135deg, #2a1f3d, #1e1830); border-color: rgba(139,92,246,0.4); transform: rotateY(180deg); }
  [data-theme="light"] .fc-back { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
  .fc-word { font-size: 2rem; font-weight: 900; letter-spacing: -0.5px; }
  .fc-sub { color: var(--muted); font-size: 0.85rem; margin-top: 10px; font-weight: 600; }

  .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 12px; }
  .cat-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 18px;
    padding: 18px 16px; cursor: pointer; transition: all 0.2s; text-align: left;
    color: var(--text); font-family: inherit; position: relative;
  }
  .cat-card:hover { transform: translateY(-2px); border-color: var(--accent, var(--serbian)); }
  .cat-card .cat-emoji { font-size: 1.6rem; margin-bottom: 8px; display: block; }
  .cat-card .cat-name { font-weight: 800; font-size: 0.92rem; margin-bottom: 2px; }
  .cat-card .cat-count { color: var(--muted); font-size: 0.78rem; font-weight: 600; }
  .cat-card .cat-check { position: absolute; top: 10px; right: 10px; width: 22px; height: 22px; border-radius: 50%; background: var(--green); color: #fff; display: grid; place-items: center; font-size: 0.7rem; font-weight: 800; }

  .word-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s; }
  .word-item:hover { border-color: var(--serbian); }
  .word-item .wi-main { font-weight: 800; font-size: 1.05rem; }
  .word-item .wi-tr { color: var(--blue); font-size: 0.8rem; font-weight: 600; margin-top: 2px; }
  .word-item .wi-ru { color: var(--muted); font-size: 0.9rem; font-weight: 600; text-align: right; }

  .grammar-topic { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 22px; margin-bottom: 16px; }
  .grammar-topic h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .grammar-topic .rule { background: var(--bg2); border-left: 3px solid var(--serbian); padding: 12px 16px; border-radius: 8px; margin: 10px 0; font-size: 0.9rem; line-height: 1.6; }
  .grammar-topic .rule b { color: var(--serbian2); }
  .grammar-topic .examples { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
  .grammar-topic .ex { font-size: 0.9rem; padding: 10px 14px; background: var(--bg2); border-radius: 8px; }
  .grammar-topic .ex .sr { font-weight: 700; }
  .grammar-topic .ex .ru { color: var(--muted); font-size: 0.82rem; }

  .dialogue-container { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
  .bubble { max-width: 82%; padding: 14px 18px; border-radius: 20px; font-size: 0.98rem; animation: bubbleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes bubbleIn { from { opacity: 0; transform: translateY(10px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .bubble.left { align-self: flex-start; background: var(--card2); border-bottom-left-radius: 6px; }
  .bubble.right { align-self: flex-end; background: linear-gradient(135deg, var(--serbian), var(--serbian2)); border-bottom-right-radius: 6px; color: #fff; }
  .bubble .b-sr { font-weight: 700; margin-bottom: 3px; }
  .bubble .b-ru { font-size: 0.85rem; opacity: 0.75; }

  .success-screen { text-align: center; padding: 40px 20px; }
  .success-screen .big-emoji { font-size: 4rem; margin-bottom: 16px; animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes pop { 0% { transform: scale(0) rotate(-180deg); } 100% { transform: scale(1) rotate(0); } }
  .success-screen h2 { font-size: 1.5rem; font-weight: 900; margin-bottom: 8px; }
  .success-screen p { color: var(--muted); margin-bottom: 24px; }

  .score-chips { display: flex; gap: 10px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
  .chip { background: var(--card2); padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; color: var(--muted); }
  .chip b { color: var(--text); }
  .chip.good b { color: var(--green); }
  .chip.bad b { color: var(--red); }

  /* ===== CHAT ===== */
  .chat-container {
    display: flex; flex-direction: column; height: calc(100vh - 220px); min-height: 420px;
    background: var(--card); border-radius: 20px; border: 1px solid var(--border);
    overflow: hidden;
  }
  .chat-header {
    padding: 14px 18px; background: var(--card2); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }
  .chat-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--serbian), var(--serbian2));
    display: grid; place-items: center; font-size: 1.4rem; flex-shrink: 0;
  }
  .chat-info h3 { font-size: 0.95rem; font-weight: 800; margin-bottom: 2px; }
  .chat-info p { font-size: 0.72rem; color: var(--green); font-weight: 700; display: flex; align-items: center; gap: 4px; }
  .chat-info p::before { content: '●'; font-size: 0.6rem; }
  .chat-info p.offline { color: var(--muted); }
  .chat-info p.offline::before { color: var(--muted); }

  .chat-messages {
    flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 12px;
  }
  .msg { max-width: 80%; padding: 12px 16px; border-radius: 18px; font-size: 0.95rem; animation: bubbleIn 0.3s; word-wrap: break-word; }
  .msg.bot { align-self: flex-start; background: var(--card2); border-bottom-left-radius: 6px; }
  .msg.user { align-self: flex-end; background: linear-gradient(135deg, var(--serbian), var(--serbian2)); border-bottom-right-radius: 6px; color: #fff; }
  .msg .m-sr { font-weight: 700; margin-bottom: 4px; }
  .msg .m-ru { font-size: 0.8rem; opacity: 0.7; font-style: italic; }
  .msg.user .m-ru { opacity: 0.85; }

  .chat-suggestions {
    padding: 10px 16px; display: flex; gap: 8px; overflow-x: auto; border-top: 1px solid var(--border);
    background: var(--card2);
  }
  .suggestion {
    background: var(--card); border: 1px solid var(--border); border-radius: 20px;
    padding: 8px 14px; font-size: 0.82rem; font-weight: 700; color: var(--text);
    cursor: pointer; white-space: nowrap; transition: all 0.2s; font-family: inherit;
  }
  .suggestion:hover { border-color: var(--serbian); }

  .chat-input-area {
    padding: 12px 16px; display: flex; gap: 10px; background: var(--card2);
    border-top: 1px solid var(--border);
  }
  .chat-input {
    flex: 1; background: var(--card); border: 2px solid var(--border); border-radius: 14px;
    padding: 12px 18px; color: var(--text); font-size: 1rem; outline: none;
    font-family: inherit; font-weight: 600;
  }
  .chat-input:focus { border-color: var(--serbian); }
  .chat-send {
    background: linear-gradient(135deg, var(--serbian), var(--serbian2)); border: none;
    width: 48px; height: 48px; border-radius: 14px; color: #fff; font-size: 1.2rem;
    cursor: pointer; display: grid; place-items: center; flex-shrink: 0; transition: all 0.2s;
  }
  .chat-send:hover { filter: brightness(1.1); }
  .chat-send:active { transform: scale(0.95); }
  .chat-typing { display: flex; gap: 4px; padding: 14px 18px; background: var(--card2); border-radius: 18px; border-bottom-left-radius: 6px; align-self: flex-start; }
  .chat-typing span { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); animation: typing 1.4s infinite; }
  .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
  .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }

  /* ===== AUTH ===== */
  .auth-screen {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 20px; position: relative; z-index: 1;
  }
  .auth-box {
    width: 100%; max-width: 400px; background: var(--card); border: 1px solid var(--border);
    border-radius: 24px; padding: 36px 28px; box-shadow: var(--shadow);
  }
  .auth-logo {
    display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 28px;
  }
  .auth-logo-big {
    width: 72px; height: 72px; border-radius: 20px;
    background: linear-gradient(135deg, var(--serbian), var(--serbian2));
    display: grid; place-items: center; font-size: 2.4rem;
    box-shadow: 0 8px 24px rgba(198,54,60,0.4);
  }
  .auth-logo h1 { font-size: 1.4rem; font-weight: 900; letter-spacing: 0.5px; }
  .auth-logo p { color: var(--muted); font-size: 0.85rem; font-weight: 600; }
  .auth-tabs { display: flex; gap: 6px; margin-bottom: 20px; background: var(--bg2); padding: 5px; border-radius: 12px; }
  .auth-tab { flex: 1; background: transparent; border: none; padding: 9px; border-radius: 8px; color: var(--muted); font-weight: 800; font-size: 0.85rem; cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .auth-tab.active { background: var(--serbian); color: #fff; }
  .auth-form { display: flex; flex-direction: column; gap: 12px; }
  .auth-input {
    background: var(--input-bg); border: 2px solid var(--border); border-radius: 12px;
    padding: 13px 16px; color: var(--text); font-size: 0.95rem; outline: none;
    font-family: inherit; font-weight: 600; transition: border 0.2s;
  }
  .auth-input:focus { border-color: var(--serbian); }
  .auth-error { color: var(--red); font-size: 0.82rem; font-weight: 700; text-align: center; min-height: 18px; }
  .auth-hint { color: var(--muted); font-size: 0.75rem; text-align: center; margin-top: 12px; line-height: 1.5; }

  /* ===== SETTINGS ===== */
  .settings-section {
    background: var(--card); border: 1px solid var(--border); border-radius: 18px;
    padding: 20px; margin-bottom: 16px;
  }
  .settings-section h3 {
    font-size: 0.95rem; font-weight: 800; margin-bottom: 14px; display: flex;
    align-items: center; gap: 8px; color: var(--text);
  }
  .settings-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 0; border-bottom: 1px solid var(--border);
  }
  .settings-row:last-child { border-bottom: none; }
  .settings-row .label { font-size: 0.9rem; font-weight: 700; }
  .settings-row .desc { font-size: 0.75rem; color: var(--muted); margin-top: 2px; }
  .segmented { display: flex; gap: 4px; background: var(--bg2); padding: 4px; border-radius: 10px; }
  .segmented button {
    background: transparent; border: none; padding: 7px 12px; border-radius: 7px;
    color: var(--muted); font-weight: 800; font-size: 0.78rem; cursor: pointer; font-family: inherit;
    transition: all 0.2s; display: flex; align-items: center; gap: 5px;
  }
  .segmented button.active { background: var(--serbian); color: #fff; }
  .select-input {
    background: var(--input-bg); border: 2px solid var(--border); border-radius: 10px;
    padding: 8px 14px; color: var(--text); font-size: 0.85rem; font-weight: 700;
    font-family: inherit; cursor: pointer; outline: none;
  }

  .hidden { display: none !important; }
  ::-webkit-scrollbar { width: 8px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .slide-in { animation: slideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
  .shake { animation: shake 0.3s; }

  @media (max-width: 480px) {
    .app { padding: 16px 14px 100px; }
    .section-title { font-size: 1.4rem; }
    .card-panel { padding: 20px; }
    .letter-grid { grid-template-columns: repeat(auto-fill, minmax(58px, 1fr)); }
    .letter-btn { font-size: 1.1rem; }
    .big-display .main-char { font-size: 3.5rem; }
    .menu-icon { width: 52px; height: 52px; font-size: 1.5rem; }
    .menu-content h3 { font-size: 0.98rem; }
    .stats-pill { padding: 6px 10px; font-size: 0.75rem; }
    .chat-container { height: calc(100vh - 180px); }
    .brand-name span:first-child { font-size: 0.85rem; }
  }
</style>
</head>
<body>
<div id="root"></div>

<script>
/* ============================================================
   АЛФАВИТ (заглавные + строчные, кириллица + латиница)
   ============================================================ */
const ALPHABET = [
  { cyr: "А", cyrSm: "а", lat: "A", latSm: "a", sound: "а", ex: "ауто", exRu: "машина" },
  { cyr: "Б", cyrSm: "б", lat: "B", latSm: "b", sound: "б", ex: "брат", exRu: "брат" },
  { cyr: "В", cyrSm: "в", lat: "V", latSm: "v", sound: "в", ex: "вода", exRu: "вода" },
  { cyr: "Г", cyrSm: "г", lat: "G", latSm: "g", sound: "г", ex: "град", exRu: "город" },
  { cyr: "Д", cyrSm: "д", lat: "D", latSm: "d", sound: "д", ex: "дан", exRu: "день" },
  { cyr: "Ђ", cyrSm: "ђ", lat: "Đ", latSm: "đ", sound: "джь", ex: "ђак", exRu: "школьник" },
  { cyr: "Е", cyrSm: "е", lat: "E", latSm: "e", sound: "э", ex: "економија", exRu: "экономия" },
  { cyr: "Ж", cyrSm: "ж", lat: "Ž", latSm: "ž", sound: "ж", ex: "живот", exRu: "жизнь" },
  { cyr: "З", cyrSm: "з", lat: "Z", latSm: "z", sound: "з", ex: "земља", exRu: "земля" },
  { cyr: "И", cyrSm: "и", lat: "I", latSm: "i", sound: "и", ex: "име", exRu: "имя" },
  { cyr: "Ј", cyrSm: "ј", lat: "J", latSm: "j", sound: "й", ex: "ја", exRu: "я" },
  { cyr: "К", cyrSm: "к", lat: "K", latSm: "k", sound: "к", ex: "кућа", exRu: "дом" },
  { cyr: "Л", cyrSm: "л", lat: "L", latSm: "l", sound: "л", ex: "лепо", exRu: "красиво" },
  { cyr: "Љ", cyrSm: "љ", lat: "Lj", latSm: "lj", sound: "ль", ex: "љубав", exRu: "любовь" },
  { cyr: "М", cyrSm: "м", lat: "M", latSm: "m", sound: "м", ex: "мама", exRu: "мама" },
  { cyr: "Н", cyrSm: "н", lat: "N", latSm: "n", sound: "н", ex: "нас", exRu: "нас" },
  { cyr: "Њ", cyrSm: "њ", lat: "Nj", latSm: "nj", sound: "нь", ex: "њива", exRu: "поле" },
  { cyr: "О", cyrSm: "о", lat: "O", latSm: "o", sound: "о", ex: "око", exRu: "глаз" },
  { cyr: "П", cyrSm: "п", lat: "P", latSm: "p", sound: "п", ex: "пет", exRu: "пять" },
  { cyr: "Р", cyrSm: "р", lat: "R", latSm: "r", sound: "р", ex: "рука", exRu: "рука" },
  { cyr: "С", cyrSm: "с", lat: "S", latSm: "s", sound: "с", ex: "сунце", exRu: "солнце" },
  { cyr: "Т", cyrSm: "т", lat: "T", latSm: "t", sound: "т", ex: "тата", exRu: "папа" },
  { cyr: "Ћ", cyrSm: "ћ", lat: "Ć", latSm: "ć", sound: "чь", ex: "ћерка", exRu: "дочь" },
  { cyr: "У", cyrSm: "у", lat: "U", latSm: "u", sound: "у", ex: "ухо", exRu: "ухо" },
  { cyr: "Ф", cyrSm: "ф", lat: "F", latSm: "f", sound: "ф", ex: "филм", exRu: "фильм" },
  { cyr: "Х", cyrSm: "х", lat: "H", latSm: "h", sound: "х", ex: "хлеб", exRu: "хлеб" },
  { cyr: "Ц", cyrSm: "ц", lat: "C", latSm: "c", sound: "ц", ex: "цвет", exRu: "цветок" },
  { cyr: "Ч", cyrSm: "ч", lat: "Č", latSm: "č", sound: "ч", ex: "чај", exRu: "чай" },
  { cyr: "Џ", cyrSm: "џ", lat: "Dž", latSm: "dž", sound: "дж", ex: "џем", exRu: "джем" },
  { cyr: "Ш", cyrSm: "ш", lat: "Š", latSm: "š", sound: "ш", ex: "школа", exRu: "школа" }
];

const VOCAB = {
  greetings: { name: "Приветствия", emoji: "👋", color: "#3b82f6", words: [
    { sr: "Здраво", tr: "[zdravo]", ru: "Привет" },
    { sr: "Добар дан", tr: "[dobar dan]", ru: "Добрый день" },
    { sr: "Добро јутро", tr: "[dobro jutro]", ru: "Доброе утро" },
    { sr: "Добро вече", tr: "[dobro veče]", ru: "Добрый вечер" },
    { sr: "Лаку ноћ", tr: "[laku noć]", ru: "Спокойной ночи" },
    { sr: "Довиђења", tr: "[doviđenja]", ru: "До свидания" },
    { sr: "Видимо се", tr: "[vidimo se]", ru: "Увидимся" },
    { sr: "Како си?", tr: "[kako si?]", ru: "Как ты?" },
    { sr: "Добро сам", tr: "[dobro sam]", ru: "Я в порядке" },
    { sr: "Хвала", tr: "[hvala]", ru: "Спасибо" },
    { sr: "Молим", tr: "[molim]", ru: "Пожалуйста" },
    { sr: "Извини", tr: "[izvini]", ru: "Извини" }
  ]},
  politeness: { name: "Вежливость", emoji: "🙏", color: "#8b5cf6", words: [
    { sr: "Извините", tr: "[izvinite]", ru: "Извините" },
    { sr: "Опростите", tr: "[oprostite]", ru: "Простите" },
    { sr: "Нема на чему", tr: "[nema na čemu]", ru: "Не за что" },
    { sr: "Хвала пуно", tr: "[hvala puno]", ru: "Большое спасибо" },
    { sr: "Изволите", tr: "[izvolite]", ru: "Пожалуйста (при передаче)" },
    { sr: "Са задовољством", tr: "[sa zadovoljstvom]", ru: "С удовольствием" },
    { sr: "Жао ми је", tr: "[žao mi je]", ru: "Мне жаль" },
    { sr: "Нема проблема", tr: "[nema problema]", ru: "Нет проблем" }
  ]},
  numbers: { name: "Числа", emoji: "🔢", color: "#10b981", words: [
    { sr: "Један", tr: "[jedan]", ru: "Один" },
    { sr: "Два", tr: "[dva]", ru: "Два" },
    { sr: "Три", tr: "[tri]", ru: "Три" },
    { sr: "Четири", tr: "[četiri]", ru: "Четыре" },
    { sr: "Пет", tr: "[pet]", ru: "Пять" },
    { sr: "Шест", tr: "[šest]", ru: "Шесть" },
    { sr: "Седам", tr: "[sedam]", ru: "Семь" },
    { sr: "Осам", tr: "[osam]", ru: "Восемь" },
    { sr: "Девет", tr: "[devet]", ru: "Девять" },
    { sr: "Десет", tr: "[deset]", ru: "Десять" }
  ]},
  colors: { name: "Цвета", emoji: "🎨", color: "#a855f7", words: [
    { sr: "Црвена", tr: "[crvena]", ru: "Красный" },
    { sr: "Плава", tr: "[plava]", ru: "Синий" },
    { sr: "Зелена", tr: "[zelena]", ru: "Зелёный" },
    { sr: "Жута", tr: "[žuta]", ru: "Жёлтый" },
    { sr: "Црна", tr: "[crna]", ru: "Чёрный" },
    { sr: "Бела", tr: "[bela]", ru: "Белый" }
  ]},
  family: { name: "Семья", emoji: "👨‍👩‍👧", color: "#ec4899", words: [
    { sr: "Мама", tr: "[mama]", ru: "Мама" },
    { sr: "Тата", tr: "[tata]", ru: "Папа" },
    { sr: "Брат", tr: "[brat]", ru: "Брат" },
    { sr: "Сестра", tr: "[sestra]", ru: "Сестра" },
    { sr: "Син", tr: "[sin]", ru: "Сын" },
    { sr: "Ћерка", tr: "[ćerka]", ru: "Дочь" }
  ]},
  food: { name: "Еда", emoji: "🍽️", color: "#f59e0b", words: [
    { sr: "Вода", tr: "[voda]", ru: "Вода" },
    { sr: "Хлеб", tr: "[hleb]", ru: "Хлеб" },
    { sr: "Млеко", tr: "[mleko]", ru: "Молоко" },
    { sr: "Кафа", tr: "[kafa]", ru: "Кофе" },
    { sr: "Чај", tr: "[čaj]", ru: "Чай" },
    { sr: "Вино", tr: "[vino]", ru: "Вино" },
    { sr: "Месо", tr: "[meso]", ru: "Мясо" },
    { sr: "Риба", tr: "[riba]", ru: "Рыба" }
  ]},
  travel: { name: "Путешествия", emoji: "✈️", color: "#06b6d4", words: [
    { sr: "Аеродром", tr: "[aerodrom]", ru: "Аэропорт" },
    { sr: "Станица", tr: "[stanica]", ru: "Станция" },
    { sr: "Воз", tr: "[voz]", ru: "Поезд" },
    { sr: "Аутобус", tr: "[autobus]", ru: "Автобус" },
    { sr: "Карта", tr: "[karta]", ru: "Билет" },
    { sr: "Хотел", tr: "[hotel]", ru: "Отель" },
    { sr: "Град", tr: "[grad]", ru: "Город" },
    { sr: "Улица", tr: "[ulica]", ru: "Улица" }
  ]},
  verbs: { name: "Глаголы", emoji: "🏃", color: "#6366f1", words: [
    { sr: "Бити", tr: "[biti]", ru: "Быть" },
    { sr: "Имати", tr: "[imati]", ru: "Иметь" },
    { sr: "Радити", tr: "[raditi]", ru: "Работать" },
    { sr: "Говорити", tr: "[govoriti]", ru: "Говорить" },
    { sr: "Знати", tr: "[znati]", ru: "Знать" },
    { sr: "Моћи", tr: "[moći]", ru: "Мочь" },
    { sr: "Хтети", tr: "[hteti]", ru: "Хотеть" },
    { sr: "Ићи", tr: "[ići]", ru: "Идти" }
  ]},
  questions: { name: "Вопросы", emoji: "❓", color: "#0ea5e9", words: [
    { sr: "Шта", tr: "[šta]", ru: "Что" },
    { sr: "Ко", tr: "[ko]", ru: "Кто" },
    { sr: "Где", tr: "[gde]", ru: "Где" },
    { sr: "Када", tr: "[kada]", ru: "Когда" },
    { sr: "Зашто", tr: "[zašto]", ru: "Почему" },
    { sr: "Како", tr: "[kako]", ru: "Как" },
    { sr: "Колико", tr: "[koliko]", ru: "Сколько" },
    { sr: "Одакле", tr: "[odakle]", ru: "Откуда" }
  ]}
};

const GRAMMAR = [
  { id: "pronouns", title: "Личные местоимения", icon: "👤",
    rules: [{ text: "В сербском 7 падежей. Начнём с именительного." }],
    table: [["ја","я"],["ти","ты"],["он","он"],["она","она"],["ми","мы"],["ви","вы"],["они","они"]],
    examples: [
      { sr: "Ја сам студент.", ru: "Я студент." },
      { sr: "Ти си добар.", ru: "Ты хороший." },
      { sr: "Ми смо пријатељи.", ru: "Мы друзья." }
    ]
  },
  { id: "biti", title: "Глагол «бити»", icon: "🔗",
    rules: [{ text: "Самый важный глагол — «быть»." }],
    table: [["ја сам","я есть"],["ти си","ты есть"],["он је","он есть"],["ми смо","мы есть"],["ви сте","вы есть"],["они су","они есть"]],
    examples: [
      { sr: "Ја сам из Русије.", ru: "Я из России." },
      { sr: "Она је лекар.", ru: "Она врач." },
      { sr: "Они су код куће.", ru: "Они дома." }
    ]
  },
  { id: "gender", title: "Род существительных", icon: "⚧️",
    rules: [
      { text: "Мужской род — на согласную (град)." },
      { text: "Женский — на -а (жена)." },
      { text: "Средний — на -о/-е (село)." }
    ],
    examples: [
      { sr: "Велики град", ru: "Большой город (м.р.)" },
      { sr: "Велика кућа", ru: "Большой дом (ж.р.)" },
      { sr: "Велико село", ru: "Большое село (с.р.)" }
    ]
  },
  { id: "negation", title: "Отрицание", icon: "🚫",
    rules: [{ text: "Отрицание — частица «не» перед глаголом. Бити: нисам, ниси, није, нисмо, нисте, нису." }],
    examples: [
      { sr: "Не знам.", ru: "Не знаю." },
      { sr: "Не разумем.", ru: "Не понимаю." },
      { sr: "Он није ту.", ru: "Он не здесь." }
    ]
  },
  { id: "questions", title: "Вопросы", icon: "❓",
    rules: [{ text: "Вопросительные слова: шта, ко, где, када, зашто, како, колико." }],
    examples: [
      { sr: "Шта је ово?", ru: "Что это?" },
      { sr: "Где је станица?", ru: "Где станция?" },
      { sr: "Како се зовеш?", ru: "Как тебя зовут?" }
    ]
  }
];

const DIALOGUES = [
  { id: "meet", title: "Знакомство", icon: "🤝",
    lines: [
      { sr: "Здраво! Како се зовеш?", ru: "Привет! Как тебя зовут?" },
      { sr: "Зовем се Марко. А ти?", ru: "Меня зовут Марко. А тебя?" },
      { sr: "Ја сам Ана. Драго ми је.", ru: "Я Ана. Приятно познакомиться." },
      { sr: "Драго ми је, Ана. Одакле си?", ru: "Приятно, Ана. Откуда ты?" },
      { sr: "Из Русије сам. А ти?", ru: "Из России. А ты?" },
      { sr: "Ја сам из Србије.", ru: "Я из Сербии." }
    ],
    quiz: [
      { q: "«Зовем се Марко» значит...", options: ["Меня зовут Марко","Я знаю Марко","Я вижу Марко","Марко зовёт"], correct: 0 },
      { q: "«Одакле си?» значит...", options: ["Как дела?","Откуда ты?","Где ты?","Кто ты?"], correct: 1 },
      { q: "«Драго ми је» — это...", options: ["Мне дорого","Приятно познакомиться","Я рад","Мне жаль"], correct: 1 }
    ]
  },
  { id: "cafe", title: "В кафе", icon: "☕",
    lines: [
      { sr: "Добар дан! Шта желите?", ru: "Добрый день! Что желаете?" },
      { sr: "Молим Вас једну кафу.", ru: "Одну кофе, пожалуйста." },
      { sr: "Са млеком или без?", ru: "С молоком или без?" },
      { sr: "Са млеком, молим.", ru: "С молоком, пожалуйста." },
      { sr: "Изволите. Још нешто?", ru: "Пожалуйста. Что-нибудь ещё?" },
      { sr: "Не, хвала. Колико кошта?", ru: "Нет, спасибо. Сколько стоит?" }
    ],
    quiz: [
      { q: "«Колико кошта?» значит...", options: ["Как дела?","Сколько стоит?","Что это?","Где это?"], correct: 1 },
      { q: "«Са млеком» — это...", options: ["без молока","с молоком","молоко","пожалуйста молоко"], correct: 1 },
      { q: "«Још нешто?» — это...", options: ["Ещё что-то?","Это не то","Ничего","Всё хорошо"], correct: 0 }
    ]
  }
];

/* ============================================================
   СОСТОЯНИЕ
   ============================================================ */
const state = {
  screen: "auth",
  authMode: "login",
  user: null,
  settings: { theme: "dark", lang: "ru" },
  xp: 0,
  streak: 0,
  learnedLetters: new Set(),
  learnedGaeva: new Set(),
  learnedWords: new Set(),
  currentLetter: null,
  currentGaeva: null,
  currentCat: null,
  currentGrammar: null,
  currentDialogue: null,
  alphabetTab: "cyr",
  quizIdx: 0,
  quizCorrect: 0,
  quizWrong: 0,
  quizAnswered: false,
  cardOrder: [],
  cardIdx: 0,
  vocabMode: "cards",
  chatHistory: [],
  chatTyping: false,
  chatOnline: false
};

/* ============================================================
   ПЕРСИСТЕНТНОСТЬ
   ============================================================ */
function saveState() {
  try {
    localStorage.setItem("bobor_state", JSON.stringify({
      user: state.user,
      settings: state.settings,
      xp: state.xp,
      streak: state.streak,
      learnedLetters: [...state.learnedLetters],
      learnedGaeva: [...state.learnedGaeva],
      learnedWords: [...state.learnedWords],
      chatHistory: state.chatHistory.slice(-30)
    }));
  } catch (e) { console.warn("Save failed", e); }
}

function loadState() {
  try {
    const raw = localStorage.getItem("bobor_state");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.user) state.user = data.user;
    if (data.settings) state.settings = { ...state.settings, ...data.settings };
    state.xp = data.xp || 0;
    state.streak = data.streak || 0;
    state.learnedLetters = new Set(data.learnedLetters || []);
    state.learnedGaeva = new Set(data.learnedGaeva || []);
    state.learnedWords = new Set(data.learnedWords || []);
    state.chatHistory = data.chatHistory || [];
    if (state.user) state.screen = "home";
  } catch (e) { console.warn("Load failed", e); }
}

/* ============================================================
   УТИЛИТЫ
   ============================================================ */
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (k === "style") e.setAttribute("style", v);
    else e.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c === null || c === undefined || c === false) return;
    if (typeof c === "string" || typeof c === "number") e.appendChild(document.createTextNode(String(c)));
    else e.appendChild(c);
  });
  return e;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.settings.theme);
}

/* ============================================================
   РОУТЕР
   ============================================================ */
const root = document.getElementById("root");

function render() {
  root.innerHTML = "";
  applyTheme();
  
  if (!state.user && state.screen !== "auth") state.screen = "auth";
  
  const screens = {
    auth: renderAuth,
    home: renderHome,
    alphabet: renderAlphabet,
    "alphabet-letter": renderLetter,
    "gaeva-letter": renderGaevaLetter,
    grammar: renderGrammar,
    "grammar-topic": renderGrammarTopic,
    vocab: renderVocab,
    "vocab-cat": renderVocabCat,
    "vocab-learn": renderVocabLearn,
    dialogues: renderDialogues,
    dialogue: renderDialogue,
    "dialogue-quiz": renderDialogueQuiz,
    chat: renderChat,
    settings: renderSettings
  };
  
  const fn = screens[state.screen];
  if (fn) {
    try { fn(); } catch (err) {
      console.error("Render error:", err);
      state.screen = "home"; renderHome();
    }
  } else {
    renderHome();
  }
}

/* ============================================================
   TOPBAR
   ============================================================ */
function renderTopbar() {
  return el("div", { class: "topbar" }, [
    el("div", { class: "brand", onclick: () => { state.screen = "home"; render(); } }, [
      el("div", { class: "brand-logo", html: "🦫" }),
      el("div", { class: "brand-name" }, [
        el("span", {}, "BOBOR"),
        el("span", {}, "LINGUO")
      ])
    ]),
    el("div", { class: "stats-group" }, [
      el("div", { class: "stats-pill streak", title: "Серия" }, [
        el("span", { html: "🔥" }), el("span", { class: "val" }, String(state.streak))
      ]),
      el("div", { class: "stats-pill", title: "Опыт" }, [
        el("span", { html: "⚡" }), el("span", { class: "val" }, String(state.xp))
      ]),
      el("button", { class: "icon-btn", title: "Настройки", html: "⚙️", onclick: () => { state.screen = "settings"; render(); } })
    ])
  ]);
}

function renderBackBar(title, cur, total, onBack) {
  const pct = total > 0 ? (cur / total) * 100 : 0;
  const bar = el("div", { class: "back-bar" });
  bar.appendChild(el("button", { class: "back-btn", html: "←", onclick: onBack }));
  if (total > 0) {
    bar.appendChild(el("div", { class: "progress-bar-outer" }, [
      el("div", { class: "progress-bar-inner", style: `width: ${pct}%;` })
    ]));
    bar.appendChild(el("span", { class: "progress-label" }, `${cur}/${total}`));
  } else if (title) {
    bar.appendChild(el("div", { style: "flex:1;text-align:center;font-weight:800;", html: title }));
  }
  return bar;
}

/* ============================================================
   АВТОРИЗАЦИЯ
   ============================================================ */
function renderAuth() {
  const isLogin = state.authMode === "login";
  const wrap = el("div", { class: "auth-screen" });
  wrap.appendChild(el("div", { class: "auth-box" }, [
    el("div", { class: "auth-logo" }, [
      el("div", { class: "auth-logo-big", html: "🦫" }),
      el("h1", {}, "BOBOR-LINGUO"),
      el("p", {}, "Учи сербский с бобром")
    ]),
    el("div", { class: "auth-tabs" }, [
      el("button", {
        class: "auth-tab" + (isLogin ? " active" : ""),
        onclick: () => { state.authMode = "login"; render(); }
      }, "Вход"),
      el("button", {
        class: "auth-tab" + (!isLogin ? " active" : ""),
        onclick: () => { state.authMode = "register"; render(); }
      }, "Регистрация")
    ]),
    el("form", {
      class: "auth-form",
      onsubmit: (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const password = e.target.password.value;
        if (!username || password.length < 4) {
          document.getElementById("authError").textContent = "Логин не пуст, пароль от 4 символов";
          return;
        }
        state.user = { username, created: Date.now() };
        saveState();
        state.screen = "home";
        render();
      }
    }, [
      el("input", { class: "auth-input", name: "username", placeholder: "Логин", required: "true", autocomplete: "username" }),
      el("input", { class: "auth-input", name: "password", type: "password", placeholder: "Пароль (мин. 4)", required: "true", autocomplete: isLogin ? "current-password" : "new-password" }),
      el("div", { class: "auth-error", id: "authError" }),
      el("button", { class: "btn btn-primary btn-block", type: "submit" }, isLogin ? "Войти" : "Создать аккаунт")
    ]),
    el("p", { class: "auth-hint", html: "Демо-авторизация: данные хранятся в вашем браузере (localStorage)." })
  ]));
  root.appendChild(wrap);
}

/* ============================================================
   ГЛАВНАЯ
   ============================================================ */
function renderHome() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("h1", { class: "section-title" }, "Привет, " + state.user.username + "!"));
  app.appendChild(el("p", { class: "section-sub" }, "Продолжай учить сербский"));
  
  const items = [
    { id: "alphabet", icon: "🔤", title: "Алфавит", desc: `Кириллица и гаевица · ${state.learnedLetters.size + state.learnedGaeva.size}/60`, color: "#3b82f6" },
    { id: "grammar", icon: "📐", title: "Грамматика", desc: `${GRAMMAR.length} тем`, color: "#8b5cf6" },
    { id: "vocab", icon: "📚", title: "Слова", desc: `${Object.keys(VOCAB).length} категорий`, color: "#10b981" },
    { id: "dialogues", icon: "💬", title: "Диалоги", desc: `${DIALOGUES.length} ситуаций`, color: "#f59e0b" },
    { id: "chat", icon: "🦫", title: "Чат с Марко", desc: "Настоящая нейросеть на сербском", color: "#ec4899" }
  ];
  
  const menu = el("div", { class: "menu-grid" });
  items.forEach(item => {
    menu.appendChild(el("div", {
      class: "menu-card",
      style: `--accent: ${item.color}; --icon-bg: ${item.color}22; --icon-border: ${item.color}55;`,
      onclick: () => { state.screen = item.id; render(); }
    }, [
      el("div", { class: "menu-icon", html: item.icon }),
      el("div", { class: "menu-content" }, [
        el("h3", {}, item.title),
        el("p", {}, item.desc)
      ]),
      el("span", { class: "menu-arrow", html: "→" })
    ]));
  });
  app.appendChild(menu);
  root.appendChild(app);
}

/* ============================================================
   АЛФАВИТ
   ============================================================ */
function renderAlphabet() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Алфавит"));
  app.appendChild(el("p", { class: "section-sub" }, "Сербский алфавит: кириллица и латиница"));
  
  const tabs = el("div", { class: "tabs" }, [
    el("button", {
      class: "tab" + (state.alphabetTab === "cyr" ? " active" : ""),
      onclick: () => { state.alphabetTab = "cyr"; render(); }
    }, `Кириллица · ${state.learnedLetters.size}/30`),
    el("button", {
      class: "tab" + (state.alphabetTab === "lat" ? " active" : ""),
      onclick: () => { state.alphabetTab = "lat"; render(); }
    }, `Гаевица · ${state.learnedGaeva.size}/30`)
  ]);
  app.appendChild(tabs);
  
  const isCyr = state.alphabetTab === "cyr";
  const grid = el("div", { class: "letter-grid" });
  
  ALPHABET.forEach(a => {
    const done = isCyr ? state.learnedLetters.has(a.cyr) : state.learnedGaeva.has(a.lat);
    const mainChar = isCyr ? a.cyr + a.cyrSm : a.lat + a.latSm;
    const pairChar = isCyr ? a.lat + a.latSm : a.cyr + a.cyrSm;
    grid.appendChild(el("button", {
      class: "letter-btn" + (done ? " done" : ""),
      onclick: () => {
        if (isCyr) { state.currentLetter = a; state.screen = "alphabet-letter"; }
        else { state.currentGaeva = a; state.screen = "gaeva-letter"; }
        render();
      }
    }, [
      el("span", { style: isCyr ? "" : "font-size: 1rem; line-height: 1.2; text-align: center;" }, mainChar),
      el("span", { class: "pair", style: isCyr ? "" : "font-size: 0.75rem;" }, pairChar),
      done ? el("span", { class: "check", html: "✓" }) : null
    ]));
  });
  app.appendChild(grid);
  root.appendChild(app);
}

function renderLetter() {
  const a = state.currentLetter;
  if (!a) { state.screen = "alphabet"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(renderBackBar("", 0, 0, () => { state.screen = "alphabet"; render(); }));
  app.appendChild(el("div", { class: "card-panel" }, [
    el("div", { class: "big-display" }, [
      el("div", { class: "main-char" }, a.cyr + " " + a.cyrSm),
      el("div", { class: "lat-char" }, `${a.lat} ${a.latSm} · звук [${a.sound}]`),
      el("div", { class: "example-box" }, [
        el("div", { class: "ex-word" }, a.ex),
        el("div", { class: "ex-trans" }, a.exRu)
      ])
    ])
  ]));
  const done = state.learnedLetters.has(a.cyr);
  app.appendChild(el("button", {
    class: "btn " + (done ? "btn-green" : "btn-primary") + " btn-block",
    onclick: () => {
      if (!done) { state.learnedLetters.add(a.cyr); state.xp += 3; saveState(); }
      state.screen = "alphabet"; render();
    }
  }, done ? "✓ Уже выучено" : "✓ Выучил (+3 XP)"));
  root.appendChild(app);
}

function renderGaevaLetter() {
  const a = state.currentGaeva;
  if (!a) { state.screen = "alphabet"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(renderBackBar("", 0, 0, () => { state.screen = "alphabet"; render(); }));
  app.appendChild(el("div", { class: "card-panel" }, [
    el("div", { class: "big-display" }, [
      el("div", { class: "main-char" }, a.lat + " " + a.latSm),
      el("div", { class: "lat-char" }, `${a.cyr} ${a.cyrSm} · звук [${a.sound}]`),
      el("div", { class: "example-box" }, [
        el("div", { class: "ex-word" }, a.ex),
        el("div", { class: "ex-trans" }, a.exRu)
      ])
    ])
  ]));
  const done = state.learnedGaeva.has(a.lat);
  app.appendChild(el("button", {
    class: "btn " + (done ? "btn-green" : "btn-primary") + " btn-block",
    onclick: () => {
      if (!done) { state.learnedGaeva.add(a.lat); state.xp += 3; saveState(); }
      state.screen = "alphabet"; render();
    }
  }, done ? "✓ Уже выучено" : "✓ Выучил (+3 XP)"));
  root.appendChild(app);
}

/* ============================================================
   ГРАММАТИКА
   ============================================================ */
function renderGrammar() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Грамматика"));
  app.appendChild(el("p", { class: "section-sub" }, `${GRAMMAR.length} тем`));
  
  GRAMMAR.forEach(topic => {
    app.appendChild(el("div", {
      class: "menu-card",
      style: "--accent: #8b5cf6; --icon-bg: rgba(139,92,246,0.15); --icon-border: rgba(139,92,246,0.3);",
      onclick: () => { state.currentGrammar = topic; state.screen = "grammar-topic"; render(); }
    }, [
      el("div", { class: "menu-icon", html: topic.icon }),
      el("div", { class: "menu-content" }, [el("h3", {}, topic.title)]),
      el("span", { class: "menu-arrow", html: "→" })
    ]));
  });
  root.appendChild(app);
}

function renderGrammarTopic() {
  const t = state.currentGrammar;
  if (!t) { state.screen = "grammar"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(renderBackBar("", 0, 0, () => { state.screen = "grammar"; render(); }));
  
  const box = el("div", { class: "grammar-topic" });
  box.appendChild(el("h3", {}, [el("span", {}, t.icon), el("span", {}, t.title)]));
  t.rules.forEach(r => box.appendChild(el("div", { class: "rule", html: r.text })));
  if (t.table) {
    const tbl = el("div", { style: "margin: 10px 0;" });
    t.table.forEach(([a, b]) => {
      tbl.appendChild(el("div", { class: "info-line" }, [
        el("span", { class: "k", style: "color:var(--serbian2);font-weight:800;", html: a }),
        el("span", { class: "v", html: b })
      ]));
    });
    box.appendChild(tbl);
  }
  if (t.examples) {
    const exs = el("div", { class: "examples" });
    t.examples.forEach(ex => {
      exs.appendChild(el("div", { class: "ex" }, [
        el("div", { class: "sr", html: ex.sr }),
        el("div", { class: "ru", html: ex.ru })
      ]));
    });
    box.appendChild(exs);
  }
  app.appendChild(box);
  root.appendChild(app);
}

/* ============================================================
   СЛОВА
   ============================================================ */
function renderVocab() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Слова"));
  app.appendChild(el("p", { class: "section-sub" }, `${Object.keys(VOCAB).length} категорий`));
  
  const grid = el("div", { class: "cat-grid" });
  Object.entries(VOCAB).forEach(([key, cat]) => {
    const learned = cat.words.filter(w => state.learnedWords.has(w.sr)).length;
    const isDone = learned === cat.words.length;
    grid.appendChild(el("button", {
      class: "cat-card",
      style: `--accent: ${cat.color};`,
      onclick: () => { state.currentCat = key; state.screen = "vocab-cat"; render(); }
    }, [
      el("span", { class: "cat-emoji" }, cat.emoji),
      el("div", { class: "cat-name" }, cat.name),
      el("div", { class: "cat-count" }, `${learned}/${cat.words.length}`),
      isDone ? el("div", { class: "cat-check", html: "✓" }) : null
    ]));
  });
  app.appendChild(grid);
  root.appendChild(app);
}

function renderVocabCat() {
  const cat = VOCAB[state.currentCat];
  if (!cat) { state.screen = "vocab"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(renderBackBar(cat.name, 0, 0, () => { state.screen = "vocab"; render(); }));
  
  app.appendChild(el("div", { class: "btn-row", style: "margin-bottom:20px;" }, [
    el("button", {
      class: "btn btn-primary",
      onclick: () => {
        state.cardOrder = shuffle(cat.words);
        state.cardIdx = 0;
        state.vocabMode = "cards";
        state.screen = "vocab-learn"; render();
      }
    }, "🃏 Карточки"),
    el("button", {
      class: "btn btn-green",
      onclick: () => {
        state.cardOrder = shuffle(cat.words);
        state.quizIdx = 0;
        state.quizCorrect = 0; state.quizWrong = 0;
        state.quizAnswered = false;
        state.vocabMode = "quiz";
        state.screen = "vocab-learn"; render();
      }
    }, "✅ Тест")
  ]));
  
  cat.words.forEach(w => {
    const learned = state.learnedWords.has(w.sr);
    app.appendChild(el("div", {
      class: "word-item",
      onclick: () => {
        if (!state.learnedWords.has(w.sr)) {
          state.learnedWords.add(w.sr); state.xp += 2; saveState(); render();
        }
      }
    }, [
      el("div", {}, [
        el("div", { class: "wi-main", html: w.sr + (learned ? ' <span style="color:var(--green);">✓</span>' : '') }),
        el("div", { class: "wi-tr" }, w.tr)
      ]),
      el("div", { class: "wi-ru" }, w.ru)
    ]));
  });
  root.appendChild(app);
}

function renderVocabLearn() {
  const cat = VOCAB[state.currentCat];
  if (!cat) { state.screen = "vocab"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  const total = state.cardOrder.length;
  const isCards = state.vocabMode === "cards";
  const idx = isCards ? state.cardIdx : state.quizIdx;
  
  app.appendChild(renderBackBar(cat.name, idx, total, () => { state.screen = "vocab-cat"; render(); }));
  
  if (idx >= total) {
    app.appendChild(el("div", { class: "success-screen" }, [
      el("div", { class: "big-emoji", html: "🎉" }),
      el("h2", {}, isCards ? "Все карточки пройдены!" : "Тест завершён!"),
      el("p", {}, isCards ? `Просмотрено ${total} слов` : `Правильно: ${state.quizCorrect} · Ошибок: ${state.quizWrong}`),
      el("button", {
        class: "btn btn-primary",
        onclick: () => { state.screen = "vocab-cat"; render(); }
      }, "К категории")
    ]));
    root.appendChild(app);
    return;
  }
  
  const word = state.cardOrder[idx];
  if (isCards) {
    const fc = el("div", { class: "fc", onclick: function() { this.classList.toggle("flipped"); } }, [
      el("div", { class: "fc-inner" }, [
        el("div", { class: "fc-face fc-front" }, [
          el("div", { class: "fc-word" }, word.sr),
          el("div", { class: "fc-sub" }, "Нажми, чтобы перевернуть")
        ]),
        el("div", { class: "fc-face fc-back" }, [
          el("div", { class: "fc-word", style: "color: var(--purple);" }, word.ru),
          el("div", { class: "fc-sub" }, word.tr)
        ])
      ])
    ]);
    app.appendChild(fc);
    app.appendChild(el("div", { class: "btn-row" }, [
      el("button", { class: "btn btn-primary", onclick: () => {
        state.xp += 2; state.learnedWords.add(word.sr); saveState();
        state.cardIdx++; render();
      } }, "✓ Знаю"),
      el("button", { class: "btn btn-ghost", onclick: () => { state.cardIdx++; render(); } }, "→ Дальше")
    ]));
  } else {
    app.appendChild(el("div", { class: "quiz-prompt" }, [
      el("div", { class: "q-word" }, word.sr),
      el("div", { class: "q-sub" }, "Выбери правильный перевод"),
      el("div", { class: "q-transcr" }, word.tr)
    ]));
    const others = shuffle(cat.words.filter(w => w.ru !== word.ru)).slice(0, 3);
    const options = shuffle([word, ...others]);
    const opts = el("div", { class: "quiz-options" });
    options.forEach(opt => {
      const btn = el("button", { class: "quiz-opt" }, opt.ru);
      btn.addEventListener("click", () => {
        if (state.quizAnswered) return;
        state.quizAnswered = true;
        opts.querySelectorAll(".quiz-opt").forEach(b => {
          b.disabled = true;
          if (b.textContent === word.ru) b.classList.add("correct");
        });
        if (opt.ru === word.ru) {
          state.quizCorrect++; state.xp += 5; state.learnedWords.add(word.sr); saveState();
        } else {
          state.quizWrong++; btn.classList.add("wrong", "shake");
        }
        setTimeout(() => { state.quizAnswered = false; state.quizIdx++; render(); }, 1200);
      });
      opts.appendChild(btn);
    });
    app.appendChild(opts);
    app.appendChild(el("div", { class: "score-chips" }, [
      el("div", { class: "chip good" }, [document.createTextNode("✓ "), el("b", {}, String(state.quizCorrect))]),
      el("div", { class: "chip bad" }, [document.createTextNode("✗ "), el("b", {}, String(state.quizWrong))])
    ]));
  }
  root.appendChild(app);
}

/* ============================================================
   ДИАЛОГИ
   ============================================================ */
function renderDialogues() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Диалоги"));
  app.appendChild(el("p", { class: "section-sub" }, `${DIALOGUES.length} ситуаций`));
  
  DIALOGUES.forEach((d, i) => {
    app.appendChild(el("div", {
      class: "menu-card",
      style: "--accent: #f59e0b; --icon-bg: rgba(245,158,11,0.15); --icon-border: rgba(245,158,11,0.3);",
      onclick: () => { state.currentDialogue = i; state.screen = "dialogue"; render(); }
    }, [
      el("div", { class: "menu-icon", html: d.icon }),
      el("div", { class: "menu-content" }, [
        el("h3", {}, d.title),
        el("p", {}, `${d.lines.length} реплик · ${d.quiz.length} вопроса`)
      ]),
      el("span", { class: "menu-arrow", html: "→" })
    ]));
  });
  root.appendChild(app);
}

function renderDialogue() {
  const d = DIALOGUES[state.currentDialogue];
  if (!d) { state.screen = "dialogues"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(renderBackBar(d.title, 0, 0, () => { state.screen = "dialogues"; render(); }));
  app.appendChild(el("p", { class: "section-sub" }, "Прочитай, затем пройди тест"));
  
  const container = el("div", { class: "dialogue-container" });
  d.lines.forEach((line, i) => {
    container.appendChild(el("div", { class: "bubble " + (i % 2 === 0 ? "left" : "right") }, [
      el("div", { class: "b-sr" }, line.sr),
      el("div", { class: "b-ru" }, line.ru)
    ]));
  });
  app.appendChild(container);
  app.appendChild(el("button", {
    class: "btn btn-primary btn-block",
    onclick: () => {
      state.quizIdx = 0; state.quizCorrect = 0; state.quizWrong = 0;
      state.screen = "dialogue-quiz"; render();
    }
  }, "✅ Пройти тест"));
  root.appendChild(app);
}

function renderDialogueQuiz() {
  const d = DIALOGUES[state.currentDialogue];
  if (!d) { state.screen = "dialogues"; render(); return; }
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  const total = d.quiz.length;
  const idx = state.quizIdx;
  
  if (idx >= total) {
    const score = state.quizCorrect;
    app.appendChild(el("div", { class: "success-screen" }, [
      el("div", { class: "big-emoji", html: score === total ? "🏆" : "🎉" }),
      el("h2", {}, "Диалог пройден!"),
      el("p", {}, `Правильно: ${score} из ${total}`),
      el("button", {
        class: "btn btn-primary",
        onclick: () => {
          state.xp += score * 3; saveState();
          state.screen = "dialogues"; render();
        }
      }, `Забрать ${score * 3} XP`)
    ]));
    root.appendChild(app);
    return;
  }
  
  app.appendChild(renderBackBar(d.title + " · тест", idx, total, () => { state.screen = "dialogue"; render(); }));
  const q = d.quiz[idx];
  app.appendChild(el("div", { class: "quiz-prompt" }, [
    el("div", { class: "q-word", style: "font-size:1.15rem;line-height:1.4;margin-bottom:14px;" }, q.q)
  ]));
  
  const opts = el("div", { class: "quiz-options" });
  let answered = false;
  q.options.forEach((opt, i) => {
    const btn = el("button", { class: "quiz-opt" }, opt);
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const allBtns = opts.querySelectorAll(".quiz-opt");
      allBtns.forEach(b => b.disabled = true);
      if (i === q.correct) {
        btn.classList.add("correct"); state.quizCorrect++;
      } else {
        btn.classList.add("wrong", "shake");
        allBtns[q.correct].classList.add("correct");
      }
      setTimeout(() => { state.quizIdx++; render(); }, 1300);
    });
    opts.appendChild(btn);
  });
  app.appendChild(opts);
  root.appendChild(app);
}

/* ============================================================
   ЧАТ С МАРКО — реальная нейронка через /api/chat
   ============================================================ */
async function checkChatOnline() {
  try {
    const r = await fetch("/api/health", { cache: "no-store" });
    const data = await r.json();
    state.chatOnline = !!data.openai;
  } catch {
    state.chatOnline = false;
  }
}

function renderChat() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Чат с Марко"));
  app.appendChild(el("p", { class: "section-sub" }, "Марко общается только на сербском. Он — настоящая нейросеть."));

  const chatContainer = el("div", { class: "chat-container" });
  
  chatContainer.appendChild(el("div", { class: "chat-header" }, [
    el("div", { class: "chat-avatar", html: "🦫" }),
    el("div", { class: "chat-info" }, [
      el("h3", {}, "Марко"),
      el("p", { class: state.chatOnline ? "" : "offline" },
        state.chatOnline ? "онлайн · нейросеть" : "офлайн-режим")
    ])
  ]));
  
  const messages = el("div", { class: "chat-messages", id: "chatMessages" });
  if (state.chatHistory.length === 0) {
    state.chatHistory.push({ who: "bot", sr: "Здраво! Ја сам Марко. Како си данас?", ru: "Привет! Я Марко. Как ты сегодня?" });
  }
  state.chatHistory.forEach(msg => {
    messages.appendChild(el("div", { class: "msg " + msg.who }, [
      el("div", { class: "m-sr" }, msg.sr),
      msg.ru ? el("div", { class: "m-ru" }, msg.ru) : null
    ]));
  });
  if (state.chatTyping) {
    messages.appendChild(el("div", { class: "chat-typing" }, [el("span"), el("span"), el("span")]));
  }
  chatContainer.appendChild(messages);
  
  const sugg = el("div", { class: "chat-suggestions" });
  ["Здраво!", "Како си?", "Како се зовеш?", "Одакле си?", "Хвала!", "Довиђења!", "Шта радиш?"].forEach(s => {
    sugg.appendChild(el("button", { class: "suggestion", onclick: () => sendChatMessage(s) }, s));
  });
  chatContainer.appendChild(sugg);
  
  const inputArea = el("form", {
    class: "chat-input-area",
    onsubmit: (e) => {
      e.preventDefault();
      const val = e.target.chatInput.value.trim();
      if (val) sendChatMessage(val);
    }
  }, [
    el("input", {
      class: "chat-input", name: "chatInput",
      placeholder: "Напиши по-сербски...", autocomplete: "off",
      id: "chatInput", maxlength: "500"
    }),
    el("button", { class: "chat-send", type: "submit", html: "➤" })
  ]);
  chatContainer.appendChild(inputArea);
  
  app.appendChild(chatContainer);
  root.appendChild(app);
  
  setTimeout(() => {
    const m = document.getElementById("chatMessages");
    if (m) m.scrollTop = m.scrollHeight;
  }, 50);
}

async function sendChatMessage(text) {
  if (!text || text.trim().length === 0) return;
  if (text.length > 500) text = text.slice(0, 500);
  
  state.chatHistory.push({ who: "user", sr: text, ru: "" });
  state.chatTyping = true;
  render();
  
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: state.chatHistory.slice(-10).map(m => ({ who: m.who, sr: m.sr }))
      })
    });
    const data = await res.json();
    const reply = data.reply || "Извини, не разумем.";
    state.chatHistory.push({ who: "bot", sr: reply, ru: "" });
    if (data.fallback) state.chatOnline = false;
    else state.chatOnline = true;
  } catch (err) {
    console.error("Chat error:", err);
    const reply = localFallbackReply(text);
    state.chatHistory.push({ who: "bot", sr: reply, ru: "" });
    state.chatOnline = false;
  }
  
  state.chatTyping = false;
  saveState();
  render();
}

function localFallbackReply(text) {
  const t = text.toLowerCase().trim();
  const pick = a => a[Math.floor(Math.random() * a.length)];
  
  if (/^(здраво|ћао|добар дан|добро јутро|добро вече|поздрав|zdravo|cao)/.test(t))
    return pick(["Здраво! Како си?", "Ћао! Драго ми је што те видим.", "Добар дан! Шта има?"]);
  if (/како си|како сте|шта има|kako si/.test(t))
    return pick(["Добро сам, хвала! А ти?", "Одлично! Како си ти?"]);
  if (/зовеш|зовем се|име|kako se/.test(t))
    return pick(["Зовем се Марко. Како се ти зовеш?", "Ја сам Марко. А ти?"]);
  if (/одакле|где си|odakle/.test(t))
    return pick(["Ја сам из Србије, из Београда. Одакле си ти?", "Из Новог Сада сам. А ти?"]);
  if (/хвала|благодарим|фала|hvala/.test(t))
    return pick(["Нема на чему!", "Молим! Увек ми је драго да помогнем."]);
  if (/довиђења|чао|видимо се|лаку ноћ|dovidjenja/.test(t))
    return pick(["Довиђења! Видимо се ускоро.", "Лаку ноћ! Срећно са учењем."]);
  if (/шта радиш|радиш ли|sta radis/.test(t))
    return pick(["Учим српски са тобом! А ти?", "Разговарам са тобом. Шта волиш да радиш?"]);
  return pick([
    "Извини, не разумем најбоље. Можеш ли поновити?",
    "Хм, нисам сигуран шта мислиш. Покушај другачије.",
    "Занимљиво! Реци ми више о томе."
  ]);
}

/* ============================================================
   НАСТРОЙКИ
   ============================================================ */
function renderSettings() {
  const app = el("div", { class: "app slide-in" });
  app.appendChild(renderTopbar());
  app.appendChild(el("div", { class: "back-bar" }, [
    el("button", { class: "back-btn", html: "←", onclick: () => { state.screen = "home"; render(); } })
  ]));
  app.appendChild(el("h1", { class: "section-title" }, "Настройки"));
  app.appendChild(el("p", { class: "section-sub" }, "Настрой приложение под себя"));
  
  app.appendChild(el("div", { class: "settings-section" }, [
    el("h3", {}, ["👤", el("span", {}, "Профиль")]),
    el("div", { class: "settings-row" }, [
      el("div", {}, [
        el("div", { class: "label" }, state.user.username),
        el("div", { class: "desc" }, `XP: ${state.xp} · Серия: ${state.streak}`)
      ])
    ]),
    el("div", { class: "settings-row" }, [
      el("div", {}, [
        el("div", { class: "label" }, "Выйти из аккаунта"),
        el("div", { class: "desc" }, "Данные сохранятся локально")
      ]),
      el("button", {
        class: "btn btn-ghost", style: "padding:8px 16px;font-size:0.85rem;",
        onclick: () => {
          state.user = null; state.screen = "auth"; saveState(); render();
        }
      }, "Выйти")
    ])
  ]));
  
  app.appendChild(el("div", { class: "settings-section" }, [
    el("h3", {}, ["🎨", el("span", {}, "Тема")]),
    el("div", { class: "settings-row" }, [
      el("div", {}, [el("div", { class: "label" }, "Цветовая схема")]),
      el("div", { class: "segmented" }, [
        el("button", {
          class: state.settings.theme === "dark" ? "active" : "",
          onclick: () => { state.settings.theme = "dark"; saveState(); render(); }
        }, [el("span", { html: "🌙" }), el("span", {}, "Тёмная")]),
        el("button", {
          class: state.settings.theme === "light" ? "active" : "",
          onclick: () => { state.settings.theme = "light"; saveState(); render(); }
        }, [el("span", { html: "☀️" }), el("span", {}, "Светлая")])
      ])
    ])
  ]));
  
  app.appendChild(el("div", { class: "settings-section" }, [
    el("h3", {}, ["🌐", el("span", {}, "Язык")]),
    el("div", { class: "settings-row" }, [
      el("div", {}, [el("div", { class: "label" }, "Язык приложения")]),
      el("select", {
        class: "select-input",
        onchange: (e) => { state.settings.lang = e.target.value; saveState(); }
      }, [
        el("option", { value: "ru", selected: state.settings.lang === "ru" ? "true" : null }, "Русский"),
        el("option", { value: "sr", selected: state.settings.lang === "sr" ? "true" : null }, "Српски"),
        el("option", { value: "en", selected: state.settings.lang === "en" ? "true" : null }, "English")
      ])
    ])
  ]));
  
  app.appendChild(el("div", { class: "settings-section" }, [
    el("h3", {}, ["🦫", el("span", {}, "О BOBOR-LINGUO")]),
    el("div", { class: "settings-row" }, [
      el("div", { class: "label" }, "Версия"),
      el("div", { class: "desc" }, "1.0.0")
    ]),
    el("div", { class: "settings-row" }, [
      el("div", { class: "label" }, "ИИ-режим"),
      el("div", { class: "desc" }, state.chatOnline ? "🟢 Онлайн (OpenAI)" : "⚪ Офлайн (заготовки)")
    ])
  ]));
  
  root.appendChild(app);
}

/* ============================================================
   ЗАПУСК
   ============================================================ */
loadState();
applyTheme();
render();
checkChatOnline().then(() => { if (state.screen === "chat") render(); });
</script>
</body>
</html>

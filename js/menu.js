/* =====================================================================
   js/menu.js — WHAT EACH MENU ITEM SHOWS INSIDE ITS POPUP
   Words: data/popups.js (all five items)   Form: data/joinform.js   Looks: css/popup.css
   - Our Services / Membership: headed, scrolling text.
   - Membership: must be read to the END. Reaching the end is remembered (until the visitor
     closes the page) and ticks the agreement box in the Join form.
   - Join the Network: a short form. Its entries are EMAILED to you (see data/joinform.js).
   - Announcements: a glowing "newest" box, then the marquee announcements.
   - Exit: a warm goodbye with a choice to stay or leave.
   ===================================================================== */
PLNS.menu = (function () {
  const P = PLNS.popup;
  const J = (typeof PLNS_JOIN !== 'undefined') ? PLNS_JOIN : {};
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  // ---------- The visitor has read the Membership to its end ----------
  let read = false;
  try { read = sessionStorage.getItem('plns.membershipRead') === '1'; } catch (e) {}
  let form = null, joinItem = null, membershipItem = null;
  function markRead() {
    read = true;
    try { sessionStorage.setItem('plns.membershipRead', '1'); } catch (e) {}
    if (form) form.refresh();
  }

  // ---------- Headed text (Services, Membership) ----------
  function sectionsNode(item) {
    const box = el('div', 'pop-text');
    (item.sections || []).forEach(s => {
      if (s.heading) box.appendChild(el('h3', 'pop-h', s.heading));
      (s.paragraphs || []).forEach(t => box.appendChild(el('p', null, t)));
      if (s.list) { const ul = el('ul', 'pop-list'); s.list.forEach(t => ul.appendChild(el('li', null, t))); box.appendChild(ul); }
      (s.after || []).forEach(t => box.appendChild(el('p', null, t)));
    });
    return box;
  }

  // ---------- Membership ----------
  function openMembership(item, fromJoin) {
    membershipItem = item;
    const node = sectionsNode(item);
    if (item.closing) node.appendChild(el('p', 'pop-end', item.closing));

    const foot = el('div', 'pop-read');
    const status = el('span', 'pop-read-status');
    const btn = el('button', 'soft-btn'); btn.type = 'button';
    foot.appendChild(status); foot.appendChild(btn);
    const paint = () => {
      status.textContent = read ? '✓ ' + (J.readDone || 'You have read the Membership.') : 'Scroll to the end to finish reading.';
      status.classList.toggle('done', read);
      if (fromJoin) { btn.textContent = 'Return to the form'; btn.style.visibility = read ? 'visible' : 'hidden'; }
      else { btn.textContent = (joinItem && joinItem.label) || 'Join the Network'; btn.style.visibility = read ? 'visible' : 'hidden'; }
    };
    btn.addEventListener('click', () => openJoin());
    paint();
    P.open({
      title: item.title, node, footer: foot, links: false,
      onEnd: () => { markRead(); paint(); },
      onBack: fromJoin ? () => openJoin() : null
    });
  }

  // ---------- The Join form ----------
  function buildForm() {
    const L = J.labels || {};
    const f = el('form', 'jf'); f.noValidate = true; f.autocomplete = 'on';
    (J.intro || []).forEach(t => f.appendChild(el('p', 'jf-intro', t)));

    const field = (name, label, type, opts) => {
      opts = opts || {};
      const wrap = el('label', 'jf-field');
      wrap.appendChild(el('span', 'jf-label', label + (opts.optional ? ' ' + (L.optional || '') : '')));
      const input = type === 'textarea' ? el('textarea') : el('input');
      if (type !== 'textarea') input.type = type;
      input.name = name; if (opts.rows) input.rows = opts.rows; if (opts.auto) input.autocomplete = opts.auto;
      if (opts.mode) input.inputMode = opts.mode; input.maxLength = opts.max || 600;
      wrap.appendChild(input); f.appendChild(wrap); return input;
    };
    const name  = field('name',  L.name,  'text',  { auto: 'name', max: 80 });
    const email = field('email', L.email, 'email', { auto: 'email', max: 120 });
    const link  = field('link',  L.link,  'text',  { mode: 'url', optional: true, max: 200 });
    const about = field('about', L.about, 'textarea', { rows: 3 });

    // how they would like to contribute
    const fs = el('fieldset', 'jf-contribute'); fs.appendChild(el('legend', 'jf-label', L.contribute));
    const boxes = []; let otherBox = null, otherText = null;
    (J.contributeOptions || []).forEach(o => {
      const row = el('label', 'jf-check'); const cb = el('input'); cb.type = 'checkbox'; cb.value = o.text;
      row.appendChild(cb); row.appendChild(el('span', null, o.text)); fs.appendChild(row); boxes.push(cb);
      if (o.other) otherBox = cb;
    });
    if (otherBox) {
      const wrap = el('label', 'jf-field jf-other'); wrap.hidden = true;
      wrap.appendChild(el('span', 'jf-label', L.otherWhat));
      otherText = el('textarea'); otherText.name = 'other'; otherText.rows = 2; otherText.maxLength = 400;
      wrap.appendChild(otherText); fs.appendChild(wrap);
      otherBox.addEventListener('change', () => { wrap.hidden = !otherBox.checked; });
    }
    f.appendChild(fs);
    const thinking = field('thinking', L.thinking, 'textarea', { rows: 3, optional: true });

    // spam trap: people never see or fill this
    const trap = el('input', 'jf-trap'); trap.name = '_gotcha'; trap.tabIndex = -1; trap.autocomplete = 'off'; trap.setAttribute('aria-hidden', 'true');
    f.appendChild(trap);

    // the Membership must be read; reading ticks the box
    const readRow = el('div', 'jf-read');
    const readBtn = el('button', 'soft-btn', J.readButton || 'Read the Membership'); readBtn.type = 'button';
    const readNote = el('p', 'jf-read-note');
    readRow.appendChild(readBtn); readRow.appendChild(readNote); f.appendChild(readRow);
    readBtn.addEventListener('click', () => { if (membershipItem) openMembership(membershipItem, true); });

    const agreeRow = el('label', 'jf-agree'); const agree = el('input'); agree.type = 'checkbox'; agree.disabled = true;
    agreeRow.appendChild(agree); agreeRow.appendChild(el('span', null, J.agreeLabel)); f.appendChild(agreeRow);

    const hint = el('p', 'jf-hint', J.needs);
    const submit = el('button', 'jf-submit', J.submit || 'Join the Network'); submit.type = 'submit'; submit.disabled = true;
    const msg = el('p', 'jf-msg'); msg.setAttribute('role', 'status');
    f.appendChild(hint); f.appendChild(submit); f.appendChild(msg);
    if (J.privacy) f.appendChild(el('p', 'jf-privacy', J.privacy));

    const emailOk = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    function refresh() {
      readNote.textContent = read ? '✓ ' + J.readDone : J.readNeeded;
      readNote.classList.toggle('done', read);
      if (read && agree.disabled) { agree.disabled = false; agree.checked = true; }   // reading ticks the box
      if (!read) { agree.checked = false; agree.disabled = true; }
      const ready = name.value.trim() && emailOk() && read && agree.checked;
      submit.disabled = !ready; hint.hidden = !!ready;
    }
    f.addEventListener('input', refresh); f.addEventListener('change', refresh);

    // ----- sending -----
    function compose() {
      const picked = boxes.filter(b => b.checked && b !== otherBox).map(b => b.value);
      const other = otherBox && otherBox.checked ? otherText.value.trim() : '';
      const lines = [
        'Name: ' + name.value.trim(), 'Email: ' + email.value.trim(), 'Link: ' + (link.value.trim() || '-'),
        'About: ' + (about.value.trim() || '-'),
        'Would like to contribute by: ' + (picked.concat(other ? ['Other: ' + other] : []).join('; ') || '-'),
        'Genuine connection means: ' + (thinking.value.trim() || '-'),
        'Read the Membership to the end and agreed: yes'
      ];
      return {
        message: lines.join('\n'),
        data: {
          name: name.value.trim(), email: email.value.trim(), link: link.value.trim(), about: about.value.trim(),
          contribute: picked.join('; '), other, thinking: thinking.value.trim(), membership_read: 'yes',
          page: location.href, sent: new Date().toISOString()
        }
      };
    }
    function say(text, mail) {
      msg.textContent = text; msg.classList.add('show');
      if (mail && J.fallbackEmail) {
        const a = el('a', 'jf-mail', ' ' + (J.errorEmail || 'Send by email instead'));
        a.href = 'mailto:' + J.fallbackEmail + '?subject=' + encodeURIComponent(J.subject || '') + '&body=' + encodeURIComponent(compose().message);
        msg.appendChild(a);
      }
    }
    function success() {
      const box = el('div', 'jf-thanks');
      (J.thanks.paragraphs || []).forEach(t => box.appendChild(el('p', null, t)));
      const b = el('button', 'soft-btn', J.thanks.close || 'Close'); b.type = 'button'; b.addEventListener('click', () => P.close());
      box.appendChild(b);
      f.reset(); agree.checked = read; msg.textContent = ''; msg.classList.remove('show'); if (otherBox) f.querySelector('.jf-other').hidden = true;
      P.open({ title: J.thanks.title || 'Thank you', node: box });
      refresh();
    }
    f.addEventListener('submit', e => {
      e.preventDefault(); refresh(); if (submit.disabled) return;
      if (trap.value) { success(); return; }                       // a robot: pretend, send nothing
      const c = compose();
      if (J.endpoint) {
        submit.disabled = true; submit.textContent = J.sending || 'Sending...'; msg.classList.remove('show');
        const body = Object.assign({ subject: J.subject, _subject: J.subject, _replyto: c.data.email, message: c.message }, c.data);
        if (J.accessKey) { body.access_key = J.accessKey; body.from_name = c.data.name; }
        fetch(J.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) })
          .then(r => { if (!r.ok) throw new Error(r.status); return r.json().catch(() => ({})); })
          .then(d => { if (d && d.success === false) throw new Error('rejected'); success(); })
          .catch(() => { say(J.error, true); })
          .then(() => { submit.textContent = J.submit; refresh(); });
      } else if (J.fallbackEmail) {
        say(J.mailOpened, false);
        location.href = 'mailto:' + J.fallbackEmail + '?subject=' + encodeURIComponent(J.subject || '') + '&body=' + encodeURIComponent(c.message);
      } else {
        say(J.notConnected, false);
        if (window.console) console.warn('Join form: nothing is connected yet. Fill in endpoint in data/joinform.js.');
      }
    });
    refresh();
    return { node: f, refresh };
  }
  function openJoin() {
    if (!form) form = buildForm();
    form.refresh();
    P.open({ title: (joinItem && joinItem.title) || 'Join the Network', node: form.node });
  }

  // ---------- Announcements ----------
  function openAnnouncements(item) {
    const box = el('div', 'pop-text');
    const n = item.newest || {};
    const card = el('div', 'an-newest');
    card.appendChild(el('span', 'an-tag', n.tag || 'Newest'));
    if (n.title || n.text) {
      if (n.title) card.appendChild(el('h3', 'an-title', n.title));
      if (n.text) card.appendChild(el('p', null, n.text));
      if (n.link) { const a = el('a', 'an-link', (n.linkLabel || 'Open') + ' →'); a.href = n.link; a.target = '_blank'; a.rel = 'noopener'; card.appendChild(a); }
    } else {
      card.appendChild(el('p', 'an-quiet', n.quiet || ''));
    }
    box.appendChild(card);
    const more = (typeof PLNS_ANNOUNCEMENTS !== 'undefined') ? PLNS_ANNOUNCEMENTS : [];
    if (more.length) {
      box.appendChild(el('h3', 'pop-h', item.moreHeading || 'From the building'));
      const ul = el('ul', 'an-list');
      more.forEach(a => {
        const li = el('li');
        if (a.link) { const l = el('a', null, a.text); l.href = a.link; l.target = '_blank'; l.rel = 'noopener'; li.appendChild(l); } else li.textContent = a.text;
        ul.appendChild(li);
      });
      box.appendChild(ul);
    }
    P.open({ title: item.title, node: box });
  }

  // ---------- Exit ----------
  function openExit(item) {
    const box = el('div', 'pop-text pop-exit');
    (item.paragraphs || []).forEach(t => box.appendChild(el('p', null, t)));
    const row = el('div', 'pop-actions');
    const stay = el('button', 'soft-btn', item.stay || 'Stay in the building'); stay.type = 'button'; stay.addEventListener('click', () => P.close());
    const go = el('button', 'soft-btn soft-btn-quiet', item.leave || 'Leave the building'); go.type = 'button';
    go.addEventListener('click', () => { location.href = item.leaveUrl || location.pathname; });   // '' = back to the entrance
    row.appendChild(stay); row.appendChild(go); box.appendChild(row);
    P.open({ title: item.title, node: box });
  }

  // ---------- The door every menu item goes through ----------
  function open(item) {
    if (item.kind === 'membership') { membershipItem = item; openMembership(item, false); }
    else if (item.kind === 'form') { joinItem = item; if (!membershipItem) membershipItem = (PLNS_MENU.find(m => m.kind === 'membership') || null); openJoin(); }
    else if (item.kind === 'announcements') openAnnouncements(item);
    else if (item.kind === 'exit') openExit(item);
    else if (item.sections) P.open({ title: item.title, node: sectionsNode(item) });
    else P.open({ title: item.title, paragraphs: item.body || [] });
  }
  // remember the two items from the start, so the form and the Membership can find each other
  (typeof PLNS_MENU !== 'undefined' ? PLNS_MENU : []).forEach(m => { if (m.kind === 'form') joinItem = m; if (m.kind === 'membership') membershipItem = m; });

  return { open };
})();

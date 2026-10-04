const weddingDate = new Date("2026-11-30T10:30:00+00:00");
const welcome = document.querySelector("#welcome");
const introVideo = document.querySelector("#introVideo");
const playIntroVideo = document.querySelector("#playIntroVideo");
const introVideoStatus = document.querySelector("#introVideoStatus");
const toast = document.querySelector("#toast");
let toastTimer;
let introVideoStarted = false;
let introVideoEnded = false;
let currentLanguage = "en";
let lastRsvpName = "";

const invitationText = {
  en: {
    title: "Zayn & Nora — Wedding Invitation",
    description: "A garden wedding invitation for Zayn and Nora.",
    switchLabel: "Arabic",
    switchAria: "Switch language to Arabic",
    skip: "Skip to invitation",
    soundOn: "Turn sound on",
    soundOff: "Turn sound off",
    welcomeLabel: "Wedding invitation opening",
    welcomeEyebrow: "WITH JOY IN OUR HEARTS",
    gettingMarried: "We're getting married",
    zayn: "Zayn",
    son: "Son of Mr. & Mrs. Malik<br /><span>B.E., M.S. · Data Scientist</span>",
    nora: "Nora",
    daughter: "Daughter of Mr. &amp; Mrs. Nassr…<br /><span>MBBS, M.D. · Pediatrician</span>",
    date: "MONDAY · NOVEMBER 30, 2026",
    videoLabel: "Wedding invitation opening video",
    playVideo: "Tap anywhere to play the wedding invitation video",
    videoReady: "Tap to play the wedding invitation video.",
    videoPlaying: "The wedding invitation video is playing.",
    videoEnded: "The opening video has ended. Scroll to continue through the invitation.",
    videoPlayError: "The opening video could not play. Please tap to try again.",
    videoLoadError: "The opening video could not be loaded. Tap to try again.",
    scroll: "SCROLL TO DISCOVER",
    scrollAria: "Scroll to the invitation message",
    messageEyebrow: "A NOTE FROM OUR FAMILIES",
    messageTitle: "With grateful hearts",
    message: "We are honored to welcome you to the Wedding ceremony of Aryan & Eva. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion.",
    signature: "With love,<br /><span>Zayn &amp; Nora</span>",
    surpriseEyebrow: "A LITTLE SURPRISE",
    scratchTitle: "Scratch to Reveal",
    scratchTitleRevealed: "Our forever begins",
    scratchSubtitle: "A date to keep close to your heart",
    invited: "YOU'RE INVITED",
    dateHeart: "November 30, 2026",
    dateTime: "Monday · 10:30 AM",
    scratchAria: "Scratch the glittering heart to reveal the wedding date",
    scratchAriaRevealed: "The revealed wedding date is November 30, 2026 at 10:30 AM",
    scratchInstruction: "RUB TO REVEAL",
    scratchDone: "DATE REVEALED",
    saveDate: "SAVE THE DATE",
    gallery: "Wedding gallery",
    galleryChoose: "Choose a wedding image",
    gallerySlides: ["Wedding rings with white roses", "Blush roses and golden wedding rings", "A golden wedding arch among roses"],
    galleryPosition: (index, total, name) => `Image ${index} of ${total}: ${name}`,
    gallerySlide: (index, total, name) => `${index} of ${total}: ${name}`,
    showImage: (index) => `Show image ${index}`,
    previousImage: "Previous wedding image",
    nextImage: "Next wedding image",
    pauseSlideshow: "Pause slideshow",
    playSlideshow: "Play slideshow",
    countdownEyebrow: "UNTIL WE SAY “I DO”",
    countdown: "Counting Down to Forever",
    countdownAria: "Countdown to the wedding",
    units: ["Days", "Hours", "Minutes", "Seconds"],
    timelineEyebrow: "THE DAY AT A GLANCE",
    timeline: "Program Timeline",
    arrival: "Guest Arrival",
    arrivalDate: "Nov 30, 2026 <span>·</span> 10:00 AM",
    arrivalMessageMarkup: "We welcome you <span aria-label=\"love\">❤</span>",
    arrivalMessage: "We welcome you",
    ceremony: "Wedding Ceremony",
    ceremonyDate: "Nov 30, 2026 <span>·</span> 10:30 AM",
    ceremonyMessage: "Your presence means a lot!",
    detailsAria: "Wedding day details",
    detailsEyebrow: "JOIN US IN CELEBRATION",
    detailsTitle: "The day, thoughtfully planned",
    venueEyebrow: "THE CELEBRATION",
    venue: "Grand Palace Hall",
    city: "City centre, London",
    maps: "View on Google Maps",
    mapsMarkup: "View on Google Maps <span aria-hidden=\"true\">↗</span>",
    dressEyebrow: "DRESS CODE",
    dress: "Dress Code",
    women: "Women",
    womenDress: "Elegant formal attire in pastel or jewel tones",
    womenMarkup: "<strong>Women</strong><br />Elegant formal attire in pastel or jewel tones",
    men: "Men",
    menDress: "Suit or traditional formal wear",
    menMarkup: "<strong>Men</strong><br />Suit or traditional formal wear",
    travelEyebrow: "GETTING HERE",
    transportation: "Transportation",
    travel: "Shuttle service will be available from the city center to the venue. Pickup point: Central Station at 3:30 PM.",
    stayEyebrow: "MAKE A WEEKEND OF IT",
    accommodation: "Accommodation",
    stay: "Special rates at The Grand Hotel (5 min from venue)…",
    booking: "Booking code: …",
    rsvpEyebrow: "KINDLY REPLY",
    rsvpTitle: "Send us a little note",
    yourName: "Your Name <span>*</span>",
    namePlaceholder: "Your full name",
    attendanceLabel: "Will you be attending? <span>*</span>",
    select: "Select…",
    accepts: "Joyfully accepts",
    declines: "Regretfully declines",
    messageLabel: "Your Message",
    messagePlaceholder: "Write your wishes…",
    send: "Send Message",
    closing: "We can't wait to celebrate with you!",
    closingNames: "Zayn <span>&amp;</span> Nora",
    footerDate: "NOVEMBER 30, 2026 · LONDON",
    calendarSummary: "Zayn & Nora — Wedding Ceremony",
    calendarLocation: "Grand Palace Hall, City centre, London",
    calendarReady: "The wedding date is ready for your calendar.",
    formThanks: (name) => `Thank you, ${name} — we can't wait to celebrate with you!`,
    soundUnavailable: "Sound is unavailable in this browser.",
    calendarUnavailable: "The wedding date could not be added to your calendar.",
  },
  ar: {
    title: "زين ونورا — دعوة الزفاف",
    description: "دعوة زفاف في الحديقة لزين ونورا.",
    switchLabel: "English",
    switchAria: "التبديل إلى الإنجليزية",
    skip: "تخطّي إلى الدعوة",
    soundOn: "تشغيل الصوت",
    soundOff: "إيقاف الصوت",
    welcomeLabel: "مقدمة دعوة الزفاف",
    welcomeEyebrow: "بكل الفرح في قلوبنا",
    gettingMarried: "يسرّنا دعوتكم إلى زفافنا",
    zayn: "زين",
    son: "ابن السيد والسيدة مالك<br /><span>بكالوريوس وماجستير · عالم بيانات</span>",
    nora: "نورا",
    daughter: "ابنة السيد والسيدة نصر…<br /><span>بكالوريوس الطب والجراحة، دكتوراه في الطب · طبيبة أطفال</span>",
    date: "الاثنين · ٣٠ نوفمبر ٢٠٢٦",
    videoLabel: "فيديو افتتاح دعوة الزفاف",
    playVideo: "اضغط في أي مكان لتشغيل فيديو دعوة الزفاف",
    videoReady: "اضغط لتشغيل فيديو دعوة الزفاف.",
    videoPlaying: "يجري تشغيل فيديو دعوة الزفاف.",
    videoEnded: "انتهى فيديو الافتتاح. مرّر لمتابعة الدعوة.",
    videoPlayError: "تعذّر تشغيل الفيديو. اضغط للمحاولة مرة أخرى.",
    videoLoadError: "تعذّر تحميل فيديو الافتتاح. اضغط للمحاولة مرة أخرى.",
    scroll: "مرّر لاكتشاف المزيد",
    scrollAria: "انتقل إلى رسالة الدعوة",
    messageEyebrow: "كلمة من عائلتينا",
    messageTitle: "بقلوب ممتنة",
    message: "يشرفنا أن نرحب بكم في حفل زفاف أريان وإيفا. ومع بداية رحلتهما معًا بالإيمان والمحبة، نشكركم على مشاركتكم هذه المناسبة المباركة.",
    signature: "مع المحبة،<br /><span>زين ونورا</span>",
    surpriseEyebrow: "مفاجأة صغيرة",
    scratchTitle: "اكشفوا عن المفاجأة",
    scratchTitleRevealed: "هنا تبدأ حكايتنا إلى الأبد",
    scratchSubtitle: "موعد نحتفظ به قريبًا من القلب",
    invited: "أنتم مدعوون",
    dateHeart: "٣٠ نوفمبر ٢٠٢٦",
    dateTime: "الاثنين · ١٠:٣٠ صباحًا",
    scratchAria: "اكشطوا القلب اللامع للكشف عن موعد الزفاف",
    scratchAriaRevealed: "موعد الزفاف: ٣٠ نوفمبر ٢٠٢٦، الساعة ١٠:٣٠ صباحًا",
    scratchInstruction: "اكشطوا للكشف عن الموعد",
    scratchDone: "تم الكشف عن الموعد",
    saveDate: "أضيفوا الموعد إلى التقويم",
    gallery: "صور الزفاف",
    galleryChoose: "اختيار صورة زفاف",
    gallerySlides: ["خواتم زفاف مع ورود بيضاء", "ورود وردية وخواتم زفاف ذهبية", "قوس زفاف ذهبي بين الورود"],
    galleryPosition: (index, total, name) => `الصورة ${toArabicDigits(index)} من ${toArabicDigits(total)}: ${name}`,
    gallerySlide: (index, total, name) => `${toArabicDigits(index)} من ${toArabicDigits(total)}: ${name}`,
    showImage: (index) => `عرض الصورة ${toArabicDigits(index)}`,
    previousImage: "صورة الزفاف السابقة",
    nextImage: "صورة الزفاف التالية",
    pauseSlideshow: "إيقاف عرض الصور",
    playSlideshow: "تشغيل عرض الصور",
    countdownEyebrow: "حتى نقول نعم",
    countdown: "العد التنازلي إلى الأبد",
    countdownAria: "العد التنازلي للزفاف",
    units: ["يوم", "ساعة", "دقيقة", "ثانية"],
    timelineEyebrow: "تفاصيل اليوم",
    timeline: "برنامج الحفل",
    arrival: "استقبال الضيوف",
    arrivalDate: "٣٠ نوفمبر ٢٠٢٦ <span>·</span> ١٠:٠٠ صباحًا",
    arrivalMessageMarkup: "يسعدنا استقبالكم <span aria-label=\"محبة\">❤</span>",
    arrivalMessage: "يسعدنا استقبالكم",
    ceremony: "مراسم الزفاف",
    ceremonyDate: "٣٠ نوفمبر ٢٠٢٦ <span>·</span> ١٠:٣٠ صباحًا",
    ceremonyMessage: "حضوركم يعني لنا الكثير!",
    detailsAria: "تفاصيل يوم الزفاف",
    detailsEyebrow: "نلتقي للاحتفال",
    detailsTitle: "تفاصيل يومنا بكل عناية",
    venueEyebrow: "مكان الاحتفال",
    venue: "قاعة جراند بالاس",
    city: "وسط لندن",
    maps: "عرض الموقع على خرائط Google",
    mapsMarkup: "عرض الموقع على خرائط Google <span aria-hidden=\"true\">↗</span>",
    dressEyebrow: "الزي المقترح",
    dress: "الزي المقترح",
    women: "السيدات",
    womenDress: "إطلالة رسمية أنيقة بألوان باستيل أو ألوان جوهرية",
    womenMarkup: "<strong>السيدات</strong><br />إطلالة رسمية أنيقة بألوان باستيل أو ألوان جوهرية",
    men: "الرجال",
    menDress: "بدلة رسمية أو زي تقليدي أنيق",
    menMarkup: "<strong>الرجال</strong><br />بدلة رسمية أو زي تقليدي أنيق",
    travelEyebrow: "المواصلات",
    transportation: "المواصلات",
    travel: "ستتوفر خدمة حافلات من وسط المدينة إلى موقع الحفل. نقطة الانطلاق: المحطة المركزية الساعة ٣:٣٠ مساءً.",
    stayEyebrow: "إقامة مريحة لعطلة نهاية الأسبوع",
    accommodation: "الإقامة",
    stay: "أسعار خاصة في فندق غراند (على بُعد ٥ دقائق من موقع الحفل)…",
    booking: "رمز الحجز: …",
    rsvpEyebrow: "يرجى الرد",
    rsvpTitle: "أرسلوا لنا رسالة صغيرة",
    yourName: "الاسم <span>*</span>",
    namePlaceholder: "اكتبوا الاسم الكامل",
    attendanceLabel: "هل ستحضرون؟ <span>*</span>",
    select: "اختاروا…",
    accepts: "يسعدنا الحضور",
    declines: "نعتذر عن الحضور",
    messageLabel: "رسالتكم",
    messagePlaceholder: "اكتبوا أمنياتكم…",
    send: "إرسال الرسالة",
    closing: "نتطلع للاحتفال معكم!",
    closingNames: "زين <span>&amp;</span> نورا",
    footerDate: "٣٠ نوفمبر ٢٠٢٦ · لندن",
    calendarSummary: "حفل زفاف زين ونورا",
    calendarLocation: "قاعة جراند بالاس، وسط لندن",
    calendarReady: "أصبح موعد الزفاف جاهزًا لإضافته إلى التقويم.",
    formThanks: (name) => `شكرًا لكم${name ? ` يا ${name}` : ""}، نتطلع للاحتفال معكم!`,
    soundUnavailable: "الصوت غير متاح في هذا المتصفح.",
    calendarUnavailable: "تعذّرت إضافة موعد الزفاف إلى التقويم.",
  },
};

function localizedText() {
  return invitationText[currentLanguage];
}

function toArabicDigits(value) {
  return String(value).replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

function applyLanguage(language) {
  currentLanguage = language;
  const text = localizedText();
  const isArabic = language === "ar";
  const setText = (selector, key) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text[key];
  };
  const setMarkup = (selector, key) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = text[key];
  };

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.title = text.title;
  document.querySelector('meta[name="description"]').content = text.description;

  setText(".skip-link", "skip");
  setText(".welcome-copy .eyebrow", "welcomeEyebrow");
  setText(".welcome-copy .script-line", "gettingMarried");
  setText(".welcome-copy h1", "zayn");
  setText(".welcome-copy h2", "nora");
  setText(".welcome-copy .date-line", "date");
  setText(".message-card .eyebrow", "messageEyebrow");
  setText("#messageTitle", "messageTitle");
  setText(".message-copy", "message");
  setMarkup(".message-card .signature", "signature");
  setText(".reveal-content > .eyebrow", "surpriseEyebrow");
  setText("#revealTitle", revealed ? "scratchTitleRevealed" : "scratchTitle");
  setText(".reveal-content .section-subtitle", "scratchSubtitle");
  setText("#dateHeartTitle", "invited");
  setText("#dateHeartDate", "dateHeart");
  setText("#dateHeartTime", "dateTime");
  setText("#scratchInstruction", revealed ? "scratchDone" : "scratchInstruction");
  setText(".save-date-button span", "saveDate");
  setText("#countdown .countdown-content > .eyebrow", "countdownEyebrow");
  setText("#countdownTitle", "countdown");
  setText(".timeline-heading .eyebrow", "timelineEyebrow");
  setText(".timeline-heading .script-heading", "timeline");
  setText(".timeline li:nth-child(1) h4", "arrival");
  setText(".timeline li:nth-child(2) h4", "ceremony");
  setMarkup(".timeline li:nth-child(1) time", "arrivalDate");
  setMarkup(".timeline li:nth-child(2) time", "ceremonyDate");
  setMarkup(".timeline li:nth-child(1) .timeline-copy > p", "arrivalMessageMarkup");
  setText(".timeline li:nth-child(2) .timeline-copy > p", "ceremonyMessage");
  setText(".details-content > .eyebrow", "detailsEyebrow");
  setText(".details-content > .script-heading", "detailsTitle");
  setText(".venue-card .eyebrow", "venueEyebrow");
  setText(".venue-card h3", "venue");
  setText(".venue-card > p:nth-of-type(2)", "city");
  setMarkup(".venue-card .olive-button", "mapsMarkup");
  setText(".dress-card .eyebrow", "dressEyebrow");
  setText(".dress-card h3", "dress");
  setMarkup(".dress-card > p:nth-of-type(2)", "womenMarkup");
  setMarkup(".dress-card > p:nth-of-type(3)", "menMarkup");
  setText(".travel-card .eyebrow", "travelEyebrow");
  setText(".travel-card h3", "transportation");
  setText(".travel-card > p:not(.eyebrow)", "travel");
  setText(".stay-card .eyebrow", "stayEyebrow");
  setText(".stay-card h3", "accommodation");
  setText(".stay-card > p:not(.eyebrow):not(.booking-code)", "stay");
  setText(".booking-code", "booking");
  setText(".rsvp-content > .eyebrow", "rsvpEyebrow");
  setText("#rsvpTitle", "rsvpTitle");
  setMarkup(".rsvp-form label[for='guestName']", "yourName");
  setMarkup(".rsvp-form label[for='attendance']", "attendanceLabel");
  setText(".rsvp-form label[for='guestMessage']", "messageLabel");
  setText("#sendMessageText", "send");
  setText(".closing-script", "closing");
  setMarkup(".closing-names", "closingNames");
  setText(".footer-date", "footerDate");

  const familyLines = document.querySelectorAll(".welcome-copy .family-line");
  if (familyLines[0]) familyLines[0].innerHTML = text.son;
  if (familyLines[1]) familyLines[1].innerHTML = text.daughter;
  const signature = document.querySelector(".message-card .signature");
  if (signature) signature.innerHTML = text.signature;
  const select = document.querySelector("#attendance");
  if (select) [text.select, text.accepts, text.declines].forEach((label, index) => { select.options[index].textContent = label; });
  const guestName = document.querySelector("#guestName");
  if (guestName) guestName.placeholder = text.namePlaceholder;
  const guestMessage = document.querySelector("#guestMessage");
  if (guestMessage) guestMessage.placeholder = text.messagePlaceholder;
  document.querySelectorAll(".time-tile span").forEach((unit, index) => { unit.textContent = text.units[index]; });

  const slides = [...document.querySelectorAll(".carousel-slide")];
  slides.forEach((slide, index) => {
    slide.setAttribute("aria-roledescription", isArabic ? "شريحة" : "slide");
    slide.setAttribute("aria-label", text.gallerySlide(index + 1, slides.length, text.gallerySlides[index]));
  });
  const gallery = document.querySelector("#weddingGallery");
  if (gallery) {
    gallery.setAttribute("aria-label", text.gallery);
    gallery.setAttribute("aria-roledescription", isArabic ? "معرض صور" : "carousel");
    gallery.querySelector(".carousel-dots").setAttribute("aria-label", text.galleryChoose);
    gallery.querySelectorAll("[data-carousel-dot]").forEach((dot, index) => dot.setAttribute("aria-label", text.showImage(index + 1)));
    gallery.querySelector("[data-carousel-prev]").setAttribute("aria-label", text.previousImage);
    gallery.querySelector("[data-carousel-next]").setAttribute("aria-label", text.nextImage);
    const toggle = gallery.querySelector("[data-carousel-toggle]");
    toggle.setAttribute("aria-label", toggle.getAttribute("aria-pressed") === "true" ? text.playSlideshow : text.pauseSlideshow);
    const activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    gallery.querySelector("[data-carousel-status]").textContent = text.galleryPosition(activeIndex + 1, slides.length, text.gallerySlides[activeIndex]);
  }

  document.querySelector("#soundToggle").setAttribute("aria-label", document.querySelector("#soundToggle").getAttribute("aria-pressed") === "true" ? text.soundOff : text.soundOn);
  document.querySelector("#languageToggle").setAttribute("aria-label", text.switchAria);
  setText("#languageLabel", "switchLabel");
  document.querySelector("#welcome").setAttribute("aria-label", text.welcomeLabel);
  document.querySelector("#introVideo").setAttribute("aria-label", text.videoLabel);
  document.querySelector("#playIntroVideo").setAttribute("aria-label", text.playVideo);
  const scrollHint = document.querySelector(".scroll-hint");
  if (scrollHint) {
    scrollHint.setAttribute("aria-label", text.scrollAria);
    scrollHint.querySelector("span").textContent = text.scroll;
  }
  document.querySelector("#scratchLayer").setAttribute("aria-label", revealed ? text.scratchAriaRevealed : text.scratchAria);
  document.querySelector("#scratchHeart").setAttribute("aria-label", revealed ? text.scratchAriaRevealed : text.scratchAria);
  document.querySelector("#countdown .countdown").setAttribute("aria-label", text.countdownAria);
  document.querySelector("#details").setAttribute("aria-label", text.detailsAria);
  document.querySelector(".timeline li:nth-child(1) .timeline-copy p span").setAttribute("aria-label", isArabic ? "محبة" : "love");

  document.querySelector("#introVideoStatus").textContent = introVideoEnded ? text.videoEnded : introVideoStarted ? text.videoPlaying : text.videoReady;
  const formStatus = document.querySelector("#formStatus");
  if (formStatus.dataset.submitted === "true") formStatus.textContent = text.formThanks(lastRsvpName);
  updateCountdown();
}

if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
function keepIntroAtTop() {
  if (welcome.classList.contains("is-open")) return;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
}
keepIntroAtTop();
window.addEventListener("pageshow", keepIntroAtTop);

function keepIntroScrollLocked() {
  if (!document.documentElement.classList.contains("intro-locked")) return;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
}
function preventIntroScroll(event) {
  if (document.documentElement.classList.contains("intro-locked")) event.preventDefault();
}
window.addEventListener("scroll", keepIntroScrollLocked, { passive: true });
window.addEventListener("wheel", preventIntroScroll, { passive: false });
window.addEventListener("touchmove", preventIntroScroll, { passive: false });
document.addEventListener("keydown", (event) => {
  const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
  if (!scrollKeys.includes(event.key) || !document.documentElement.classList.contains("intro-locked")) return;
  if (event.target.matches("input, textarea, select, [contenteditable='true']")) return;
  event.preventDefault();
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !document.documentElement.classList.contains("intro-locked")) return;
  event.preventDefault();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

// A soft, optional ambient chord is created only after the visitor enables sound.
let audioContext;
let ambience = [];
function setSound(enabled) {
  const button = document.querySelector("#soundToggle");
  const text = localizedText();
  button.setAttribute("aria-pressed", String(enabled));
  button.setAttribute("aria-label", enabled ? text.soundOff : text.soundOn);

  if (enabled) {
    try {
      audioContext ||= new window.AudioContext();
      if (audioContext.state === "suspended") audioContext.resume();
      ambience = [196, 293.66, 392].map((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = index === 0 ? 0.006 : 0.003;
        oscillator.connect(gain).connect(audioContext.destination);
        oscillator.start();
        return { oscillator, gain };
      });
    } catch {
      showToast(localizedText().soundUnavailable);
      button.setAttribute("aria-pressed", "false");
    }
    return;
  }

  ambience.forEach(({ oscillator, gain }) => {
    const now = audioContext?.currentTime ?? 0;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0, now, 0.04);
    oscillator.stop(now + 0.25);
  });
  ambience = [];
}

document.querySelector("#soundToggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  setSound(button.getAttribute("aria-pressed") !== "true");
});

function playChime() {
  if (!audioContext || document.querySelector("#soundToggle").getAttribute("aria-pressed") !== "true") return;
  [659.25, 783.99, 987.77].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startsAt = audioContext.currentTime + index * 0.12;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, startsAt);
    gain.gain.linearRampToValueAtTime(0.035, startsAt + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, startsAt + 0.62);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(startsAt);
    oscillator.stop(startsAt + 0.65);
  });
}

function finishIntroVideo() {
  if (introVideoEnded) return;
  introVideoEnded = true;
  introVideo.pause();
  welcome.classList.add("is-open", "video-ended");
  playIntroVideo.hidden = true;
  introVideoStatus.textContent = localizedText().videoEnded;
  document.documentElement.classList.remove("intro-locked");
  document.body.classList.remove("intro-locked");
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => document.documentElement.style.removeProperty("scroll-behavior"));
}

playIntroVideo.addEventListener("click", async () => {
  if (introVideoStarted || introVideoEnded) return;
  introVideoStarted = true;
  welcome.classList.add("video-playing");
  playIntroVideo.hidden = true;
  introVideoStatus.textContent = localizedText().videoPlaying;
  try {
    await introVideo.play();
  } catch {
    introVideoStarted = false;
    welcome.classList.remove("video-playing");
    playIntroVideo.hidden = false;
    introVideoStatus.textContent = localizedText().videoReady;
    showToast(localizedText().videoPlayError);
  }
});

introVideo.addEventListener("ended", finishIntroVideo);
introVideo.addEventListener("error", () => {
  if (!introVideoStarted || introVideoEnded) return;
  introVideoStarted = false;
  welcome.classList.remove("video-playing");
  playIntroVideo.hidden = false;
  introVideoStatus.textContent = localizedText().videoLoadError;
  showToast(localizedText().videoLoadError);
});

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  const format = (value) => {
    const padded = String(value).padStart(2, "0");
    return currentLanguage === "ar" ? toArabicDigits(padded) : padded;
  };
  document.querySelector("#days").textContent = format(days);
  document.querySelector("#hours").textContent = format(hours);
  document.querySelector("#minutes").textContent = format(minutes);
  document.querySelector("#seconds").textContent = format(seconds);
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

const scratchCanvas = document.querySelector("#scratchLayer");
const scratchContext = scratchCanvas.getContext("2d", { willReadFrequently: true });
const scratchHeart = document.querySelector("#scratchHeart");
const revealHeading = document.querySelector("#revealTitle");
let originalGlitterPixels = 1;
let isScratching = false;
let lastPoint = null;
let strokeCount = 0;
let revealed = false;

function heartPath(context, width, height) {
  context.beginPath();
  context.moveTo(width * 0.5, height * 0.915);
  context.bezierCurveTo(width * 0.43, height * 0.82, width * 0.08, height * 0.61, width * 0.08, height * 0.34);
  context.bezierCurveTo(width * 0.08, height * 0.08, width * 0.36, height * 0.025, width * 0.5, height * 0.25);
  context.bezierCurveTo(width * 0.64, height * 0.025, width * 0.92, height * 0.08, width * 0.92, height * 0.34);
  context.bezierCurveTo(width * 0.92, height * 0.61, width * 0.57, height * 0.82, width * 0.5, height * 0.915);
  context.closePath();
}

function drawScratchCoating() {
  const bounds = scratchCanvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  scratchCanvas.width = Math.round(bounds.width * pixelRatio);
  scratchCanvas.height = Math.round(bounds.height * pixelRatio);
  scratchContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const width = bounds.width;
  const height = bounds.height;

  scratchContext.save();
  heartPath(scratchContext, width, height);
  scratchContext.clip();
  const glitter = scratchContext.createLinearGradient(width * 0.08, height * 0.04, width * 0.9, height * 0.95);
  glitter.addColorStop(0, "#f3e8cf");
  glitter.addColorStop(0.16, "#b5a789");
  glitter.addColorStop(0.32, "#e9dbbd");
  glitter.addColorStop(0.5, "#a09a8a");
  glitter.addColorStop(0.68, "#e4d1a4");
  glitter.addColorStop(0.84, "#938a75");
  glitter.addColorStop(1, "#e8d9b8");
  scratchContext.fillStyle = glitter;
  scratchContext.fillRect(0, 0, width, height);

  const sheen = scratchContext.createLinearGradient(width * 0.08, height * 0.08, width * 0.7, height * 0.86);
  sheen.addColorStop(0, "#fffdf080");
  sheen.addColorStop(0.28, "#fff9e52e");
  sheen.addColorStop(0.53, "#fff8df05");
  sheen.addColorStop(1, "#5f584b35");
  scratchContext.fillStyle = sheen;
  scratchContext.fillRect(0, 0, width, height);

  const reflectedLight = scratchContext.createRadialGradient(width * 0.29, height * 0.2, 0, width * 0.29, height * 0.2, width * 0.66);
  reflectedLight.addColorStop(0, "#fffdf03d");
  reflectedLight.addColorStop(0.42, "#fff9e417");
  reflectedLight.addColorStop(1, "#fff8e900");
  scratchContext.fillStyle = reflectedLight;
  scratchContext.fillRect(0, 0, width, height);

  scratchContext.strokeStyle = "#fff8e124";
  scratchContext.lineWidth = 0.55;
  for (let y = 1; y < height; y += 4) {
    scratchContext.beginPath();
    scratchContext.moveTo(0, y);
    scratchContext.lineTo(width, y - height * 0.04);
    scratchContext.stroke();
  }
  scratchContext.fillStyle = "#ffffff3d";
  for (let y = 0; y < height; y += 5) {
    for (let x = (y % 10 ? 2 : 0); x < width; x += 5) {
      scratchContext.fillRect(x, y, 1, 1);
    }
  }
  let seed = 641;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let index = 0; index < 210; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const radius = 0.45 + random() * 1.1;
    scratchContext.beginPath();
    scratchContext.fillStyle = index % 4 === 0 ? "#fff5d4" : index % 3 === 0 ? "#f9e5b2" : "#827966";
    scratchContext.globalAlpha = 0.35 + random() * 0.5;
    scratchContext.arc(x, y, radius, 0, Math.PI * 2);
    scratchContext.fill();
  }
  scratchContext.globalAlpha = 1;

  for (let index = 0; index < 18; index += 1) {
    const x = 24 + random() * (width - 48);
    const y = 20 + random() * (height - 44);
    if (index % 2) continue;
    const size = 2 + random() * 1.8;
    scratchContext.globalAlpha = 0.55 + random() * 0.35;
    scratchContext.fillStyle = "#fff6d8";
    scratchContext.beginPath();
    scratchContext.moveTo(x, y - size * 2.2);
    scratchContext.lineTo(x + size * 0.45, y - size * 0.45);
    scratchContext.lineTo(x + size * 2.2, y);
    scratchContext.lineTo(x + size * 0.45, y + size * 0.45);
    scratchContext.lineTo(x, y + size * 2.2);
    scratchContext.lineTo(x - size * 0.45, y + size * 0.45);
    scratchContext.lineTo(x - size * 2.2, y);
    scratchContext.lineTo(x - size * 0.45, y - size * 0.45);
    scratchContext.closePath();
    scratchContext.fill();
  }
  scratchContext.globalAlpha = 1;

  const rim = scratchContext.createLinearGradient(0, 0, width, height);
  rim.addColorStop(0, "#fff3c9");
  rim.addColorStop(0.28, "#b78748");
  rim.addColorStop(0.52, "#f9e09c");
  rim.addColorStop(0.78, "#9d7140");
  rim.addColorStop(1, "#f0d9a6");
  scratchContext.strokeStyle = rim;
  scratchContext.lineWidth = 8;
  heartPath(scratchContext, width, height);
  scratchContext.stroke();
  scratchContext.strokeStyle = "#fff9e7d9";
  scratchContext.lineWidth = 1.5;
  heartPath(scratchContext, width, height);
  scratchContext.stroke();
  scratchContext.strokeStyle = "#6e573e64";
  scratchContext.lineWidth = 1;
  heartPath(scratchContext, width, height);
  scratchContext.stroke();
  scratchContext.restore();

  const pixels = scratchContext.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height).data;
  let total = 0;
  for (let index = 3; index < pixels.length; index += 4 * 8) if (pixels[index] > 0) total += 1;
  originalGlitterPixels = Math.max(total, 1);
}

function scratchPoint(event) {
  const bounds = scratchCanvas.getBoundingClientRect();
  return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
}

function eraseGlitter(from, to = from) {
  scratchContext.save();
  scratchContext.globalCompositeOperation = "destination-out";
  scratchContext.lineCap = "round";
  scratchContext.lineJoin = "round";
  scratchContext.lineWidth = Math.max(27, scratchCanvas.getBoundingClientRect().width * 0.105);
  scratchContext.beginPath();
  scratchContext.moveTo(from.x, from.y);
  scratchContext.lineTo(to.x, to.y);
  scratchContext.stroke();
  scratchContext.beginPath();
  scratchContext.arc(to.x, to.y, scratchContext.lineWidth / 2, 0, Math.PI * 2);
  scratchContext.fill();
  scratchContext.restore();
  strokeCount += 1;
  if (strokeCount % 4 === 0) checkScratchProgress();
}

function checkScratchProgress() {
  const pixels = scratchContext.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height).data;
  let remaining = 0;
  for (let index = 3; index < pixels.length; index += 4 * 8) if (pixels[index] > 0) remaining += 1;
  if (1 - remaining / originalGlitterPixels >= 0.43) revealDate();
}

function launchConfetti() {
  const field = document.createElement("div");
  field.className = "confetti-field";
  field.setAttribute("aria-hidden", "true");
  const colors = ["#c59862", "#d98c91", "#f0ce91", "#7b8b62", "#fff8e7"];
  for (let index = 0; index < 31; index += 1) {
    const dot = document.createElement("span");
    dot.className = "confetti-dot";
    dot.style.setProperty("--confetti-x", `${5 + Math.random() * 90}%`);
    dot.style.setProperty("--confetti-delay", `${Math.random() * 1.2}s`);
    dot.style.setProperty("--confetti-duration", `${2.8 + Math.random() * 2.6}s`);
    dot.style.setProperty("--confetti-color", colors[index % colors.length]);
    field.append(dot);
  }
  scratchHeart.append(field);
  window.setTimeout(() => field.remove(), 6000);
}

function revealDate() {
  if (revealed) return;
  const text = localizedText();
  revealed = true;
  scratchHeart.classList.add("is-revealed");
  scratchHeart.setAttribute("aria-label", text.scratchAriaRevealed);
  document.querySelector("#scratchLayer").setAttribute("aria-label", text.scratchAriaRevealed);
  revealHeading.textContent = text.scratchTitleRevealed;
  document.querySelector("#scratchInstruction").textContent = text.scratchDone;
  launchConfetti();
  playChime();
}

scratchCanvas.addEventListener("pointerdown", (event) => {
  if (revealed) return;
  event.preventDefault();
  isScratching = true;
  scratchCanvas.setPointerCapture(event.pointerId);
  scratchHeart.classList.add("is-scratching");
  lastPoint = scratchPoint(event);
  eraseGlitter(lastPoint);
});
scratchCanvas.addEventListener("pointermove", (event) => {
  if (!isScratching || revealed) return;
  const nextPoint = scratchPoint(event);
  eraseGlitter(lastPoint ?? nextPoint, nextPoint);
  lastPoint = nextPoint;
});
function stopScratching() { isScratching = false; lastPoint = null; }
scratchCanvas.addEventListener("pointerup", stopScratching);
scratchCanvas.addEventListener("pointercancel", stopScratching);
scratchCanvas.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && !revealed) {
    event.preventDefault();
    revealDate();
  }
});

drawScratchCoating();
window.addEventListener("resize", () => {
  if (!revealed) drawScratchCoating();
});

document.querySelector("#saveDate").addEventListener("click", () => {
  const eventContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Zayn and Nora//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:zayn-nora-wedding-20261130@invitation.local",
    `DTSTAMP:${new Date().toISOString().replaceAll(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    "DTSTART;TZID=Europe/London:20261130T103000",
    "DTEND;TZID=Europe/London:20261130T120000",
    `SUMMARY:${localizedText().calendarSummary}`,
    `LOCATION:${localizedText().calendarLocation}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const file = new Blob([eventContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "zayn-and-nora-wedding.ics";
  link.click();
  URL.revokeObjectURL(url);
  showToast(localizedText().calendarReady);
});

const weddingGallery = document.querySelector("#weddingGallery");
if (weddingGallery) {
  const gallerySlides = [...weddingGallery.querySelectorAll(".carousel-slide")];
  const galleryDots = [...weddingGallery.querySelectorAll("[data-carousel-dot]")];
  const galleryStatus = weddingGallery.querySelector("[data-carousel-status]");
  const galleryToggle = weddingGallery.querySelector("[data-carousel-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentGallerySlide = 0;
  let galleryTimer = null;
  let galleryInView = false;
  let galleryHovered = false;
  let galleryFocused = false;
  let galleryPausedByUser = false;

  function showGallerySlide(index, announceChange = false) {
    currentGallerySlide = (index + gallerySlides.length) % gallerySlides.length;
    gallerySlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentGallerySlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    galleryDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentGallerySlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
    galleryStatus.textContent = localizedText().galleryPosition(currentGallerySlide + 1, gallerySlides.length, localizedText().gallerySlides[currentGallerySlide]);
    galleryStatus.setAttribute("aria-live", announceChange ? "polite" : "off");
  }

  function updateGalleryPlayback() {
    window.clearInterval(galleryTimer);
    galleryTimer = null;
    if (!galleryInView || galleryHovered || galleryFocused || galleryPausedByUser || document.hidden || reducedMotion.matches) return;
    galleryTimer = window.setInterval(() => showGallerySlide(currentGallerySlide + 1), 5200);
  }

  weddingGallery.querySelector("[data-carousel-prev]").addEventListener("click", () => {
    showGallerySlide(currentGallerySlide - 1, true);
    updateGalleryPlayback();
  });
  weddingGallery.querySelector("[data-carousel-next]").addEventListener("click", () => {
    showGallerySlide(currentGallerySlide + 1, true);
    updateGalleryPlayback();
  });
  galleryDots.forEach((dot) => dot.addEventListener("click", () => {
    showGallerySlide(Number(dot.dataset.carouselDot), true);
    updateGalleryPlayback();
  }));
  galleryToggle.addEventListener("click", () => {
    galleryPausedByUser = !galleryPausedByUser;
    galleryToggle.setAttribute("aria-pressed", String(galleryPausedByUser));
    galleryToggle.setAttribute("aria-label", galleryPausedByUser ? localizedText().playSlideshow : localizedText().pauseSlideshow);
    updateGalleryPlayback();
  });

  weddingGallery.addEventListener("mouseenter", () => { galleryHovered = true; updateGalleryPlayback(); });
  weddingGallery.addEventListener("mouseleave", () => { galleryHovered = false; updateGalleryPlayback(); });
  weddingGallery.addEventListener("focusin", () => { galleryFocused = true; updateGalleryPlayback(); });
  weddingGallery.addEventListener("focusout", (event) => {
    if (!weddingGallery.contains(event.relatedTarget)) {
      galleryFocused = false;
      updateGalleryPlayback();
    }
  });
  document.addEventListener("visibilitychange", updateGalleryPlayback);
  reducedMotion.addEventListener?.("change", updateGalleryPlayback);

  if ("IntersectionObserver" in window) {
    const galleryObserver = new IntersectionObserver(([entry]) => {
      galleryInView = entry.isIntersecting;
      updateGalleryPlayback();
    }, { threshold: 0.25 });
    galleryObserver.observe(weddingGallery);
  } else {
    galleryInView = true;
    updateGalleryPlayback();
  }
}

document.querySelector("#rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  lastRsvpName = document.querySelector("#guestName").value.trim();
  const status = document.querySelector("#formStatus");
  status.textContent = localizedText().formThanks(lastRsvpName);
  status.dataset.submitted = "true";
  event.currentTarget.reset();
});

document.querySelector("#languageToggle").addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
});

applyLanguage("en");

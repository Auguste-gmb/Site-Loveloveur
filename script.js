/* ============================================
   LOVÉLO ROUEN — script.js
   ============================================ */

// ── NAVBAR SCROLL ──────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
	navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── MOBILE MENU ───────────────────────────────
const burger = document.getElementById("burger");
const overlay = document.getElementById("nav-overlay");
const overlayClose = document.getElementById("overlay-close");

burger.addEventListener("click", () => {
	overlay.classList.add("open");
	document.body.style.overflow = "hidden";
});

overlayClose.addEventListener("click", closeOverlay);

overlay.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", closeOverlay);
});

function closeOverlay() {
	overlay.classList.remove("open");
	document.body.style.overflow = "";
}

// ── FADE-IN ON SCROLL ─────────────────────────
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	},
	{ threshold: 0.12 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// ── ACTIVE NAV LINK ───────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener("scroll", () => {
	let current = "";
	sections.forEach((section) => {
		if (window.scrollY >= section.offsetTop - 140) {
			current = section.id;
		}
	});
	navLinks.forEach((a) => {
		a.classList.toggle(
			"nav-active",
			a.getAttribute("href") === "#" + current,
		);
	});
});

// ── FORM SUBMIT ───────────────────────────────
function submitForm() {
	const name = document.getElementById("f-name").value.trim();
	const bikePicked = document.querySelector('input[name="bike"]:checked');
	const loveloPicked = document.querySelector('input[name="lovelo"]:checked');

	// Basic validation
	if (!name) {
		shakeField("f-name");
		return;
	}

	const form = document.getElementById("survey-form");
	const success = document.getElementById("form-success");
	form.style.opacity = "0";
	form.style.transform = "translateY(-10px)";
	form.style.transition = "opacity .3s, transform .3s";

	setTimeout(() => {
		form.style.display = "none";
		success.style.display = "block";
		success.style.opacity = "0";
		success.style.transform = "translateY(10px)";
		success.style.transition = "opacity .4s, transform .4s";
		requestAnimationFrame(() => {
			success.style.opacity = "1";
			success.style.transform = "none";
		});
	}, 300);
}

function shakeField(id) {
	const el = document.getElementById(id);
	el.style.borderColor = "var(--magenta)";
	el.classList.add("shake");
	el.addEventListener("animationend", () => el.classList.remove("shake"), {
		once: true,
	});
}

// Shake keyframe (injected once)
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}
.shake { animation: shake .4s ease; }
`;
document.head.appendChild(shakeStyle);

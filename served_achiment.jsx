import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/achiment.jsx");import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=83bd7232"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];
import { Link } from "/node_modules/.vite/deps/react-router-dom.js?v=83bd7232";
import { Trophy, Medal, Award, Star, Shield, BadgeCheck, ArrowRight, Phone, Mail, MapPin, Users, Building2, Quote, ChevronLeft, ChevronRight, TrendingUp, Rocket, Globe, CheckCircle2 } from "/node_modules/.vite/deps/lucide-react.js?v=83bd7232";
import Navbar from "/src/components/Navbar.jsx";
import Footer from "/src/components/Footer.jsx";
import { getPageAsset, usePageAssets } from "/src/hooks/usePageAssets.js";
import { useSectionReveal } from "/src/hooks/useSectionReveal.js?t=1777693633446";
import heroImage from "/src/assets/hero.png?import";
var _jsxFileName = "C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/pages/achiment.jsx";
import __vite__cjsImport8_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=83bd7232"; const _jsxDEV = __vite__cjsImport8_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$(), _s4 = $RefreshSig$(), _s5 = $RefreshSig$();
function AwardsHero() {
	_s();
	const { isVisible, sectionRef } = useSectionReveal(.25);
	const [count, setCount] = useState({
		years: 0,
		workers: 0,
		clients: 0,
		awardsWon: 0
	});
	const pageAssets = usePageAssets();
	const achievementsHeroAsset = getPageAsset(pageAssets, "achievements.hero", heroImage, "TSPL achievements");
	useEffect(() => {
		const duration = 2e3;
		const steps = 60;
		const interval = duration / steps;
		let step = 0;
		const timer = window.setInterval(() => {
			step += 1;
			const progress = step / steps;
			const easeOut = 1 - (1 - progress) ** 3;
			setCount({
				years: Math.floor(15 * easeOut),
				workers: Math.floor(4e4 * easeOut),
				clients: Math.floor(450 * easeOut),
				awardsWon: Math.floor(6 * easeOut)
			});
			if (step >= steps) {
				window.clearInterval(timer);
			}
		}, interval);
		return () => window.clearInterval(timer);
	}, []);
	const stats = [
		{
			icon: TrendingUp,
			value: `${count.years}+`,
			label: "Years of Excellence"
		},
		{
			icon: Star,
			value: `${count.workers.toLocaleString()}+`,
			label: "Workers Placed"
		},
		{
			icon: Award,
			value: `${count.clients}+`,
			label: "Happy Clients"
		},
		{
			icon: Trophy,
			value: `${count.awardsWon}+`,
			label: "Awards Won"
		}
	];
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: sectionRef,
		className: "relative min-h-[78vh] overflow-hidden bg-white pt-16 md:min-h-[90vh] md:pt-24",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "absolute inset-0 bg-cover bg-center",
						style: { backgroundImage: `url('${achievementsHeroAsset.url}')` }
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 5
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute inset-0 opacity-[0.03]",
				children: /* @__PURE__ */ _jsxDEV("svg", {
					className: "h-full w-full",
					children: [/* @__PURE__ */ _jsxDEV("pattern", {
						id: "achievement-pattern",
						x: "0",
						y: "0",
						width: "60",
						height: "60",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ _jsxDEV("circle", {
							cx: "30",
							cy: "30",
							r: "1.5",
							fill: "#2563EB"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 7
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 6
					}, this), /* @__PURE__ */ _jsxDEV("rect", {
						width: "100%",
						height: "100%",
						fill: "url(#achievement-pattern)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 6
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 5
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "relative mx-auto max-w-7xl px-6 py-10 md:py-16 lg:px-8",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "grid items-center gap-10 md:gap-12 lg:grid-cols-2",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: `space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`,
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 shadow-lg shadow-blue-500/25",
								children: [/* @__PURE__ */ _jsxDEV(Trophy, { className: "h-4 w-4 text-white" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 8
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-sm font-semibold text-white",
									children: "Our Journey of Success"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("h1", {
								className: "text-5xl font-bold leading-tight text-gray-900 lg:text-7xl",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "block",
									children: "Celebrating"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 8
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "relative mt-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500",
									children: ["Excellence", /* @__PURE__ */ _jsxDEV("svg", {
										className: "absolute -bottom-2 left-0 w-full",
										viewBox: "0 0 300 12",
										fill: "none",
										children: [/* @__PURE__ */ _jsxDEV("path", {
											d: "M2 10C50 2 150 2 298 10",
											stroke: "url(#grad-line)",
											strokeWidth: "4",
											strokeLinecap: "round"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 98,
											columnNumber: 10
										}, this), /* @__PURE__ */ _jsxDEV("defs", { children: /* @__PURE__ */ _jsxDEV("linearGradient", {
											id: "grad-line",
											x1: "0",
											y1: "0",
											x2: "300",
											y2: "0",
											children: [/* @__PURE__ */ _jsxDEV("stop", { stopColor: "#2563EB" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 101,
												columnNumber: 12
											}, this), /* @__PURE__ */ _jsxDEV("stop", {
												offset: "1",
												stopColor: "#F97316"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 102,
												columnNumber: 12
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 100,
											columnNumber: 11
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 99,
											columnNumber: 10
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 97,
										columnNumber: 9
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "max-w-lg text-xl leading-relaxed text-gray-600",
								children: "For over 15 years, TSPL Group has been transforming lives and businesses through dedicated service and unwavering commitment."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap gap-4",
								children: [/* @__PURE__ */ _jsxDEV(Link, {
									to: "/contact-us",
									className: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 font-bold text-white shadow-lg shadow-[#F97316]/30 transition-transform duration-300 hover:scale-105 hover:bg-[#EA580C]",
									children: ["Get in Touch", /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 119,
										columnNumber: 9
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 114,
									columnNumber: 8
								}, this), /* @__PURE__ */ _jsxDEV(Link, {
									to: "/client",
									className: "inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 font-bold text-blue-700 transition-colors duration-300 hover:border-blue-300 hover:bg-blue-50",
									children: "View Clients"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 7
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 6
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: `relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`,
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "relative mx-auto h-80 w-80 lg:h-[28rem] lg:w-[28rem]",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 rounded-full border-4 border-blue-200 opacity-20 animate-ping" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-4 rounded-full border-4 border-orange-200 opacity-20 animate-ping" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-8 rounded-full border-4 border-blue-300 opacity-20 animate-ping" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "absolute inset-12 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl shadow-orange-500/40",
									children: [/* @__PURE__ */ _jsxDEV("img", {
										src: achievementsHeroAsset.url,
										alt: achievementsHeroAsset.alt,
										className: "h-full w-full object-cover opacity-25"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 9
									}, this), /* @__PURE__ */ _jsxDEV(Trophy, { className: "absolute h-24 w-24 text-white drop-shadow-lg" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 9
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2",
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-xl animate-bounce",
										children: /* @__PURE__ */ _jsxDEV("span", {
											className: "text-2xl font-bold text-blue-600",
											children: "#1"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 143,
											columnNumber: 10
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 9
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "absolute bottom-4 left-0",
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: "flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl",
										children: /* @__PURE__ */ _jsxDEV("img", {
											src: "/images-10.jpeg",
											alt: "Recognition",
											className: "h-full w-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 149,
											columnNumber: 10
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 9
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 8
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "absolute bottom-4 right-0",
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: "flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl",
										children: /* @__PURE__ */ _jsxDEV(Award, { className: "h-7 w-7 text-orange-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 155,
											columnNumber: 10
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 154,
										columnNumber: 9
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 8
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 7
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 6
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 5
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: `mt-10 grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 md:mt-16 md:gap-6 md:grid-cols-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
					children: stats.map((stat) => /* @__PURE__ */ _jsxDEV("div", {
						className: "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10",
						children: [/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-0 transition-opacity group-hover:opacity-100" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 8
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "relative",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "mb-2 flex items-center gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform group-hover:scale-110",
									children: /* @__PURE__ */ _jsxDEV(stat.icon, { className: "h-5 w-5 text-white" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 11
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 10
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500 lg:text-4xl",
									children: stat.value
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 10
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 9
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "font-medium text-gray-700",
								children: stat.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 9
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 8
						}, this)]
					}, stat.label, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 7
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 5
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 4
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 3
	}, this);
}
_s(AwardsHero, "wGJDF9yJYJOrEzA9lgxCvMt1qrU=", false, function() {
	return [useSectionReveal, usePageAssets];
});
_c = AwardsHero;
function Milestones() {
	_s2();
	const { isVisible, sectionRef } = useSectionReveal(.2);
	const [activeIndex, setActiveIndex] = useState(0);
	const [lineProgress, setLineProgress] = useState(0);
	useEffect(() => {
		if (!isVisible) {
			setLineProgress(0);
			return undefined;
		}
		const timer = window.setInterval(() => {
			setLineProgress((current) => Math.min(current + .04, 1));
		}, 24);
		return () => window.clearInterval(timer);
	}, [isVisible]);
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: sectionRef,
		className: "relative overflow-hidden bg-slate-50 py-16 md:py-24",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "absolute inset-0 opacity-[0.02]",
			children: /* @__PURE__ */ _jsxDEV("svg", {
				className: "h-full w-full",
				children: [/* @__PURE__ */ _jsxDEV("pattern", {
					id: "milestone-dots",
					x: "0",
					y: "0",
					width: "40",
					height: "40",
					patternUnits: "userSpaceOnUse",
					children: /* @__PURE__ */ _jsxDEV("circle", {
						cx: "20",
						cy: "20",
						r: "1",
						fill: "#2563EB"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 7
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 6
				}, this), /* @__PURE__ */ _jsxDEV("rect", {
					width: "100%",
					height: "100%",
					fill: "url(#milestone-dots)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 210,
					columnNumber: 6
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 5
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 205,
			columnNumber: 4
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "relative mx-auto max-w-7xl px-6 lg:px-8",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: `mb-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700",
						children: [/* @__PURE__ */ _jsxDEV(Rocket, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 7
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "text-sm font-semibold",
							children: "Our Journey"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 7
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 6
					}, this),
					/* @__PURE__ */ _jsxDEV("h2", {
						className: "mb-4 text-4xl font-bold text-gray-900 lg:text-5xl",
						children: ["Key ", /* @__PURE__ */ _jsxDEV("span", {
							className: "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500",
							children: "Milestones"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 6
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "mx-auto max-w-2xl text-lg text-gray-600",
						children: "A timeline of our growth, achievements, and the impact we have created."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 223,
						columnNumber: 6
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 5
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "relative",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute left-1/2 top-0 bottom-0 hidden w-1 -translate-x-1/2 overflow-hidden rounded-full bg-blue-100 lg:block",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-blue-500 via-orange-400 to-blue-500 transition-all duration-300",
						style: { height: `${Math.max(8, lineProgress * 100)}%` }
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 7
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 229,
					columnNumber: 6
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-12 lg:space-y-0",
					children: milestones.map((milestone, index) => {
						const Icon = milestone.icon;
						const isLeft = index % 2 === 0;
						const colorClasses = {
							blue: "from-blue-500 to-blue-600 shadow-blue-500/30",
							orange: "from-orange-400 to-orange-500 shadow-orange-500/30",
							green: "from-emerald-400 to-emerald-500 shadow-emerald-500/30",
							purple: "from-purple-500 to-purple-600 shadow-purple-500/30"
						};
						return /* @__PURE__ */ _jsxDEV("div", {
							className: `relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${isLeft ? "lg:flex lg:flex-row" : "lg:flex lg:flex-row-reverse"}`,
							style: { transitionDelay: `${index * 150}ms` },
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: `lg:w-5/12 ${isLeft ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`,
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: `group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${activeIndex === index ? "ring-2 ring-blue-200 shadow-blue-500/10" : ""}`,
										onMouseEnter: () => setActiveIndex(index),
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: `mb-4 flex items-center gap-4 ${isLeft ? "lg:flex-row-reverse" : ""}`,
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: `flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[milestone.color]} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${activeIndex === index ? "scale-110" : ""}`,
													children: /* @__PURE__ */ _jsxDEV(Icon, { className: "h-6 w-6 text-white" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 261,
														columnNumber: 14
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 260,
													columnNumber: 13
												}, this), /* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("span", {
													className: "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500",
													children: milestone.year
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 264,
													columnNumber: 14
												}, this) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 263,
													columnNumber: 13
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 259,
												columnNumber: 12
											}, this),
											/* @__PURE__ */ _jsxDEV("h3", {
												className: "mb-1 text-xl font-bold text-gray-900",
												children: milestone.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 269,
												columnNumber: 12
											}, this),
											/* @__PURE__ */ _jsxDEV("p", {
												className: "text-gray-600",
												children: milestone.description
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 270,
												columnNumber: 12
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 11
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 10
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: `absolute left-1/2 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-blue-500 bg-white z-10 transition-all duration-500 lg:flex ${activeIndex === index ? "scale-110 shadow-lg shadow-orange-500/30" : ""}`,
									children: /* @__PURE__ */ _jsxDEV("div", { className: `h-2 w-2 rounded-full bg-orange-500 transition-all duration-500 ${activeIndex === index ? "animate-ping opacity-100" : "opacity-30"}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 11
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 274,
									columnNumber: 10
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: `mt-6 lg:mt-0 lg:w-5/12 ${isLeft ? "lg:pl-16" : "lg:pr-16"}`,
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: `group relative h-48 overflow-hidden rounded-2xl shadow-lg transition-all duration-700 lg:h-56 ${activeIndex === index ? "scale-[1.03] shadow-blue-500/20" : "scale-100"} group-hover:-translate-y-1`,
										children: [
											/* @__PURE__ */ _jsxDEV("img", {
												src: milestone.image,
												alt: milestone.title,
												className: "h-full w-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 280,
												columnNumber: 12
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 281,
												columnNumber: 12
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "absolute bottom-4 left-4 right-4",
												children: /* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center gap-2 text-white transition-transform duration-500 group-hover:translate-x-1",
													children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "h-5 w-5 text-green-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 284,
														columnNumber: 14
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "font-semibold",
														children: "Milestone Achieved"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 285,
														columnNumber: 14
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 283,
													columnNumber: 13
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 282,
												columnNumber: 12
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 11
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 10
								}, this)
							]
						}, `${milestone.year}-${milestone.title}`, true, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 9
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 236,
					columnNumber: 6
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 5
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 4
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 204,
		columnNumber: 3
	}, this);
}
_s2(Milestones, "7eKW3bWuabuJ7P5ythWRHE6UeWA=", false, function() {
	return [useSectionReveal];
});
_c2 = Milestones;
function AwardsSection() {
	_s3();
	const { isVisible, sectionRef } = useSectionReveal(.2);
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: sectionRef,
		id: "achievements",
		className: "relative overflow-hidden bg-white py-16 md:py-24",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "absolute inset-0",
			children: [/* @__PURE__ */ _jsxDEV("div", { className: "absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-30" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 306,
				columnNumber: 5
			}, this), /* @__PURE__ */ _jsxDEV("div", { className: "absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-100 blur-3xl opacity-30" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 307,
				columnNumber: 5
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 305,
			columnNumber: 4
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "relative mx-auto max-w-7xl px-6 lg:px-8",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: `mb-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-orange-700",
							children: [/* @__PURE__ */ _jsxDEV(Trophy, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 7
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-sm font-semibold",
								children: "Recognition"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 7
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 6
						}, this),
						/* @__PURE__ */ _jsxDEV("h2", {
							className: "mb-4 text-4xl font-bold text-gray-900 lg:text-5xl",
							children: ["Awards & ", /* @__PURE__ */ _jsxDEV("span", {
								className: "bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-600",
								children: "Certifications"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 16
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 6
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "mx-auto max-w-2xl text-lg text-gray-600",
							children: "Our commitment to excellence has been recognized by industry leaders and government bodies."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 319,
							columnNumber: 6
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 311,
					columnNumber: 5
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
					children: awards.map((award, index) => /* @__PURE__ */ _jsxDEV("div", {
						className: `group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
						style: { transitionDelay: `${index * 100}ms` },
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "relative h-60 w-full overflow-hidden",
							children: [/* @__PURE__ */ _jsxDEV("img", {
								src: award.image,
								alt: award.title,
								className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 332,
								columnNumber: 9
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-600 shadow-sm backdrop-blur-sm",
								children: award.year
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 9
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 331,
							columnNumber: 8
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mb-2",
									children: /* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-orange-500",
										children: award.organization
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 343,
										columnNumber: 10
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 9
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600",
									children: award.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 345,
									columnNumber: 9
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "mb-6 line-clamp-3 text-sm text-gray-500",
									children: award.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 348,
									columnNumber: 9
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mt-auto",
									children: /* @__PURE__ */ _jsxDEV("button", {
										className: "group/btn inline-flex items-center gap-1 text-sm font-bold text-blue-600 transition-colors hover:text-blue-800",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "relative",
											children: ["Read More", /* @__PURE__ */ _jsxDEV("span", { className: "absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover/btn:w-full" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 355,
												columnNumber: 12
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 353,
											columnNumber: 11
										}, this), /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "h-4 w-4 transition-transform group-hover/btn:translate-x-1" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 357,
											columnNumber: 11
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 10
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 9
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 8
						}, this)]
					}, award.title, true, {
						fileName: _jsxFileName,
						lineNumber: 326,
						columnNumber: 7
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 324,
					columnNumber: 5
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: `rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`,
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "mb-8 text-center",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "mb-2 text-2xl font-bold text-white",
							children: "Our Certifications"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 367,
							columnNumber: 7
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-blue-200",
							children: "Fully compliant with all statutory requirements"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 368,
							columnNumber: 7
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 366,
						columnNumber: 6
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6",
						children: certifications.map((cert) => /* @__PURE__ */ _jsxDEV("div", {
							className: "group rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110",
									children: /* @__PURE__ */ _jsxDEV(BadgeCheck, { className: "h-5 w-5 text-white" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 10
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 9
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-sm font-semibold text-white",
									children: cert.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 377,
									columnNumber: 9
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "mt-1 text-xs text-blue-200",
									children: cert.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 378,
									columnNumber: 9
								}, this)
							]
						}, cert.name, true, {
							fileName: _jsxFileName,
							lineNumber: 373,
							columnNumber: 8
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 371,
						columnNumber: 6
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 365,
					columnNumber: 5
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 310,
			columnNumber: 4
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 304,
		columnNumber: 3
	}, this);
}
_s3(AwardsSection, "20dkozCUu9QID43EuLMLPQMX0t8=", false, function() {
	return [useSectionReveal];
});
_c3 = AwardsSection;
function TestimonialsSection() {
	_s4();
	const { isVisible, sectionRef } = useSectionReveal(.2);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	useEffect(() => {
		if (!isAutoPlaying) return undefined;
		const timer = window.setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % testimonials.length);
		}, 5e3);
		return () => window.clearInterval(timer);
	}, [isAutoPlaying]);
	const currentTestimonial = testimonials[activeIndex];
	const handlePrev = () => {
		setIsAutoPlaying(false);
		setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};
	const handleNext = () => {
		setIsAutoPlaying(false);
		setActiveIndex((prev) => (prev + 1) % testimonials.length);
	};
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: sectionRef,
		className: "relative w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 md:p-10",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: `text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700",
						children: [/* @__PURE__ */ _jsxDEV(Quote, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 6
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "text-sm font-semibold",
							children: "Client Stories"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 421,
							columnNumber: 6
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 419,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-3xl md:text-5xl font-extrabold text-slate-900 mb-4",
						children: ["What Our ", /* @__PURE__ */ _jsxDEV("span", {
							className: "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500",
							children: "Clients Say"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 423,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-slate-600 max-w-2xl mx-auto text-sm md:text-base",
						children: "Hear from industry leaders who have transformed their workforce management with TSPL Group."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 426,
						columnNumber: 5
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 418,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: `relative w-full max-w-5xl flex items-center justify-center transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`,
				children: [
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: handlePrev,
						className: "hidden md:flex absolute -left-6 lg:-left-12 bg-white rounded-full p-3 shadow-md hover:shadow-lg text-slate-500 hover:text-orange-500 transition-all z-10",
						"aria-label": "Previous testimonial",
						children: /* @__PURE__ */ _jsxDEV(ChevronLeft, { className: "w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 440,
							columnNumber: 6
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 435,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-col md:flex-row w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "w-full md:w-[40%] bg-[#0A2647] p-8 md:p-10 flex flex-col items-center justify-center relative min-h-[280px] md:min-h-[420px]",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "absolute inset-0 opacity-10",
								style: {
									backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
									backgroundSize: "20px 20px"
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 449,
								columnNumber: 7
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "relative z-10 flex flex-col items-center text-center space-y-6",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "h-24 w-32 md:h-28 md:w-40 flex items-center justify-center bg-white rounded-xl p-3 shadow-lg",
									children: /* @__PURE__ */ _jsxDEV("img", {
										src: currentTestimonial.logo,
										alt: currentTestimonial.company,
										className: "max-h-full max-w-full object-contain",
										onError: (e) => {
											e.target.style.display = "none";
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 454,
										columnNumber: 9
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 8
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("h3", {
									className: "text-white text-lg md:text-2xl font-bold tracking-tight leading-tight",
									children: currentTestimonial.company
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 464,
									columnNumber: 9
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 463,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 452,
								columnNumber: 7
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 447,
							columnNumber: 6
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center bg-white relative",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex text-[#F97316] text-lg md:text-xl mb-4 gap-1",
									children: Array.from({ length: currentTestimonial.rating }).map((_, i) => /* @__PURE__ */ _jsxDEV("span", { children: "★" }, i, false, {
										fileName: _jsxFileName,
										lineNumber: 477,
										columnNumber: 9
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 7
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[#F97316] opacity-80 text-6xl font-serif leading-none h-10 mb-4",
									children: "“"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 7
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-800 text-base md:text-lg leading-relaxed mb-8",
									children: currentTestimonial.quote
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 487,
									columnNumber: 7
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-4 mt-auto",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg md:text-xl font-bold text-white flex-shrink-0",
										children: currentTestimonial.author.charAt(0)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 493,
										columnNumber: 8
									}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
										className: "font-bold text-slate-900 text-base md:text-lg",
										children: currentTestimonial.author
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 497,
										columnNumber: 9
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-slate-500 text-xs md:text-sm font-medium",
										children: currentTestimonial.position
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 498,
										columnNumber: 9
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 496,
										columnNumber: 8
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 492,
									columnNumber: 7
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 472,
							columnNumber: 6
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 444,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: handleNext,
						className: "hidden md:flex absolute -right-6 lg:-right-12 bg-white rounded-full p-3 shadow-md hover:shadow-lg text-slate-500 hover:text-orange-500 transition-all z-10",
						"aria-label": "Next testimonial",
						children: /* @__PURE__ */ _jsxDEV(ChevronRight, { className: "w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 511,
							columnNumber: 6
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 506,
						columnNumber: 5
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 432,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex gap-3 mt-10 items-center justify-center",
				children: [
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: handlePrev,
						className: "md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:text-orange-500 transition-colors",
						"aria-label": "Previous testimonial",
						children: /* @__PURE__ */ _jsxDEV(ChevronLeft, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 524,
							columnNumber: 6
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex gap-2 items-center",
						children: testimonials.map((_, index) => /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => {
								setIsAutoPlaying(false);
								setActiveIndex(index);
							},
							className: `rounded-full cursor-pointer transition-all ${index === activeIndex ? "w-10 h-2 bg-[#0A2647]" : "w-3 h-3 bg-[#F97316] opacity-50 hover:opacity-100"}`,
							"aria-label": `Show testimonial ${index + 1}`
						}, index, false, {
							fileName: _jsxFileName,
							lineNumber: 530,
							columnNumber: 7
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 528,
						columnNumber: 5
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: handleNext,
						className: "md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:text-orange-500 transition-colors",
						"aria-label": "Next testimonial",
						children: /* @__PURE__ */ _jsxDEV(ChevronRight, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 548,
							columnNumber: 6
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 543,
						columnNumber: 5
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 517,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: `mt-16 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
				children: [/* @__PURE__ */ _jsxDEV("p", {
					className: "mb-8 text-center text-gray-500 text-sm md:text-base",
					children: "Trusted by leading companies across India"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 554,
					columnNumber: 5
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-center gap-6 opacity-60 lg:gap-12",
					children: [
						"Tata Motors",
						"Mahindra",
						"Bajaj Auto",
						"Hero",
						"Maruti",
						"L&T"
					].map((company) => /* @__PURE__ */ _jsxDEV("div", {
						className: "cursor-pointer text-lg md:text-xl font-bold text-gray-400 transition-colors hover:text-blue-600",
						children: company
					}, company, false, {
						fileName: _jsxFileName,
						lineNumber: 557,
						columnNumber: 7
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 555,
					columnNumber: 5
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 553,
				columnNumber: 4
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 416,
		columnNumber: 3
	}, this);
}
_s4(TestimonialsSection, "jQsZPp5lpAQtrQYOXSQOklc/x/k=", false, function() {
	return [useSectionReveal];
});
_c4 = TestimonialsSection;
function AchievementsCta() {
	_s5();
	const { isVisible, sectionRef } = useSectionReveal(.2);
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: sectionRef,
		className: "relative overflow-hidden bg-white py-16 md:py-24",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "absolute inset-0",
			children: /* @__PURE__ */ _jsxDEV("div", { className: "absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100 via-white to-orange-100 blur-3xl opacity-50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 573,
				columnNumber: 5
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 572,
			columnNumber: 4
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "relative mx-auto max-w-7xl px-6 lg:px-8",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: `mb-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
				children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "mb-4 text-4xl font-bold text-gray-900 lg:text-5xl",
					children: ["Be Part of Our ", /* @__PURE__ */ _jsxDEV("span", {
						className: "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500",
						children: "Success Story"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 579,
						columnNumber: 22
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 578,
					columnNumber: 6
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "mx-auto max-w-2xl text-lg text-gray-600",
					children: "Join hundreds of companies who have transformed their workforce management with TSPL Group."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 581,
					columnNumber: 6
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 577,
				columnNumber: 5
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: `grid gap-8 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} md:grid-cols-3`,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "group rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:scale-110",
								children: /* @__PURE__ */ _jsxDEV(Building2, { className: "h-7 w-7" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 8
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 588,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("h3", {
								className: "mb-4 text-2xl font-bold",
								children: "For Companies"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 591,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "mb-6 text-blue-100",
								children: "Get reliable manpower, payroll management, and statutory compliance - all under one roof."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 592,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV(Link, {
								to: "/b2b",
								className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50",
								children: ["Partner With Us", /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 597,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 595,
								columnNumber: 7
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 587,
						columnNumber: 6
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "group rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:scale-110",
								children: /* @__PURE__ */ _jsxDEV(Users, { className: "h-7 w-7" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 603,
									columnNumber: 8
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 602,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("h3", {
								className: "mb-4 text-2xl font-bold",
								children: "For Job Seekers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "mb-6 text-orange-100",
								children: "Find your dream job with India's leading manpower company. We have opportunities for all skill levels."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 606,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV(Link, {
								to: "/skilled",
								className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50",
								children: ["Browse Jobs", /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 611,
									columnNumber: 8
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 609,
								columnNumber: 7
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 601,
						columnNumber: 6
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "group rounded-3xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform group-hover:scale-110",
								children: /* @__PURE__ */ _jsxDEV(Trophy, { className: "h-7 w-7 text-white" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 617,
									columnNumber: 8
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 616,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("h3", {
								className: "mb-4 text-2xl font-bold text-gray-900",
								children: "Get In Touch"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 619,
								columnNumber: 7
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ _jsxDEV("a", {
										href: "tel:+919876543210",
										className: "flex items-center gap-3 text-gray-600 transition-colors hover:text-blue-600",
										children: [/* @__PURE__ */ _jsxDEV(Phone, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 622,
											columnNumber: 9
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "+91 98765 43210" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 623,
											columnNumber: 9
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 621,
										columnNumber: 8
									}, this),
									/* @__PURE__ */ _jsxDEV("a", {
										href: "mailto:info@tsplgroup.com",
										className: "flex items-center gap-3 text-gray-600 transition-colors hover:text-blue-600",
										children: [/* @__PURE__ */ _jsxDEV(Mail, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 626,
											columnNumber: 9
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "info@tsplgroup.com" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 627,
											columnNumber: 9
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 625,
										columnNumber: 8
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-start gap-3 text-gray-600",
										children: [/* @__PURE__ */ _jsxDEV(MapPin, { className: "mt-0.5 h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 630,
											columnNumber: 9
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Mumbai, Maharashtra, India" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 631,
											columnNumber: 9
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 629,
										columnNumber: 8
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 620,
								columnNumber: 7
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 615,
						columnNumber: 6
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 586,
				columnNumber: 5
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 576,
			columnNumber: 4
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 571,
		columnNumber: 3
	}, this);
}
_s5(AchievementsCta, "20dkozCUu9QID43EuLMLPQMX0t8=", false, function() {
	return [useSectionReveal];
});
_c5 = AchievementsCta;
export default function AchimentPage() {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-slate-50 text-slate-900",
		children: [
			/* @__PURE__ */ _jsxDEV(Navbar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 644,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV("main", { children: [
				/* @__PURE__ */ _jsxDEV(AwardsHero, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 646,
					columnNumber: 5
				}, this),
				/* @__PURE__ */ _jsxDEV(AwardsSection, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 648,
					columnNumber: 5
				}, this),
				/* @__PURE__ */ _jsxDEV(TestimonialsSection, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 649,
					columnNumber: 5
				}, this),
				/* @__PURE__ */ _jsxDEV(AchievementsCta, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 650,
					columnNumber: 5
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 645,
				columnNumber: 4
			}, this),
			/* @__PURE__ */ _jsxDEV(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 652,
				columnNumber: 4
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 643,
		columnNumber: 3
	}, this);
}
_c6 = AchimentPage;
var _c, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "AwardsHero");
$RefreshReg$(_c2, "Milestones");
$RefreshReg$(_c3, "AwardsSection");
$RefreshReg$(_c4, "TestimonialsSection");
$RefreshReg$(_c5, "AchievementsCta");
$RefreshReg$(_c6, "AchimentPage");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/pages/achiment.jsx?t=1777693633446";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/pages/achiment.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/pages/achiment.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/pages/achiment.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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OztHQUNWLHdCQUFDLFFBQUQ7SUFDQyx3QkFBQyxZQUFELEVBQWM7Ozs7O0lBRWQsd0JBQUMsZUFBRCxFQUFpQjs7Ozs7SUFDakIsd0JBQUMscUJBQUQsRUFBdUI7Ozs7O0lBQ3ZCLHdCQUFDLGlCQUFELEVBQW1COzs7OztJQUNiOzs7OztHQUNQLHdCQUFDLFFBQUQsRUFBVTs7Ozs7R0FDTCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJhY2hpbWVudC5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQge1xyXG5cdFRyb3BoeSxcclxuXHRNZWRhbCxcclxuXHRBd2FyZCxcclxuXHRTdGFyLFxyXG5cdFNoaWVsZCxcclxuXHRCYWRnZUNoZWNrLFxyXG5cdEFycm93UmlnaHQsXHJcblx0UGhvbmUsXHJcblx0TWFpbCxcclxuXHRNYXBQaW4sXHJcblx0VXNlcnMsXHJcblx0QnVpbGRpbmcyLFxyXG5cdFF1b3RlLFxyXG5cdENoZXZyb25MZWZ0LFxyXG5cdENoZXZyb25SaWdodCxcclxuXHRUcmVuZGluZ1VwLFxyXG5cdFJvY2tldCxcclxuXHRHbG9iZSxcclxuXHRDaGVja0NpcmNsZTIsXHJcbn0gZnJvbSAnbHVjaWRlLXJlYWN0J1xyXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2NvbXBvbmVudHMvTmF2YmFyJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyJ1xyXG5pbXBvcnQgeyBnZXRQYWdlQXNzZXQsIHVzZVBhZ2VBc3NldHMgfSBmcm9tICcuLi9ob29rcy91c2VQYWdlQXNzZXRzJ1xyXG5pbXBvcnQgeyB1c2VTZWN0aW9uUmV2ZWFsIH0gZnJvbSAnLi4vaG9va3MvdXNlU2VjdGlvblJldmVhbCdcclxuaW1wb3J0IGhlcm9JbWFnZSBmcm9tICcuLi9hc3NldHMvaGVyby5wbmcnXHJcbmZ1bmN0aW9uIEF3YXJkc0hlcm8oKSB7XHJcblx0Y29uc3QgeyBpc1Zpc2libGUsIHNlY3Rpb25SZWYgfSA9IHVzZVNlY3Rpb25SZXZlYWwoMC4yNSlcclxuXHRjb25zdCBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlKHsgeWVhcnM6IDAsIHdvcmtlcnM6IDAsIGNsaWVudHM6IDAsIGF3YXJkc1dvbjogMCB9KVxyXG5cdGNvbnN0IHBhZ2VBc3NldHMgPSB1c2VQYWdlQXNzZXRzKClcclxuXHRjb25zdCBhY2hpZXZlbWVudHNIZXJvQXNzZXQgPSBnZXRQYWdlQXNzZXQocGFnZUFzc2V0cywgJ2FjaGlldmVtZW50cy5oZXJvJywgaGVyb0ltYWdlLCAnVFNQTCBhY2hpZXZlbWVudHMnKVxyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0Y29uc3QgZHVyYXRpb24gPSAyMDAwXHJcblx0XHRjb25zdCBzdGVwcyA9IDYwXHJcblx0XHRjb25zdCBpbnRlcnZhbCA9IGR1cmF0aW9uIC8gc3RlcHNcclxuXHJcblx0XHRsZXQgc3RlcCA9IDBcclxuXHRcdGNvbnN0IHRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0c3RlcCArPSAxXHJcblx0XHRcdGNvbnN0IHByb2dyZXNzID0gc3RlcCAvIHN0ZXBzXHJcblx0XHRcdGNvbnN0IGVhc2VPdXQgPSAxIC0gKDEgLSBwcm9ncmVzcykgKiogM1xyXG5cclxuXHRcdFx0c2V0Q291bnQoe1xyXG5cdFx0XHRcdHllYXJzOiBNYXRoLmZsb29yKDE1ICogZWFzZU91dCksXHJcblx0XHRcdFx0d29ya2VyczogTWF0aC5mbG9vcig0MDAwMCAqIGVhc2VPdXQpLFxyXG5cdFx0XHRcdGNsaWVudHM6IE1hdGguZmxvb3IoNDUwICogZWFzZU91dCksXHJcblx0XHRcdFx0YXdhcmRzV29uOiBNYXRoLmZsb29yKDYgKiBlYXNlT3V0KSxcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdGlmIChzdGVwID49IHN0ZXBzKSB7XHJcblx0XHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGltZXIpXHJcblx0XHRcdH1cclxuXHRcdH0sIGludGVydmFsKVxyXG5cclxuXHRcdHJldHVybiAoKSA9PiB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcilcclxuXHR9LCBbXSlcclxuXHJcblx0Y29uc3Qgc3RhdHMgPSBbXHJcblx0XHR7IGljb246IFRyZW5kaW5nVXAsIHZhbHVlOiBgJHtjb3VudC55ZWFyc30rYCwgbGFiZWw6ICdZZWFycyBvZiBFeGNlbGxlbmNlJyB9LFxyXG5cdFx0eyBpY29uOiBTdGFyLCB2YWx1ZTogYCR7Y291bnQud29ya2Vycy50b0xvY2FsZVN0cmluZygpfStgLCBsYWJlbDogJ1dvcmtlcnMgUGxhY2VkJyB9LFxyXG5cdFx0eyBpY29uOiBBd2FyZCwgdmFsdWU6IGAke2NvdW50LmNsaWVudHN9K2AsIGxhYmVsOiAnSGFwcHkgQ2xpZW50cycgfSxcclxuXHRcdHsgaWNvbjogVHJvcGh5LCB2YWx1ZTogYCR7Y291bnQuYXdhcmRzV29ufStgLCBsYWJlbDogJ0F3YXJkcyBXb24nIH0sXHJcblx0XVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNlY3Rpb24gcmVmPXtzZWN0aW9uUmVmfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtaW4taC1bNzh2aF0gb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlIHB0LTE2IG1kOm1pbi1oLVs5MHZoXSBtZDpwdC0yNFwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTBcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctY292ZXIgYmctY2VudGVyXCIgc3R5bGU9e3sgYmFja2dyb3VuZEltYWdlOiBgdXJsKCcke2FjaGlldmVtZW50c0hlcm9Bc3NldC51cmx9JylgIH19IC8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS13aGl0ZSB2aWEtd2hpdGUvOTAgdG8td2hpdGUvNjBcIiAvPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1iIGZyb20td2hpdGUvNzAgdmlhLXRyYW5zcGFyZW50IHRvLXdoaXRlXCIgLz5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgb3BhY2l0eS1bMC4wM11cIj5cclxuXHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cImgtZnVsbCB3LWZ1bGxcIj5cclxuXHRcdFx0XHRcdDxwYXR0ZXJuIGlkPVwiYWNoaWV2ZW1lbnQtcGF0dGVyblwiIHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjYwXCIgaGVpZ2h0PVwiNjBcIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxyXG5cdFx0XHRcdFx0XHQ8Y2lyY2xlIGN4PVwiMzBcIiBjeT1cIjMwXCIgcj1cIjEuNVwiIGZpbGw9XCIjMjU2M0VCXCIgLz5cclxuXHRcdFx0XHRcdDwvcGF0dGVybj5cclxuXHRcdFx0XHRcdDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidXJsKCNhY2hpZXZlbWVudC1wYXR0ZXJuKVwiIC8+XHJcblx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBteC1hdXRvIG1heC13LTd4bCBweC02IHB5LTEwIG1kOnB5LTE2IGxnOnB4LThcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWQgaXRlbXMtY2VudGVyIGdhcC0xMCBtZDpnYXAtMTIgbGc6Z3JpZC1jb2xzLTJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgc3BhY2UteS04IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTEwMDAgJHtpc1Zpc2libGUgPyAnb3BhY2l0eS0xMDAgdHJhbnNsYXRlLXgtMCcgOiAnb3BhY2l0eS0wIC10cmFuc2xhdGUteC0xMid9YH0+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tYmx1ZS03MDAgcHgtNCBweS0yIHNoYWRvdy1sZyBzaGFkb3ctYmx1ZS01MDAvMjVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8VHJvcGh5IGNsYXNzTmFtZT1cImgtNCB3LTQgdGV4dC13aGl0ZVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj5PdXIgSm91cm5leSBvZiBTdWNjZXNzPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTV4bCBmb250LWJvbGQgbGVhZGluZy10aWdodCB0ZXh0LWdyYXktOTAwIGxnOnRleHQtN3hsXCI+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiYmxvY2tcIj5DZWxlYnJhdGluZzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtdC0yIGlubGluZS1ibG9jayBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdmlhLWJsdWUtNTAwIHRvLW9yYW5nZS01MDBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEV4Y2VsbGVuY2VcclxuXHRcdFx0XHRcdFx0XHRcdDxzdmcgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWJvdHRvbS0yIGxlZnQtMCB3LWZ1bGxcIiB2aWV3Qm94PVwiMCAwIDMwMCAxMlwiIGZpbGw9XCJub25lXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMiAxMEM1MCAyIDE1MCAyIDI5OCAxMFwiIHN0cm9rZT1cInVybCgjZ3JhZC1saW5lKVwiIHN0cm9rZVdpZHRoPVwiNFwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxkZWZzPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWQtbGluZVwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMzAwXCIgeTI9XCIwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3RvcCBzdG9wQ29sb3I9XCIjMjU2M0VCXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjRjk3MzE2XCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xpbmVhckdyYWRpZW50PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2RlZnM+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvaDE+XHJcblxyXG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtYXgtdy1sZyB0ZXh0LXhsIGxlYWRpbmctcmVsYXhlZCB0ZXh0LWdyYXktNjAwXCI+XHJcblx0XHRcdFx0XHRcdFx0Rm9yIG92ZXIgMTUgeWVhcnMsIFRTUEwgR3JvdXAgaGFzIGJlZW4gdHJhbnNmb3JtaW5nIGxpdmVzIGFuZCBidXNpbmVzc2VzIHRocm91Z2ggZGVkaWNhdGVkIHNlcnZpY2UgYW5kIHVud2F2ZXJpbmcgY29tbWl0bWVudC5cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtNFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxMaW5rXHJcblx0XHRcdFx0XHRcdFx0XHR0bz1cIi9jb250YWN0LXVzXCJcclxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiByb3VuZGVkLXhsIGJnLVsjRjk3MzE2XSBweC02IHB5LTMgZm9udC1ib2xkIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1bI0Y5NzMxNl0vMzAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIGhvdmVyOnNjYWxlLTEwNSBob3ZlcjpiZy1bI0VBNTgwQ11cIlxyXG5cdFx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHRcdEdldCBpbiBUb3VjaFxyXG5cdFx0XHRcdFx0XHRcdFx0PEFycm93UmlnaHQgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDxMaW5rXHJcblx0XHRcdFx0XHRcdFx0XHR0bz1cIi9jbGllbnRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1ibHVlLTIwMCBiZy13aGl0ZSBweC02IHB5LTMgZm9udC1ib2xkIHRleHQtYmx1ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwIGhvdmVyOmJvcmRlci1ibHVlLTMwMCBob3ZlcjpiZy1ibHVlLTUwXCJcclxuXHRcdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0XHRWaWV3IENsaWVudHNcclxuXHRcdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xMDAwIGRlbGF5LTMwMCAke2lzVmlzaWJsZSA/ICdvcGFjaXR5LTEwMCB0cmFuc2xhdGUteC0wJyA6ICdvcGFjaXR5LTAgdHJhbnNsYXRlLXgtMTInfWB9PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG14LWF1dG8gaC04MCB3LTgwIGxnOmgtWzI4cmVtXSBsZzp3LVsyOHJlbV1cIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJvcmRlci00IGJvcmRlci1ibHVlLTIwMCBvcGFjaXR5LTIwIGFuaW1hdGUtcGluZ1wiIC8+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC00IHJvdW5kZWQtZnVsbCBib3JkZXItNCBib3JkZXItb3JhbmdlLTIwMCBvcGFjaXR5LTIwIGFuaW1hdGUtcGluZ1wiIC8+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC04IHJvdW5kZWQtZnVsbCBib3JkZXItNCBib3JkZXItYmx1ZS0zMDAgb3BhY2l0eS0yMCBhbmltYXRlLXBpbmdcIiAvPlxyXG5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTEyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1vcmFuZ2UtNDAwIHZpYS1vcmFuZ2UtNTAwIHRvLW9yYW5nZS02MDAgc2hhZG93LTJ4bCBzaGFkb3ctb3JhbmdlLTUwMC80MFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2FjaGlldmVtZW50c0hlcm9Bc3NldC51cmx9IGFsdD17YWNoaWV2ZW1lbnRzSGVyb0Fzc2V0LmFsdH0gY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbCBvYmplY3QtY292ZXIgb3BhY2l0eS0yNVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8VHJvcGh5IGNsYXNzTmFtZT1cImFic29sdXRlIGgtMjQgdy0yNCB0ZXh0LXdoaXRlIGRyb3Atc2hhZG93LWxnXCIgLz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTEvMiB0b3AtMCAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0yXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC0xNiB3LTE2IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGJnLXdoaXRlIHNoYWRvdy14bCBhbmltYXRlLWJvdW5jZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiPiMxPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC0xNCB3LTE0IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGJnLXdoaXRlIHNoYWRvdy14bFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIi9pbWFnZXMtMTAuanBlZ1wiIGFsdD1cIlJlY29nbml0aW9uXCIgY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbCBvYmplY3QtY292ZXJcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgcmlnaHQtMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTQgdy0xNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIGJnLXdoaXRlIHNoYWRvdy14bFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8QXdhcmQgY2xhc3NOYW1lPVwiaC03IHctNyB0ZXh0LW9yYW5nZS01MDBcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgbXQtMTAgZ3JpZCBncmlkLWNvbHMtMiBnYXAtNCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xMDAwIGRlbGF5LTUwMCBtZDptdC0xNiBtZDpnYXAtNiBtZDpncmlkLWNvbHMtNCAke2lzVmlzaWJsZSA/ICd0cmFuc2xhdGUteS0wIG9wYWNpdHktMTAwJyA6ICd0cmFuc2xhdGUteS04IG9wYWNpdHktMCd9YH0+XHJcblx0XHRcdFx0XHR7c3RhdHMubWFwKChzdGF0KSA9PiAoXHJcblx0XHRcdFx0XHRcdDxkaXYga2V5PXtzdGF0LmxhYmVsfSBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCBiZy13aGl0ZS84MCBwLTYgYmFja2Ryb3AtYmx1ci1zbSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6Ym9yZGVyLWJsdWUtMzAwIGhvdmVyOnNoYWRvdy14bCBob3ZlcjpzaGFkb3ctYmx1ZS01MDAvMTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ibHVlLTUwIHRvLW9yYW5nZS01MCBvcGFjaXR5LTAgdHJhbnNpdGlvbi1vcGFjaXR5IGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwXCIgLz5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTAgdy0xMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1iciBmcm9tLWJsdWUtNTAwIHRvLWJsdWUtNjAwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyOnNjYWxlLTExMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzdGF0Lmljb24gY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXdoaXRlXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tb3JhbmdlLTUwMCBsZzp0ZXh0LTR4bFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtzdGF0LnZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj57c3RhdC5sYWJlbH08L3A+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdClcclxufVxyXG5cclxuZnVuY3Rpb24gTWlsZXN0b25lcygpIHtcclxuXHRjb25zdCB7IGlzVmlzaWJsZSwgc2VjdGlvblJlZiB9ID0gdXNlU2VjdGlvblJldmVhbCgwLjIpXHJcblx0Y29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKVxyXG5cdGNvbnN0IFtsaW5lUHJvZ3Jlc3MsIHNldExpbmVQcm9ncmVzc10gPSB1c2VTdGF0ZSgwKVxyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0aWYgKCFpc1Zpc2libGUpIHtcclxuXHRcdFx0c2V0TGluZVByb2dyZXNzKDApXHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCB0aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdHNldExpbmVQcm9ncmVzcygoY3VycmVudCkgPT4gTWF0aC5taW4oY3VycmVudCArIDAuMDQsIDEpKVxyXG5cdFx0fSwgMjQpXHJcblxyXG5cdFx0cmV0dXJuICgpID0+IHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKVxyXG5cdH0sIFtpc1Zpc2libGVdKVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNlY3Rpb24gcmVmPXtzZWN0aW9uUmVmfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtNTAgcHktMTYgbWQ6cHktMjRcIj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktWzAuMDJdXCI+XHJcblx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJoLWZ1bGwgdy1mdWxsXCI+XHJcblx0XHRcdFx0XHQ8cGF0dGVybiBpZD1cIm1pbGVzdG9uZS1kb3RzXCIgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XHJcblx0XHRcdFx0XHRcdDxjaXJjbGUgY3g9XCIyMFwiIGN5PVwiMjBcIiByPVwiMVwiIGZpbGw9XCIjMjU2M0VCXCIgLz5cclxuXHRcdFx0XHRcdDwvcGF0dGVybj5cclxuXHRcdFx0XHRcdDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidXJsKCNtaWxlc3RvbmUtZG90cylcIiAvPlxyXG5cdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbXgtYXV0byBtYXgtdy03eGwgcHgtNiBsZzpweC04XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2BtYi0xNiB0ZXh0LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtpc1Zpc2libGUgPyAnb3BhY2l0eS0xMDAgdHJhbnNsYXRlLXktMCcgOiAnb3BhY2l0eS0wIHRyYW5zbGF0ZS15LTgnfWB9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYi02IGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiByb3VuZGVkLWZ1bGwgYmctYmx1ZS0xMDAgcHgtNCBweS0yIHRleHQtYmx1ZS03MDBcIj5cclxuXHRcdFx0XHRcdFx0PFJvY2tldCBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkXCI+T3VyIEpvdXJuZXk8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJtYi00IHRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIGxnOnRleHQtNXhsXCI+XHJcblx0XHRcdFx0XHRcdEtleSA8c3BhbiBjbGFzc05hbWU9XCJiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tb3JhbmdlLTUwMFwiPk1pbGVzdG9uZXM8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2gyPlxyXG5cdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibXgtYXV0byBtYXgtdy0yeGwgdGV4dC1sZyB0ZXh0LWdyYXktNjAwXCI+XHJcblx0XHRcdFx0XHRcdEEgdGltZWxpbmUgb2Ygb3VyIGdyb3d0aCwgYWNoaWV2ZW1lbnRzLCBhbmQgdGhlIGltcGFjdCB3ZSBoYXZlIGNyZWF0ZWQuXHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0xLzIgdG9wLTAgYm90dG9tLTAgaGlkZGVuIHctMSAtdHJhbnNsYXRlLXgtMS8yIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLWZ1bGwgYmctYmx1ZS0xMDAgbGc6YmxvY2tcIj5cclxuXHRcdFx0XHRcdFx0PGRpdlxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMCB0b3AtMCB3LWZ1bGwgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLWIgZnJvbS1ibHVlLTUwMCB2aWEtb3JhbmdlLTQwMCB0by1ibHVlLTUwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7IGhlaWdodDogYCR7TWF0aC5tYXgoOCwgbGluZVByb2dyZXNzICogMTAwKX0lYCB9fVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEyIGxnOnNwYWNlLXktMFwiPlxyXG5cdFx0XHRcdFx0XHR7bWlsZXN0b25lcy5tYXAoKG1pbGVzdG9uZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBJY29uID0gbWlsZXN0b25lLmljb25cclxuXHRcdFx0XHRcdFx0XHRjb25zdCBpc0xlZnQgPSBpbmRleCAlIDIgPT09IDBcclxuXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29sb3JDbGFzc2VzID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZTogJ2Zyb20tYmx1ZS01MDAgdG8tYmx1ZS02MDAgc2hhZG93LWJsdWUtNTAwLzMwJyxcclxuXHRcdFx0XHRcdFx0XHRcdG9yYW5nZTogJ2Zyb20tb3JhbmdlLTQwMCB0by1vcmFuZ2UtNTAwIHNoYWRvdy1vcmFuZ2UtNTAwLzMwJyxcclxuXHRcdFx0XHRcdFx0XHRcdGdyZWVuOiAnZnJvbS1lbWVyYWxkLTQwMCB0by1lbWVyYWxkLTUwMCBzaGFkb3ctZW1lcmFsZC01MDAvMzAnLFxyXG5cdFx0XHRcdFx0XHRcdFx0cHVycGxlOiAnZnJvbS1wdXJwbGUtNTAwIHRvLXB1cnBsZS02MDAgc2hhZG93LXB1cnBsZS01MDAvMzAnLFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdDxkaXZcclxuXHRcdFx0XHRcdFx0XHRcdFx0a2V5PXtgJHttaWxlc3RvbmUueWVhcn0tJHttaWxlc3RvbmUudGl0bGV9YH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtgcmVsYXRpdmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwICR7aXNWaXNpYmxlID8gJ29wYWNpdHktMTAwIHRyYW5zbGF0ZS15LTAnIDogJ29wYWNpdHktMCB0cmFuc2xhdGUteS04J30gJHtpc0xlZnQgPyAnbGc6ZmxleCBsZzpmbGV4LXJvdycgOiAnbGc6ZmxleCBsZzpmbGV4LXJvdy1yZXZlcnNlJ31gfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17eyB0cmFuc2l0aW9uRGVsYXk6IGAke2luZGV4ICogMTUwfW1zYCB9fVxyXG5cdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17YGxnOnctNS8xMiAke2lzTGVmdCA/ICdsZzpwci0xNiBsZzp0ZXh0LXJpZ2h0JyA6ICdsZzpwbC0xNid9YH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtgZ3JvdXAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1ncmF5LTEwMCBiZy13aGl0ZSBwLTYgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBob3ZlcjotdHJhbnNsYXRlLXktMSBob3ZlcjpzaGFkb3ctMnhsICR7YWN0aXZlSW5kZXggPT09IGluZGV4ID8gJ3JpbmctMiByaW5nLWJsdWUtMjAwIHNoYWRvdy1ibHVlLTUwMC8xMCcgOiAnJ31gfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2BtYi00IGZsZXggaXRlbXMtY2VudGVyIGdhcC00ICR7aXNMZWZ0ID8gJ2xnOmZsZXgtcm93LXJldmVyc2UnIDogJyd9YH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgZmxleCBoLTEyIHctMTIgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tYnIgJHtjb2xvckNsYXNzZXNbbWlsZXN0b25lLmNvbG9yXX0gc2hhZG93LWxnIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgZ3JvdXAtaG92ZXI6cm90YXRlLTMgJHthY3RpdmVJbmRleCA9PT0gaW5kZXggPyAnc2NhbGUtMTEwJyA6ICcnfWB9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uIGNsYXNzTmFtZT1cImgtNiB3LTYgdGV4dC13aGl0ZVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCBiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tb3JhbmdlLTUwMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e21pbGVzdG9uZS55ZWFyfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYi0xIHRleHQteGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIj57bWlsZXN0b25lLnRpdGxlfTwvaDM+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+e21pbGVzdG9uZS5kZXNjcmlwdGlvbn08L3A+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSBsZWZ0LTEvMiBoaWRkZW4gaC02IHctNiAtdHJhbnNsYXRlLXgtMS8yIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYm9yZGVyLTQgYm9yZGVyLWJsdWUtNTAwIGJnLXdoaXRlIHotMTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGxnOmZsZXggJHthY3RpdmVJbmRleCA9PT0gaW5kZXggPyAnc2NhbGUtMTEwIHNoYWRvdy1sZyBzaGFkb3ctb3JhbmdlLTUwMC8zMCcgOiAnJ31gfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17YGgtMiB3LTIgcm91bmRlZC1mdWxsIGJnLW9yYW5nZS01MDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwICR7YWN0aXZlSW5kZXggPT09IGluZGV4ID8gJ2FuaW1hdGUtcGluZyBvcGFjaXR5LTEwMCcgOiAnb3BhY2l0eS0zMCd9YH0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17YG10LTYgbGc6bXQtMCBsZzp3LTUvMTIgJHtpc0xlZnQgPyAnbGc6cGwtMTYnIDogJ2xnOnByLTE2J31gfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17YGdyb3VwIHJlbGF0aXZlIGgtNDggb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtMnhsIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgbGc6aC01NiAke2FjdGl2ZUluZGV4ID09PSBpbmRleCA/ICdzY2FsZS1bMS4wM10gc2hhZG93LWJsdWUtNTAwLzIwJyA6ICdzY2FsZS0xMDAnfSBncm91cC1ob3ZlcjotdHJhbnNsYXRlLXktMWB9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e21pbGVzdG9uZS5pbWFnZX0gYWx0PXttaWxlc3RvbmUudGl0bGV9IGNsYXNzTmFtZT1cImgtZnVsbCB3LWZ1bGwgb2JqZWN0LWNvdmVyXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svNjAgdmlhLWJsYWNrLzEwIHRvLXRyYW5zcGFyZW50IG9wYWNpdHktOTAgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTUwMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS00IGxlZnQtNCByaWdodC00XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDAgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXgtMVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LWdyZWVuLTQwMFwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPk1pbGVzdG9uZSBBY2hpZXZlZDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdH0pfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdClcclxufVxyXG5cclxuZnVuY3Rpb24gQXdhcmRzU2VjdGlvbigpIHtcclxuXHRjb25zdCB7IGlzVmlzaWJsZSwgc2VjdGlvblJlZiB9ID0gdXNlU2VjdGlvblJldmVhbCgwLjIpXHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8c2VjdGlvbiByZWY9e3NlY3Rpb25SZWZ9IGlkPVwiYWNoaWV2ZW1lbnRzXCIgY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlIHB5LTE2IG1kOnB5LTI0XCI+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCB0b3AtMCBoLTk2IHctOTYgcm91bmRlZC1mdWxsIGJnLWJsdWUtMTAwIGJsdXItM3hsIG9wYWNpdHktMzBcIiAvPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIGgtOTYgdy05NiByb3VuZGVkLWZ1bGwgYmctb3JhbmdlLTEwMCBibHVyLTN4bCBvcGFjaXR5LTMwXCIgLz5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG14LWF1dG8gbWF4LXctN3hsIHB4LTYgbGc6cHgtOFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgbWItMTYgdGV4dC1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwICR7aXNWaXNpYmxlID8gJ29wYWNpdHktMTAwIHRyYW5zbGF0ZS15LTAnIDogJ29wYWNpdHktMCB0cmFuc2xhdGUteS04J31gfT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWItNiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1mdWxsIGJnLW9yYW5nZS0xMDAgcHgtNCBweS0yIHRleHQtb3JhbmdlLTcwMFwiPlxyXG5cdFx0XHRcdFx0XHQ8VHJvcGh5IGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5SZWNvZ25pdGlvbjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cIm1iLTQgdGV4dC00eGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgbGc6dGV4dC01eGxcIj5cclxuXHRcdFx0XHRcdFx0QXdhcmRzICYgPHNwYW4gY2xhc3NOYW1lPVwiYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnQgYmctZ3JhZGllbnQtdG8tciBmcm9tLW9yYW5nZS01MDAgdG8tYmx1ZS02MDBcIj5DZXJ0aWZpY2F0aW9uczwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvaDI+XHJcblx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJteC1hdXRvIG1heC13LTJ4bCB0ZXh0LWxnIHRleHQtZ3JheS02MDBcIj5cclxuXHRcdFx0XHRcdFx0T3VyIGNvbW1pdG1lbnQgdG8gZXhjZWxsZW5jZSBoYXMgYmVlbiByZWNvZ25pemVkIGJ5IGluZHVzdHJ5IGxlYWRlcnMgYW5kIGdvdmVybm1lbnQgYm9kaWVzLlxyXG5cdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1iLTE2IGdyaWQgZ2FwLTggbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTNcIj5cclxuXHRcdFx0XHRcdHthd2FyZHMubWFwKChhd2FyZCwgaW5kZXgpID0+IChcclxuXHRcdFx0XHRcdFx0PGRpdlxyXG5cdFx0XHRcdFx0XHRcdGtleT17YXdhcmQudGl0bGV9XHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPXtgZ3JvdXAgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC0yeGwgYmctd2hpdGUgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjotdHJhbnNsYXRlLXktMiBob3ZlcjpzaGFkb3cteGwgJHtpc1Zpc2libGUgPyAndHJhbnNsYXRlLXktMCBvcGFjaXR5LTEwMCcgOiAndHJhbnNsYXRlLXktOCBvcGFjaXR5LTAnfWB9XHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3sgdHJhbnNpdGlvbkRlbGF5OiBgJHtpbmRleCAqIDEwMH1tc2AgfX1cclxuXHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC02MCB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW1nXHJcblx0XHRcdFx0XHRcdFx0XHRcdHNyYz17YXdhcmQuaW1hZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGFsdD17YXdhcmQudGl0bGV9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImgtZnVsbCB3LWZ1bGwgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBncm91cC1ob3ZlcjpzY2FsZS0xMDVcIlxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLWZ1bGwgYmctd2hpdGUvOTAgcHgtMyBweS0xIHRleHQteHMgZm9udC1ib2xkIHRleHQtYmx1ZS02MDAgc2hhZG93LXNtIGJhY2tkcm9wLWJsdXItc21cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e2F3YXJkLnllYXJ9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC0xIGZsZXgtY29sIHAtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYi0yXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1vcmFuZ2UtNTAwXCI+e2F3YXJkLm9yZ2FuaXphdGlvbn08L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYi0zIGxpbmUtY2xhbXAtMiB0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIHRyYW5zaXRpb24tY29sb3JzIGdyb3VwLWhvdmVyOnRleHQtYmx1ZS02MDBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e2F3YXJkLnRpdGxlfVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1iLTYgbGluZS1jbGFtcC0zIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7YXdhcmQuZGVzY3JpcHRpb259XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm10LWF1dG9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJncm91cC9idG4gaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc20gZm9udC1ib2xkIHRleHQtYmx1ZS02MDAgdHJhbnNpdGlvbi1jb2xvcnMgaG92ZXI6dGV4dC1ibHVlLTgwMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRSZWFkIE1vcmVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC1ib3R0b20tMSBsZWZ0LTAgaC0wLjUgdy0wIGJnLWJsdWUtNjAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBncm91cC1ob3Zlci9idG46dy1mdWxsXCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8QXJyb3dSaWdodCBjbGFzc05hbWU9XCJoLTQgdy00IHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyL2J0bjp0cmFuc2xhdGUteC0xXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2Byb3VuZGVkLTN4bCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdmlhLWJsdWUtNzAwIHRvLWJsdWUtODAwIHAtOCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtpc1Zpc2libGUgPyAnc2NhbGUtMTAwIG9wYWNpdHktMTAwJyA6ICdzY2FsZS05NSBvcGFjaXR5LTAnfWB9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYi04IHRleHQtY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYi0yIHRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+T3VyIENlcnRpZmljYXRpb25zPC9oMz5cclxuXHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTIwMFwiPkZ1bGx5IGNvbXBsaWFudCB3aXRoIGFsbCBzdGF0dXRvcnkgcmVxdWlyZW1lbnRzPC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy02XCI+XHJcblx0XHRcdFx0XHRcdHtjZXJ0aWZpY2F0aW9ucy5tYXAoKGNlcnQpID0+IChcclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGtleT17Y2VydC5uYW1lfSBjbGFzc05hbWU9XCJncm91cCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvMTAgcC00IHRleHQtY2VudGVyIGJhY2tkcm9wLWJsdXItc20gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOmJvcmRlci13aGl0ZS8zMCBob3ZlcjpiZy13aGl0ZS8yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJteC1hdXRvIG1iLTMgZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy13aGl0ZS8yMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBncm91cC1ob3ZlcjpzY2FsZS0xMTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PEJhZGdlQ2hlY2sgY2xhc3NOYW1lPVwiaC01IHctNSB0ZXh0LXdoaXRlXCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj57Y2VydC5uYW1lfTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyB0ZXh0LWJsdWUtMjAwXCI+e2NlcnQuZGVzY308L3A+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdClcclxufVxyXG5cclxuZnVuY3Rpb24gVGVzdGltb25pYWxzU2VjdGlvbigpIHtcclxuXHRjb25zdCB7IGlzVmlzaWJsZSwgc2VjdGlvblJlZiB9ID0gdXNlU2VjdGlvblJldmVhbCgwLjIpXHJcblx0Y29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKVxyXG5cdGNvbnN0IFtpc0F1dG9QbGF5aW5nLCBzZXRJc0F1dG9QbGF5aW5nXSA9IHVzZVN0YXRlKHRydWUpXHJcblxyXG5cdHVzZUVmZmVjdCgoKSA9PiB7XHJcblx0XHRpZiAoIWlzQXV0b1BsYXlpbmcpIHJldHVybiB1bmRlZmluZWRcclxuXHJcblx0XHRjb25zdCB0aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdHNldEFjdGl2ZUluZGV4KChwcmV2KSA9PiAocHJldiArIDEpICUgdGVzdGltb25pYWxzLmxlbmd0aClcclxuXHRcdH0sIDUwMDApXHJcblxyXG5cdFx0cmV0dXJuICgpID0+IHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKVxyXG5cdH0sIFtpc0F1dG9QbGF5aW5nXSlcclxuXHJcblx0Y29uc3QgY3VycmVudFRlc3RpbW9uaWFsID0gdGVzdGltb25pYWxzW2FjdGl2ZUluZGV4XVxyXG5cclxuXHRjb25zdCBoYW5kbGVQcmV2ID0gKCkgPT4ge1xyXG5cdFx0c2V0SXNBdXRvUGxheWluZyhmYWxzZSlcclxuXHRcdHNldEFjdGl2ZUluZGV4KChwcmV2KSA9PiAocHJldiAtIDEgKyB0ZXN0aW1vbmlhbHMubGVuZ3RoKSAlIHRlc3RpbW9uaWFscy5sZW5ndGgpXHJcblx0fVxyXG5cclxuXHRjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xyXG5cdFx0c2V0SXNBdXRvUGxheWluZyhmYWxzZSlcclxuXHRcdHNldEFjdGl2ZUluZGV4KChwcmV2KSA9PiAocHJldiArIDEpICUgdGVzdGltb25pYWxzLmxlbmd0aClcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8c2VjdGlvbiByZWY9e3NlY3Rpb25SZWZ9IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBtaW4taC1zY3JlZW4gYmctWyNmOGZhZmNdIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBtZDpwLTEwXCI+XHJcblx0XHRcdHsvKiBIZWFkZXIgU2VjdGlvbiAqL31cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2B0ZXh0LWNlbnRlciBtYi0xNiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtpc1Zpc2libGUgPyAnb3BhY2l0eS0xMDAgdHJhbnNsYXRlLXktMCcgOiAnb3BhY2l0eS0wIHRyYW5zbGF0ZS15LTgnfWB9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWItNiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1mdWxsIGJnLWJsdWUtMTAwIHB4LTQgcHktMiB0ZXh0LWJsdWUtNzAwXCI+XHJcblx0XHRcdFx0XHQ8UXVvdGUgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5DbGllbnQgU3Rvcmllczwvc3Bhbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8aDIgY2xhc3NOYW1lPVwidGV4dC0zeGwgbWQ6dGV4dC01eGwgZm9udC1leHRyYWJvbGQgdGV4dC1zbGF0ZS05MDAgbWItNFwiPlxyXG5cdFx0XHRcdFx0V2hhdCBPdXIgPHNwYW4gY2xhc3NOYW1lPVwiYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNjAwIHRvLW9yYW5nZS01MDBcIj5DbGllbnRzIFNheTwvc3Bhbj5cclxuXHRcdFx0XHQ8L2gyPlxyXG5cdFx0XHRcdDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIG1heC13LTJ4bCBteC1hdXRvIHRleHQtc20gbWQ6dGV4dC1iYXNlXCI+XHJcblx0XHRcdFx0XHRIZWFyIGZyb20gaW5kdXN0cnkgbGVhZGVycyB3aG8gaGF2ZSB0cmFuc2Zvcm1lZCB0aGVpciB3b3JrZm9yY2UgbWFuYWdlbWVudCB3aXRoIFRTUEwgR3JvdXAuXHJcblx0XHRcdFx0PC9wPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdHsvKiBDYXJvdXNlbCBDb250YWluZXIgKi99XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy1mdWxsIG1heC13LTV4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtpc1Zpc2libGUgPyAnc2NhbGUtMTAwIG9wYWNpdHktMTAwJyA6ICdzY2FsZS05NSBvcGFjaXR5LTAnfWB9PlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHsvKiBMZWZ0IEFycm93IChIaWRkZW4gb24gbW9iaWxlKSAqL31cclxuXHRcdFx0XHQ8YnV0dG9uIFxyXG5cdFx0XHRcdFx0b25DbGljaz17aGFuZGxlUHJldn1cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGFic29sdXRlIC1sZWZ0LTYgbGc6LWxlZnQtMTIgYmctd2hpdGUgcm91bmRlZC1mdWxsIHAtMyBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtb3JhbmdlLTUwMCB0cmFuc2l0aW9uLWFsbCB6LTEwXCJcclxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJQcmV2aW91cyB0ZXN0aW1vbmlhbFwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PENoZXZyb25MZWZ0IGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cclxuXHRcdFx0XHR7LyogTWFpbiBUZXN0aW1vbmlhbCBDYXJkICovfVxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyB3LWZ1bGwgYmctd2hpdGUgcm91bmRlZC1bMnJlbV0gc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW5cIj5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ey8qIExlZnQgU2VjdGlvbiAtIDQwJSBEYXJrIEJsdWUgVGhlbWUgKi99XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LVs0MCVdIGJnLVsjMEEyNjQ3XSBwLTggbWQ6cC0xMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByZWxhdGl2ZSBtaW4taC1bMjgwcHhdIG1kOm1pbi1oLVs0MjBweF1cIj5cclxuXHRcdFx0XHRcdFx0ey8qIFN1YnRsZSBUZWNoIFBhdHRlcm4gT3ZlcmxheSAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIG9wYWNpdHktMTBcIiBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6ICdyYWRpYWwtZ3JhZGllbnQoI2ZmZmZmZiAxcHgsIHRyYW5zcGFyZW50IDFweCknLCBiYWNrZ3JvdW5kU2l6ZTogJzIwcHggMjBweCcgfX0+PC9kaXY+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHR7LyogQ29tcGFueSBMb2dvIFdyYXBwZXIgKi99XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlciBzcGFjZS15LTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImgtMjQgdy0zMiBtZDpoLTI4IG1kOnctNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUgcm91bmRlZC14bCBwLTMgc2hhZG93LWxnXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW1nIFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzcmM9e2N1cnJlbnRUZXN0aW1vbmlhbC5sb2dvfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRhbHQ9e2N1cnJlbnRUZXN0aW1vbmlhbC5jb21wYW55fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtYXgtaC1mdWxsIG1heC13LWZ1bGwgb2JqZWN0LWNvbnRhaW5cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkVycm9yPXsoZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHRcdFx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtbGcgbWQ6dGV4dC0yeGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctdGlnaHRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e2N1cnJlbnRUZXN0aW1vbmlhbC5jb21wYW55fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9oMz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHR7LyogUmlnaHQgU2VjdGlvbiAtIENvbnRlbnQgKi99XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LVs2MCVdIHAtOCBtZDpwLTEyIGZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgYmctd2hpdGUgcmVsYXRpdmVcIj5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHsvKiBTdGFycyAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IHRleHQtWyNGOTczMTZdIHRleHQtbGcgbWQ6dGV4dC14bCBtYi00IGdhcC0xXCI+XHJcblx0XHRcdFx0XHRcdFx0e0FycmF5LmZyb20oeyBsZW5ndGg6IGN1cnJlbnRUZXN0aW1vbmlhbC5yYXRpbmcgfSkubWFwKChfLCBpKSA9PiAoXHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBrZXk9e2l9PuKYhTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHR7LyogUXVvdGUgSWNvbiAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsjRjk3MzE2XSBvcGFjaXR5LTgwIHRleHQtNnhsIGZvbnQtc2VyaWYgbGVhZGluZy1ub25lIGgtMTAgbWItNFwiPlxyXG5cdFx0XHRcdFx0XHRcdCZsZHF1bztcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHR7LyogVGVzdGltb25pYWwgVGV4dCAqL31cclxuXHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS04MDAgdGV4dC1iYXNlIG1kOnRleHQtbGcgbGVhZGluZy1yZWxheGVkIG1iLThcIj5cclxuXHRcdFx0XHRcdFx0XHR7Y3VycmVudFRlc3RpbW9uaWFsLnF1b3RlfVxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblxyXG5cdFx0XHRcdFx0XHR7LyogVXNlciBQcm9maWxlICovfVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IG10LWF1dG9cIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC0xMiB3LTEyIG1kOmgtMTQgbWQ6dy0xNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYmx1ZS01MDAgdG8tYmx1ZS02MDAgdGV4dC1sZyBtZDp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXgtc2hyaW5rLTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdHtjdXJyZW50VGVzdGltb25pYWwuYXV0aG9yLmNoYXJBdCgwKX1cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LWJhc2UgbWQ6dGV4dC1sZ1wiPntjdXJyZW50VGVzdGltb25pYWwuYXV0aG9yfTwvaDQ+XHJcblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzIG1kOnRleHQtc20gZm9udC1tZWRpdW1cIj57Y3VycmVudFRlc3RpbW9uaWFsLnBvc2l0aW9ufTwvcD5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdHsvKiBSaWdodCBBcnJvdyAoSGlkZGVuIG9uIG1vYmlsZSkgKi99XHJcblx0XHRcdFx0PGJ1dHRvbiBcclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2hhbmRsZU5leHR9XHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBhYnNvbHV0ZSAtcmlnaHQtNiBsZzotcmlnaHQtMTIgYmctd2hpdGUgcm91bmRlZC1mdWxsIHAtMyBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtb3JhbmdlLTUwMCB0cmFuc2l0aW9uLWFsbCB6LTEwXCJcclxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJOZXh0IHRlc3RpbW9uaWFsXCJcclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHR7LyogUGFnaW5hdGlvbiBEb3RzIGFuZCBNb2JpbGUgQXJyb3dzICovfVxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgbXQtMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XHJcblx0XHRcdFx0ey8qIE1vYmlsZSBMZWZ0IEFycm93ICovfVxyXG5cdFx0XHRcdDxidXR0b24gXHJcblx0XHRcdFx0XHRvbkNsaWNrPXtoYW5kbGVQcmV2fVxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwibWQ6aGlkZGVuIGZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgdGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1vcmFuZ2UtNTAwIHRyYW5zaXRpb24tY29sb3JzXCJcclxuXHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJQcmV2aW91cyB0ZXN0aW1vbmlhbFwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PENoZXZyb25MZWZ0IGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cclxuXHRcdFx0XHR7LyogUGFnaW5hdGlvbiBEb3RzICovfVxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBpdGVtcy1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdHt0ZXN0aW1vbmlhbHMubWFwKChfLCBpbmRleCkgPT4gKFxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uXHJcblx0XHRcdFx0XHRcdFx0a2V5PXtpbmRleH1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZXRJc0F1dG9QbGF5aW5nKGZhbHNlKVxyXG5cdFx0XHRcdFx0XHRcdFx0c2V0QWN0aXZlSW5kZXgoaW5kZXgpXHJcblx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9e2Byb3VuZGVkLWZ1bGwgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtpbmRleCA9PT0gYWN0aXZlSW5kZXggPyAndy0xMCBoLTIgYmctWyMwQTI2NDddJyA6ICd3LTMgaC0zIGJnLVsjRjk3MzE2XSBvcGFjaXR5LTUwIGhvdmVyOm9wYWNpdHktMTAwJ31gfVxyXG5cdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9e2BTaG93IHRlc3RpbW9uaWFsICR7aW5kZXggKyAxfWB9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0ey8qIE1vYmlsZSBSaWdodCBBcnJvdyAqL31cclxuXHRcdFx0XHQ8YnV0dG9uIFxyXG5cdFx0XHRcdFx0b25DbGljaz17aGFuZGxlTmV4dH1cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1kOmhpZGRlbiBmbGV4IGgtMTAgdy0xMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHRleHQtc2xhdGUtNjAwIGhvdmVyOnRleHQtb3JhbmdlLTUwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXHJcblx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiTmV4dCB0ZXN0aW1vbmlhbFwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHR7LyogVHJ1c3RlZCBDb21wYW5pZXMgU2VjdGlvbiAqL31cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2BtdC0xNiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDAgJHtpc1Zpc2libGUgPyAndHJhbnNsYXRlLXktMCBvcGFjaXR5LTEwMCcgOiAndHJhbnNsYXRlLXktOCBvcGFjaXR5LTAnfWB9PlxyXG5cdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1iLTggdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMCB0ZXh0LXNtIG1kOnRleHQtYmFzZVwiPlRydXN0ZWQgYnkgbGVhZGluZyBjb21wYW5pZXMgYWNyb3NzIEluZGlhPC9wPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC02IG9wYWNpdHktNjAgbGc6Z2FwLTEyXCI+XHJcblx0XHRcdFx0XHR7WydUYXRhIE1vdG9ycycsICdNYWhpbmRyYScsICdCYWphaiBBdXRvJywgJ0hlcm8nLCAnTWFydXRpJywgJ0wmVCddLm1hcCgoY29tcGFueSkgPT4gKFxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGtleT17Y29tcGFueX0gY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXIgdGV4dC1sZyBtZDp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktNDAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOnRleHQtYmx1ZS02MDBcIj5cclxuXHRcdFx0XHRcdFx0XHR7Y29tcGFueX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L3NlY3Rpb24+XHJcblx0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBBY2hpZXZlbWVudHNDdGEoKSB7XHJcblx0Y29uc3QgeyBpc1Zpc2libGUsIHNlY3Rpb25SZWYgfSA9IHVzZVNlY3Rpb25SZXZlYWwoMC4yKVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PHNlY3Rpb24gcmVmPXtzZWN0aW9uUmVmfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctd2hpdGUgcHktMTYgbWQ6cHktMjRcIj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTEvMiB0b3AtMCBoLVs4MDBweF0gdy1bODAwcHhdIC10cmFuc2xhdGUteC0xLzIgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYmx1ZS0xMDAgdmlhLXdoaXRlIHRvLW9yYW5nZS0xMDAgYmx1ci0zeGwgb3BhY2l0eS01MFwiIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBteC1hdXRvIG1heC13LTd4bCBweC02IGxnOnB4LThcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17YG1iLTE2IHRleHQtY2VudGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMCAke2lzVmlzaWJsZSA/ICdvcGFjaXR5LTEwMCB0cmFuc2xhdGUteS0wJyA6ICdvcGFjaXR5LTAgdHJhbnNsYXRlLXktOCd9YH0+XHJcblx0XHRcdFx0XHQ8aDIgY2xhc3NOYW1lPVwibWItNCB0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBsZzp0ZXh0LTV4bFwiPlxyXG5cdFx0XHRcdFx0XHRCZSBQYXJ0IG9mIE91ciA8c3BhbiBjbGFzc05hbWU9XCJiZy1jbGlwLXRleHQgdGV4dC10cmFuc3BhcmVudCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS02MDAgdG8tb3JhbmdlLTUwMFwiPlN1Y2Nlc3MgU3Rvcnk8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2gyPlxyXG5cdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibXgtYXV0byBtYXgtdy0yeGwgdGV4dC1sZyB0ZXh0LWdyYXktNjAwXCI+XHJcblx0XHRcdFx0XHRcdEpvaW4gaHVuZHJlZHMgb2YgY29tcGFuaWVzIHdobyBoYXZlIHRyYW5zZm9ybWVkIHRoZWlyIHdvcmtmb3JjZSBtYW5hZ2VtZW50IHdpdGggVFNQTCBHcm91cC5cclxuXHRcdFx0XHRcdDwvcD5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e2BncmlkIGdhcC04IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMCAke2lzVmlzaWJsZSA/ICd0cmFuc2xhdGUteS0wIG9wYWNpdHktMTAwJyA6ICd0cmFuc2xhdGUteS04IG9wYWNpdHktMCd9IG1kOmdyaWQtY29scy0zYH0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyb3VwIHJvdW5kZWQtM3hsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYmx1ZS02MDAgdG8tYmx1ZS03MDAgcC04IHRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOi10cmFuc2xhdGUteS0yIGhvdmVyOnNoYWRvdy0yeGwgaG92ZXI6c2hhZG93LWJsdWUtNTAwLzMwXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWItNiBmbGV4IGgtMTQgdy0xNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC0yeGwgYmctd2hpdGUvMjAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZ3JvdXAtaG92ZXI6c2NhbGUtMTEwXCI+XHJcblx0XHRcdFx0XHRcdFx0PEJ1aWxkaW5nMiBjbGFzc05hbWU9XCJoLTcgdy03XCIgLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYi00IHRleHQtMnhsIGZvbnQtYm9sZFwiPkZvciBDb21wYW5pZXM8L2gzPlxyXG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJtYi02IHRleHQtYmx1ZS0xMDBcIj5cclxuXHRcdFx0XHRcdFx0XHRHZXQgcmVsaWFibGUgbWFucG93ZXIsIHBheXJvbGwgbWFuYWdlbWVudCwgYW5kIHN0YXR1dG9yeSBjb21wbGlhbmNlIC0gYWxsIHVuZGVyIG9uZSByb29mLlxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiL2IyYlwiIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcm91bmRlZC14bCBiZy13aGl0ZSBweC00IHB5LTMgZm9udC1zZW1pYm9sZCB0ZXh0LWJsdWUtNjAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLWJsdWUtNTBcIj5cclxuXHRcdFx0XHRcdFx0XHRQYXJ0bmVyIFdpdGggVXNcclxuXHRcdFx0XHRcdFx0XHQ8QXJyb3dSaWdodCBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cclxuXHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncm91cCByb3VuZGVkLTN4bCBiZy1ncmFkaWVudC10by1iciBmcm9tLW9yYW5nZS01MDAgdG8tb3JhbmdlLTYwMCBwLTggdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6LXRyYW5zbGF0ZS15LTIgaG92ZXI6c2hhZG93LTJ4bCBob3ZlcjpzaGFkb3ctb3JhbmdlLTUwMC8zMFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1iLTYgZmxleCBoLTE0IHctMTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtMnhsIGJnLXdoaXRlLzIwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyOnNjYWxlLTExMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxVc2VycyBjbGFzc05hbWU9XCJoLTcgdy03XCIgLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYi00IHRleHQtMnhsIGZvbnQtYm9sZFwiPkZvciBKb2IgU2Vla2VyczwvaDM+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cIm1iLTYgdGV4dC1vcmFuZ2UtMTAwXCI+XHJcblx0XHRcdFx0XHRcdFx0RmluZCB5b3VyIGRyZWFtIGpvYiB3aXRoIEluZGlhJmFwb3M7cyBsZWFkaW5nIG1hbnBvd2VyIGNvbXBhbnkuIFdlIGhhdmUgb3Bwb3J0dW5pdGllcyBmb3IgYWxsIHNraWxsIGxldmVscy5cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0XHQ8TGluayB0bz1cIi9za2lsbGVkXCIgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggdy1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiByb3VuZGVkLXhsIGJnLXdoaXRlIHB4LTQgcHktMyBmb250LXNlbWlib2xkIHRleHQtb3JhbmdlLTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1vcmFuZ2UtNTBcIj5cclxuXHRcdFx0XHRcdFx0XHRCcm93c2UgSm9ic1xyXG5cdFx0XHRcdFx0XHRcdDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxyXG5cdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyb3VwIHJvdW5kZWQtM3hsIGJvcmRlci0yIGJvcmRlci1ncmF5LTEwMCBiZy13aGl0ZSBwLTggdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOi10cmFuc2xhdGUteS0yIGhvdmVyOmJvcmRlci1ibHVlLTIwMCBob3ZlcjpzaGFkb3ctMnhsXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWItNiBmbGV4IGgtMTQgdy0xNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1ibHVlLTUwMCB0by1ibHVlLTYwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBncm91cC1ob3ZlcjpzY2FsZS0xMTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8VHJvcGh5IGNsYXNzTmFtZT1cImgtNyB3LTcgdGV4dC13aGl0ZVwiIC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwibWItNCB0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiPkdldCBJbiBUb3VjaDwvaDM+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcblx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cInRlbDorOTE5ODc2NTQzMjEwXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1ncmF5LTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjp0ZXh0LWJsdWUtNjAwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8UGhvbmUgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4rOTEgOTg3NjUgNDMyMTA8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJtYWlsdG86aW5mb0B0c3BsZ3JvdXAuY29tXCIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1ncmF5LTYwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjp0ZXh0LWJsdWUtNjAwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TWFpbCBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPmluZm9AdHNwbGdyb3VwLmNvbTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zIHRleHQtZ3JheS02MDBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxNYXBQaW4gY2xhc3NOYW1lPVwibXQtMC41IGgtNSB3LTVcIiAvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4+TXVtYmFpLCBNYWhhcmFzaHRyYSwgSW5kaWE8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9zZWN0aW9uPlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWNoaW1lbnRQYWdlKCkge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1zbGF0ZS01MCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG5cdFx0XHQ8TmF2YmFyIC8+XHJcblx0XHRcdDxtYWluPlxyXG5cdFx0XHRcdDxBd2FyZHNIZXJvIC8+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PEF3YXJkc1NlY3Rpb24gLz5cclxuXHRcdFx0XHQ8VGVzdGltb25pYWxzU2VjdGlvbiAvPlxyXG5cdFx0XHRcdDxBY2hpZXZlbWVudHNDdGEgLz5cclxuXHRcdFx0PC9tYWluPlxyXG5cdFx0XHQ8Rm9vdGVyIC8+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuIl19
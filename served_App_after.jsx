import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=83bd7232"; const Suspense = __vite__cjsImport0_react["Suspense"]; const lazy = __vite__cjsImport0_react["lazy"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { BrowserRouter, Routes, Route, useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=83bd7232";
import { AnimatePresence, motion } from "/node_modules/.vite/deps/framer-motion.js?v=83bd7232";
import "/src/App.css";
import GlobalTextureOverlay from "/src/components/GlobalTextureOverlay.jsx";
import AchimentPage from "/src/pages/achiment.jsx?t=1777693554740";
var _jsxFileName = "C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/App.jsx";
import __vite__cjsImport6_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=83bd7232"; const _jsxDEV = __vite__cjsImport6_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
const HomePage = lazy(_c = () => import("/src/pages/HomePage.jsx"));
_c2 = HomePage;
const JobDetailPage = lazy(_c3 = () => import("/src/pages/JobDetailPage.jsx"));
_c4 = JobDetailPage;
const ContactUs = lazy(_c5 = () => import("/src/pages/contactus.jsx"));
_c6 = ContactUs;
const NewsEventsPage = lazy(_c7 = () => import("/src/pages/NewsEventsPage.jsx"));
_c8 = NewsEventsPage;
const NatsLandingPage = lazy(_c9 = () => import("/src/pages/nats.jsx"));
_c10 = NatsLandingPage;
const NapsPage = lazy(_c11 = () => import("/src/pages/naps.jsx"));
_c12 = NapsPage;
const BvocPage = lazy(_c13 = () => import("/src/pages/bvoc.jsx"));
_c14 = BvocPage;
const DvocPage = lazy(_c15 = () => import("/src/pages/dvoc.jsx"));
_c16 = DvocPage;
const FlexiItiPage = lazy(_c17 = () => import("/src/pages/FLEXI.jsx"));
_c18 = FlexiItiPage;
const SkilledPage = lazy(_c19 = () => import("/src/pages/skilled.jsx"));
_c20 = SkilledPage;
const AboutPage = lazy(_c21 = () => import("/src/pages/about.jsx"));
_c22 = AboutPage;
const HousekeepingPage = lazy(_c23 = () => import("/src/pages/housekeeping.jsx"));
_c24 = HousekeepingPage;
const ManpowerPage = lazy(_c25 = () => import("/src/pages/manpower.jsx"));
_c26 = ManpowerPage;
const PayrollPage = lazy(_c27 = () => import("/src/pages/payroll.jsx"));
_c28 = PayrollPage;
const ContractPage = lazy(_c29 = () => import("/src/pages/contract.jsx"));
_c30 = ContractPage;
const B2BPage = lazy(_c31 = () => import("/src/pages/b2b.jsx"));
_c32 = B2BPage;
const ClientPage = lazy(_c33 = () => import("/src/pages/client.jsx"));
_c34 = ClientPage;
const CompliancePage = lazy(_c35 = () => import("/src/pages/Compliance.jsx"));
_c36 = CompliancePage;
const SecurityPage = lazy(_c37 = () => import("/src/pages/security.jsx"));
_c38 = SecurityPage;
const MapsPage = lazy(_c39 = () => import("/src/pages/MAPS.jsx"));
_c40 = MapsPage;
const AedpPage = lazy(_c41 = () => import("/src/pages/AEDP.jsx"));
_c42 = AedpPage;
const JobsPage = lazy(_c43 = () => import("/src/pages/jobs.jsx"));
_c44 = JobsPage;
const NewsDetailPage = lazy(_c45 = () => import("/src/pages/news/NewsDetailPage.jsx"));
_c46 = NewsDetailPage;
const TermsPage = lazy(_c47 = () => import("/src/pages/terms.jsx"));
_c48 = TermsPage;
const PrivacyPolicyPage = lazy(_c49 = () => import("/src/pages/privacy.jsx"));
_c50 = PrivacyPolicyPage;
const PRELOADER_DURATION_MS = 2800;
function ScrollToTop() {
	_s();
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "auto"
		});
	}, [pathname]);
	return null;
}
_s(ScrollToTop, "glIs83H2MXbU6fcNhYK7n0QqbD4=", false, function() {
	return [useLocation];
});
_c51 = ScrollToTop;
function PageLoader({ showLogo = false }) {
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "page-transition-overlay",
		role: "status",
		"aria-label": "Loading page",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "preloader-layer preloader-layer--orange route-preloader-layer--orange",
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "preloader-layer preloader-layer--blue route-preloader-layer--blue",
				"aria-hidden": "true"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "preloader-layer preloader-layer--white route-preloader-layer--white",
				"aria-hidden": "true",
				children: showLogo ? /* @__PURE__ */ _jsxDEV("img", {
					src: "/TSPL Logo preloader.png",
					alt: "TSPL logo",
					className: "preloader-logo route-preloader-logo"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this) : null
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 5
	}, this);
}
_c52 = PageLoader;
function AnimatedRoutes({ isLoading }) {
	_s2();
	const location = useLocation();
	return /* @__PURE__ */ _jsxDEV(AnimatePresence, {
		mode: "wait",
		children: /* @__PURE__ */ _jsxDEV(motion.div, {
			initial: {
				opacity: 0,
				y: 10
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -10
			},
			transition: {
				duration: .4,
				ease: "easeInOut"
			},
			children: /* @__PURE__ */ _jsxDEV(Routes, {
				location,
				children: [
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/",
						element: /* @__PURE__ */ _jsxDEV(HomePage, { animateWords: !isLoading }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 47
						}, this)
					}, "home", false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/job/:jobId",
						element: /* @__PURE__ */ _jsxDEV(JobDetailPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 63
						}, this)
					}, "job-detail", false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/nats",
						element: /* @__PURE__ */ _jsxDEV(NatsLandingPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 51
						}, this)
					}, "nats", false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/naps",
						element: /* @__PURE__ */ _jsxDEV(NapsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 51
						}, this)
					}, "naps", false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/bvoc",
						element: /* @__PURE__ */ _jsxDEV(BvocPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 51
						}, this)
					}, "bvoc", false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/dvoc",
						element: /* @__PURE__ */ _jsxDEV(DvocPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 51
						}, this)
					}, "dvoc", false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/services/flexi-iti",
						element: /* @__PURE__ */ _jsxDEV(FlexiItiPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 66
						}, this)
					}, "flexi", false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/flexi-iti",
						element: /* @__PURE__ */ _jsxDEV(FlexiItiPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 64
						}, this)
					}, "flexi-legacy", false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/skilled",
						element: /* @__PURE__ */ _jsxDEV(SkilledPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 84,
							columnNumber: 57
						}, this)
					}, "skilled", false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/housekeeping",
						element: /* @__PURE__ */ _jsxDEV(HousekeepingPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 85,
							columnNumber: 67
						}, this)
					}, "housekeeping", false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/manpower",
						element: /* @__PURE__ */ _jsxDEV(ManpowerPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 59
						}, this)
					}, "manpower", false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/payroll",
						element: /* @__PURE__ */ _jsxDEV(PayrollPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 57
						}, this)
					}, "payroll", false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/contract",
						element: /* @__PURE__ */ _jsxDEV(ContractPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 59
						}, this)
					}, "contract", false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/b2b",
						element: /* @__PURE__ */ _jsxDEV(B2BPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 49
						}, this)
					}, "b2b", false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/security",
						element: /* @__PURE__ */ _jsxDEV(SecurityPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 59
						}, this)
					}, "security", false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/maps",
						element: /* @__PURE__ */ _jsxDEV(MapsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 51
						}, this)
					}, "maps", false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/aedp",
						element: /* @__PURE__ */ _jsxDEV(AedpPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 51
						}, this)
					}, "aedp", false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/client",
						element: /* @__PURE__ */ _jsxDEV(ClientPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 55
						}, this)
					}, "client", false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/compliance",
						element: /* @__PURE__ */ _jsxDEV(CompliancePage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 63
						}, this)
					}, "compliance", false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/achievements",
						element: /* @__PURE__ */ _jsxDEV(AchimentPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 67
						}, this)
					}, "achievements", false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/achiment",
						element: /* @__PURE__ */ _jsxDEV(AchimentPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 59
						}, this)
					}, "achiment", false, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/about",
						element: /* @__PURE__ */ _jsxDEV(AboutPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 53
						}, this)
					}, "about", false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/jobs",
						element: /* @__PURE__ */ _jsxDEV(JobsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 51
						}, this)
					}, "jobs", false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/news-events",
						element: /* @__PURE__ */ _jsxDEV(NewsEventsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 65
						}, this)
					}, "news-events", false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/news-events/:newsId",
						element: /* @__PURE__ */ _jsxDEV(NewsDetailPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 73
						}, this)
					}, "news-detail", false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/terms-and-conditions",
						element: /* @__PURE__ */ _jsxDEV(TermsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 83
						}, this)
					}, "terms-and-conditions", false, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/terms",
						element: /* @__PURE__ */ _jsxDEV(TermsPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 53
						}, this)
					}, "terms", false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/privacy-policy",
						element: /* @__PURE__ */ _jsxDEV(PrivacyPolicyPage, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 64
						}, this)
					}, "privacy", false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/contact",
						element: /* @__PURE__ */ _jsxDEV(ContactUs, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 57
						}, this)
					}, "contact", false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV(Route, {
						path: "/contact-us",
						element: /* @__PURE__ */ _jsxDEV(ContactUs, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 63
						}, this)
					}, "contact-us", false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 75,
				columnNumber: 9
			}, this)
		}, location.pathname, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
_s2(AnimatedRoutes, "pkHmaVRPskBaU4tMJuJJpV42k1I=", false, function() {
	return [useLocation];
});
_c53 = AnimatedRoutes;
function App() {
	_s3();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timer = window.setTimeout(() => {
			setIsLoading(false);
		}, PRELOADER_DURATION_MS);
		return () => window.clearTimeout(timer);
	}, []);
	return /* @__PURE__ */ _jsxDEV(BrowserRouter, { children: [/* @__PURE__ */ _jsxDEV(ScrollToTop, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 125,
		columnNumber: 7
	}, this), /* @__PURE__ */ _jsxDEV("div", {
		className: "page-shell",
		children: [
			/* @__PURE__ */ _jsxDEV(GlobalTextureOverlay, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 9
			}, this),
			isLoading && /* @__PURE__ */ _jsxDEV("div", {
				className: "preloader",
				role: "status",
				"aria-label": "Loading TSPL website",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "preloader-layer preloader-layer--orange",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "preloader-layer preloader-layer--blue",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "preloader-layer preloader-layer--white",
						children: /* @__PURE__ */ _jsxDEV("img", {
							src: "/TSPL Logo preloader.png",
							alt: "TSPL logo",
							className: "preloader-logo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("main", {
				className: `home ${isLoading ? "home--hidden" : ""}`,
				children: /* @__PURE__ */ _jsxDEV(Suspense, {
					fallback: /* @__PURE__ */ _jsxDEV(PageLoader, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 31
					}, this),
					children: /* @__PURE__ */ _jsxDEV(AnimatedRoutes, { isLoading }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 142,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 126,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
_s3(App, "yeoZytGfL4RmcJGSYLB51xbqCKM=");
_c54 = App;
export default App;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24, _c25, _c26, _c27, _c28, _c29, _c30, _c31, _c32, _c33, _c34, _c35, _c36, _c37, _c38, _c39, _c40, _c41, _c42, _c43, _c44, _c45, _c46, _c47, _c48, _c49, _c50, _c51, _c52, _c53, _c54;
$RefreshReg$(_c, "HomePage$lazy");
$RefreshReg$(_c2, "HomePage");
$RefreshReg$(_c3, "JobDetailPage$lazy");
$RefreshReg$(_c4, "JobDetailPage");
$RefreshReg$(_c5, "ContactUs$lazy");
$RefreshReg$(_c6, "ContactUs");
$RefreshReg$(_c7, "NewsEventsPage$lazy");
$RefreshReg$(_c8, "NewsEventsPage");
$RefreshReg$(_c9, "NatsLandingPage$lazy");
$RefreshReg$(_c10, "NatsLandingPage");
$RefreshReg$(_c11, "NapsPage$lazy");
$RefreshReg$(_c12, "NapsPage");
$RefreshReg$(_c13, "BvocPage$lazy");
$RefreshReg$(_c14, "BvocPage");
$RefreshReg$(_c15, "DvocPage$lazy");
$RefreshReg$(_c16, "DvocPage");
$RefreshReg$(_c17, "FlexiItiPage$lazy");
$RefreshReg$(_c18, "FlexiItiPage");
$RefreshReg$(_c19, "SkilledPage$lazy");
$RefreshReg$(_c20, "SkilledPage");
$RefreshReg$(_c21, "AboutPage$lazy");
$RefreshReg$(_c22, "AboutPage");
$RefreshReg$(_c23, "HousekeepingPage$lazy");
$RefreshReg$(_c24, "HousekeepingPage");
$RefreshReg$(_c25, "ManpowerPage$lazy");
$RefreshReg$(_c26, "ManpowerPage");
$RefreshReg$(_c27, "PayrollPage$lazy");
$RefreshReg$(_c28, "PayrollPage");
$RefreshReg$(_c29, "ContractPage$lazy");
$RefreshReg$(_c30, "ContractPage");
$RefreshReg$(_c31, "B2BPage$lazy");
$RefreshReg$(_c32, "B2BPage");
$RefreshReg$(_c33, "ClientPage$lazy");
$RefreshReg$(_c34, "ClientPage");
$RefreshReg$(_c35, "CompliancePage$lazy");
$RefreshReg$(_c36, "CompliancePage");
$RefreshReg$(_c37, "SecurityPage$lazy");
$RefreshReg$(_c38, "SecurityPage");
$RefreshReg$(_c39, "MapsPage$lazy");
$RefreshReg$(_c40, "MapsPage");
$RefreshReg$(_c41, "AedpPage$lazy");
$RefreshReg$(_c42, "AedpPage");
$RefreshReg$(_c43, "JobsPage$lazy");
$RefreshReg$(_c44, "JobsPage");
$RefreshReg$(_c45, "NewsDetailPage$lazy");
$RefreshReg$(_c46, "NewsDetailPage");
$RefreshReg$(_c47, "TermsPage$lazy");
$RefreshReg$(_c48, "TermsPage");
$RefreshReg$(_c49, "PrivacyPolicyPage$lazy");
$RefreshReg$(_c50, "PrivacyPolicyPage");
$RefreshReg$(_c51, "ScrollToTop");
$RefreshReg$(_c52, "PageLoader");
$RefreshReg$(_c53, "AnimatedRoutes");
$RefreshReg$(_c54, "App");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/App.jsx?t=1777693554740";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/nisha/Downloads/latest/new last/talentcorp.co.in-main/src/App.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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LGFBQ0Msd0JBQUMsT0FBRDtJQUFLLFdBQVU7SUFBWSxNQUFLO0lBQVMsY0FBVztjQUFwRDtLQUNFLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO01BQTBDLGVBQVk7TUFBUzs7Ozs7S0FDOUUsd0JBQUMsT0FBRDtNQUFLLFdBQVU7TUFBd0MsZUFBWTtNQUFTOzs7OztLQUM1RSx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFDYix3QkFBQyxPQUFEO09BQ0UsS0FBSTtPQUNKLEtBQUk7T0FDSixXQUFVO09BQ1Y7Ozs7O01BQ0U7Ozs7O0tBQ0Y7Ozs7OztHQUdSLHdCQUFDLFFBQUQ7SUFBTSxXQUFXLFFBQVEsWUFBWSxpQkFBaUI7Y0FDcEQsd0JBQUMsVUFBRDtLQUFVLFVBQVUsd0JBQUMsWUFBRCxFQUFjOzs7OztlQUNoQyx3QkFBQyxnQkFBRCxFQUEyQixXQUFhOzs7OztLQUMvQjs7Ozs7SUFDTjs7Ozs7R0FDSDs7Ozs7VUFDUTs7Ozs7O3dDQUVuQjs7QUFFRCxlQUFlIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3VzcGVuc2UsIGxhenksIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgUm91dGVzLCBSb3V0ZSwgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xyXG5pbXBvcnQgeyBBbmltYXRlUHJlc2VuY2UsIG1vdGlvbiB9IGZyb20gJ2ZyYW1lci1tb3Rpb24nXHJcbmltcG9ydCAnLi9BcHAuY3NzJ1xyXG5pbXBvcnQgR2xvYmFsVGV4dHVyZU92ZXJsYXkgZnJvbSAnLi9jb21wb25lbnRzL0dsb2JhbFRleHR1cmVPdmVybGF5J1xyXG5pbXBvcnQgQWNoaW1lbnRQYWdlIGZyb20gJy4vcGFnZXMvYWNoaW1lbnQnXHJcbmNvbnN0IEhvbWVQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvSG9tZVBhZ2UnKSlcclxuY29uc3QgSm9iRGV0YWlsUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL0pvYkRldGFpbFBhZ2UnKSlcclxuY29uc3QgQ29udGFjdFVzID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvY29udGFjdHVzJykpXHJcbmNvbnN0IE5ld3NFdmVudHNQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvTmV3c0V2ZW50c1BhZ2UnKSlcclxuY29uc3QgTmF0c0xhbmRpbmdQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvbmF0cycpKVxyXG5jb25zdCBOYXBzUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL25hcHMnKSlcclxuY29uc3QgQnZvY1BhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9idm9jJykpXHJcbmNvbnN0IER2b2NQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvZHZvYycpKVxyXG5jb25zdCBGbGV4aUl0aVBhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9GTEVYSScpKVxyXG5jb25zdCBTa2lsbGVkUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL3NraWxsZWQnKSlcclxuY29uc3QgQWJvdXRQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvYWJvdXQnKSlcclxuY29uc3QgSG91c2VrZWVwaW5nUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL2hvdXNla2VlcGluZycpKVxyXG5jb25zdCBNYW5wb3dlclBhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9tYW5wb3dlcicpKVxyXG5jb25zdCBQYXlyb2xsUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL3BheXJvbGwnKSlcclxuY29uc3QgQ29udHJhY3RQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvY29udHJhY3QnKSlcclxuY29uc3QgQjJCUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL2IyYicpKVxyXG5jb25zdCBDbGllbnRQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvY2xpZW50JykpXHJcbmNvbnN0IENvbXBsaWFuY2VQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvQ29tcGxpYW5jZScpKVxyXG5jb25zdCBTZWN1cml0eVBhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9zZWN1cml0eScpKVxyXG5jb25zdCBNYXBzUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL01BUFMnKSlcclxuY29uc3QgQWVkcFBhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9BRURQJykpXHJcbmNvbnN0IEpvYnNQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvam9icycpKVxyXG5jb25zdCBOZXdzRGV0YWlsUGFnZSA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3BhZ2VzL25ld3MvTmV3c0RldGFpbFBhZ2UnKSlcclxuY29uc3QgVGVybXNQYWdlID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vcGFnZXMvdGVybXMnKSlcclxuY29uc3QgUHJpdmFjeVBvbGljeVBhZ2UgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9wYWdlcy9wcml2YWN5JykpXHJcblxyXG5jb25zdCBQUkVMT0FERVJfRFVSQVRJT05fTVMgPSAyODAwXHJcblxyXG5mdW5jdGlvbiBTY3JvbGxUb1RvcCgpIHtcclxuICBjb25zdCB7IHBhdGhuYW1lIH0gPSB1c2VMb2NhdGlvbigpXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGxlZnQ6IDAsIGJlaGF2aW9yOiAnYXV0bycgfSlcclxuICB9LCBbcGF0aG5hbWVdKVxyXG5cclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBQYWdlTG9hZGVyKHsgc2hvd0xvZ28gPSBmYWxzZSB9KSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS10cmFuc2l0aW9uLW92ZXJsYXlcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD1cIkxvYWRpbmcgcGFnZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWxvYWRlci1sYXllciBwcmVsb2FkZXItbGF5ZXItLW9yYW5nZSByb3V0ZS1wcmVsb2FkZXItbGF5ZXItLW9yYW5nZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJlbG9hZGVyLWxheWVyIHByZWxvYWRlci1sYXllci0tYmx1ZSByb3V0ZS1wcmVsb2FkZXItbGF5ZXItLWJsdWVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWxvYWRlci1sYXllciBwcmVsb2FkZXItbGF5ZXItLXdoaXRlIHJvdXRlLXByZWxvYWRlci1sYXllci0td2hpdGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICB7c2hvd0xvZ28gPyAoXHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIHNyYz1cIi9UU1BMIExvZ28gcHJlbG9hZGVyLnBuZ1wiXHJcbiAgICAgICAgICAgIGFsdD1cIlRTUEwgbG9nb1wiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInByZWxvYWRlci1sb2dvIHJvdXRlLXByZWxvYWRlci1sb2dvXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBbmltYXRlZFJvdXRlcyh7IGlzTG9hZGluZyB9KSB7XHJcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8QW5pbWF0ZVByZXNlbmNlIG1vZGU9XCJ3YWl0XCI+XHJcbiAgICAgIDxtb3Rpb24uZGl2XHJcbiAgICAgICAga2V5PXtsb2NhdGlvbi5wYXRobmFtZX1cclxuICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDEwIH19XHJcbiAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XHJcbiAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAtMTAgfX1cclxuICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjQsIGVhc2U6ICdlYXNlSW5PdXQnIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Um91dGVzIGxvY2F0aW9uPXtsb2NhdGlvbn0+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiaG9tZVwiIHBhdGg9XCIvXCIgZWxlbWVudD17PEhvbWVQYWdlIGFuaW1hdGVXb3Jkcz17IWlzTG9hZGluZ30gLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiam9iLWRldGFpbFwiIHBhdGg9XCIvam9iLzpqb2JJZFwiIGVsZW1lbnQ9ezxKb2JEZXRhaWxQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cIm5hdHNcIiBwYXRoPVwiL25hdHNcIiBlbGVtZW50PXs8TmF0c0xhbmRpbmdQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cIm5hcHNcIiBwYXRoPVwiL25hcHNcIiBlbGVtZW50PXs8TmFwc1BhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiYnZvY1wiIHBhdGg9XCIvYnZvY1wiIGVsZW1lbnQ9ezxCdm9jUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJkdm9jXCIgcGF0aD1cIi9kdm9jXCIgZWxlbWVudD17PER2b2NQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImZsZXhpXCIgcGF0aD1cIi9zZXJ2aWNlcy9mbGV4aS1pdGlcIiBlbGVtZW50PXs8RmxleGlJdGlQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImZsZXhpLWxlZ2FjeVwiIHBhdGg9XCIvZmxleGktaXRpXCIgZWxlbWVudD17PEZsZXhpSXRpUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJza2lsbGVkXCIgcGF0aD1cIi9za2lsbGVkXCIgZWxlbWVudD17PFNraWxsZWRQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImhvdXNla2VlcGluZ1wiIHBhdGg9XCIvaG91c2VrZWVwaW5nXCIgZWxlbWVudD17PEhvdXNla2VlcGluZ1BhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwibWFucG93ZXJcIiBwYXRoPVwiL21hbnBvd2VyXCIgZWxlbWVudD17PE1hbnBvd2VyUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJwYXlyb2xsXCIgcGF0aD1cIi9wYXlyb2xsXCIgZWxlbWVudD17PFBheXJvbGxQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImNvbnRyYWN0XCIgcGF0aD1cIi9jb250cmFjdFwiIGVsZW1lbnQ9ezxDb250cmFjdFBhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiYjJiXCIgcGF0aD1cIi9iMmJcIiBlbGVtZW50PXs8QjJCUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJzZWN1cml0eVwiIHBhdGg9XCIvc2VjdXJpdHlcIiBlbGVtZW50PXs8U2VjdXJpdHlQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cIm1hcHNcIiBwYXRoPVwiL21hcHNcIiBlbGVtZW50PXs8TWFwc1BhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiYWVkcFwiIHBhdGg9XCIvYWVkcFwiIGVsZW1lbnQ9ezxBZWRwUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJjbGllbnRcIiBwYXRoPVwiL2NsaWVudFwiIGVsZW1lbnQ9ezxDbGllbnRQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImNvbXBsaWFuY2VcIiBwYXRoPVwiL2NvbXBsaWFuY2VcIiBlbGVtZW50PXs8Q29tcGxpYW5jZVBhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiYWNoaWV2ZW1lbnRzXCIgcGF0aD1cIi9hY2hpZXZlbWVudHNcIiBlbGVtZW50PXs8QWNoaW1lbnRQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cImFjaGltZW50XCIgcGF0aD1cIi9hY2hpbWVudFwiIGVsZW1lbnQ9ezxBY2hpbWVudFBhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiYWJvdXRcIiBwYXRoPVwiL2Fib3V0XCIgZWxlbWVudD17PEFib3V0UGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJqb2JzXCIgcGF0aD1cIi9qb2JzXCIgZWxlbWVudD17PEpvYnNQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cIm5ld3MtZXZlbnRzXCIgcGF0aD1cIi9uZXdzLWV2ZW50c1wiIGVsZW1lbnQ9ezxOZXdzRXZlbnRzUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJuZXdzLWRldGFpbFwiIHBhdGg9XCIvbmV3cy1ldmVudHMvOm5ld3NJZFwiIGVsZW1lbnQ9ezxOZXdzRGV0YWlsUGFnZSAvPn0gLz5cclxuICAgICAgICAgIDxSb3V0ZSBrZXk9XCJ0ZXJtcy1hbmQtY29uZGl0aW9uc1wiIHBhdGg9XCIvdGVybXMtYW5kLWNvbmRpdGlvbnNcIiBlbGVtZW50PXs8VGVybXNQYWdlIC8+fSAvPlxyXG4gICAgICAgICAgPFJvdXRlIGtleT1cInRlcm1zXCIgcGF0aD1cIi90ZXJtc1wiIGVsZW1lbnQ9ezxUZXJtc1BhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwicHJpdmFjeVwiIHBhdGg9XCIvcHJpdmFjeS1wb2xpY3lcIiBlbGVtZW50PXs8UHJpdmFjeVBvbGljeVBhZ2UgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiY29udGFjdFwiIHBhdGg9XCIvY29udGFjdFwiIGVsZW1lbnQ9ezxDb250YWN0VXMgLz59IC8+XHJcbiAgICAgICAgICA8Um91dGUga2V5PVwiY29udGFjdC11c1wiIHBhdGg9XCIvY29udGFjdC11c1wiIGVsZW1lbnQ9ezxDb250YWN0VXMgLz59IC8+XHJcbiAgICAgICAgPC9Sb3V0ZXM+XHJcbiAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gQXBwKCkge1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSlcclxuICAgIH0sIFBSRUxPQURFUl9EVVJBVElPTl9NUylcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LmNsZWFyVGltZW91dCh0aW1lcilcclxuICB9LCBbXSlcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCcm93c2VyUm91dGVyPlxyXG4gICAgICA8U2Nyb2xsVG9Ub3AgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlLXNoZWxsXCI+XHJcbiAgICAgICAgPEdsb2JhbFRleHR1cmVPdmVybGF5IC8+XHJcbiAgICAgICAge2lzTG9hZGluZyAmJiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWxvYWRlclwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPVwiTG9hZGluZyBUU1BMIHdlYnNpdGVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmVsb2FkZXItbGF5ZXIgcHJlbG9hZGVyLWxheWVyLS1vcmFuZ2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWxvYWRlci1sYXllciBwcmVsb2FkZXItbGF5ZXItLWJsdWVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZWxvYWRlci1sYXllciBwcmVsb2FkZXItbGF5ZXItLXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPVwiL1RTUEwgTG9nbyBwcmVsb2FkZXIucG5nXCJcclxuICAgICAgICAgICAgICAgIGFsdD1cIlRTUEwgbG9nb1wiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmVsb2FkZXItbG9nb1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG5cclxuICAgICAgICA8bWFpbiBjbGFzc05hbWU9e2Bob21lICR7aXNMb2FkaW5nID8gJ2hvbWUtLWhpZGRlbicgOiAnJ31gfT5cclxuICAgICAgICAgIDxTdXNwZW5zZSBmYWxsYmFjaz17PFBhZ2VMb2FkZXIgLz59PlxyXG4gICAgICAgICAgICA8QW5pbWF0ZWRSb3V0ZXMgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IC8+XHJcbiAgICAgICAgICA8L1N1c3BlbnNlPlxyXG4gICAgICAgIDwvbWFpbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L0Jyb3dzZXJSb3V0ZXI+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBcclxuIl19
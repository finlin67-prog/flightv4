// frontend/src/components/CockpitNavigation.js
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// Left-hand cockpit navigation that can collapse/expand and show section bookmarks
const NAV_ITEMS = [
  {
    path: "/",
    label: "Control Tower",
    short: "Home",
    icon: "🛫",
  },
  {
    path: "/assessment",
    label: "Quick Scan",
    short: "Assessment",
    icon: "⚡",
    sections: [
      { id: "question-status", label: "Question Status" },
      { id: "current-aircraft", label: "Current Aircraft" },
      { id: "flight-instruments", label: "Flight Instruments" },
    ],
  },
  {
    path: "/deep-dive",
    label: "Deep Dives",
    short: "Detailed Topics",
    icon: "🔍",
  },
  {
    path: "/tech-stack",
    label: "Tech Hangar",
    short: "Your Stack",
    icon: "🧰",
    sections: [
      { id: "tech-tools", label: "Tools" },
      { id: "tech-optimization", label: "Optimization" },
      { id: "tech-results", label: "Results" },
    ],
  },
  {
    path: "/results",
    label: "Flight Status",
    short: "Results",
    icon: "📊",
  },
  {
    path: "/journey-map",
    label: "Journey Map",
    short: "Flight Map",
    icon: "🗺️",
  },
  {
    path: "/flight-deck",
    label: "Flight Deck",
    short: "Journeys",
    icon: "🧭",
  },
  {
    path: "/scenario-simulator",
    label: "Simulator",
    short: "What-If",
    icon: "🎛️",
  },
  {
    path: "/history",
    label: "Flight Log",
    short: "History",
    icon: "📘",
  },
  {
    path: "/story/company-a",
    label: "Company A",
    short: "Example Story",
    icon: "🏢",
  },
];

const CockpitNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Remember collapsed / expanded state between sessions
  useEffect(() => {
    const saved = localStorage.getItem("cockpitNavCollapsed");
    if (saved === "true") setIsCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("cockpitNavCollapsed", isCollapsed ? "true" : "false");
  }, [isCollapsed]);

  // Preserve your existing behaviour for results / flight-deck / simulator
  const getNavPath = (path) => {
    const assessmentId = localStorage.getItem("latestAssessmentId");
    if (
      assessmentId &&
      (path === "/results" ||
        path === "/flight-deck" ||
        path === "/scenario-simulator")
    ) {
      return `${path}/${assessmentId}`;
    }
    return path;
  };

  const handleSectionClick = (item, section) => {
    const targetPath = getNavPath(item.path);

    // If we are already on the right page, just scroll to the section
    if (location.pathname.startsWith(item.path)) {
      if (section?.id) {
        const el = document.getElementById(section.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      return;
    }

    // Otherwise navigate to the page first
    navigate(targetPath);
  };

  return (
    <aside
      className={`flex h-screen flex-col border-r border-slate-800 bg-slate-950/90 text-slate-100 transition-[width] duration-300 ${
        isCollapsed ? "w-16 md:w-20" : "w-64"
      }`}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-3 py-4">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-cyan-200"
          onClick={() => navigate("/")}
        >
          <span className="text-lg">✈️</span>
          {!isCollapsed && (
            <span className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-wide text-slate-400">
                Flight Deck
              </span>
              <span>Marketing Cockpit</span>
            </span>
          )}
        </button>

        {/* Collapse / expand toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="rounded-md p-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-cyan-300"
          aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      {/* Main nav items */}
      <nav className="flex-1 space-y-1 px-1 pb-4">
        {NAV_ITEMS.map((item) => (
          <div key={item.path} className="relative group">
            <NavLink
              to={getNavPath(item.path)}
              className={({ isActive }) =>
                [
                  "flex items-center rounded-lg py-2 text-sm transition-all",
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                  isActive
                    ? "bg-cyan-600/20 border border-cyan-500/30 text-cyan-200"
                    : "text-blue-200 hover:bg-slate-800/60 hover:text-cyan-300",
                ].join(" ")
              }
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-slate-400">{item.short}</span>
                </span>
              )}
            </NavLink>

            {/* Expanded: inline section bookmarks under the item */}
            {!isCollapsed && item.sections && item.sections.length > 0 && (
              <div className="mt-1 ml-11 space-y-0.5">
                {item.sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(item, section)}
                    className="block w-full text-left text-xs text-slate-400 hover:text-cyan-300"
                  >
                    • {section.label}
                  </button>
                ))}
              </div>
            )}

            {/* Collapsed: hover tooltip with label + sections (Layout D) */}
            {isCollapsed && (
              <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs text-slate-100 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="font-medium">{item.label}</div>
                <div className="text-[11px] text-slate-300">{item.short}</div>
                {item.sections && item.sections.length > 0 && (
                  <ul className="mt-1 space-y-0.5">
                    {item.sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSectionClick(item, section);
                          }}
                          className="text-[11px] text-cyan-300 hover:text-cyan-200"
                        >
                          • {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer status strip */}
      <div
        className={`border-t border-slate-800 px-3 py-3 text-xs text-slate-400 ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-base">✈️</span>
          {!isCollapsed && (
            <span className="flex flex-col leading-tight">
              <span className="font-medium text-slate-200">
                Ready for Takeoff
              </span>
              <span className="text-[11px] text-slate-400">
                Use the cockpit to navigate assessments, stack, and journeys.
              </span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CockpitNavigation;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Plane, ChevronLeft, ChevronRight } from "lucide-react";

const CockpitNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/", label: "Control Tower", emoji: "⚡", description: "Home" },
    {
      path: "/assessment",
      label: "Quick Scan",
      emoji: "🔎",
      description: "Assessment",
    },
    {
      path: "/deep-dive",
      label: "Deep Dives",
      emoji: "",
      description: "Detailed Topics",
    },
    {
      path: "/tech-stack",
      label: "Tech Hangar",
      emoji: "",
      description: "Your Stack",
    },
    {
      path: "/results",
      label: "Flight Status",
      emoji: "",
      description: "Results",
    },
    {
      path: "/journey-map",
      label: "Journey Map",
      emoji: "",
      description: "Flight Map",
    },
    {
      path: "/flight-deck",
      label: "Flight Deck",
      emoji: "",
      description: "Journeys",
    },
    {
      path: "/scenario-simulator",
      label: "Simulator",
      emoji: "",
      description: "What-If",
    },
    {
      path: "/history",
      label: "Flight Log",
      emoji: "",
      description: "History",
    },
    {
      path: "/story/company-a",
      label: "Company A",
      emoji: "",
      description: "Example Story",
    },
  ];

  const getNavPath = (path) => {
    const assessmentId = localStorage.getItem("latestAssessmentId");

    if (
      (path === "/results" ||
        path === "/flight-deck" ||
        path === "/scenario-simulator") &&
      assessmentId
    ) {
      return `${path}/${assessmentId}`;
    }

    return path;
  };

  const sidebarWidth = isCollapsed ? "w-16" : "w-64";

  return (
    <aside
      className={`${sidebarWidth} h-full flex flex-col bg-slate-950/80 border-r border-slate-800/70 text-slate-100 transition-[width] duration-300 ease-in-out`}
    >
      {/* Header / Brand */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-400/40 shadow-inner">
            <Plane className="h-5 w-5 text-cyan-300" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400">
                Flight Deck
              </span>
              <span className="text-sm font-medium text-slate-100">
                Marketing Cockpit
              </span>
            </div>
          )}
        </div>

        {/* Collapse / Expand Toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700/70 bg-slate-900/70 hover:bg-slate-800 hover:border-cyan-500/60 transition-colors"
          title={isCollapsed ? "Expand cockpit" : "Collapse cockpit"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-slate-300" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-slate-300" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={getNavPath(item.path)}
            title={isCollapsed ? `${item.label} — ${item.description}` : ""}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-all group",
                isActive
                  ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.25)]"
                  : "text-slate-300 hover:bg-slate-900/70 hover:text-cyan-200 border border-transparent",
              ].join(" ")
            }
          >
            {/* Icon "slot" */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950/80 border border-slate-700/70 group-hover:border-cyan-500/50 transition-colors">
              {/* Use plane emoji if you ever set one, else the Plane icon */}
              {item.emoji ? (
                <span className="text-lg leading-none">{item.emoji}</span>
              ) : (
                <Plane className="h-4 w-4 text-cyan-300" />
              )}
            </div>

            {/* Text content hidden when collapsed */}
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-medium">{item.label}</span>
                <span className="text-[11px] text-slate-400">
                  {item.description}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800/70 px-3 py-3">
        {isCollapsed ? (
          <div
            className="flex items-center justify-center text-xs text-slate-400"
            title="Ready for Takeoff"
          >
            ✈️
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>✈️ Ready for Takeoff</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              v1 Cockpit
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CockpitNavigation;

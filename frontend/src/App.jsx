import { useState, useCallback, useEffect } from "react";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

import { useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import LeftNav from "./components/LeftNav";
import Dashboard from "./components/Dashboard";
import ProjectCanvas from "./components/ProjectCanvas";
import KnowledgeBase from "./components/KnowledgeBase";
import KBDetailModal from "./components/KBDetailModal";
import TechPackModal from "./components/TechPackModal";
import IssueDrawer from "./components/IssueDrawer";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const { session, loading, signOut } = useAuth();

  // Auth loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-ink-muted" />
      </div>
    );
  }

  // Not authenticated — show login
  if (!session) {
    return <Auth />;
  }

  // Authenticated — render workspace
  return <Workspace signOut={signOut} />;
}

function Workspace({ signOut }) {
  // View routing: 'home' or a project id — persisted
  const [activeView, setActiveView] = useLocalStorage("hoodie-maker-active-view", "home");

  // All projects — persisted
  const [projects, setProjects] = useLocalStorage("hoodie-maker-projects", []);

  // Knowledge modal state
  const [selectedKBItem, setSelectedKBItem] = useState(null);

  // Tech Pack modal state
  const [techPackMarkdown, setTechPackMarkdown] = useState(null);
  const [techPackGeneratedAt, setTechPackGeneratedAt] = useState(null);

  // Issue tracker
  const [issues, setIssues] = useState([]);
  const [issueDrawerOpen, setIssueDrawerOpen] = useState(false);

  // Shared UI state
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  /* ── Issue tracker ─────────────────────────────── */

  const addIssue = useCallback((issue) => {
    setIssues((prev) => [
      ...prev,
      { id: crypto.randomUUID(), timestamp: new Date().toISOString(), ...issue },
    ]);
  }, []);

  const clearIssues = useCallback(() => {
    setIssues([]);
  }, []);

  /* ── Project CRUD ──────────────────────────────── */

  const handleCreateProject = useCallback(() => {
    const newProject = {
      id: crypto.randomUUID(),
      name: `Untitled Project ${projects.length + 1}`,
      createdAt: new Date().toISOString(),
      installedIds: [],
      nodeValues: {},
      techPackHistory: [],
    };
    setProjects((prev) => [newProject, ...prev]);
    setActiveView(newProject.id);
  }, [projects.length]);

  const handleUpdateProject = useCallback((projectId, partial) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...partial } : p))
    );
  }, []);

  /* ── Navigation ────────────────────────────────── */

  const handleNavigateHome = useCallback(() => {
    setActiveView("home");
  }, []);

  const handleNavigateKnowledgeBase = useCallback(() => {
    setActiveView("knowledge-base");
  }, []);

  const handleSelectProject = useCallback((projectId) => {
    setActiveView(projectId);
  }, []);

  /* ── Modal helpers ─────────────────────────────── */

  const handleOpenKBDetail = useCallback((item) => {
    setSelectedKBItem(item);
  }, []);

  const handleTechPackGenerated = useCallback((markdown, generatedAt) => {
    setTechPackMarkdown(markdown);
    setTechPackGeneratedAt(generatedAt);
  }, []);

  const handleViewTechPack = useCallback((markdown, generatedAt) => {
    setTechPackMarkdown(markdown);
    setTechPackGeneratedAt(generatedAt);
  }, []);

  /* ── Render ───────────────────────────────────── */

  const isSpecialView = activeView === "home" || activeView === "knowledge-base";
  const activeProject = !isSpecialView
    ? projects.find((p) => p.id === activeView)
    : null;

  return (
    <div className="flex min-h-screen">
      {/* Left Nav */}
      <LeftNav
        projects={projects}
        activeView={activeView}
        onNavigateHome={handleNavigateHome}
        onNavigateKnowledgeBase={handleNavigateKnowledgeBase}
        onSelectProject={handleSelectProject}
        onCreateProject={handleCreateProject}
        issueCount={issues.length}
        onOpenIssues={() => setIssueDrawerOpen(true)}
        onSignOut={signOut}
      />

      {/* Main content */}
      {activeView === "knowledge-base" ? (
        <KnowledgeBase />
      ) : activeView === "home" || !activeProject ? (
        <Dashboard
          projects={projects}
          onCreateProject={handleCreateProject}
          onSelectProject={handleSelectProject}
        />
      ) : (
        <ProjectCanvas
          key={activeProject.id}
          project={activeProject}
          onUpdateProject={handleUpdateProject}
          onOpenKBDetail={handleOpenKBDetail}
          onTechPackGenerated={handleTechPackGenerated}
          onViewTechPack={handleViewTechPack}
          isSending={isSending}
          setIsSending={setIsSending}
          setToast={setToast}
          addIssue={addIssue}
        />
      )}

      {/* Modals */}
      {selectedKBItem && (
        <KBDetailModal
          item={selectedKBItem}
          onClose={() => setSelectedKBItem(null)}
        />
      )}
      {techPackMarkdown && (
        <TechPackModal
          markdown={techPackMarkdown}
          generatedAt={techPackGeneratedAt}
          onClose={() => {
            setTechPackMarkdown(null);
            setTechPackGeneratedAt(null);
          }}
        />
      )}

      {/* Issue Drawer */}
      {issueDrawerOpen && (
        <IssueDrawer
          issues={issues}
          onClearAll={clearIssues}
          onClose={() => setIssueDrawerOpen(false)}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-lg shadow-lg border text-sm font-medium ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-600 shrink-0" />
            )}
            {toast.message}
            <button
              onClick={() => setToast(null)}
              className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

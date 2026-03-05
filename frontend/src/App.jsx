import { useState, useCallback, useEffect } from "react";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

import { useAuth } from "./contexts/AuthContext";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import LeftNav from "./components/LeftNav";
import Dashboard from "./components/Dashboard";
import ProjectCanvas from "./components/ProjectCanvas";
import KnowledgeBase from "./components/KnowledgeBase";
import KBDetailModal from "./components/KBDetailModal";
import TechPackModal from "./components/TechPackModal";
import IssueDrawer from "./components/IssueDrawer";
import useProjects from "./hooks/useProjects";

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
  const { user } = useAuth();

  // View routing
  const [activeView, setActiveView] = useState("home");

  // All projects — Supabase-backed
  const {
    projects, loading: projectsLoading, fetchError,
    createProject, updateProject, saveStatus,
  } = useProjects(user?.id);

  // Knowledge modal state
  const [selectedKBItem, setSelectedKBItem] = useState(null);

  // Tech Pack modal state
  const [techPackMarkdown, setTechPackMarkdown] = useState(null);
  const [techPackGeneratedAt, setTechPackGeneratedAt] = useState(null);
  const [isNewGeneration, setIsNewGeneration] = useState(false);
  const [currentHistoryEntryId, setCurrentHistoryEntryId] = useState(null);
  const [pdfUploadStatus, setPdfUploadStatus] = useState(null);

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

  // Show fetch error as toast
  useEffect(() => {
    if (fetchError) setToast({ type: "error", message: `Failed to load projects: ${fetchError}` });
  }, [fetchError]);

  // Clean up old localStorage keys (one-time migration)
  useEffect(() => {
    localStorage.removeItem("hoodie-maker-projects");
    localStorage.removeItem("hoodie-maker-active-view");
  }, []);

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

  const handleCreateProject = useCallback(async () => {
    try {
      const id = await createProject();
      setActiveView(id);
    } catch {
      setToast({ type: "error", message: "Failed to create project." });
    }
  }, [createProject]);

  const handleUpdateProject = useCallback(
    (projectId, partial) => updateProject(projectId, partial),
    [updateProject]
  );

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

  const handleTechPackGenerated = useCallback((markdown, generatedAt, historyEntryId) => {
    setTechPackMarkdown(markdown);
    setTechPackGeneratedAt(generatedAt);
    setIsNewGeneration(true);
    setCurrentHistoryEntryId(historyEntryId);
    setPdfUploadStatus(null);
  }, []);

  const handleViewTechPack = useCallback((markdown, generatedAt) => {
    setTechPackMarkdown(markdown);
    setTechPackGeneratedAt(generatedAt);
    setIsNewGeneration(false);
    setCurrentHistoryEntryId(null);
    setPdfUploadStatus(null);
  }, []);

  // Derived — needed by handlePdfBlob below and render
  const isSpecialView = activeView === "home" || activeView === "knowledge-base";
  const activeProject = !isSpecialView
    ? projects.find((p) => p.id === activeView)
    : null;

  const handlePdfBlob = useCallback(async (blob) => {
    if (!activeProject || !currentHistoryEntryId) return;

    setPdfUploadStatus("uploading");
    try {
      const filePath = `${user.id}/${activeProject.id}/techpack_${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("tech_packs")
        .upload(filePath, blob, { contentType: "application/pdf" });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("tech_packs")
        .getPublicUrl(filePath);

      // Patch the history entry with pdfUrl
      const updatedHistory = activeProject.techPackHistory.map((entry) =>
        entry.id === currentHistoryEntryId
          ? { ...entry, pdfUrl: publicUrl }
          : entry
      );
      await handleUpdateProject(activeProject.id, { techPackHistory: updatedHistory });

      setPdfUploadStatus("done");
      setToast({ type: "success", message: "Tech pack PDF saved to cloud." });
    } catch (err) {
      console.error("PDF upload failed:", err);
      setPdfUploadStatus("error");
      setToast({ type: "error", message: `PDF upload failed: ${err.message}` });
    } finally {
      // Ensure we never leave the UI stuck — reset to null after a delay if still "uploading"
      setTimeout(() => {
        setPdfUploadStatus((prev) => (prev === "uploading" ? "error" : prev));
      }, 30000);
    }
  }, [activeProject, currentHistoryEntryId, user, handleUpdateProject]);

  /* ── Render ───────────────────────────────────── */

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
      {projectsLoading ? (
        <main className="flex-1 flex items-center justify-center">
          <Loader2 size={28} className="animate-spin text-ink-muted" />
        </main>
      ) : activeView === "knowledge-base" ? (
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
          saveStatus={saveStatus}
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
          onPdfBlob={isNewGeneration ? handlePdfBlob : undefined}
          pdfUploadStatus={pdfUploadStatus}
          onClose={() => {
            setTechPackMarkdown(null);
            setTechPackGeneratedAt(null);
            setIsNewGeneration(false);
            setCurrentHistoryEntryId(null);
            setPdfUploadStatus(null);
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

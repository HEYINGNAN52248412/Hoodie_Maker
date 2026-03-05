import { useCallback } from "react";
import { FileText, Loader2 } from "lucide-react";

import nodeDefinitions from "../data/nodeDefinitions";
import Sidebar from "./Sidebar";
import StartNode from "./StartNode";
import Connector from "./Connector";
import NodeCard from "./NodeCard";
import ProjectHeader from "./ProjectHeader";
import TechPackHistory from "./TechPackHistory";

function buildDefaults(def) {
  const vals = {};
  for (const field of def.fields) {
    vals[field.id] = field.default;
  }
  return vals;
}

export default function ProjectCanvas({
  project,
  onUpdateProject,
  onOpenKBDetail,
  onTechPackGenerated,
  onViewTechPack,
  isSending,
  setIsSending,
  setToast,
  addIssue,
  saveStatus,
}) {
  const { id: projectId, installedIds, nodeValues, techPackHistory } = project;

  /* ── Handlers ─────────────────────────────────── */

  const handleAddNode = useCallback(
    (nodeId) => {
      if (installedIds.includes(nodeId)) return;
      const def = nodeDefinitions.find((d) => d.id === nodeId);
      if (!def) return;

      onUpdateProject(projectId, {
        installedIds: [...installedIds, nodeId],
        nodeValues: { ...nodeValues, [nodeId]: buildDefaults(def) },
      });
    },
    [projectId, installedIds, nodeValues, onUpdateProject]
  );

  const handleRemoveNode = useCallback(
    (nodeId) => {
      const nextValues = { ...nodeValues };
      delete nextValues[nodeId];
      onUpdateProject(projectId, {
        installedIds: installedIds.filter((id) => id !== nodeId),
        nodeValues: nextValues,
      });
    },
    [projectId, installedIds, nodeValues, onUpdateProject]
  );

  const handleFieldChange = useCallback(
    (nodeId, fieldId, value) => {
      onUpdateProject(projectId, {
        nodeValues: {
          ...nodeValues,
          [nodeId]: { ...nodeValues[nodeId], [fieldId]: value },
        },
      });
    },
    [projectId, nodeValues, onUpdateProject]
  );

  const handleRename = useCallback(
    (newName) => {
      onUpdateProject(projectId, { name: newName });
    },
    [projectId, onUpdateProject]
  );

  const handleGenerateTechPack = useCallback(async () => {
    const nodes = {};
    for (const nodeId of installedIds) {
      const def = nodeDefinitions.find((d) => d.id === nodeId);
      if (!def) continue;

      const config = {};
      for (const field of def.fields) {
        if (field.showWhen) {
          const parentVal = nodeValues[nodeId]?.[field.showWhen.field];
          if (parentVal !== field.showWhen.value) continue;
        }
        config[field.id] = nodeValues[nodeId]?.[field.id] ?? field.default;
      }

      nodes[nodeId] = { label: def.label, config };
    }

    const generatedAt = new Date().toISOString();
    const techPack = {
      product: "Hoodie",
      generatedAt,
      nodeSequence: installedIds,
      nodes,
    };

    setIsSending(true);
    setToast(null);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("VITE_N8N_WEBHOOK_URL is not configured");

      const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(techPack),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      const markdown = result.markdown_result;

      // Push to history
      const historyEntry = {
        id: crypto.randomUUID(),
        generatedAt,
        markdown,
      };
      onUpdateProject(projectId, {
        techPackHistory: [...techPackHistory, historyEntry],
      });

      // Open the modal
      onTechPackGenerated(markdown, generatedAt, historyEntry.id);
    } catch (err) {
      const isNetwork = err instanceof TypeError && err.message === "Failed to fetch";
      const title = isNetwork
        ? "Network Error — Unable to reach server"
        : `API Error — ${err.message}`;
      const detailedMessage = isNetwork
        ? "The request could not be sent. This usually means the server is offline, the URL is wrong, or a CORS policy is blocking the request."
        : `The server returned an unexpected response. Status: ${err.message}`;

      addIssue({
        title,
        detailedMessage,
        technicalStack: `${err.name}: ${err.message}\n\nEndpoint: POST ${import.meta.env.VITE_N8N_WEBHOOK_URL ?? "(not set)"}\nTimestamp: ${new Date().toISOString()}${err.stack ? `\n\nStack:\n${err.stack}` : ""}`,
      });

      setToast({
        type: "error",
        message: `Transmission failed: ${err.message}. Check the issue tracker for details.`,
      });
    } finally {
      setIsSending(false);
    }
  }, [
    projectId,
    installedIds,
    nodeValues,
    techPackHistory,
    onUpdateProject,
    onTechPackGenerated,
    setIsSending,
    setToast,
    addIssue,
  ]);

  /* ── Render ───────────────────────────────────── */

  return (
    <>
      {/* History sidebar */}
      <TechPackHistory
        history={techPackHistory}
        onView={(entry) =>
          onViewTechPack(entry.markdown, entry.generatedAt)
        }
      />

      {/* Canvas */}
      <main className="flex-1 draft-paper overflow-x-auto overflow-y-auto">
        <ProjectHeader project={project} onRename={handleRename} saveStatus={saveStatus} />

        {/* Flow area — horizontal */}
        <div className="flex items-start gap-0 px-6 py-10 min-w-max">
          <StartNode />

          {installedIds.map((nodeId) => {
            const def = nodeDefinitions.find((d) => d.id === nodeId);
            if (!def) return null;

            return (
              <div key={nodeId} className="flex items-start shrink-0">
                <Connector />
                <NodeCard
                  definition={def}
                  values={nodeValues[nodeId] || {}}
                  onChange={handleFieldChange}
                  onRemove={handleRemoveNode}
                  onOpenKBDetail={onOpenKBDetail}
                />
              </div>
            );
          })}

          {/* Empty-state prompt */}
          {installedIds.length === 0 && (
            <div className="ml-10">
              <p className="text-sm text-ink-muted whitespace-nowrap">
                Select a node from the right sidebar to start building.
              </p>
            </div>
          )}
        </div>

        {/* Spacer above generate button */}
        <div className="h-24" />

        {/* Floating generate button — offset for LeftNav(w-20) + HistorySidebar(w-72) */}
        {installedIds.length > 0 && (
          <div className="fixed bottom-6 left-[23rem] right-64 z-20 flex justify-center pointer-events-none">
            <button
              onClick={handleGenerateTechPack}
              disabled={isSending}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-cream text-sm font-semibold rounded-lg shadow-lg hover:bg-ink-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <FileText size={16} />
                  Complete &amp; Generate Tech Pack
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <Sidebar installedIds={installedIds} onAddNode={handleAddNode} />
    </>
  );
}

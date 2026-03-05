import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";
import useDebouncedSave from "./useDebouncedSave";

/* ── Mapping helpers ──────────────────────────── */

function rowToProject(row) {
  const cd = row.canvas_data || {};
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    installedIds: cd.installedIds ?? [],
    nodeValues: cd.nodeValues ?? {},
    techPackHistory: cd.techPackHistory ?? [],
  };
}

function projectToFields(project) {
  return {
    name: project.name,
    canvas_data: {
      installedIds: project.installedIds,
      nodeValues: project.nodeValues,
      techPackHistory: project.techPackHistory,
    },
  };
}

/* ── Hook ─────────────────────────────────────── */

export default function useProjects(userId) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Keep a ref to projects so persistUpdate always sees the latest state
  const projectsRef = useRef(projects);
  projectsRef.current = projects;

  /* ── Persist a single project update to Supabase ── */
  const persistUpdate = useCallback(async ({ projectId, fields }) => {
    const { error } = await supabase
      .from("projects")
      .update(fields)
      .eq("id", projectId);
    if (error) throw error;
  }, []);

  const { requestSave, saveStatus, flushAll } = useDebouncedSave(persistUpdate, 1000);

  /* ── Fetch on mount / userId change ── */
  useEffect(() => {
    if (!userId) {
      setProjects([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setFetchError(null);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        setFetchError(error.message);
        setLoading(false);
        return;
      }

      setProjects(data.map(rowToProject));
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [userId]);

  /* ── CREATE ── */
  const createProject = useCallback(async () => {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const newProject = {
      id,
      name: `Untitled Project ${projectsRef.current.length + 1}`,
      createdAt: now,
      installedIds: [],
      nodeValues: {},
      techPackHistory: [],
    };

    // Optimistic
    setProjects((prev) => [newProject, ...prev]);

    const { error } = await supabase.from("projects").insert({
      id,
      user_id: userId,
      name: newProject.name,
      created_at: now,
      canvas_data: {
        installedIds: [],
        nodeValues: {},
        techPackHistory: [],
      },
    });

    if (error) {
      // Rollback
      setProjects((prev) => prev.filter((p) => p.id !== id));
      throw error;
    }

    return id;
  }, [userId]);

  /* ── UPDATE (optimistic + debounced) ── */
  const updateProject = useCallback(
    (projectId, partial) => {
      // 1. Optimistic merge
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, ...partial } : p))
      );

      // 2. Compute fields from the merged project and schedule save
      // We need the merged project to build the correct canvas_data
      setProjects((current) => {
        const merged = current.find((p) => p.id === projectId);
        if (merged) {
          const fields = projectToFields(merged);
          requestSave(projectId, { projectId, fields });
        }
        return current; // no state change — just reading
      });
    },
    [requestSave]
  );

  /* ── DELETE (for future use) ── */
  const deleteProject = useCallback(async (projectId) => {
    const backup = projectsRef.current;
    setProjects((prev) => prev.filter((p) => p.id !== projectId));

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      setProjects(backup);
      throw error;
    }
  }, []);

  return {
    projects,
    loading,
    fetchError,
    createProject,
    updateProject,
    deleteProject,
    saveStatus,
  };
}

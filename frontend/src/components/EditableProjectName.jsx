import { useState, useRef, useEffect } from "react";

export default function EditableProjectName({ name, onRename }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== name) {
      onRename(trimmed);
    } else {
      setDraft(name);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      setDraft(name);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className="text-sm font-bold text-ink tracking-tight bg-transparent border-b border-accent outline-none py-0.5 w-64"
      />
    );
  }

  return (
    <h1
      onClick={() => {
        setDraft(name);
        setEditing(true);
      }}
      className="text-sm font-bold text-ink tracking-tight cursor-text hover:text-accent transition-colors"
      title="Click to rename"
    >
      {name}
    </h1>
  );
}

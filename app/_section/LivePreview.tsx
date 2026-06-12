"use client";

import type { CSSProperties } from "react";
import type { ListState } from "../types";

function shell(state: ListState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.6 : 1,
    transition: state.motion ? "opacity 200ms ease" : "none",
  };
}

function itemStatus(state: ListState, selected: boolean) {
  if (selected) return "Selected";
  if (state.previewState === "error") return "Needs review";
  if (state.previewState === "success") return "Complete";
  if (state.previewState === "loading") return "Syncing";
  return "Ready";
}

export default function LivePreview({ state }: { state: ListState }) {
  const itemTotal = state.emptyState ? 0 : Math.max(state.itemCount, 1);
  const items = Array.from({ length: itemTotal }, (_, index) => index);
  const selectedIndex = Math.min(Math.max(state.selectedIndex, 0), Math.max(itemTotal - 1, 0));
  const ListTag = state.listMode === "ordered" ? "ol" : "ul";
  const listRole = state.listMode === "menu" || state.listMode === "listbox" ? state.listMode : undefined;
  const itemRole = state.listMode === "menu" ? "menuitem" : state.listMode === "listbox" ? "option" : undefined;
  const panel = shell(state);

  return (
    <section
      id={state.id}
      aria-labelledby={`${state.id}-title`}
      aria-describedby={`${state.id}-description ${state.id}-count`}
      tabIndex={state.tabIndex}
      style={panel}
      data-component="list"
      data-preview-state={state.previewState}
    >
      <div className="mb-4">
        <h3 id={`${state.id}-title`} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p id={`${state.id}-description`} style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
        <p id={`${state.id}-count`} className="mt-2 text-xs" style={{ color: state.muted }}>
          {itemTotal} {itemTotal === 1 ? "item" : "items"} in this {state.listMode} list.
        </p>
      </div>
      {state.emptyState ? (
        <p role="status" className="rounded-2xl border p-4 text-sm" style={{ borderColor: state.border, color: state.muted }}>
          {state.helper}
        </p>
      ) : (
        <ListTag role={listRole} aria-label={`${state.ariaLabel}: ${itemTotal} items`} className="grid list-none p-0" style={{ gap: state.gap }}>
          {items.map((index) => {
            const selected = index === selectedIndex;
            const status = itemStatus(state, selected);
            return (
              <li key={index} role={itemRole} aria-selected={state.listMode === "listbox" ? selected : undefined} aria-disabled={state.disabled || undefined} className="flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: selected ? state.accent : state.showDividers ? state.border : "transparent", background: selected ? `color-mix(in oklab, ${state.accent} 18%, transparent)` : "transparent", transition: state.motion ? "background 200ms ease, border-color 200ms ease" : "none" }}>
                {state.showAvatars && (
                  <span aria-hidden="true" className="grid size-10 place-items-center rounded-full text-sm font-bold" style={{ background: selected ? state.accent : state.border, color: selected ? state.background : state.foreground }}>
                    {index + 1}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{state.label} {index + 1}</span>
                  <span className="block truncate text-sm" style={{ color: state.muted }}>{state.helper}</span>
                </span>
                <span className="rounded-full border px-2 py-1 text-xs" style={{ borderColor: selected ? state.accent : state.border, color: selected ? state.accent : state.muted }}>
                  {status}
                </span>
              </li>
            );
          })}
        </ListTag>
      )}
    </section>
  );
}

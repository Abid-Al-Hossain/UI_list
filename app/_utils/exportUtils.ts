import type { ListState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: ListState, fileName = "list") : ExportPayload {
  return { fileName: `${fileName || "list"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: ListState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "function itemStatus(selected) {",
    "  if (selected) return \"Selected\";",
    "  if (state.previewState === \"error\") return \"Needs review\";",
    "  if (state.previewState === \"success\") return \"Complete\";",
    "  if (state.previewState === \"loading\") return \"Syncing\";",
    "  return \"Ready\";",
    "}",
    "",
    "export default function ListComponent() {",
    "  const itemTotal = state.emptyState ? 0 : Math.max(state.itemCount, 1);",
    "  const items = Array.from({ length: itemTotal }, (_, index) => index);",
    "  const selectedIndex = Math.min(Math.max(state.selectedIndex, 0), Math.max(itemTotal - 1, 0));",
    "  const ListTag = state.listMode === \"ordered\" ? \"ol\" : \"ul\";",
    "  const listRole = state.listMode === \"menu\" || state.listMode === \"listbox\" ? state.listMode : undefined;",
    "  const itemRole = state.listMode === \"menu\" ? \"menuitem\" : state.listMode === \"listbox\" ? \"option\" : undefined;",
    "  const panel = { width: state.width, minHeight: state.height, padding: state.padding, borderRadius: state.radius, border: state.borderWidth + \"px solid \" + state.border, boxShadow: \"0 \" + Math.round(state.shadow / 3) + \"px \" + state.shadow + \"px rgba(0,0,0,.28)\", background: state.background, color: state.foreground, fontFamily: state.fontFamily, opacity: state.disabled ? 0.6 : 1, transition: state.motion ? \"opacity 200ms ease\" : \"none\" };",
    "  return (",
    "    <section id={state.id} aria-labelledby={`${state.id}-title`} aria-describedby={`${state.id}-description ${state.id}-count`} tabIndex={state.tabIndex} style={panel} data-component=\"list\" data-preview-state={state.previewState}>",
    "      <div style={{ marginBottom: 16 }}>",
    "        <h3 id={`${state.id}-title`} style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "        <p id={`${state.id}-description`} style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>",
    "        <p id={`${state.id}-count`} style={{ color: state.muted, fontSize: 12, marginTop: 8 }}>{itemTotal} {itemTotal === 1 ? \"item\" : \"items\"} in this {state.listMode} list.</p>",
    "      </div>",
    "      {state.emptyState ? (",
    "        <p role=\"status\" style={{ border: state.borderWidth + \"px solid \" + state.border, borderRadius: Math.max(state.radius - 6, 10), padding: 16, color: state.muted }}>{state.helper}</p>",
    "      ) : (",
    "        <ListTag role={listRole} aria-label={`${state.ariaLabel}: ${itemTotal} items`} style={{ display: \"grid\", gap: state.gap, listStyle: \"none\", padding: 0, margin: 0 }}>",
    "          {items.map((index) => {",
    "            const selected = index === selectedIndex;",
    "            const status = itemStatus(selected);",
    "            return (",
    "              <li key={index} role={itemRole} aria-selected={state.listMode === \"listbox\" ? selected : undefined} aria-disabled={state.disabled || undefined} style={{ display: \"flex\", alignItems: \"center\", gap: 12, borderRadius: Math.max(state.radius - 6, 10), border: state.borderWidth + \"px solid \" + (selected ? state.accent : state.showDividers ? state.border : \"transparent\"), padding: 12, background: selected ? \"color-mix(in oklab, \" + state.accent + \" 18%, transparent)\" : \"transparent\", transition: state.motion ? \"background 200ms ease, border-color 200ms ease\" : \"none\" }}>",
    "                {state.showAvatars && <span aria-hidden=\"true\" style={{ display: \"grid\", placeItems: \"center\", width: 40, height: 40, borderRadius: 999, background: selected ? state.accent : state.border, color: selected ? state.background : state.foreground, fontWeight: 700 }}>{index + 1}</span>}",
    "                <span style={{ minWidth: 0, flex: 1 }}>",
    "                  <span style={{ display: \"block\", fontWeight: 700 }}>{state.label} {index + 1}</span>",
    "                  <span style={{ display: \"block\", color: state.muted, fontSize: state.bodySize }}>{state.helper}</span>",
    "                </span>",
    "                <span style={{ border: state.borderWidth + \"px solid \" + (selected ? state.accent : state.border), borderRadius: 999, padding: \"4px 8px\", color: selected ? state.accent : state.muted, fontSize: 12 }}>{status}</span>",
    "              </li>",
    "            );",
    "          })}",
    "        </ListTag>",
    "      )}",
    "    </section>",
    "  );",
    "}",
    "",
  ].join("\n");
}

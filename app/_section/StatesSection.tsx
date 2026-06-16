"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { ListState } from "../types";

type Props = { state: ListState; update: <K extends keyof ListState>(key: K, value: ListState[K]) => void };

export default function StatesSection({ state, update }: Props) {
  return <SectionCard title="State Preview" subtitle="State Preview controls for native list generation.">
      <div className="space-y-4"><Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "open",
  "closed",
  "selected",
  "loading",
  "empty",
  "error",
  "success"
]} onChange={(value) => update("previewState", value)} />
<Slider label="Selected index" value={state.selectedIndex} min={0} max={12} step={1} onChange={(value) => update("selectedIndex", value)} />
<Switch label="Empty state" checked={state.emptyState} onChange={(value) => update("emptyState", value)} /></div>
    </SectionCard>;
}

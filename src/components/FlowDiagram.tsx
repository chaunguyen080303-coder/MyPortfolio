"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dagre from "@dagrejs/dagre";
import {
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ProjectFlow } from "@/data/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const nodeWidth = 144;
const nodeHeight = 62;

type ServiceData = { kind: string; title: string };
type ServiceNode = Node<ServiceData, "service">;

function ServiceNodeView({ data }: NodeProps<ServiceNode>) {
  return (
    <div className="w-36 rounded-xl border border-line bg-canvas px-3 py-2.5 shadow-[0_10px_24px_rgba(2,6,23,0.16)]">
      <Handle id="left" type="target" position={Position.Left} className="!size-2 !border-0 !bg-accent" />
      <Handle id="top" type="target" position={Position.Top} className="!size-2 !border-0 !bg-accent" />
      <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">{data.kind}</p>
      <p className="mt-1 text-xs leading-4 font-medium text-ink">{data.title}</p>
      <Handle id="right" type="source" position={Position.Right} className="!size-2 !border-0 !bg-accent" />
      <Handle id="bottom" type="source" position={Position.Bottom} className="!size-2 !border-0 !bg-accent" />
    </div>
  );
}

const nodeTypes = { service: ServiceNodeView };

function stackedPositions(flow: ProjectFlow) {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: "TB", nodesep: 28, ranksep: 52 });

  for (const node of flow.nodes) {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  }
  for (const edge of flow.edges) {
    graph.setEdge(edge.source, edge.target);
  }

  dagre.layout(graph);

  return new Map(
    flow.nodes.map((node) => {
      const position = graph.node(node.id);
      return [node.id, { x: position.x - nodeWidth / 2, y: position.y - nodeHeight / 2 }] as const;
    }),
  );
}

export function FlowDiagram({
  flow,
  label,
  tall = false,
  decorative = false,
}: {
  flow: ProjectFlow;
  label: string;
  tall?: boolean;
  decorative?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const update = () => setCompact(element.clientWidth < 640);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const positions = useMemo(() => (compact ? stackedPositions(flow) : null), [compact, flow]);

  const nodes = useMemo<ServiceNode[]>(
    () =>
      flow.nodes.map((node) => ({
        id: node.id,
        type: "service",
        position: positions?.get(node.id) ?? { x: node.x, y: node.y },
        data: { kind: node.kind, title: node.title },
        draggable: false,
        connectable: false,
        selectable: false,
      })),
    [flow.nodes, positions],
  );

  const edges = useMemo<Edge[]>(
    () =>
      flow.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: compact ? "bottom" : (edge.sourceHandle ?? "right"),
        targetHandle: compact ? "top" : (edge.targetHandle ?? "left"),
        label: edge.label,
        type: "smoothstep",
        animated: !reduced,
        style: { stroke: "var(--accent)", strokeWidth: 1.5 },
        labelStyle: { fill: "var(--muted)", fontSize: 10, fontWeight: 600 },
        labelBgStyle: { fill: "var(--canvas)", fillOpacity: 0.92 },
        labelBgPadding: [6, 3],
        labelBgBorderRadius: 6,
      })),
    [compact, flow.edges, reduced],
  );

  return (
    <div
      ref={frameRef}
      className={`flow-diagram ${compact ? "h-[30rem]" : tall ? "h-72 sm:h-80" : "h-64 sm:h-72"}`}
      aria-hidden={decorative || undefined}
    >
      {mounted ? (
      <ReactFlow
        key={compact ? "compact" : "wide"}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.16 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        className="pointer-events-none h-full w-full"
        proOptions={{ hideAttribution: true }}
        aria-label={label}
      />
      ) : null}
      <ol className={decorative ? "hidden" : "sr-only"}>
        {flow.edges.map((edge) => {
          const source = flow.nodes.find((node) => node.id === edge.source);
          const target = flow.nodes.find((node) => node.id === edge.target);
          return (
            <li key={edge.id}>
              {source?.title} to {target?.title}
              {edge.label ? `, ${edge.label}` : ""}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

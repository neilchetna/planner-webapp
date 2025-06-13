"use client";
import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Sidebar from "./components/sidebar";

type PlansLayoutProps = {
  children: React.ReactNode;
};

function PlansLayout({ children }: PlansLayoutProps) {
  return (
    <PanelGroup className="h-full" direction="horizontal">
      <Panel defaultSize={20} minSize={10} maxSize={30}>
        <Sidebar />
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={100 - 15} minSize={30}>
        <div className="bg-slate-50 px-4 h-screen">{children}</div>
      </Panel>
    </PanelGroup>
  );
}

export default PlansLayout;

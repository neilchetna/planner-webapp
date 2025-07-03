"use client";
import { useFetchPlans } from "@/lib/hooks";
import KeystrokeListener from "@/ui/keystroke/keystroke-listener";
import React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import LayoutLoading from "./components/layout-loading";
import Sidebar from "./components/sidebar";

type PlansLayoutProps = {
  children: React.ReactNode;
};

function PlansLayout({ children }: PlansLayoutProps) {
  const { loading } = useFetchPlans();

  if (loading) {
    return <LayoutLoading />;
  }

  return (
    <PanelGroup className="h-full" direction="horizontal">
      <Panel defaultSize={20} minSize={10} maxSize={30}>
        <Sidebar />
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={100 - 15} minSize={30}>
        <KeystrokeListener />
        <div className="h-screen bg-slate-50 px-4">{children}</div>
      </Panel>
    </PanelGroup>
  );
}

export default PlansLayout;

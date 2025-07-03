import BarTextSkeleton from "@/ui/skeleton/bar-text";
import { Flex } from "@radix-ui/themes";
import { Panel, PanelGroup } from "react-resizable-panels";

export default function LayoutLoading() {
  return (
    <PanelGroup className="h-full" direction="horizontal">
      <Panel defaultSize={20} minSize={10} maxSize={30}>
        <Flex className="h-screen w-full bg-slate-100 px-4 pt-12" gap="4" direction="column">
          {new Array(4).fill(null).map((_, i) => (
            <BarTextSkeleton key={i} />
          ))}
        </Flex>
      </Panel>
      <Panel defaultSize={100 - 15} minSize={30}>
        <div className="h-screen bg-slate-50 px-4" />
      </Panel>
    </PanelGroup>
  );
}

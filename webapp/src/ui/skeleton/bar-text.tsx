import { Flex, Skeleton } from "@radix-ui/themes";

function BarTextSkeleton() {
  return (
    <Flex className="w-full" gap="4">
      <Skeleton className="h-7 w-7 rounded-full" />
      <Skeleton className="h-7 w-full rounded-md" />
    </Flex>
  );
}

export default BarTextSkeleton;

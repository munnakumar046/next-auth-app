import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const postCount = await prisma.post.count();
  const userCount = await prisma.user.count();

  console.log(postCount, userCount);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards userCount={userCount} postCount={postCount} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}

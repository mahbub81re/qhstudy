import { getHTextById } from "@/actions/h-text-action";
import AdminHDetails from "@/components/AdminHDetails";
import HTextUpdate from "@/components/HTextUpdate";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string; edit?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } =await params;
  const {tab} = await searchParams || "translations";
  const {edit} =await searchParams || "";

  const htext = await getHTextById(id);

  if (!htext) {
    return <div className="p-4">No HText found</div>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <HTextUpdate htext={htext} />
      <AdminHDetails id={id} tab={tab} edit={edit} />
    </div>
  );
}

import { trpcCaller } from "../../../../utils/trpc-server";
import { Header } from "../../components/header";

const CompanyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const caller = await trpcCaller();
  const { id } = await params;
  const company = await caller.company.getOne({ id });

  if (!company) {
    return <div>Company not found</div>;
  }
  return (
    <div>
      <Header
        page={company?.name}
        pages={[{ label: "Companies", href: "/app/company" }]}
      />
      {/* <CompanyCard company={company} /> */}
    </div>
  );
};

export default CompanyPage;

import { DeployedContracts } from "components/contract-components/tables/deployed-contracts";
import { redirect } from "next/navigation";
import { getAuthTokenWalletAddress } from "../../../../api/lib/getAuthToken";
import { GetStartedWithContractsDeploy } from "../../../../team/[team_slug]/[project_slug]/contracts/_components/GetStartedWithContractsDeploy";
import { getSortedDeployedContracts } from "./getSortedDeployedContracts";

export default async function Page() {
  const accountAddress = getAuthTokenWalletAddress();
  if (!accountAddress) {
    return redirect(`/login?next=${encodeURIComponent("/dashboard")}`);
  }

  const contracts = await getSortedDeployedContracts({
    address: accountAddress,
  });

  if (contracts.length === 0) {
    return <GetStartedWithContractsDeploy />;
  }

  return (
    <DeployedContracts contractList={contracts} limit={50} isPending={false} />
  );
}

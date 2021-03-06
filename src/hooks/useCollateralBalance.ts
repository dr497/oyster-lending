import { PublicKey } from "@solana/web3.js";
import { useMint } from "../contexts/accounts";
import { LendingReserve } from "../models/lending";
import { fromLamports } from "../utils/utils";
import { useUserBalance } from "./useUserBalance";

export function useCollateralBalance(
  reserve?: LendingReserve,
  account?: PublicKey
) {
  const mint = useMint(reserve?.collateralMint);
  const { balanceLamports, accounts } = useUserBalance(
    reserve?.collateralMint,
    account
  );

  const collateralRatioLamports =
    (reserve?.availableLiquidity.toNumber() || 0) *
    (balanceLamports / (reserve?.collateralMintSupply.toNumber() || 1));

  return {
    balance: fromLamports(collateralRatioLamports, mint),
    balanceLamports: collateralRatioLamports,
    accounts,
  };
}

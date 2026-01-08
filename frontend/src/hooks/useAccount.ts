import { useEffect, useState } from "react";
import { Axios } from "../lib/axios-config";
import type { IAccount, IResponse } from "../types";

export function useAccount(username?: string) {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = username ? `account/${username}` : "account";
    Axios.get<IResponse<IAccount>>(url)
      .then((r) => setAccount(r.data.payload))
      .finally(() => setLoading(false));
  }, [username]);

  return { account, loading };
}

import { useForm } from "react-hook-form";
import { MessagePopup } from "../components";
import { Axios } from "../../lib/axios-config";
import type { IResponse } from "../../types";
type IUpdatePass = {
  oldPassword: string;
  newPassword: string;
};
export const UpdatePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdatePass>();
  async function onSubmit(data: IUpdatePass) {
    try {
      const { data: res } = await Axios.patch<IResponse>(
        "account/update-password",
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
};

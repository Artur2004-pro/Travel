import { useForm } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { MessagePopup } from "../components";
import { Eye, EyeOff } from "lucide-react";
import type { IResponse } from "../../types";

type FormValues = {
  username: string;
  password: string;
};

export const UpdateUsername = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [show, setShow] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setPopup({ type, text });
    setTimeout(() => setPopup(null), 2500);
  };

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      const { data } = await Axios.post<IResponse>(
        "account/update-password",
        values
      );
      showMessage("success", (data as any).message || "Password updated");
      reset();
    } catch (err: any) {
      showMessage("error", err?.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-background p-6">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-lg p-8 animate-fade-in space-y-8">
        {popup && <MessagePopup {...popup} />}

        <h2 className="text-2xl font-semibold text-foreground">
          Update Username
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Old Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              New Username
            </label>

            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <div className="relative">
              <input
                type="text"
                {...register("username", {
                  required: "username is required",
                })}
                className={`
                    w-full bg-input border rounded-lg px-3 py-2 pr-11
                    text-foreground placeholder-muted-foreground bg-inherit
                    focus:outline-none focus:ring-2 focus:ring-primary
                  `}
                placeholder="Enter new Username"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className={`
                    w-full bg-input border rounded-lg px-3 py-2 pr-11
                    text-foreground placeholder-muted-foreground bg-inherit
                    focus:outline-none focus:ring-2 focus:ring-primary
                  `}
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-muted-foreground hover:text-foreground
                    transition-colors
                  "
              >
                {show ? (
                  <EyeOff size={20} strokeWidth={1.75} />
                ) : (
                  <Eye size={20} strokeWidth={1.75} />
                )}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Minimum 6 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
                w-full py-2 rounded-lg font-medium 
                bg-gradient-to-r from-primary/90 to-primary 
                text-black dark:text-white
                hover:from-primary/80 hover:to-primary/80
                transition-all
                bg-sky-500/10
                ${loading ? "opacity-60 cursor-not-allowed" : ""}
              `}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsername;

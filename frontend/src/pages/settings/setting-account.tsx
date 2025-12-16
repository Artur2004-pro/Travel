import React, { useRef, useState } from "react";
import type { IAccount, IAccountProps, IResponse } from "../../types";
import {
  Shield,
  User as UserIcon,
  Mail,
  Camera,
  Plane,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";

export const AccountCard: React.FC<IAccountProps> = ({ account }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  if (!account) {
    setTimeout(() => navigate("/login"), 1500);
    return <h1 className="text-center text-red-500">Please login</h1>;
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
  };

  const handleSave = async () => {
    try {
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await Axios.patch<IResponse<IAccount>>(
        "account/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      account.avatar = data.payload.avatar;
      setFile(null);
      setPreview("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-2xl shadow-xl dark:bg-black/20">
      <div className="absolute inset-0 -z-10 opacity-50 blur-3xl bg-gradient-to-br from-sky-600/20 via-teal-500/20 to-sky-400/10" />

      <div className="flex items-start gap-7">
        {/* LEFT SIDE — AVATAR + BUTTONS */}
        <div className="flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="relative group h-20 w-20">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />

            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-white/10"
              />
            ) : account.avatar ? (
              <img
                src={import.meta.env.VITE_APP_DOMAIN + account.avatar}
                alt={account.username}
                className="h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-white/10"
              />
            ) : (
              <div className="h-20 w-20 rounded-full flex items-center justify-center bg-slate-800 text-3xl font-semibold shadow-lg ring-2 ring-white/10">
                {account.username[0].toUpperCase()}
              </div>
            )}

            {/* Hover overlay */}
            <button
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 hidden group-hover:flex items-center justify-center 
                         bg-black/50 backdrop-blur-sm rounded-full cursor-pointer"
            >
              <Camera className="h-7 w-7 text-white" />
            </button>
          </div>

          {/* BUTTON BAR UNDER AVATAR */}
          {preview && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="p-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition shadow-sm"
                title="Save"
              >
                <Plane className="h-5 w-5" />
              </button>

              <button
                onClick={handleRemove}
                className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition shadow-sm"
                title="Remove"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — USER INFO */}
        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            {account.username}
          </h2>

          <p className="text-sm text-zinc-300 flex items-center gap-2">
            <Mail size={15} /> {account.email}
          </p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-[3px] text-xs font-medium text-sky-400 shadow-sm">
            {account.role === "admin" ? (
              <Shield className="h-3 w-3" />
            ) : (
              <UserIcon className="h-3 w-3" />
            )}
            <span>{account.role}</span>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-6 h-px w-full bg-white/10" />

      <p className="text-sm text-zinc-300 leading-relaxed">
        Սա ձեր Bardiner account-ն է։ Այստեղ կարող եք կառավարել օգտվողի
        տվյալները, փոխել գաղտնաբառը կամ դիտել ադմինիստրացիոն գործիքները։
      </p>
    </div>
  );
};

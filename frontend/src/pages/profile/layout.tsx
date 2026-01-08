import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import ProfileHeader from "./header";
import { useEffect } from "react";
import useMessage from "../../hooks/useMessage";
import { MessagePopup } from "../components";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const { account } = useAuth();
  const { message, showMessage } = useMessage();
  useEffect(() => {
    if (!account) {
      showMessage(
        "error",
        "You must be logged in to view profile",
        1500,
        () => {
          navigate("/login");
        }
      );
      return;
    }
  }, [account, navigate]);
  return (
    <main className="flex justify-center w-full bg-white dark:bg-black">
      <div className="w-full max-w-[935px] px-4">
        {message ? (
          <MessagePopup text={message.text} type={message.type} />
        ) : (
          <>
            <ProfileHeader
              account={account}
              onEdit={() => navigate("/settings/edit-profile")}
            />

            <nav className="border-t flex justify-center gap-12 text-xs uppercase tracking-widest overflow-x-auto">
              <Tab to="">Posts</Tab>
              <Tab to="trips">Trips</Tab>
              <Tab to="comments">Comments</Tab>
            </nav>

            <section className="pt-6 pb-24 md:pb-10">
              <Outlet />
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Tab({ to, children }: any) {
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        `py-4 border-t-2 ${
          isActive
            ? "border-black dark:border-white font-semibold"
            : "border-transparent text-zinc-400 dark:text-zinc-500"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

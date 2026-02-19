import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import ProfileHeader from "./header";
import { useEffect, useRef } from "react";
import useMessage from "../../hooks/useMessage";
import { MessagePopup } from "../components";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, account } = useAuth();
  const { message, showMessage } = useMessage();
  const redirected = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !redirected.current) {
      redirected.current = true;
      // show a message then navigate once — don't include `showMessage` in deps
      // to avoid re-running if it's not stable; navigate is stable from react-router
      showMessage("error", "You must be logged in to view profile", 1500);
      setTimeout(() => navigate("/login"), 1600);
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex justify-center w-full bg-white dark:bg-neutral-950 min-h-screen">
      <div className="w-full max-w-feed md:max-w-3xl lg:max-w-4xl min-w-0 px-4">
        {message ? (
          <MessagePopup text={message.text} type={message.type} />
        ) : (
          <>
            <ProfileHeader
              account={account}
              onEdit={() => navigate("/settings/edit-profile")}
            />

            <nav className="border-t border-neutral-200 dark:border-neutral-800 flex justify-center gap-12">
              <Tab to="" end>Posts</Tab>
              <Tab to="trips">Trips</Tab>
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

function Tab({
  to,
  end,
  children,
}: {
  to: string;
  end?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        `py-4 text-xs font-semibold tracking-wider uppercase border-t-2 -mt-px transition-colors ${
          isActive
            ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
            : "border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

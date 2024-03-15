"use client";

import { logout } from "@/actions/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";

const SettingsPage = () => {
  const onClick = () => {
    logout();
  };

  return (
    <div>
      <Button onClick={onClick} variant="flat" className=" bg-azulPrincipal">
        Log Out
      </Button>
    </div>
  );
};

export default SettingsPage;

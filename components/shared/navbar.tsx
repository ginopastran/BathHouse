"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import { LoginButton } from "../auth/login-button";

interface NavBarProps {
  session: Session | null;
}

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const onClick = () => {
    logout();
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/">
              <p className="font-bold text-inherit text-2xl">Bathouse</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/otro" aria-current="page">
              Presupuesto 1
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/etapa-2">
              Presupuesto 2
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-3"></NavbarItem>
        </NavbarContent>
        <NavbarMenu className="flex pt-8">
          <NavbarMenuItem className="flex flex-col gap-y-6">
            <Link href="/otro" className=" text-lg">
              Presupuesto 1
            </Link>
            <Link href="/etapa-2" className=" text-lg">
              Presupuesto 2
            </Link>
            {session && (
              <NavbarItem>
                <Button
                  color="primary"
                  onClick={onClick}
                  variant="flat"
                  className=" bg-sky-600"
                >
                  Log Out
                </Button>
              </NavbarItem>
            )}
            {!session && (
              <div className="flex gap-x-4">
                <NavbarItem className="flex">
                  <LoginButton mode="modal" asChild>
                    <Link className=" cursor-pointer">Login</Link>
                  </LoginButton>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/auth/register"
                    className=" bg-sky-600"
                  >
                    Sign Up
                  </Button>
                </NavbarItem>
              </div>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit text-2xl">Bathouse</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/otro" aria-current="page">
            Presupuesto 1
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/etapa-2">
            Presupuesto 2
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-3">
          {session && (
            <NavbarItem>
              <Button
                color="primary"
                onClick={onClick}
                variant="flat"
                className=" bg-sky-600"
              >
                Log Out
              </Button>
            </NavbarItem>
          )}
          {!session && (
            <NavbarItem className=" lg:flex">
              <LoginButton mode="modal" asChild>
                <Button variant="bordered" className=" border-sky-600">
                  Login
                </Button>
              </LoginButton>
            </NavbarItem>
          )}
          {!session && (
            <NavbarItem>
              <Button
                as={Link}
                href="/auth/register"
                className=" bg-sky-600 text-sm"
              >
                Sign Up
              </Button>
            </NavbarItem>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex pt-8">
        <NavbarMenuItem className="flex flex-col gap-y-6">
          <Link href="/otro" className=" text-lg">
            Presupuesto 1
          </Link>
          <Link href="/etapa-2" className=" text-lg">
            Presupuesto 2
          </Link>
          {session && (
            <NavbarItem>
              <Button
                color="primary"
                onClick={onClick}
                variant="flat"
                className=" bg-sky-600"
              >
                Log Out
              </Button>
            </NavbarItem>
          )}
          {!session && (
            <div className="flex gap-x-4">
              <NavbarItem className="flex">
                <LoginButton mode="modal" asChild>
                  <Link className=" cursor-pointer">Login</Link>
                </LoginButton>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} href="/auth/register" className=" bg-sky-600">
                  Sign Up
                </Button>
              </NavbarItem>
            </div>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

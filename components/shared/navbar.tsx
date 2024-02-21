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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";
import { LoginButton } from "../auth/login-button";
import { ArrowDown, ChevronDown } from "lucide-react";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const onClick = () => {
    logout();
  };

  const { data: session, status } = useSession();

  //Esta es una navbar que se carga sin el boton de login o logout porque espera a que las funciones que reciben la session se ejecuten
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
              <p className="font-bold text-inherit text-2xl">
                Bathouse V.1.0 Beta{" "}
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ChevronDown className=" h-4 w-4" />}
                  radius="sm"
                  variant="light"
                >
                  Presupuestos
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex gap-3"></NavbarItem>
        </NavbarContent>
        <NavbarMenu className="flex pt-8">
          <NavbarMenuItem className="flex flex-col gap-y-6">
            {session && (
              <NavbarItem>
                <Button
                  onClick={onClick}
                  variant="flat"
                  className=" bg-azulPrincipal"
                >
                  Log Out
                </Button>
              </NavbarItem>
            )}
            {!session && (
              <div className="flex gap-x-4">
                <NavbarItem className="flex">
                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="bordered"
                    className=" border-sky-700"
                  >
                    Log In
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/auth/register"
                    className=" bg-azulPrincipal text-white"
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
            <p className="font-bold text-inherit text-2xl">
              Bathouse V1.0 Beta
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium"
                endContent={<ChevronDown className=" h-4 w-4" />}
                radius="sm"
                variant="light"
              >
                Presupuestos
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="presupuesto-basico"
              href="/otro"
              description="ACME scales apps to meet user demand, automagically, based on load."
            >
              Presupuesto Básico
            </DropdownItem>
            <DropdownItem
              key="presupuesto-pro"
              href="/etapa-2"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
            >
              Presupuesto Pro
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex gap-3">
          {session && (
            <NavbarItem>
              <Button
                color="primary"
                onClick={onClick}
                variant="flat"
                className=" bg-azulPrincipal text-white"
              >
                Log Out
              </Button>
            </NavbarItem>
          )}
          {!session && (
            <NavbarItem className=" lg:flex">
              <LoginButton mode="modal" asChild>
                <Button variant="bordered" className=" border-sky-700">
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
                className=" bg-azulPrincipal text-sm text-withe"
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
                className=" bg-azulPrincipal text-white"
              >
                Log Out
              </Button>
            </NavbarItem>
          )}
          {!session && (
            <div className="flex gap-x-4">
              <NavbarItem className="flex">
                <Button
                  as={Link}
                  href="/auth/login"
                  variant="bordered"
                  className=" border-skyl-700"
                >
                  Log In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  href="/auth/register"
                  className=" bg-azulPrincipal text-white"
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

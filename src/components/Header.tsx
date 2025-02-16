import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";


export default function Header() {

  const location = useLocation()
  const { userId } = useAuth()

  const menuItems = [
    "Login",
    "Profile",
    "Dashboard",
    "Activity",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar disableAnimation isBordered className="bg-primary !top-0 !fixed text-white">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit text-white">Ticket Tracker</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit text-white">Ticket Tracker</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <NavbarItem>
          {userId ? (
            <>
              <div className="flex justify-between min-w-[300px] items-center">
                <NavbarItem isActive>
                  <Link aria-current="page" href="/dashboard" className="text-white">
                    Dashboard
                  </Link>
                </NavbarItem>
                <Button as={Link} onClick={logoutUser} className="bg-green-600 text-white" variant="flat">
                  Logout
                </Button>
              </div>
            </>
          ) : location.pathname === "/login" ? (
            <Button as={Link} className="bg-green-600 text-white mr-3" href="/register" variant="flat">
              Register
            </Button>
          ) : (
            <Button as={Link} className="bg-green-600 text-white" href="/login" variant="flat">
              Login
            </Button>
          )
          }

        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="mt-10 ml-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="/login"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

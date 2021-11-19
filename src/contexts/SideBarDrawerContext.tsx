import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";

interface SideBarProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const sideBarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SideBarProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <sideBarDrawerContext.Provider value={disclosure}>
      {children}
    </sideBarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(sideBarDrawerContext);

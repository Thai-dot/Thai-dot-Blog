import * as React from "react";
import DrawBackNavbar from "./DrawBackNav";

import { getAuthSession } from "@/lib/auth";

async function Navbar() {
  const session = await getAuthSession();
  return <DrawBackNavbar session={session} />;
}
export default Navbar;

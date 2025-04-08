import { memo } from "react";
import SellerHome from "./SellerHome";

function SellerDashboard() {
  return (
    <div>
      {/* <SellerNavbar/> */}
      <div className="flex gap-2 ">
        <SellerHome />
      </div>
    </div>
  );
}

export default memo(SellerDashboard);

// Router/Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import ReactRouterIntro from "../Pages/ReactRouterIntro";
import ReactRouterInfo from "../Pages/ReactRouterInfo";
import ReactRouterBestPractices from "../Pages/ReactRouterBestPractices";
import ReactForm from "../Pages/ReactForm";
import MultiPageForm from "../Pages/MultiPageForm";
import MultiStepFlow from "../MultiStepFlow/MultiStepFlow";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/react-router" element={<ReactRouterIntro />} />
      <Route path="/react-router/info" element={<ReactRouterInfo />} />
      <Route path="/react-router/best-practices" element={<ReactRouterBestPractices />} />
      <Route path="/react-form" element={<ReactForm />} />
      <Route path="/multi-form" element={<MultiPageForm />} />
      <Route path="/multi-step-flow" element={<MultiStepFlow />} />
    </Routes>
  )
}


export default AppRoutes;
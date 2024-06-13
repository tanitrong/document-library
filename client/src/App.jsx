import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./routes/Routes";
import {
  AboutUs,
  DocDetail,
  EachCategory,
  FinancialManage,
  HomePage,
  SearchDocs,
  Upgrade,
  UploadFile,
  ManageDocs as UserManageDocs,
  Faq,
} from "./pages";
import {
  AdminViewDoc,
  ManageDocs,
  ManageUser,
  Chat,
  Payment,
  Chart,
} from "./pages/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import TermsOfUse from "./pages/TermsOfUse";
import Policy from "./pages/Policy";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/document/:docId" element={<DocDetail />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/upload-file" element={<UploadFile />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/:category" element={<EachCategory />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/search/:keyword" element={<SearchDocs />} />
        <Route path="/finance" element={<FinancialManage />} />
        <Route path="/manage-docs" element={<UserManageDocs />} />
        <Route path="/admin/manage-docs" element={<ManageDocs />} />
        <Route path="/admin/chart" element={<Chart />} />
        <Route path="/admin/manage-user" element={<ManageUser />} />
        <Route path="/admin/manage-chat" element={<Chat />} />
        <Route path="/admin/manage-payment" element={<Payment />} />
        <Route
          path="/admin/manage-docs/review/:docId"
          element={<AdminViewDoc />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </BrowserRouter>
  );
}

export default App;

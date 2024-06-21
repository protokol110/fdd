import { Navigate, Route, Routes } from "react-router-dom";

import NotFoundPage from "./components/Container/NotFound/NotFound";
import MainPagePosts from "./components/Container/Main/MainPagePosts";
import Header from "./components/Container/Header";
import Footer from "./components/Container/Footer";
import NPABlock from "./components/Container/Normative/NPABlock";
import NPANew from "./components/Container/Normative/NPANew";
import DocumentsBlock from "./components/Container/Normative/DocumentsBlock";
import LPANew from "./components/Container/Normative/LPANew";
import UsefulBlock from "./components/Container/Normative/UsefulBlock";
import UsefulNew from "./components/Container/Normative/UsefulNew";
import AboutDep from "./components/Container/Department/AboutDep";
import AboutEdit from "./components/Container/Department/AboutEdit";
import OrderDep from "./components/Container/Department/OrderDep";
import OrderNew from "./components/Container/Department/OrderNew";
import StructDep from "./components/Container/Department/StructDep";
import PostsBlock from "./components/Container/Posts/PostsBlock";
import PostsArhBlock from "./components/Container/Posts/PostsArhBlock";
import PostSearchBlock from "./components/Container/Posts/PostSearchBlock";
import PostMain from "./components/Container/Posts/PostMain";
import PostNew from "./components/Container/Posts/PostNew";
import PostEdit from "./components/Container/Posts/PostEdit";
import ReportBlock from "./components/Container/Report/ReportBlock";
import ReportNew from "./components/Container/Report/ReportNew";
import ReportEdit from "./components/Container/Report/ReportEdit";
import AuthPage from "./components/Container/Auth/AuthPage";
import TokenService from "./services/token.service";

function RequireAuth({ children, redirectTo }) {
  const isAuth =
    TokenService.isHaveRole("ROLE_ADMIN") ||
    TokenService.isHaveRole("ROLE_EDITOR");
  return isAuth ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div className="body">
      <Header />
      <div className="main_block">
        <div className="main_part">
          <div className="main_part_main">
            <Routes>
              <Route path="/" element={<MainPagePosts />} />
              <Route path="/search" element={<PostSearchBlock />} />

              <Route path="contacts" element={<AboutDep />} />
              <Route
                path="contacts/create"
                element={
                  <RequireAuth redirectTo="/contacts">
                    <AboutEdit />
                  </RequireAuth>
                }
              />

              <Route path="order" element={<OrderDep />} />
              <Route
                path="order/new"
                element={
                  <RequireAuth redirectTo="/order">
                    <OrderNew />
                  </RequireAuth>
                }
              />
              <Route path="struct" element={<StructDep />} />
              <Route path="posts" element={<PostsBlock />} />
              <Route path="posts/:id" element={<PostMain />} />
              <Route
                path="posts/new"
                element={
                  <RequireAuth redirectTo="/posts">
                    <PostNew />
                  </RequireAuth>
                }
              />
              <Route
                path="posts/edit/:id"
                element={
                  <RequireAuth redirectTo="/posts">
                    <PostEdit />
                  </RequireAuth>
                }
              />
              <Route path="actual" element={<PostsBlock />} />
              <Route path="arh" element={<PostsArhBlock />} />
              <Route path="educ" element={<NPABlock />} />
              <Route
                path="educ/new"
                element={
                  <RequireAuth redirectTo="/educ">
                    <NPANew />
                  </RequireAuth>
                }
              />
              <Route path="playbook" element={<DocumentsBlock />} />
              <Route
                path="playbook/new"
                element={
                  <RequireAuth redirectTo="/playbook">
                    <LPANew />
                  </RequireAuth>
                }
              />
              <Route path="documents" element={<UsefulBlock />} />
              <Route
                path="documents/new"
                element={
                  <RequireAuth redirectTo="/documents">
                    <UsefulNew />
                  </RequireAuth>
                }
              />
              <Route path="report" element={<ReportBlock />} />
              <Route
                path="report/new"
                element={
                  <RequireAuth redirectTo="/report">
                    <ReportNew />
                  </RequireAuth>
                }
              />
              <Route
                path="report/edit/:id"
                element={
                  <RequireAuth redirectTo="/report">
                    <ReportEdit />
                  </RequireAuth>
                }
              />
              <Route path="auth" element={<AuthPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

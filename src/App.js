import {Navigate, Route, Routes, useLocation} from "react-router-dom";

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
import CreateDeport from "./components/Container/Department/CreateDeport";
import OrderDep from "./components/Container/Department/OrderDep";
import OrderNew from "./components/Container/Department/OrderNew";
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
import EditDep from "./components/Container/Department/EditDep";
import EmployeeList from "./components/Container/Department/User/EmployeeList";
import ListLinks from "./components/Container/Links/ListLinks";
import EditLinks from "./components/Container/Links/EditLinks";
import LinkNew from "./components/Container/Links/LinkNew";
import AddEmployee from "./components/Container/Department/User/addEmployee";
import EditEmployee from "./components/Container/Department/User/EditEmployee";
import RightSidePanel from "./components/Present/RightSidePanel";

function RequireAuth({children, redirectTo}) {
  const isAuth =
    TokenService.isHaveRole("ROLE_ADMIN") ||
    TokenService.isHaveRole("ROLE_EDITOR");
  return isAuth ? children : <Navigate to={redirectTo}/>;
}

function App() {

  const location = useLocation();

  let backgroundClass;
  if (location.pathname === '/contacts'
    || location.pathname.startsWith('/departments')
    || location.pathname.startsWith('/employee')) {
    backgroundClass = 'background_contacts';
  } else if (location.pathname === '/actual'
    || location.pathname === '/post'
    || location.pathname === '/arh'
    || location.pathname.startsWith('/posts/')) {
    backgroundClass = 'background_actual';
  } else if (location.pathname === '/links' || location.pathname.startsWith('/links/edit/')) {
    backgroundClass = 'background_links';
  } else if (location.pathname === '/documents'
    || location.pathname === '/documents/new'
    || location.pathname === '/playbook'
    || location.pathname === '/playbook/new'
    || location.pathname === '/educ'
    || location.pathname === '/educ/new') {
    backgroundClass = 'background_documents';
  } else {
    backgroundClass = 'background_default';
  }

  return (
    <div className="body">
      <Header/>
      <div className={`main_block ${backgroundClass}`}>
        <div className="main_part">
          <div className="main_part_main">
            <Routes>
              <Route path="/" element={<MainPagePosts/>}/>
              <Route path="/search" element={<PostSearchBlock/>}/>

              <Route path="/contacts" element={<AboutDep/>}/>
              <Route
                path="contacts/create"
                element={
                  <RequireAuth redirectTo="/contacts">
                    <CreateDeport/>
                  </RequireAuth>
                }
              />
              <Route
                path="departments/:id/edit"
                element={
                  <RequireAuth redirectTo="/contacts">
                    <EditDep/>
                  </RequireAuth>
                }
              />

              <Route
                path="employee/:idDep/add"
                element={
                  <RequireAuth redirectTo="/contacts">
                    <AddEmployee/>
                  </RequireAuth>
                }
              />
              <Route
                path="/employee/:idDep/:idEmp/edit"
                element={
                  <RequireAuth redirectTo="/contacts">
                    <EditEmployee/>
                  </RequireAuth>
                }
              />
              <Route path="/departments/:departmentId/employees" element={<EmployeeList/>}/>
              <Route path="/links" element={<ListLinks/>}/>

              <Route
                path="links/edit/:id"
                element={
                  <RequireAuth redirectTo="/links">
                    <EditLinks/>
                  </RequireAuth>
                }
              />

              <Route
                path="links/new"
                element={
                  <RequireAuth redirectTo="/links">
                    <LinkNew/>
                  </RequireAuth>
                }
              />

              <Route path="order" element={<OrderDep/>}/>
              <Route
                path="order/new"
                element={
                  <RequireAuth redirectTo="/order">
                    <OrderNew/>
                  </RequireAuth>
                }
              />
              <Route path="posts" element={<PostsBlock/>}/>
              <Route path="posts/:id" element={<PostMain/>}/>
              <Route
                path="posts/new"
                element={
                  <RequireAuth redirectTo="/posts">
                    <PostNew/>
                  </RequireAuth>
                }
              />
              <Route
                path="posts/edit/:id"
                element={
                  <RequireAuth redirectTo="/posts">
                    <PostEdit/>
                  </RequireAuth>
                }
              />
              <Route path="actual" element={<PostsBlock/>}/>
              <Route path="arh" element={<PostsArhBlock/>}/>
              <Route path="documents" element={<NPABlock/>}/>
              <Route
                path="documents/new"
                element={
                  <RequireAuth redirectTo="/documents">
                    <LPANew/>
                  </RequireAuth>
                }
              />
              <Route path="playbook" element={<DocumentsBlock/>}/>
              <Route
                path="playbook/new"
                element={
                  <RequireAuth redirectTo="/playbook">
                    <NPANew/>
                  </RequireAuth>
                }
              />
              <Route path="educ" element={<UsefulBlock/>}/>
              <Route
                path="educ/new"
                element={
                  <RequireAuth redirectTo="/educ">
                    <UsefulNew/>
                  </RequireAuth>
                }
              />
              <Route path="report" element={<ReportBlock/>}/>
              <Route
                path="report/new"
                element={
                  <RequireAuth redirectTo="/report">
                    <ReportNew/>
                  </RequireAuth>
                }
              />
              <Route
                path="report/edit/:id"
                element={
                  <RequireAuth redirectTo="/report">
                    <ReportEdit/>
                  </RequireAuth>
                }
              />
              <Route path="auth" element={<AuthPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </div>
          <RightSidePanel/>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default App;

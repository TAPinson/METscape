import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar />
      <UserProfileProvider>
        <PostProvider>
          <Router>
            <AppHeader />
            <ApplicationViews />
          </Router>
        </PostProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;

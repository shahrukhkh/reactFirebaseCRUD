
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import UpdateData from "./components/UpdateData";



const myRouter = createBrowserRouter([
  {
    path: '', Component: Dashboard, children: [

      { path: '', Component: StudentList },
      { path: 'addStudent', Component: AddStudent },
      { path: 'studentList', Component: StudentList },
      {
        path: 'updateData', Component: UpdateData
      }
    ]
  }]
);

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;

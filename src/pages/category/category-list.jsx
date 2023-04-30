import React, { useEffect, useState } from "react";
import Table from "./table";
import axios from "axios";
// import { ContextCurrency } from "../../context/currency";
import { Typography } from "@mui/material";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchDate = async () => {
      const fetchCategories = await axios.get("http://localhost:3010/category");
      setCategories(fetchCategories.data.items);
    };
    fetchDate();
  }, []);


  return (
    <article>
      <section>
        <Typography variant="h3">Catgory list</Typography>
        <Table  categories={categories}></Table>
      </section>
    </article>
  );
}

export default CategoryList;

// REDAX


// import Typography from "@mui/material/Typography";
// import Table from "./table";
// import { useSelector, useDispatch } from "react-redux";
// import { useContext, useEffect } from "react";
// import { CurrencyContext } from "../../contex/currency";
// import { stateValues } from "../../common/state-values";
// import { fetchCategory, toIdleStatus,} from "./category-list-slice";
// import { Alert, AlertTitle } from "@mui/material";
// import LinearProgress from "@mui/material/LinearProgress";

// function CategorytList() {
//   const categoryListStatus = useSelector((state) => {
//     return state.categoryList.status;
//   });
//   const categories = useSelector((state) => {
//     return state.categoryList.categories;
//   });
//   const error = useSelector((state) => {
//     return state.categoryList.error;
//   });
//   const dispatch = useDispatch();
//   const context = useContext(CurrencyContext);
//   useEffect(() => {
//      dispatch(toIdleStatus());
//   }, []);
//   useEffect(() => {
//     if (categoryListStatus === stateValues.idle) {
//       dispatch(fetchCategory());
//     }
//   }, [dispatch, categoryListStatus]);
//   let content;
//   if (categoryListStatus === stateValues.loading) {
//     content = <LinearProgress />;
//   } else if (categoryListStatus === stateValues.succeeded) {
//     content = <Table categories={categories} />;
//   } else if (categoryListStatus === stateValues.failed) {
//     content = (
//       <Alert severity="error">
//         <AlertTitle>Error</AlertTitle>
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <article>
//       <Typography variant="h3">Category List</Typography>
//       <section>{content}</section>
//     </article>
//   );
// }
// export default CategorytList;

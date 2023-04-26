import * as React from "react";
import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Row } from "./row";

export default function CollapsibleTable(props) {
  const prodByCategory = useMemo(() => {
    return props.products.reduce((acc, el) => {
      let categoryIndex = acc.findIndex(
        (accEl) => el.category.id === accEl.categoryId
      );
      let category;
      if (categoryIndex < 0) {
        category = {
          categoryName: el.category.name,
          categoryId: el.category.id,
          products: [],
        };
        acc.push(category);
      } else {
        category = acc[categoryIndex];
      }

      category.products.push(el);
      return acc;
    }, []);
  }, [props.products]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prodByCategory.map((row) => (
           
            <Row key={row.categoryId} row={row} context={props.context}/> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

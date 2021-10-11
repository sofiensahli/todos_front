import { Grid, Typography } from "@material-ui/core";
import TodosWidget from "../components/todos/todos-widgets";
import OverlayPanel from "../components/utils/modal";
import ListCategories from "../components/categories/categories-list";
import { useState } from "react";
export default function Dashboard({ userInfo }) {
  const [selectedCategory, setSelectedCategory] = useState(
    userInfo?.categories[0]
  );
  return (
    <Grid container>
      <Grid item xs={12} sm={12} xl={4} md={4}>
        <ListCategories
          categories={userInfo?.categories}
          onItemClick={setSelectedCategory}
        />
      </Grid>

      <Grid item xs={12} sm={12} xl={8} md={8}>
        <TodosWidget
          category={selectedCategory}
          setCategory={setSelectedCategory}
        />
      </Grid>
      <OverlayPanel />
    </Grid>
  );
}

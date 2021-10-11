import { Grid, Typography, IconButton, Paper } from "@material-ui/core";
import { MdNoteAdd } from "react-icons/md";
import { useState } from "react";
import AddToDo from "./todos-add";
import TodoColumn from "./todos-column";

export default function TodosWidget({ category, setCategory }) {
  const [isAddView, setIsAddView] = useState(false);

  return (
    <Grid item xs={12} sm={12} xl={12} md={12}>
      <Paper style={{ marginRight: "2%", marginTop: "2%" }}>
        <Grid container>
          <Grid item xs={10} sm={10} xl={10} md={10}>
            <Typography>Todos in {category?.title}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} xl={2} md={2}>
            <IconButton
              color="primary"
              onClick={() => setIsAddView(!isAddView)}
            >
              <MdNoteAdd />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {isAddView && (
        <AddToDo
          category={category}
          setCategory={setCategory}
          setIsAddView={setIsAddView}
        ></AddToDo>
      )}
      {!isAddView && (
        <Grid container>
          <Grid item xs={12} sm={12} xl={12} md={12}>
            <TodoColumn
              label="In progress"
              task={category?.todos}
              category={category}
              setCategory={setCategory}
              setIsAddView={setIsAddView}
            ></TodoColumn>
          </Grid>
      
        </Grid>
      )}
    </Grid>
  );
}

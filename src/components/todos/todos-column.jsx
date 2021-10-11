import { Grid, Typography, Paper, Divider } from "@material-ui/core";
import TodosItem from "./todos-row";
export default function TodoColumn({
  label,
  task,
  category,
  setCategory,
  setModal,
}) {
  return (
    <Grid item xs={12} sm={12} xl={12} md={12}>
      <Grid container>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <Grid container spacing={2}>
            {task?.map((element, index) => (
              <TodosItem
                setModal={setModal}
                todos={element}
                key={index++}
                category={category}
                setCategory={setCategory}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import { Grid, Typography, Paper, Divider, Button } from "@material-ui/core";
import Draggable from "react-draggable";
import { useRecoilState } from "recoil";
import { modal } from "../utils/modal.atom";
import UpdateTOds from "./todos-update";
export default function TodosItem({ todos, category, setCategory }) {
  const [, setModal] = useRecoilState(modal);
  const dele = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        id: todos.id,
      })
    );

    formData.append("id", todos.id);
    const result = await fetch(
      "http://localhost:8000/deletetodo",
      {
        method: "POST",

        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        console.log(error);
      });

    category?.todos?.forEach((element, index) => {
      if (element.id === todos.id) category?.todos?.splice(index, 1);
    });

    setCategory({ ...category });
  }
  return (
    <Draggable>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Paper>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                Title :
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {todos?.title}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                Priority :
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {todos?.priority}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                Due date :
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {todos?.date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                Description :
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {todos?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography
                style={{ display: "inline-block" }}
                color="textSecondary"
              >
                Status :
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {todos?.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              xl={6}
              style={{ marginTop: "2%", padding: "2%" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setModal({
                    isShowing: true,
                    content: (
                      <UpdateTOds
                        category={category}
                        todos={todos}
                        setCategory={setCategory}
                        setModal={setModal}
                      />
                    ),
                  });
                }}
              >
                Update
              </Button>
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              xl={6}
              style={{ marginTop: "2%", padding: "2%" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={dele}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Draggable>
  );
}
